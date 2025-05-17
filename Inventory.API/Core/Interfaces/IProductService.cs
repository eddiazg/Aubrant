using Inventory.API.Core.Models.DTOs;

namespace Inventory.API.Core.Interfaces
{
    public interface IProductService
    {
        IEnumerable<ProductDto> GetAllProducts();
    }
}
