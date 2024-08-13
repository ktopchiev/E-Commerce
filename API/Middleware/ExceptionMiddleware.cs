using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        /// <summary>
        /// This is Exception Middleware constructor
        /// </summary>
        /// <param name="next">Pass RequestDelegate to allow execution of next method and pass on the request to next piece of middleware</param>
        /// <param name="logger">Pass logger to log any exception we get, with type of the class that we're using</param>
        /// <param name="env">Host of our environment in order to check if we are running in prod mode or in dev mode</param>
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        /// <summary>
        /// In order to .NET Framework to use middleware, this method have to exist and it is mandatory to be named in this way
        /// </summary>
        /// <param name="context">Provide all specific information about a single HTTP request</param>
        /// <returns></returns>
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = 500;

                var response = new ProblemDetails
                {
                    Status = 500,
                    //Check if env is in development mode and switch the strack trace
                    Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                    Title = ex.Message
                };

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }


    }
}