import { useState, useCallback, useEffect } from 'react';
import { LOAD_MORE_INCREMENT, INITIAL_DISPLAY_COUNT, LOAD_MORE_DELAY } from '@/constants/productConstants';

/**
 * Custom hook for load more functionality
 */
export function useLoadMore<T>(items: T[], resetDependency?: unknown) {
  const [displayedCount, setDisplayedCount] = useState<number>(INITIAL_DISPLAY_COUNT);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Reset displayed count when dependency changes (e.g., filtered items)
  useEffect(() => {
    setDisplayedCount(INITIAL_DISPLAY_COUNT);
  }, [resetDependency]);

  // Handle load more action with loading state
  const handleLoadMore = useCallback(async () => {
    setIsLoading(true);

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, LOAD_MORE_DELAY));

    setDisplayedCount(prev => prev + LOAD_MORE_INCREMENT);
    setIsLoading(false);
  }, []);

  // Get items to display (sliced array)
  const displayedItems = items.slice(0, displayedCount);

  // Check if there are more items to load
  const hasMoreItems = items.length > displayedCount;

  // Reset function for external use
  const resetDisplayedCount = useCallback(() => {
    setDisplayedCount(INITIAL_DISPLAY_COUNT);
  }, []);

  return {
    displayedItems,
    displayedCount,
    isLoading,
    hasMoreItems,
    handleLoadMore,
    resetDisplayedCount
  };
}
