"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ProductCard } from "@/components/common/ProductCard";
import { FilterProduct } from "@/types";
import { useProducts } from '@/contexts/ProductsContext';
import { FilterAllProducts } from '@/components/filters/FilterAllProducts';
import { FilterAllProductsTop } from '@/components/filters/FilterAllProductsTop';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useProductActions } from '@/hooks/useProductActions';
import { useLoadMore } from '@/hooks/useLoadMore';
import { getProductGridTemplate } from '@/utils/responsiveHelpers';

export function AllProducts() {
  const { products, selectedProduct } = useProducts();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  // const [allProductsPositionY, setAllProductsPositionY] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<FilterProduct[]>([]);
  const [showTopFilter, setShowTopFilter] = useState(false);
  const [isAllProductsInViewport, setIsAllProductsInViewport] = useState(false);
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

  const handleScroll = () => {
    // Check if user is within the all-products-content div
    const allProductsContent = document.getElementById('all-products-content');
    const allProductsContentTop = document.getElementById('all-products-content-top');
    const footer = document.getElementById('footer');

    // Show filter button when user is within the all-products-content div
    // Hide filter button when footer comes into view
    if ((allProductsContent && isElementInViewport(allProductsContent)) ||
        (allProductsContentTop && isElementInViewport(allProductsContentTop))) {
      // Check if footer is not in view to hide button when reaching footer
      if (footer && !isElementInViewport(footer)) {
        setIsAllProductsInViewport(true);
      } else {
        setIsAllProductsInViewport(false);
      }
    } else {
      setIsAllProductsInViewport(false);
    }
  }

  // Helper function to check if element is in viewport (check if element is visible)
  const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Check if element is visible in viewport
    // rect.top < viewportHeight: element starts above viewport bottom
    // rect.bottom > 0: element ends below viewport top
    return (
      rect.top < viewportHeight &&
      rect.bottom > 0 &&
      rect.left >= 0 &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    },[])




  // Memoized event handlers
  const handleMouseLeave = useCallback(() => setHoveredProduct(null), []);

  // Toggle filter layout
  const toggleFilterLayout = useCallback(() => {
    setShowTopFilter(prev => !prev);
  }, []);

  return (
    <div className="w-full mx-auto pt-16 pb-5 px-4 lg:px-0" ref={targetComponentRef}>
      <div className="flex flex-col w-full max-w-7xl mx-auto">
        {/* Filter Layout Toggle - Only show on desktop */}
        <div className="hidden lg:block">
          <button
            onClick={toggleFilterLayout}
            className="mb-4 px-4 py-2 text-sm font-bold cursor-pointer uppercase hover:underline transition-colors"
          >
            {showTopFilter ? 'Show Sidebar Filter' : 'Show Top Filter'}
          </button>
        </div>

        {/* Conditional Filter Rendering */}
        {showTopFilter ? (
          // Top Filter Layout
          <div className="w-full mb-6 sticky top-0 z-30 bg-[#f7f6e7]">
            <FilterAllProductsTop
              products={filterProducts}
              onFilteredProducts={setFilteredProducts}
              targetComponentRef={targetComponentRef}
              isAllProductsInViewport={isAllProductsInViewport}
            />
          </div>
        ) : (
          // Sidebar Filter Layout - 4 Column Grid
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
            {/* Column 1: Sidebar Filter */}
            <div className="lg:col-span-1 lg:sticky lg:top-5 lg:h-fit">
              <FilterAllProducts
                products={filterProducts}
                onFilteredProducts={setFilteredProducts}
                targetComponentRef={targetComponentRef}
                isAllProductsInViewport={isAllProductsInViewport}
                // allProductPositionY={allProductsPositionY}
              />
            </div>

            {/* Columns 2-4: Main Content Area */}
            <div className="lg:col-span-3">
          <div id="all-products-content" className="w-full">
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
        )}

        {/* Main Content Area for Top Filter Layout */}
        {showTopFilter && (
          <div className="w-full">
            <div id="all-products-content-top" className="w-full">
              <div className="inline-block lg:hidden">
                <h3 className="text-lg mb-4 lg:text-xl font-bold uppercase tracking-wide font-sans text-black">ALL PRODUCTS</h3>
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
        )}
      </div>
    </div>
  );
}
