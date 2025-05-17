import { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

const useInventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'name' | 'price' | 'quantity'>('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products');
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

  const handleSort = (field: 'name' | 'price' | 'quantity') => {
    setSortField(field);
  };

  return { products, loading, error, sortField, handleSort };
};

export default useInventory;