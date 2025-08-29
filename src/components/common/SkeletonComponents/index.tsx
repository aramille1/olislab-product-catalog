'use client';

import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// ProductCard Skeleton
export const ProductCardSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#f0edde" highlightColor="#e8e5d8">
      <div
        className="product-card group cursor-pointer rounded-lg flex-shrink-0 flex flex-col items-center relative transition-transform duration-300 min-h-[320px] sm:min-h-[380px] md:min-h-[420px] mt-2 w-full max-w-[95vw] sm:max-w-[283px] lg:w-[283px] lg:h-[440px]"
        style={{ backgroundColor: '#f0edde' }}
      >
        <div className="flex justify-end w-full">
          <p className="font-bold font-mono text-xs sm:text-sm uppercase p-2 sm:p-4">
            <Skeleton width={50} height={15} />
          </p>
        </div>

        {/* Product Image Skeleton */}
        <div className="flex items-center justify-center w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]">
          <Skeleton width={200} height={200} borderRadius={8} />
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col w-full p-2 sm:p-3">
          <p className="text-black font-sans text-[10px] sm:text-[12px] font-bold leading-[110%] tracking-[-0.12px] uppercase pb-1 sm:pb-1.5">
            <Skeleton width={80} height={12} />
          </p>
          <h3 className="text-black font-mono text-[11px] sm:text-[13px] font-normal leading-[100%] tracking-[-0.26px] capitalize h-6 sm:h-7">
            <Skeleton width={150} height={13} />
          </h3>
          <p className="text-black font-sans text-[12px] sm:text-[14px] font-bold leading-[100%] tracking-[-0.28px] capitalize pt-1 sm:pt-1.25 flex flex-row">
            <Skeleton width={60} height={14} />
          </p>
        </div>

        {/* Add to Bag Button Skeleton */}
        <div className="bg-gray-300 text-center rounded-b-lg w-full py-2 sm:py-3">
          <Skeleton width={100} height={12} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

// ProductDetails Skeleton
export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e0e0e0">
      <div className="grid grid-cols-1 xl:grid-cols-3 items-center px-4 xl:px-0">
        {/* Share/Favorite buttons skeleton */}
        <div className="flex justify-between items-center xl:order-first order-2 mt-4 xl:mt-0">
          <Skeleton width={40} height={40} circle />
          <Skeleton width={40} height={40} circle />
        </div>

        {/* Product Image Skeleton */}
        <div className="flex justify-center xl:order-2 order-1">
          <div className="w-full max-w-md">
            <Skeleton width="100%" height={400} borderRadius={12} />
            {/* Pagination dots skeleton */}
            <div className="flex justify-center mt-4 space-x-2">
              <Skeleton width={12} height={12} circle />
              <Skeleton width={12} height={12} circle />
              <Skeleton width={12} height={12} circle />
            </div>
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-6 w-full xl:max-w-sm order-2 xl:order-none mt-6 xl:mt-0">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Skeleton width={80} height={12} className="mb-2" />
                <Skeleton width={120} height={18} className="mb-1" />
                <Skeleton width={200} height={24} />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton width={60} height={18} />
                <Skeleton width={60} height={18} />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton width="100%" height={14} />
              <Skeleton width="90%" height={14} />
              <Skeleton width="95%" height={14} />
            </div>

            {/* Add to Bag Button Skeleton */}
            <div className="w-full py-2 mt-6">
              <Skeleton width="100%" height={40} borderRadius={20} />
            </div>
          </div>

          {/* Expandable Sections Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="border-b border-gray-200 pb-3">
                <div className="flex justify-between items-center">
                  <Skeleton width={150} height={16} />
                  <Skeleton width={20} height={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

// RecommendedProducts Skeleton
export const RecommendedProductsSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e0e0e0">
      <div className="mt-16 px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="max-w-8xl">
          <Skeleton width={200} height={20} className="mb-4 sm:mb-0 mx-0 lg:mx-9" />

          <div className="mx-9 relative">
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="flex-shrink-0">
                  <div className="flex justify-center m-4">
                    <ProductCardSkeleton />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows Skeleton */}
            <div className="lg:hidden">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10">
                <Skeleton width={40} height={40} circle />
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10">
                <Skeleton width={40} height={40} circle />
              </div>
            </div>

            {/* Numbered Pagination Skeleton */}
            <div className="hidden sm:flex justify-center items-center mt-6 sm:mt-8 space-x-2 sm:space-x-4">
              {[1, 2, 3, 4].map((index) => (
                <Skeleton key={index} width={20} height={16} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

// AllProducts Grid Skeleton
export const AllProductsSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e0e0e0">
      <div className="w-full mx-auto pt-16 pb-5 px-4 lg:px-0">
        <div className="flex flex-col lg:flex-row lg:items-start w-full max-w-7xl mx-auto">
          {/* Filter Component Skeleton */}
          <div className="w-full lg:w-64 lg:flex-shrink-0 lg:mr-8">
            <div className="space-y-6">
              <div>
                <Skeleton width={150} height={20} className="mb-1" />
                <Skeleton width={100} height={12} />
              </div>

              {/* Filter Sections */}
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton width={100} height={14} />
                    <Skeleton width={14} height={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="flex-1 mt-4 lg:mt-0">
            <div className="w-full">
              <div className="inline-block lg:hidden">
                <Skeleton width={150} height={16} className="mb-4" />
              </div>
              <div className="grid gap-3 sm:gap-4 w-full justify-center mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, 283px)' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <div key={index} className="flex justify-center">
                    <ProductCardSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

// Header Skeleton (for when bag items are loading)
export const HeaderBagSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0">
      <div className="relative">
        <Skeleton width={24} height={24} />
        <div className="absolute -top-2 -right-2">
          <Skeleton width={20} height={20} circle />
        </div>
      </div>
    </SkeletonTheme>
  );
};

// Filter Loading Skeleton
export const FilterSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e0e0e0">
      <div className="space-y-4">
        <div>
          <Skeleton width={150} height={20} className="mb-1" />
          <Skeleton width={100} height={12} />
        </div>

        {/* Filter Categories */}
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <Skeleton width={100} height={14} />
              <Skeleton width={14} height={14} />
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};
