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
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        /// <summary>
        /// Adds multiple items to a user basket
        /// </summary>
        /// <param name="basketItems"></param>
        public void AddItems(List<BasketItem> basketItems)
        {
            Items.AddRange(basketItems);
            Items = Items.OrderBy(i => i.ProductId).ToList();
            var item = 0;
            while (item < Items.Count - 1)
            {
                if (Items[item].ProductId == Items[item + 1].ProductId)
                {
                    Items[item].Quantity += Items[item + 1].Quantity;
                    Items.Remove(Items[item + 1]);
                }
                item++;
            }
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