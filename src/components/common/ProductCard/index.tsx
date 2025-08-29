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
      className="product-card group cursor-pointer rounded-lg flex-shrink-0 flex flex-col items-center relative transition-transform duration-300 hover:scale-105 min-h-[320px] sm:min-h-[380px] md:min-h-[420px] mt-2 w-full max-w-[95vw] sm:max-w-[283px] lg:w-[283px] lg:h-[440px]"
      style={{ backgroundColor: '#f0edde' }}
      onMouseEnter={() => onMouseEnter?.(product.id)}
      onMouseLeave={() => onMouseLeave?.()}
      onClick={handleProductClick}
    >
      <div className="flex justify-end w-full">
        <p className="font-bold font-mono text-xs sm:text-sm uppercase p-2 sm:p-4">{DEFAULT_PRODUCT_RATING}</p>
      </div>

      {/* Product Image */}
      <div className="flex items-center justify-center w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]">
        <img
          src={hoveredProduct === product.id ? "/cream.png" : product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-opacity duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col w-full p-2 sm:p-3">
        <p className="text-black font-sans text-[10px] sm:text-[12px] font-bold leading-[110%] tracking-[-0.12px] uppercase pb-1 sm:pb-1.5">
          {product.brand}
        </p>
        <h3 className="text-black font-mono text-[11px] sm:text-[13px] font-normal leading-[100%] tracking-[-0.26px] capitalize h-6 sm:h-7">
          {product.name}
        </h3>
        <p className="text-black font-sans text-[12px] sm:text-[14px] font-bold leading-[100%] tracking-[-0.28px] capitalize pt-1 sm:pt-1.25 flex flex-row">
          ${product.price.toFixed(2)}
        </p>
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
