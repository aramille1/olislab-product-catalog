"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
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
        <h3 className="text-lg lg:text-xl font-bold uppercase tracking-wide mb-4 sm:mb-0 mx-0 lg:mx-9">
          Recommended for you
        </h3>

        <div className="recommended-products-swiper mx-9 relative">
          <Swiper
            modules={[FreeMode, Navigation]}
            spaceBetween={8}
            slidesPerView={1.2}
            freeMode={true}
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
                <div className="flex justify-center m-4">
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

          {/* Navigation Arrows - Only show on non-desktop */}
          <div className="lg:hidden">
            <button
              className="swiper-button-prev"
              aria-label="Previous"
              onClick={() => {
                if (swiperRef.current) {
                  const swiper = swiperRef.current;
                  // If already at the first slide, do nothing
                  if (swiper.activeIndex < 1) return;
                  // Move to previous slide by 283px width
                  const currentTranslate = swiper.getTranslate ? swiper.getTranslate() : swiper.translate;
                  const newTranslate = currentTranslate + 283;
                  if (swiper.setTranslate) {
                    swiper.setTranslate(newTranslate);
                    swiper.updateProgress();
                    swiper.updateSlidesClasses();
                  } else if (swiper.slideTo) {
                    swiper.slideTo(swiper.activeIndex - 1);
                  }
                }
              }}
              type="button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button
              className="swiper-button-next"
              aria-label="Next"
              onClick={() => {
                if (swiperRef.current) {
                  // Move to next slide by 283px width
                  const swiper = swiperRef.current;
                  const currentTranslate = swiper.getTranslate ? swiper.getTranslate() : swiper.translate;
                  const newTranslate = currentTranslate - 283;
                  if (swiper.setTranslate) {
                    swiper.setTranslate(newTranslate);
                    swiper.updateProgress();
                    // swiper.updateActiveIndex(); // Removed: method does not exist on Swiper type
                    swiper.updateSlidesClasses();
                  } else if (swiper.slideTo) {
                    // Fallback: slide to next slide
                    swiper.slideTo(swiper.activeIndex + 1);
                  }
                }
              }}
              type="button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>

          {/* Numbered Pagination */}
          <div className="hidden sm:flex justify-center items-center mt-6 sm:mt-8 space-x-2 sm:space-x-4">
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
