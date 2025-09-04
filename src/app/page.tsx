"use client";

import { ProductDetails } from "@/components/product/ProductDetails";
import { RecommendedProducts } from "@/components/product/RecommendedProducts";
import { AllProducts } from "@/components/product/AllProducts";
import { useProducts } from "@/contexts/ProductsContext";
import { ProductDetailsSkeleton, RecommendedProductsSkeleton, AllProductsSkeleton } from "@/components/common/SkeletonComponents";

export default function Home() {
  const { selectedProduct, loading, error } = useProducts();

  if (error) {
    return (
      <main className="min-h-screen pt-20">
        <div className="relative xl:max-w-full xl:px-6">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg font-mono">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      <div className="relative xl:max-w-full">
        {loading ? (
          <>
            {/* Skeleton Loading States */}
            <ProductDetailsSkeleton />
            <RecommendedProductsSkeleton />
            <AllProductsSkeleton />
          </>
        ) : selectedProduct ? (
          <>
            {/* Actual Content */}
            <ProductDetails product={selectedProduct} />
            <RecommendedProducts />
            <AllProducts />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg font-mono">No products available</p>
          </div>
        )}
      </div>
    </main>
  );
}
