'use client';

import React from 'react';
import { useAddToBag } from '@/hooks/useAddToBag';

interface AddToBagButtonProps {
  productId: string;
  onAddToBag?: (productId: string) => void;
  variant?: 'card' | 'detail';
  className?: string;
}

/**
 * Reusable AddToBagButton component
 * Consolidates all add to bag UI logic
 */
export const AddToBagButton: React.FC<AddToBagButtonProps> = ({
  productId,
  onAddToBag,
  variant = 'card',
  className = ''
}) => {
  const { quantity, isAdding, handleAddToBag, handleQuantityChange } = useAddToBag(productId, onAddToBag);

  const baseClasses = variant === 'card'
    ? `text-center rounded-b-lg w-full py-2 sm:py-3 ${isAdding ? 'bg-gray-500' : 'bg-black'}`
    : `w-full py-2 mt-6 rounded-full font-bold text-sm text-white text-center uppercase tracking-wide transition-colors ${isAdding ? 'bg-gray-500' : 'bg-black'}`;

  return (
    <div className={`${baseClasses} ${className}`}>
      {isAdding ? (
        <div className="flex items-center justify-center space-x-2">
          <div className={`animate-spin rounded-full border-b-2 border-white ${
            variant === 'card' ? 'h-3 w-3 sm:h-4 sm:w-4' : 'h-4 w-4'
          }`}></div>
          <span className={`text-[#f7f6e6] text-center font-sans font-bold uppercase leading-normal ${
            variant === 'card' ? 'text-[10px] sm:text-[12px]' : 'text-[12px]'
          }`}>
            Adding...
          </span>
        </div>
      ) : quantity > 0 ? (
        <div className={`flex items-center ${
          variant === 'card' ? 'justify-around space-x-2 sm:space-x-3' : 'justify-around space-x-3'
        }`}>
          <button
            className={`text-[#f7f6e6] cursor-pointer text-center font-sans font-bold leading-normal hover:opacity-80 ${
              variant === 'card' ? 'text-[12px] sm:text-[14px]' : ''
            }`}
            onClick={(e) => handleQuantityChange(-1, e)}
          >
            -
          </button>
          <span className={`text-[#f7f6e6] text-center font-sans font-bold leading-normal ${
            variant === 'card' ? 'text-[10px] sm:text-[12px]' : ''
          }`}>
            {quantity}
          </span>
          <button
            className={`text-[#f7f6e6] cursor-pointer text-center font-sans font-bold leading-normal hover:opacity-80 ${
              variant === 'card' ? 'text-[12px] sm:text-[14px]' : ''
            }`}
            onClick={(e) => handleQuantityChange(1, e)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className={`text-[#f7f6e6] text-center font-sans font-bold uppercase leading-normal cursor-pointer ${
            variant === 'card' ? 'text-[10px] sm:text-[12px]' : 'w-full'
          }`}
          onClick={handleAddToBag}
        >
          ADD TO BAG
        </button>
      )}
    </div>
  );
};
