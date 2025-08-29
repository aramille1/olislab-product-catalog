import { useState, useCallback, useMemo } from 'react';
import { useBag } from '@/contexts/BagContext';
import { ADD_TO_BAG_DELAY } from '@/constants/productConstants';

/**
 * Custom hook for add to bag functionality
 * Consolidates all add to bag logic to prevent duplication
 */
export function useAddToBag(productId: string, onAddToBag?: (productId: string) => void) {
  const [isAdding, setIsAdding] = useState(false);
  const { bagItems, addToBag, updateQuantity } = useBag();

  // Memoize quantity calculation
  const quantity = useMemo(() => bagItems[productId] || 0, [bagItems, productId]);

  // Handle add to bag action
  const handleAddToBag = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isAdding) return; // Prevent multiple clicks while loading

    setIsAdding(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, ADD_TO_BAG_DELAY));

    if (onAddToBag) {
      onAddToBag(productId);
    }

    addToBag(productId, 1);
    setIsAdding(false);
  }, [isAdding, onAddToBag, productId, addToBag]);

  // Handle quantity change
  const handleQuantityChange = useCallback((change: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newQuantity = Math.max(0, quantity + change);
    updateQuantity(productId, newQuantity);
  }, [quantity, updateQuantity, productId]);

  return {
    quantity,
    isAdding,
    handleAddToBag,
    handleQuantityChange
  };
}
