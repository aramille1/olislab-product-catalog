"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import { ProductCard } from '@/components/common/ProductCard';
import { useProducts } from '@/contexts/ProductsContext';
import { RECOMMENDED_PRODUCTS_LIMIT } from '@/constants/productConstants';
import { getSlidesPerView, getSwiperBreakpoints } from '@/utils/responsiveHelpers';

export function RecommendedProducts() {
  const { products, selectedProduct, selectProduct } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(1);
  const swiperRef = useRef<SwiperType | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Get recommended products (exclude the currently selected product)
  const recommendedProducts = products
    .filter(product => product.id !== selectedProduct?.id)
    .slice(0, RECOMMENDED_PRODUCTS_LIMIT);

  // Use responsive helper for consistent breakpoint logic

  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-8 xl:px-0">
      <div className="max-w-8xl">

        <div className="recommended-products-swiper h-full relative ml-0 lg:ml-4">
        <h3 className="text-lg font-bold uppercase tracking-wide lg:ml-4">
          Recommended for you
        </h3>
          <Swiper
            modules={[FreeMode, Navigation, Mousewheel]}
            spaceBetween={8}
            slidesPerView={1.2}
            freeMode={true}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={getSwiperBreakpoints()}
            className="recommended-products-carousel overflow-hidden relative"
            onSlideChange={(swiper: { activeIndex: number }) => {
              const slidesPerView = getSlidesPerView();
              const groupIndex = Math.floor(swiper.activeIndex / slidesPerView) + 1;
              setCurrentSlide(groupIndex);
            }}
            onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
          >
            {recommendedProducts.map((product) => (
              <SwiperSlide key={product.id} className="!w-[283px]">
                <div className="flex justify-center lg:m-4 mr-2">
                  <ProductCard
                    product={product}
                    hoveredProduct={hoveredProduct}
                    onMouseEnter={setHoveredProduct}
                    onMouseLeave={() => setHoveredProduct(null)}
                    onAddToBag={undefined}
                    onProductClick={() => {
                      // Select the product directly since we have the full Product object
                      selectProduct(product);
                    }}
                    isSelected={selectedProduct?.id === product.id}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Numbered Pagination */}
          <div className="hidden sm:flex justify-center items-center mt-4 sm:mt-4 space-x-2 sm:space-x-4">
            {Array.from({ length: Math.ceil(recommendedProducts.length / getSlidesPerView()) }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  // Calculate which slide to go to
                  const slidesPerView = getSlidesPerView();
                  const targetSlide = index * slidesPerView;
                  if (swiperRef.current) {
                    swiperRef.current.slideTo(targetSlide);
                  }
                  setCurrentSlide(index + 1);
                }}
                className={`font-mono cursor-pointer flex items-center justify-center text-xs sm:text-sm font-bold transition-colors ${
                  currentSlide === index + 1
                    ? 'opacity-100'
                    : 'blur-[1px]'
                }`}
              >
                {(index + 1).toString().padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
