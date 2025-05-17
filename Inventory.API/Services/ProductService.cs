using Inventory.API.Core.Interfaces;
using Inventory.API.Core.Models.DTOs;

namespace Inventory.API.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        private readonly ILogger<ProductService> _logger;

        public ProductService(IProductRepository repository, ILogger<ProductService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public IEnumerable<ProductDto> GetAllProducts()
        {
            _logger.LogInformation("Fetching all products");

            return _repository.GetAllProducts()
                .Select(p => new ProductDto
                {
                    Name = p.Name,
                    Price = p.Price,
                    Quantity = p.Quantity
                })
                .OrderBy(p => p.Name);
        }
    }
}
