"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ProductDetailsProps, ExpandableSectionProps } from "@/types";
import { AddToBagButton } from '@/components/common/AddToBagButton';

export function ProductDetails({ product }: ProductDetailsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const ExpandableSection = ({
    title,
    content,
    sectionKey
  }: ExpandableSectionProps) => (
    <div className="border-b border-black/10 py-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex justify-between items-center w-full text-left cursor-pointer"
      >
        <span className="font-bold text-sm uppercase tracking-wide">{title}</span>
        <span className="text-lg">
          {expandedSections[sectionKey] ? (
            // Arrow up (expanded)
            <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 15l-7-7-7 7" />
            </svg>
          ) : (
            // Arrow down (collapsed)
            <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9l7 7 7-7" />
            </svg>
          )}
        </span>
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-3 text-sm leading-relaxed">
          {Array.isArray(content) ? (
            <ul className="space-y-1">
              {content.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          ) : (
            <p>{content}</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
    <div className="flex justify-end gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full text-black font-bold uppercase tracking-wide hover:bg-[#EBE6D5] transition-colors text-[8px] bg-[#EBE6D5]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          SHARE
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full text-black font-bold uppercase tracking-wide hover:bg-[#EBE6D5] transition-colors text-[8px] bg-[#EBE6D5]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          FAVORITE
        </button>
      </div>
    <div className="grid grid-cols-1 xl:grid-cols-3 mx-9 items-center px-4 xl:px-0">

      {/* Left Side - Product Info */}
      <div className="space-y-6 w-full xl:max-w-lg order-last xl:order-none">
        {/* Rating */}
        <div className="flex justify-between items-center mt-4 xl:mt-0">
          <h2 className="font-bold text-sm uppercase tracking-wide mb-2">OLI&apos;S LAB RATING</h2>
          <div className="">
            <div className="text-3xl font-mono font-bold">{product.rating}</div>
            <button className="font-mono font-normal text-xs underline mt-1 hover:no-underline transition-all">what does it mean?</button>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-0">
          <ExpandableSection
            title="WHY OLI LOVES IT"
            content={product.whyOliLovesIt}
            sectionKey="whyOliLovesIt"
            />
          <ExpandableSection
            title="HOW TO USE"
            content={product.howToUse}
            sectionKey="howToUse"
            />
          <ExpandableSection
            title="INGREDIENTS LIST"
            content={product.ingredients}
            sectionKey="ingredients"
            />
          <ExpandableSection
            title="SKIN RECOMMENDATION"
            content={product.skinRecommendation}
            sectionKey="skinRecommendation"
            />
        </div>
      </div>

      {/* Center - Product Image Swiper */}
      <div className="flex justify-center items-center order-first xl:order-none">
        <div className="w-full max-w-sm xl:max-w-md">
          <Swiper
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}
            className="product-image-swiper min-h-[400px]"
            >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="object-contain w-full h-1/2"
                  />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div className="space-y-6 w-full xl:max-w-sm order-2 xl:order-none mt-6 xl:mt-0">
        {/* Product Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-600 font-mono tracking-wide">{product.category}</p>
              <h1 className="text-lg font-bold uppercase tracking-wide mt-2 xl:mt-0">{product.brand}</h1>
              <h2 className="text-2xl font-light mt-1 font-mono">{product.name}</h2>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg text-gray-600">{product.size}</p>
              <span className="text-stone-300">•</span>
              <p className="text-lg font-bold">${product.price}</p>
            </div>
          </div>

          <p className="text-sm leading-[1.2] text-gray-700">
            {product.description}
          </p>

          {/* Add to Bag Button */}
          <AddToBagButton
            productId={product.id}
            variant="detail"
          />
        </div>
      </div>
    </div>
            </>
  );
}
