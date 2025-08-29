import { Product, FilterProduct, GridProduct } from '@/types';

/**
 * Converts a Product to FilterProduct format for filtering operations
 */
export const convertToFilterProduct = (product: Product): FilterProduct => ({
  id: product.id,
  brand: product.brand,
  name: product.name,
  price: product.price,
  image: product.image,
  skinTypes: product.skinTypes || [],
  subcategories: product.subcategories || [],
  concerns: product.concerns || [],
  bundle: product.bundle || false
});

/**
 * Converts a FilterProduct to GridProduct format for display
 */
export const convertToGridProduct = (product: FilterProduct): GridProduct => ({
  id: product.id,
  brand: product.brand,
  name: product.name,
  price: product.price,
  image: product.image,
  slug: product.name.toLowerCase().replace(/\s+/g, '-')
});

/**
 * Batch converts an array of Products to FilterProducts
 */
export const convertProductsToFilterProducts = (products: Product[]): FilterProduct[] =>
  products.map(convertToFilterProduct);

/**
 * Batch converts an array of FilterProducts to GridProducts
 */
export const convertFilterProductsToGridProducts = (products: FilterProduct[]): GridProduct[] =>
  products.map(convertToGridProduct);
