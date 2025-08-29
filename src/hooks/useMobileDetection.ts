import { useState, useEffect } from 'react';
import { MOBILE_BREAKPOINT } from '@/constants/productConstants';

/**
 * Custom hook for mobile detection
 * Consolidates mobile breakpoint logic
 */
export function useMobileDetection(breakpoint: number = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}
