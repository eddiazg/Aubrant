using Inventory.API.Core.Models.Entities;

namespace Inventory.API.Core.Interfaces
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetAllProducts();
    }
}
