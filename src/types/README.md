# Types Documentation

This directory contains all TypeScript interfaces and types used throughout the application, following best practices for maintainability and scalability.

## File Structure

```
src/types/
├── index.ts          # Main types file with all interfaces
└── README.md         # This documentation file
```

## Interface Categories

### 1. Product Interfaces
- **`Product`**: Complete product information including all details, images, and metadata
- **`GridProduct`**: Simplified product for grid display with optional slug
- **`RecommendedProduct`**: Product for recommendation carousels with optional originalImage and slug
- **`FilterProduct`**: Product structure used in filtering components

### 2. Component Props Interfaces
- **`ProductDetailProps`**: Props for the main product detail component
- **`ProductCardProps`**: Props for product card components with optional callbacks
- **`GridProductsProps`**: Props for the product grid component
- **`CategoriesFilterProps`**: Props for the filter component
- **`FilterSectionProps`**: Props for individual filter sections
- **`SavedFiltersProps`**: Props for saved filters display
- **`ExpandableSectionProps`**: Props for expandable content sections

### 3. Header & Footer Interfaces
- **`HeaderProps`**: Props for the header component (extensible)
- **`FooterProps`**: Props for the footer component (extensible)

### 4. Swiper Interfaces
- **`SwiperConfig`**: Configuration for Swiper carousel components

### 5. Utility Interfaces
- **`FilterState`**: Complete state for filter functionality
- **`ClassifiedFilters`**: Categorized filter options
- **`ResponsiveConfig`**: Responsive design configuration

### 6. API Interfaces (Future Use)
- **`ApiResponse<T>`**: Generic API response wrapper
- **`PaginatedResponse<T>`**: Paginated API response structure

### 7. Theme Interfaces
- **`ThemeColors`**: Color palette definition
- **`ThemeConfig`**: Complete theme configuration

### 8. Event Interfaces
- **`ProductEvent`**: Product interaction events
- **`FilterEvent`**: Filter interaction events

### 9. State Management Interfaces
- **`AppState`**: Global application state
- **`AppActions`**: State management actions

### 10. Validation Interfaces
- **`ValidationRule`**: Validation rule definition
- **`ValidationResult`**: Validation result structure

## Best Practices

### 1. Interface Naming
- Use PascalCase for interface names
- Suffix with `Props` for component props
- Use descriptive names that indicate purpose

### 2. Property Types
- Use specific types over `any`
- Make properties optional (`?`) when appropriate
- Use union types for multiple possible values
- Use generic types for reusable structures

### 3. Organization
- Group related interfaces together
- Use clear section headers with comments
- Export all interfaces from index.ts
- Keep interfaces focused and single-purpose

### 4. Extensibility
- Design interfaces to be easily extended
- Use optional properties for future additions
- Consider backward compatibility

## Usage Examples

### Importing Types
```typescript
import { Product, ProductCardProps, GridProductsProps } from '@/types';
```

### Using in Components
```typescript
interface MyComponentProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ product, onProductClick }) => {
  // Component implementation
};
```

### Extending Interfaces
```typescript
interface ExtendedProduct extends Product {
  customField: string;
  additionalData?: Record<string, any>;
}
```

## Maintenance

### Adding New Types
1. Add the interface to the appropriate section in `index.ts`
2. Update this README if adding new categories
3. Ensure all related components use the new types
4. Run TypeScript checks to verify compatibility

### Updating Existing Types
1. Consider backward compatibility
2. Update all components using the modified interface
3. Update documentation if needed
4. Test thoroughly to ensure no breaking changes

### Type Safety
- Always use TypeScript strict mode
- Avoid using `any` type
- Use proper type guards when needed
- Leverage TypeScript's type inference

## Future Enhancements

### Planned Additions
- **API Integration Types**: More comprehensive API response types
- **Form Validation Types**: Enhanced validation interfaces
- **State Management Types**: More detailed state interfaces
- **Testing Types**: Types for testing utilities

### Considerations
- Keep interfaces lightweight and focused
- Consider performance implications of complex types
- Maintain consistency across the codebase
- Document breaking changes clearly

## Contributing

When contributing to types:
1. Follow the established naming conventions
2. Add comprehensive JSDoc comments for complex interfaces
3. Update this README for new categories or significant changes
4. Ensure all TypeScript checks pass
5. Test with existing components to verify compatibility
