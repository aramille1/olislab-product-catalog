'use client';

import React, { useCallback } from 'react';
import { ProductCardProps } from '@/types';
import { DEFAULT_PRODUCT_RATING } from '@/constants/productConstants';
import { AddToBagButton } from '@/components/common/AddToBagButton';

const ProductCardComponent: React.FC<ProductCardProps> = ({
  product,
  hoveredProduct,
  onMouseEnter,
  onMouseLeave,
  onAddToBag,
  onProductClick,
  isSelected
}) => {
  // Memoize product click handler
  const handleProductClick = useCallback(() => {
    if (onProductClick) {
      onProductClick(product);
    }
  }, [onProductClick, product]);

  return (
    <div
      className="product-card group cursor-pointer rounded-lg flex-shrink-0 flex flex-col items-center relative mt-2 w-full max-w-[95vw] sm:max-w-[283px] lg:w-[283px]"
      style={{ backgroundColor: '#f0edde' }}
      // onMouseEnter={() => onMouseEnter?.(product.id)}
      // onMouseLeave={() => onMouseLeave?.()}
      onClick={handleProductClick}
    >
      <div className="flex justify-end w-full">
        <p className="font-bold font-mono sm:text-md uppercase p-2 sm:p-4">{DEFAULT_PRODUCT_RATING}</p>
      </div>

      {/* Product Image */}
      <div
       onMouseEnter={() => onMouseEnter?.(product.id)}
       onMouseLeave={() => onMouseLeave?.()}
       className="flex items-center justify-center w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] relative transition-transform duration-300 hover:scale-115">
        {/* Original product image */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-[500ms] ease-in-out ${
            hoveredProduct === product.id ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {/* Hover image (cream.png) */}
        <img
          src="/cream.png"
          alt={`${product.name} - hover`}
          className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-[500ms] ease-in-out ${
            hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col w-full p-3">
        <p className="text-black font-sans lg:text-[14px] font-bold leading-[110%] tracking-[-0.12px] uppercase pb-1 sm:pb-1.5">
          {product.brand}
        </p>
        <h3 className="text-black font-mono lg:text-[14px] font-normal leading-[100%] tracking-[-0.26px] capitalize h-8 overflow-hidden">
          {product.name}
        </h3>
    <div className="flex flex-row pt-4 sm:pt-0">
      <p className="text-black font-sans sm:text-[14px] font-bold leading-[100%] tracking-[-0.28px] capitalize pt-1 sm:pt-1.25 flex flex-row">
          ${product.price.toFixed(2)}
        </p>
        <span className="text-[#CCB9A7] mx-2">•</span>
        <p className="text-[#5D5246] font-sans sm:text-[14px] leading-[100%] tracking-[-0.28px] capitalize pt-1 sm:pt-1.25 flex flex-row">
        25ml
        </p>
    </div>
      </div>

      {/* Add to Bag Button */}
      <AddToBagButton
        productId={product.id}
        onAddToBag={onAddToBag}
        variant="card"
      />
    </div>
  );
};

// Memoized component with custom comparison
export const ProductCard = React.memo(ProductCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.hoveredProduct === nextProps.hoveredProduct &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.image === nextProps.product.image
  );
});

ProductCard.displayName = 'ProductCard';
