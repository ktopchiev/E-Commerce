using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        /// <summary>
        /// Retreive a basket from the context using the buyerId cookie
        /// </summary>
        /// <returns>Basket basket || null</returns>
        public static async Task<Basket> RetreiveBasket(this StoreContext _context, string buyerId, HttpResponse response = null, HttpRequest request = null)
        {
            if (buyerId.IsNullOrEmpty())
            {
                if (request.Cookies.Any(c => c.Key == "buyerId")) response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        /// <summary>
        /// Returns mapped basket to BasketDto
        /// </summary>
        /// <param name="basket"> Basket </param>
        /// <returns>BasketDto</returns>
        public static BasketDto MapBasketToDto(this Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity

                }).ToList()
            };
        }
    }
}