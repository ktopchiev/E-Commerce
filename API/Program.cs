using System.Diagnostics;
using System.Text;
using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Scalar.AspNetCore;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            var jwtSecurityScheme = new OpenApiSecurityScheme
            {
                BearerFormat = "JWT",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = JwtBearerDefaults.AuthenticationScheme,
                Description = "Put Bearer + your token in the box below",
                Reference = new OpenApiReference
                {
                    Id = JwtBearerDefaults.AuthenticationScheme,
                    Type = ReferenceType.SecurityScheme
                }
            };

            c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    jwtSecurityScheme, Array.Empty<string>()
                }
            });
        });

        string connString;

        if (builder.Environment.IsDevelopment())
        {
            Console.WriteLine("Development environment detected. Using local connection string.");
            connString = builder.Configuration.GetConnectionString("DefaultConnection");
        }
        else
        {
            Console.WriteLine("Production environment detected. Using connection string from environment variable.");
            // Use connection string provided at runtime by FlyIO.
            var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

            // Parse connection URL to connection string for Npgsql
            connUrl = connUrl.Replace("postgres://", string.Empty);


            var pgUserPass = connUrl.Split("@")[0];
            var pgHostPortDb = connUrl.Split("@")[1];
            var pgHostPort = pgHostPortDb.Split("/")[0];
            var pgDb = pgHostPortDb.Split("/")[1];
            var pgUser = pgUserPass.Split(":")[0];
            var pgPass = pgUserPass.Split(":")[1];
            var pgHost = pgHostPort.Split(":")[0];
            var pgPort = pgHostPort.Split(":")[1];
            var updatedHost = pgHost.Replace("flycast", "internal");

            connString = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
        }

        builder.Services.AddDbContext<StoreContext>(opt =>
        {
            opt.UseNpgsql(connString);
        });


        builder.Services.AddCors();

        builder.Services.AddIdentityCore<User>(opt =>
        {
            opt.User.RequireUniqueEmail = true;
        })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<StoreContext>();

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.
                        GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
                };
            });

        builder.Services.AddAuthorization();

        builder.Services.AddScoped<TokenService>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        app.UseMiddleware<ExceptionMiddleware>();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.ConfigObject.AdditionalItems.Add("persistAuthorization", "true");
            });
        }
        else
        {
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }


        app.UseCors(opt =>
        {
            opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
        });

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        if (!app.Environment.IsDevelopment()) app.MapFallbackToController("Index", "Fallback");

        var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

        try
        {
            await context.Database.MigrateAsync();
            await DbInitializer.Initialize(context, userManager);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "A problem occured during migration");
        }

        Console.WriteLine($"Current environment: {app.Environment.EnvironmentName}");
        app.Run();
    }
}