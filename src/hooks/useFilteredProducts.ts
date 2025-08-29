import { useMemo } from 'react';
import { Product, FilterProduct } from '@/types';
import {
  convertProductsToFilterProducts,
  convertFilterProductsToGridProducts
} from '@/utils/productTransforms';

export function useFilteredProducts(products: Product[], filteredProducts: FilterProduct[]) {
  // Convert products to FilterProduct format for filtering - Memoized
  const filterProducts = useMemo(() =>
    convertProductsToFilterProducts(products),
    [products]
  );

  // Use filtered products or all products - Memoized
  const allProducts = useMemo(() =>
    filteredProducts.length > 0
      ? convertFilterProductsToGridProducts(filteredProducts)
      : convertFilterProductsToGridProducts(filterProducts),
    [filteredProducts, filterProducts]
  );

  return {
    filterProducts,
    allProducts
  };
}
