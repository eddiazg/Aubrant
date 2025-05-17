namespace Inventory.API.Core.Models.DTOs
{
    public class ProductDto
    {
        public string Name { get; set; }
        public string FormattedPrice => Price.ToString("C2");
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string StockStatus => Quantity > 0 ? "In Stock" : "Out of Stock";
    }
}
