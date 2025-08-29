/**
 * Utility functions for responsive logic
 */

// Swiper breakpoints configuration
export const getSwiperBreakpoints = () => ({
  320: {
    slidesPerView: 1.2,
    spaceBetween: 8,
  },
  480: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2.5,
    spaceBetween: 12,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 12,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 15,
  },
  1200: {
    slidesPerView: 5,
    spaceBetween: 15,
  },
  1600: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
});

// Get slides per view based on screen size
export const getSlidesPerView = (): number => {
  if (typeof window === 'undefined') return 4;

  const width = window.innerWidth;
  if (width >= 1600) return 6;
  if (width >= 1200) return 5;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2.5;
  if (width >= 480) return 2;
  return 1.2;
};

// Common grid template for product grids
export const getProductGridTemplate = (itemCount: number = 0) => ({
  gridTemplateColumns: 'repeat(auto-fit, 283px)',
  justifyContent: itemCount === 1 ? 'start' : 'center'
} as React.CSSProperties);
