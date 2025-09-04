'use client';

import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// ProductCard Skeleton - Updated to match current ProductCard structure
export const ProductCardSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#f0edde" highlightColor="#e8e5d8">
      <div
        className="product-card group cursor-pointer rounded-lg flex-shrink-0 flex flex-col items-center relative mt-2 w-full max-w-[95vw] sm:max-w-[283px] lg:w-[283px]"
        style={{ backgroundColor: '#f0edde' }}
      >
        <div className="flex justify-end w-full">
          <p className="font-bold font-mono sm:text-md uppercase p-2 sm:p-4">
            <Skeleton width={50} height={15} />
          </p>
        </div>

        {/* Product Image Skeleton */}
        <div className="flex items-center justify-center w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] relative transition-transform duration-300 hover:scale-115">
          <Skeleton width={200} height={200} borderRadius={8} />
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col w-full p-3">
          <p className="text-black font-sans lg:text-[14px] font-bold leading-[110%] tracking-[-0.12px] uppercase pb-1 sm:pb-1.5">
            <Skeleton width={80} height={14} />
          </p>
          <h3 className="text-black font-mono lg:text-[14px] font-normal leading-[100%] tracking-[-0.26px] capitalize h-8 overflow-hidden">
            <Skeleton width={150} height={14} />
          </h3>
          <div className="flex flex-row pt-4 sm:pt-0">
            <p className="text-black font-sans sm:text-[14px] font-bold leading-[100%] tracking-[-0.28px] capitalize pt-1 sm:pt-1.25 flex flex-row">
              <Skeleton width={60} height={14} />
            </p>
            <span className="text-[#CCB9A7] mx-2">•</span>
            <p className="text-[#5D5246] font-sans sm:text-[14px] leading-[100%] tracking-[-0.28px] capitalize pt-1 sm:pt-1.25 flex flex-row">
              <Skeleton width={40} height={14} />
            </p>
          </div>
        </div>

        {/* Add to Bag Button Skeleton */}
        <div className="text-center rounded-b-lg w-full py-2 sm:py-2 bg-gray-300">
          <Skeleton width={100} height={12} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

// ProductDetails Skeleton - Updated to match current flexbox layout
export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#f0edde" highlightColor="#e8e5d8">
      <>
        {/* Share/Favorite buttons skeleton */}
        <div className="flex justify-end gap-3 mr-2 xl:mr-[60px]">
          <Skeleton width={80} height={32} borderRadius={16} />
          <Skeleton width={80} height={32} borderRadius={16} />
        </div>

        <div className="flex flex-col xl:flex-row items-center xl:items-center px-4 xl:px-0 gap-8 xl:gap-12 xl:mx-9">
          {/* Left Side - Product Info */}
          <div className="space-y-6 w-full xl:w-1/4 order-last xl:order-none">
            {/* Rating */}
            <div className="flex justify-between items-center mt-4 xl:mt-0">
              <Skeleton width={150} height={16} />
              <div>
                <Skeleton width={60} height={32} />
                <Skeleton width={120} height={12} />
              </div>
            </div>

            {/* Expandable Sections Skeleton */}
            <div className="space-y-0">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="border-b border-black/10 py-4">
                  <div className="flex justify-between items-center">
                    <Skeleton width={120} height={16} />
                    <Skeleton width={16} height={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Product Image Swiper */}
          <div className="flex justify-center items-center order-first xl:order-none xl:w-2/5">
            <div className="w-full max-w-sm xl:max-w-lg">
              <Skeleton width="100%" height={400} borderRadius={12} />
              {/* Pagination dots skeleton */}
              <div className="flex justify-center mt-4 space-x-2">
                <Skeleton width={12} height={12} circle />
                <Skeleton width={12} height={12} circle />
                <Skeleton width={12} height={12} circle />
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6 w-full xl:w-1/4 order-2 xl:order-none mt-6 xl:mt-0">
            <div className="space-y-4">
              <div className="flex flex-col xl:flex-row justify-between items-start">
                <div>
                  <Skeleton width={80} height={12} className="mb-2" />
                  <Skeleton width={120} height={18} className="mb-1" />
                  <Skeleton width={200} height={24} />
                </div>
                <div className="flex items-center gap-2 mt-2 xl:mt-0">
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
              <div className="hidden md:block">
                <Skeleton width="100%" height={40} borderRadius={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Add to Bag Button for mobile */}
        <div className="block md:hidden mx-2">
          <Skeleton width="100%" height={40} borderRadius={20} />
        </div>
      </>
    </SkeletonTheme>
  );
};

// RecommendedProducts Skeleton - Updated to match current structure
export const RecommendedProductsSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#f0edde" highlightColor="#e8e5d8">
      <div className="mt-16 px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="max-w-8xl">
          <div className="recommended-products-swiper h-full relative ml-0 lg:ml-4">
            <h3 className="text-lg font-bold uppercase tracking-wide lg:ml-4">
              <Skeleton width={200} height={20} />
            </h3>

            <div className="recommended-products-carousel overflow-hidden relative">
              <div className="flex gap-8 overflow-hidden">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="!w-[283px] flex-shrink-0">
                    <div className="flex justify-center lg:m-4 mr-2">
                      <ProductCardSkeleton />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Numbered Pagination Skeleton */}
            <div className="hidden sm:flex justify-center items-center mt-4 sm:mt-4 space-x-2 sm:space-x-4">
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

// AllProducts Skeleton - Updated to match current 4-column grid layout
export const AllProductsSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#f0edde" highlightColor="#e8e5d8">
      <div className="w-full mx-auto pt-16 pb-5 px-4 lg:px-0">
        <div className="flex flex-col w-full max-w-7xl mx-auto">
          {/* Filter Layout Toggle Button Skeleton */}
          <div className="mb-4">
            <Skeleton width={150} height={40} borderRadius={8} />
          </div>

          {/* Sidebar Filter Layout - 4 Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
            {/* Column 1: Sidebar Filter */}
            <div className="lg:col-span-1 lg:sticky lg:top-5 lg:h-fit">
              <div className="w-full max-w-xs">
                <div className="space-y-4 lg:space-y-6">
                  {/* Total Products Section */}
                  <div className="border-b border-gray-200 lg:border-none pb-3 lg:pb-0">
                    <Skeleton width={120} height={16} />
                    <Skeleton width={80} height={12} />
                  </div>

                  {/* Filter Sections */}
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="border-b border-gray-200 lg:border-none pb-3 lg:pb-0">
                      <div className="flex justify-between items-center w-full cursor-pointer mb-2 py-2 lg:p-2.5">
                        <Skeleton width={100} height={14} />
                        <Skeleton width={14} height={14} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columns 2-4: Main Content Area */}
            <div className="lg:col-span-3">
              <div className="w-full">
                <div className="inline-block lg:hidden">
                  <h3 className="text-lg mb-4 lg:text-xl font-bold uppercase tracking-wide font-sans text-black">
                    <Skeleton width={150} height={20} />
                  </h3>
                </div>

                {/* Products Grid Container */}
                <div className="grid gap-3 sm:gap-4 w-full justify-center mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, 283px)' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <div key={index} className="flex justify-center">
                      <ProductCardSkeleton />
                    </div>
                  ))}
                </div>

                {/* Load More Button Skeleton */}
                <div className="text-center py-8">
                  <Skeleton width={200} height={40} borderRadius={8} />
                </div>
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
    <SkeletonTheme baseColor="#f0edde" highlightColor="#e8e5d8">
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
