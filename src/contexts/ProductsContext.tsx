'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product } from '@/types';
import { PRODUCTS_API_LIMIT } from '@/constants/productConstants';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  selectProduct: (product: Product) => void;
  refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

interface ProductsProviderProps {
  children: ReactNode;
}

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/products?limit=${PRODUCTS_API_LIMIT}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch products');
      }

      setProducts(result.data);

      // Set first product as selected if no product is selected
      if (!selectedProduct && result.data.length > 0) {
        setSelectedProduct(result.data[0]);
      }

    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Error fetching products:', err);

      // Fallback to empty array on error
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedProduct]);

  const selectProduct = (product: Product) => {
    setSelectedProduct(product);
    // Scroll to top to show the product detail
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value: ProductsContextType = {
    products,
    loading,
    error,
    selectedProduct,
    selectProduct,
    refreshProducts
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
