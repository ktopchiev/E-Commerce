using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        /// <summary>
        /// Adds item to the basket
        /// </summary>
        /// <param name="product">product (Product)</param>
        /// <param name="quantity">Quantity of added product (int)</param>
        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.Id != product.Id))
            {
                Items.Add(new BasketItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }

            var existingItem = Items.FirstOrDefault(item => item.Id == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        /// <summary>
        /// Removes item from the basket
        /// </summary>
        /// <param name="productId">Id of the product (int)</param>
        /// <param name="quantity">Quantity of item to remove (int)</param>
        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}