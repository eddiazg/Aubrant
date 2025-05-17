export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface InventoryState {
  products: Product[];
  loading: boolean;
  error: string | null;
  sortField: 'name' | 'price' | 'quantity';
}