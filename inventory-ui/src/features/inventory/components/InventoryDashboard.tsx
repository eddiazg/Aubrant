import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/InventoryDashboard.css';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

const InventoryDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'name' | 'price' | 'quantity'>('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7239/api/Products');
        setProducts(response.data);
      } catch (err) {
        setError('Error loading products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortField] < b[sortField]) return -1;
    if (a[sortField] > b[sortField]) return 1;
    return 0;
  }).slice(0, 5); // Mostrar solo los primeros 5

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleSort = (field: 'name' | 'price' | 'quantity') => {
    setSortField(field);
  };

  if (loading) return <div className="loading">Loading inventory...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="inventory-container">
      <header className="inventory-header">
        <h1>
          Inventory &nbsp;
          <small className="text-muted">Management System</small>
        </h1>
      </header>

      <div className="dashboard-container">
        <table className="inventory-table">
          <caption>Products</caption>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('price')}>Price</th>
              <th onClick={() => handleSort('quantity')}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{formatPrice(product.price)}</td>
                <td className={product.quantity > 3 ? 'highlight-red' : ''}>
                  {product.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryDashboard;