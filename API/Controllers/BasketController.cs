using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get Basket for the related user using "buyerId" cookies
        /// </summary>
        /// <returns>Basket</returns>
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await _context.RetreiveBasket(GetBuyerId(), Response);

            if (basket == null) return NotFound();

            BasketDto result = basket.MapBasketToDto();

            return Ok(result);
        }

        /// <summary>
        /// Add item to a basket.
        /// </summary>
        /// <param name="productId">(int) An id of a product to be added</param>
        /// <param name="quantity">(int) Quantity of the added product</param>
        /// <remarks> A new basket will be created if such does not exist. If product is not found returns NotFound, else returns StatusCode 201.</remarks>
        /// <returns>StatusCode201 or BadRequest</returns>
        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //get basket || create basket
            var basket = await _context.RetreiveBasket(GetBuyerId(), Response);
            if (basket == null) basket = CreateBasket();

            //get the item
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            //add the item
            basket.AddItem(product, quantity);

            //save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        /// <summary>
        /// Removes a Basket item from the basket
        /// </summary>
        /// <param name="productId">int product id to be deleted</param>
        /// <param name="quantity">int quantity of products to be increased/decreased</param>
        /// <returns>Status201 Ok if basket is removed or Status 400 BadRequest if the request is not possible</returns>
        [HttpDelete]
        public async Task<ActionResult<BasketDto>> RemoveBasketItem(int productId, int quantity)
        {
            //get basket
            var basket = await _context.RetreiveBasket(GetBuyerId(), Response);

            if (basket == null) return NotFound();

            //remove item or reduce quantity
            var item = basket.Items.FirstOrDefault(item => item.ProductId == productId);

            if (item is null) return NotFound();

            if (item.Quantity < quantity) return BadRequest(new ProblemDetails { Title = "Cannot delete more than actual quantity" });

            basket.RemoveItem(productId, quantity);

            //save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

            return BadRequest(new ProblemDetails { Title = "Problem occured while delete from basket" });

        }

        /// <summary>
        /// Get buyer id
        /// </summary>
        /// <returns>Returns Username if exists, otherwise returns cookie buyerId from the request</returns>
        private string GetBuyerId()
        {
            return User.Identity.Name ?? Request.Cookies["buyerId"];
        }

        /// <summary>
        /// Create a new Basket and store a new cookie with a buyerId to the client
        /// </summary>
        /// <returns>new Basket</returns>
        private Basket CreateBasket()
        {
            var buyerId = User.Identity.Name;

            if (buyerId == null)
            {
                buyerId = Guid.NewGuid().ToString();

                //Create a cookie
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.UtcNow.AddDays(30) };

                //This comes from ControllerBase class
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}