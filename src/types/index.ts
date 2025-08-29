// ============================================================================
// PRODUCT INTERFACES
// ============================================================================

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: string;
  size: string;
  price: number;
  rating: string;
  description: string;
  images: string[];
  whyOliLovesIt: string;
  howToUse: string;
  ingredients: string[];
  skinRecommendation: string;
  image: string;
  skinTypes?: string[];
  subcategories?: string[];
  concerns?: string[];
  bundle?: boolean;
}

export interface GridProduct {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  slug?: string;
  skinTypes?: string[];
  subcategories?: string[];
  concerns?: string[];
  bundle?: boolean;
}

export interface FilterProduct {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  skinTypes?: string[];
  subcategories?: string[];
  concerns?: string[];
  bundle?: boolean;
}

export interface RecommendedProduct {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  originalImage?: string;
  slug?: string;
}

// ============================================================================
// COMPONENT PROPS INTERFACES
// ============================================================================

export interface ProductDetailsProps {
  product: Product;
}

export interface ProductCardProps {
  product: GridProduct | RecommendedProduct;
  cardSize?: "small" | "medium" | "medium-large";
  onHover?: (productId: string | null) => void;
  isHovered?: boolean;
  hoveredProduct?: string | null;
  onMouseEnter?: (productId: string) => void;
  onMouseLeave?: () => void;
  onAddToBag?: (productId: string) => void;
  onProductClick?: (product: GridProduct | RecommendedProduct) => void;
  isSelected?: boolean;
}

export interface AllProductsProps {
  products?: GridProduct[];
  showFilter?: boolean;
  title?: string;
  showControls?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onProductSelect?: (product: GridProduct) => void;
}

export interface CategoriesFilterProps {
  products: Product[];
  totalCount?: number;
  onFilteredProducts: (filteredProducts: Product[]) => void;
  targetComponentRef: React.RefObject<HTMLElement>;
}

export interface FilterSectionProps {
  label: string;
  items: string[];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilterClick: (item: string) => void;
  activeFilters: string[];
  isMobile: boolean;
  isDontShowMe: boolean;
}

export interface SavedFiltersProps {
  activeFilters: string[];
  handleFilterClick: (filter: string) => void;
  isDontShowMe: boolean;
  handleClearAllClick: () => void;
}

export interface ExpandableSectionProps {
  title: string;
  content: string | string[];
  sectionKey: string;
}

export interface RecommendedProductsProps {
  onProductSelect?: (product: RecommendedProduct) => void;
  currentProductId?: string;
}

// ============================================================================
// HEADER INTERFACES
// ============================================================================

export interface HeaderProps {
  className?: string;
}

// ============================================================================
// FOOTER INTERFACES
// ============================================================================

export interface FooterProps {
  className?: string;
}

// ============================================================================
// SWIPER INTERFACES
// ============================================================================

export interface SwiperConfig {
  slidesPerView: number;
  spaceBetween: number;
  freeMode: boolean;
  pagination?: {
    clickable: boolean;
  };
}

// ============================================================================
// UTILITY INTERFACES
// ============================================================================

export interface FilterState {
  selectedCategories: string[];
  selectedBrands: string[];
  selectedPreoccupations: string[];
  selectedSkinTypes: string[];
  selectedBundle: boolean | null;
  excludedCategories: string[];
  excludedBrands: string[];
  excludedPreoccupations: string[];
  excludedSkinTypes: string[];
  excludedBundle: boolean;
}

export interface ClassifiedFilters {
  skinTypes: string[];
  brands: string[];
  subCategories: string[];
  concerns: string[];
}

// ============================================================================
// RESPONSIVE INTERFACES
// ============================================================================

export interface ResponsiveConfig {
  isMobile: boolean;
  gridColumns: number;
  slidesPerView: number;
}

// ============================================================================
// API INTERFACES (for future use)
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================================================
// THEME INTERFACES
// ============================================================================

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  fonts: {
    primary: string;
    secondary: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// ============================================================================
// EVENT INTERFACES
// ============================================================================

export interface ProductEvent {
  productId: string;
  action: 'view' | 'add_to_cart' | 'favorite' | 'share';
  timestamp: Date;
}

export interface FilterEvent {
  filterType: string;
  filterValue: string;
  action: 'add' | 'remove' | 'clear_all';
  timestamp: Date;
}

// ============================================================================
// STATE MANAGEMENT INTERFACES
// ============================================================================

export interface AppState {
  currentProduct: Product | null;
  filteredProducts: Product[];
  activeFilters: string[];
  excludedFilters: string[];
  currentSlide: number;
  hoveredProduct: string | null;
  expandedSections: Record<string, boolean>;
}

export interface AppActions {
  setCurrentProduct: (product: Product) => void;
  setFilteredProducts: (products: Product[]) => void;
  setActiveFilters: (filters: string[]) => void;
  setExcludedFilters: (filters: string[]) => void;
  setCurrentSlide: (slide: number) => void;
  setHoveredProduct: (productId: string | null) => void;
  toggleExpandedSection: (sectionKey: string) => void;
}

// ============================================================================
// VALIDATION INTERFACES
// ============================================================================

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
