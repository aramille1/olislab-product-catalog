import { useCallback } from 'react';
import { useProducts } from '@/contexts/ProductsContext';
import { GridProduct, Product } from '@/types';

/**
 * Custom hook for product-related actions
 */
export function useProductActions() {
  const { products, selectProduct } = useProducts();

  // Handle product click action
  const handleProductClick = useCallback((clickedProduct: GridProduct) => {
    const fullProduct = products.find(p => p.id === clickedProduct.id);
    if (fullProduct) {
      selectProduct(fullProduct);
    }
  }, [products, selectProduct]);

  // Handle add to bag action (can be extended for more complex logic)
  const handleAddToBag = useCallback((productId: string) => {
    console.log(`Add to bag: ${productId}`);
    // Add analytics tracking, API calls, etc. here
  }, []);

  // Handle product selection with smooth scroll
  const selectProductWithScroll = useCallback((product: Product) => {
    selectProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectProduct]);

  return {
    handleProductClick,
    handleAddToBag,
    selectProductWithScroll
  };
}
