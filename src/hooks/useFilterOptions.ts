import { useMemo } from 'react';
import { FilterProduct } from '@/types';

/**
 * Custom hook for extracting filter options from products
 * Consolidates filter option extraction logic
 */
export function useFilterOptions(products: FilterProduct[]) {
  const filterOptions = useMemo(() => {
    const skinTypes = new Set<string>();
    const brands = new Set<string>();
    const subCategories = new Set<string>();
    const concerns = new Set<string>();

    products.forEach(product => {
      if (Array.isArray(product.skinTypes)) {
        product.skinTypes.forEach(skinType => skinTypes.add(skinType));
      }
      if (product.brand) {
        brands.add(product.brand);
      }
      if (Array.isArray(product.subcategories)) {
        product.subcategories.forEach(subCategory => subCategories.add(subCategory));
      }
      if (Array.isArray(product.concerns)) {
        product.concerns.forEach(concern => concerns.add(concern));
      }
    });

    return {
      skinTypesArray: Array.from(skinTypes),
      brandsArray: Array.from(brands),
      subCategoriesArray: Array.from(subCategories),
      concernsArray: Array.from(concerns)
    };
  }, [products]);

  return filterOptions;
}
