using Inventory.API.Core.Interfaces;
using Inventory.API.Core.Models.Entities;
using System.Xml.Linq;
using System.Xml.XPath;

namespace Inventory.API.Repository
{
    public class XmlProductRepository : IProductRepository
    {
        private readonly string _xmlFilePath;
        private readonly ILogger<XmlProductRepository> _logger;

        public XmlProductRepository(IConfiguration config, ILogger<XmlProductRepository> logger)
        {
            _logger = logger;
            _xmlFilePath = Path.Combine(Directory.GetCurrentDirectory(),
                config["XmlData:InventoryPath"] ?? "Infrastructure/Data/Xml/inventory.xml");

            _logger.LogInformation($"Loading XML from: {_xmlFilePath}");
        }

        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                var doc = XDocument.Load(_xmlFilePath);

                return doc.XPathSelectElements("//inventory/products/product")
                    .Select(p => new Product
                    {
                        Name = p.Attribute("name")?.Value ?? "Unknown",
                        Price = decimal.TryParse(p.Attribute("price")?.Value, out var price) ? price : 0,
                        Quantity = int.TryParse(p.Attribute("qty")?.Value, out var qty) ? qty : 0
                    });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error reading XML file");
                throw;
            }
        }
    }
}
