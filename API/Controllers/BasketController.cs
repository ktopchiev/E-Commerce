using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public BasketController(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Get Basket for the related user using "buyerId" cookies
        /// </summary>
        /// <returns>Basket</returns>
        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetreiveBasket();

            if (basket == null) return NotFound();

            var mappedBasket = _mapper.Map<BasketDto>(basket);

            return Ok(mappedBasket);
        }

        /// <summary>
        /// Add item to a basket.
        /// </summary>
        /// <param name="productId">(int) An id of a product to be added</param>
        /// <param name="quantity">(int) Quantity of the added product</param>
        /// <remarks> A new basket will be created if no such exist. If product not found returns NotFound, otherwise returns StatusCode 201.</remarks>
        /// <returns>Status Code 201</returns>
        [HttpPost] // api/basket?productId=3&quantity=2
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //get basket || create basket
            var basket = await RetreiveBasket();
            if (basket == null) basket = CreateBasket();

            //get the item
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            //add the item
            basket.AddItem(product, quantity);

            //save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //get basket
            var basket = await RetreiveBasket();
            if (basket == null) return NotFound();

            //remove item or reduce quantity
            var item = basket.Items.FirstOrDefault(item => item.Id == productId);
            if (item != null && item.Quantity >= quantity) basket.RemoveItem(productId, quantity);
            //save changes
            return Ok();
        }

        /// <summary>
        /// Retreive basket from the context with a buyerId cookie
        /// </summary>
        /// <returns>Basket basket || null</returns>
        private async Task<Basket> RetreiveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        /// <summary>
        /// Creates a new Basket
        /// </summary>
        /// <returns>new Basket</returns>
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };

            //This comes from ControllerBase class
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}