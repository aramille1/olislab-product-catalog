"use client";

import { useState, useRef, useCallback } from "react";
import { ProductCard } from "@/components/common/ProductCard";
import { FilterProduct } from "@/types";
import { useProducts } from '@/contexts/ProductsContext';
import { FilterAllProducts } from '@/components/filters/FilterAllProducts';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useProductActions } from '@/hooks/useProductActions';
import { useLoadMore } from '@/hooks/useLoadMore';
import { getProductGridTemplate } from '@/utils/responsiveHelpers';

export function AllProducts() {
  const { products, selectedProduct } = useProducts();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<FilterProduct[]>([]);
  const targetComponentRef = useRef<HTMLDivElement>(null);

  // Use custom hooks
  const { filterProducts, allProducts } = useFilteredProducts(products, filteredProducts);
  const { handleProductClick, handleAddToBag } = useProductActions();
  const {
    displayedItems: finalProducts,
    displayedCount,
    isLoading: isLoadingMore,
    hasMoreItems: hasMoreProducts,
    handleLoadMore
  } = useLoadMore(allProducts, filteredProducts);

  // Memoized event handlers
  const handleMouseLeave = useCallback(() => setHoveredProduct(null), []);

  return (
    <div className="w-full mx-auto pt-16 pb-5 px-4 lg:px-0" ref={targetComponentRef}>
      <div className="flex flex-col lg:flex-row lg:items-start w-full max-w-7xl mx-auto">
        {/* Filter Component - Always render, responsive behavior handled inside */}
        <div className="w-full lg:w-64 lg:flex-shrink-0 lg:mr-8">
          <FilterAllProducts
            products={filterProducts}
            onFilteredProducts={setFilteredProducts}
            targetComponentRef={targetComponentRef}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 mt-4 lg:mt-0">
          <div className="w-full">
            <div className="inline-block lg:hidden">
              <h3 className="text-lg mb-4 lg:text-xl font-bold uppercase tracking-wide font-sans text-black">ALL PRODUCTS</h3>
              {/* <p className="text-xs font-bold uppercase text-black font-sans">{finalProducts.length} PRODUCTS</p> */}
            </div>
            {/* Products Grid Container */}
            <div
              className="grid gap-3 sm:gap-4 w-full justify-center mb-8"
              style={getProductGridTemplate(finalProducts.length)}
            >
              {finalProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-center"
                >
                  <ProductCard
                    product={product}
                    hoveredProduct={hoveredProduct}
                    onMouseEnter={setHoveredProduct}
                    onMouseLeave={handleMouseLeave}
                    onAddToBag={handleAddToBag}
                    onProductClick={handleProductClick}
                    isSelected={selectedProduct?.id === product.id}
                  />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreProducts && (
              <div className="text-center py-8">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="px-8 py-3 rounded-lg text-sm font-bold cursor-pointer uppercase tracking-wide underline hover:no-underline transition-colors disabled:cursor-not-allowed"
                >
                  {isLoadingMore ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    `Load More (${allProducts.length - displayedCount} remaining)`
                  )}
                </button>
              </div>
            )}

            {/* No Products Message */}
            {finalProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg font-mono">No products found</p>
              </div>
            )}

            {/* All Products Loaded Message */}
            {!hasMoreProducts && allProducts.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm font-mono">All {allProducts.length} products loaded</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
