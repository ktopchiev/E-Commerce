using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _context = context;
        }

        /// <summary>
        /// Login user
        /// </summary>
        /// <param name="loginDto"></param>
        /// <returns>New UserDto</returns>
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            var userBasket = await _context.RetreiveBasket(loginDto.Username);
            var anonymousBasket = await _context.RetreiveBasket(Request.Cookies["buyerId"], null, Request);

            if (anonymousBasket != null && userBasket != null)
            {
                anonymousBasket.AddItems(userBasket.Items);
                anonymousBasket.BuyerId = user.UserName;
                _context.Baskets.Remove(userBasket);
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            var userDto = new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = null
            };

            if (userBasket != null)
            {
                userDto.Basket = userBasket.MapBasketToDto();
            }
            else if (anonymousBasket != null)
            {
                userDto.Basket = anonymousBasket.MapBasketToDto();
            }

            return userDto;
        }

        /// <summary>
        /// Creates new user
        /// </summary>
        /// <param name="registerDto"></param>
        /// <returns>StatusCode 201 - Ok</returns>
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        /// <summary>
        /// Get current logged in user
        /// </summary>
        /// <returns>New UserDto</returns>
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {

            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
            };
        }
    }
}