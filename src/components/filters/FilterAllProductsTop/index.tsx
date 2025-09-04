'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FilterProduct } from '@/types';
import { ArrowDownIcon, ArrowUpIcon, SortIcon, CheckIcon, XIcon, EmptySquare } from '@/components/common/Icons';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { useFilterOptions } from '@/hooks/useFilterOptions';

interface FilterAllProductsTopProps {
  products: FilterProduct[];
  onFilteredProducts: (products: FilterProduct[]) => void;
  targetComponentRef?: React.RefObject<HTMLDivElement | null>;
}

export const FilterAllProductsTop: React.FC<FilterAllProductsTopProps> = ({
  products,
  onFilteredProducts,
  targetComponentRef
}) => {
  const [filteredProductsLength, setFilteredProductsLength] = useState<number>(products.length);
  const prevFilteredProductsRef = useRef<FilterProduct[]>([]);

  // Use custom hooks
  const isMobile = useMobileDetection();
  const { skinTypesArray, brandsArray, subCategoriesArray, concernsArray } = useFilterOptions(products);

  // Sort options
  const sortOptions = [
    { value: 'price-low', label: 'Price (low to high)' },
    { value: 'price-high', label: 'Price (high to low)' }
  ];

  // Mobile state management
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Filter state
  const [selectedBundle, setSelectedBundle] = useState<boolean | null>(null);

  // Sort state
  const [sortBy, setSortBy] = useState<string>('');

  // Combined active filters
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Excluded filters for "Don't Show Me"
  const [excludedCategories, setExcludedCategories] = useState<string[]>([]);
  const [excludedBrands, setExcludedBrands] = useState<string[]>([]);
  const [excludedPreoccupations, setExcludedPreoccupations] = useState<string[]>([]);
  const [excludedSkinTypes, setExcludedSkinTypes] = useState<string[]>([]);
  const [excludedBundle, setExcludedBundle] = useState<boolean>(false);

  // Toggle states for sections
  const [dontShowBrand, setDontShowBrand] = useState(false);

  // Desktop toggle states
  const [activeFilterSection, setActiveFilterSection] = useState<string | null>(null);
  const [activeFilterSectionDontShowMe, setActiveFilterSectionDontShowMe] = useState<string | null>(null);

  // Click outside effect to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Close filter dropdowns if clicking outside
      if (activeFilterSection && !target.closest('.filter-dropdown')) {
        setActiveFilterSection(null);
      }

      // Close "Don't Show Me" dropdown if clicking outside
      if (activeFilterSectionDontShowMe && !target.closest('.dont-show-me-dropdown')) {
        setActiveFilterSectionDontShowMe(null);
      }

      // Close "Don't Show Me" section if clicking outside
      if (dontShowBrand && !target.closest('.dont-show-me-section')) {
        setDontShowBrand(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeFilterSection, activeFilterSectionDontShowMe, dontShowBrand]);

  const handleToggleFilter = (section: string) => {
    setActiveFilterSection(prevSection => prevSection === section ? null : section);
  };

  const handleToggleFilterDontShowMe = (section: string) => {
    setActiveFilterSectionDontShowMe(prevSection => prevSection === section ? null : section);
  };

  // Update active filters when selections change
  useEffect(() => {
    const newFilters: string[] = [];

    if (selectedBundle === true && !newFilters.includes('Bundle')) {
      newFilters.push('Bundle');
    }

    setActiveFilters(newFilters);
  }, [selectedBundle]);

  // Handle filter clicks
  const handleFilterClick = (filter: string) => {
    setActiveFilters(currentFilters => {
      const updatedFilters = currentFilters.includes(filter)
        ? currentFilters.filter(f => f !== filter)
        : [...currentFilters, filter];
      return updatedFilters;
    });
  };

  // Handle "Don't Show Me" clicks
  const handleFilterDontShowMeClick = (filter: string) => {
    const removeFilter = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>) => {
      if (array.includes(filter)) {
        setArray(array.filter(item => item !== filter));
      }
    };

    removeFilter(excludedCategories, setExcludedCategories);
    removeFilter(excludedBrands, setExcludedBrands);
    removeFilter(excludedPreoccupations, setExcludedPreoccupations);
    removeFilter(excludedSkinTypes, setExcludedSkinTypes);
  };

  // Filtering function
  const getFilteredProducts = () => {
    let finalProducts = products;

    const classifiedFilters: {
      skinTypes: string[];
      brands: string[];
      subCategories: string[];
      concerns: string[];
    } = {
      skinTypes: [],
      brands: [],
      subCategories: [],
      concerns: []
    };

    activeFilters.forEach(filter => {
      const lowercasedFilter = filter.toLowerCase();

      if (skinTypesArray.some(skinType => skinType.toLowerCase() === lowercasedFilter)) {
        classifiedFilters.skinTypes.push(filter);
      } else if (brandsArray.some(brand => brand.toLowerCase() === lowercasedFilter)) {
        classifiedFilters.brands.push(filter);
      } else if (subCategoriesArray.some(subCategory => subCategory.toLowerCase() === lowercasedFilter)) {
        classifiedFilters.subCategories.push(filter);
      } else if (concernsArray.some(concern => concern.toLowerCase() === lowercasedFilter)) {
        classifiedFilters.concerns.push(filter);
      }
    });

    if (selectedBundle === true) {
      finalProducts = finalProducts.filter(product => product.bundle === true);
    }

    if (activeFilters.length > 0 && !activeFilters.includes('RESET')) {
      finalProducts = finalProducts.filter(product => {
        const matchesSubcategories =
          classifiedFilters.subCategories.length === 0 ||
          classifiedFilters.subCategories.some(filter =>
            product.subcategories?.some(sub => sub.toLowerCase() === filter.toLowerCase())
          );

        const matchesBrands =
          classifiedFilters.brands.length === 0 ||
          classifiedFilters.brands.some(filter =>
            product.brand?.toLowerCase() === filter.toLowerCase()
          );

        const matchesConcerns =
          classifiedFilters.concerns.length === 0 ||
          classifiedFilters.concerns.some(filter =>
            product.concerns?.some(concern => concern.toLowerCase() === filter.toLowerCase())
          );

        const matchesSkinTypes =
          classifiedFilters.skinTypes.length === 0 ||
          classifiedFilters.skinTypes.some(filter =>
            product.skinTypes?.some(st => st.toLowerCase() === filter.toLowerCase())
          );

        const matchesBundle =
          selectedBundle === null || product.bundle === selectedBundle;

        return matchesSubcategories && matchesBrands && matchesConcerns && matchesSkinTypes && matchesBundle;
      });
    }

    // Apply sorting
    if (sortBy) {
      finalProducts = [...finalProducts].sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return (a.price || 0) - (b.price || 0);
          case 'price-high':
            return (b.price || 0) - (a.price || 0);
          default:
            return 0;
        }
      });
    }

    return finalProducts;
  };

  // Apply filters and exclusions
  useEffect(() => {
    const filteredProducts = getFilteredProducts();
    const filteredByExclusion = filteredProducts.filter(product => {
      const isBrandExcluded = excludedBrands.some(
        excludedBrand => product.brand?.toLowerCase() === excludedBrand.toLowerCase()
      );

      const isCategoryExcluded = excludedCategories.some(
        excludedCategory => product.subcategories?.some(
          subcategory => subcategory.toLowerCase() === excludedCategory.toLowerCase()
        )
      );

      const isPreoccupationExcluded = excludedPreoccupations.some(
        excludedPreoccupation => product.concerns?.some(
          concern => concern.toLowerCase() === excludedPreoccupation.toLowerCase()
        )
      );

      const isSkinTypeExcluded = excludedSkinTypes.some(
        excludedSkinType => product.skinTypes?.some(
          skinType => skinType.toLowerCase() === excludedSkinType.toLowerCase()
        )
      );

      const isBundleExcluded = excludedBundle && product.bundle === true;

      return !isBrandExcluded && !isCategoryExcluded && !isPreoccupationExcluded && !isSkinTypeExcluded && !isBundleExcluded;
    });

    setFilteredProductsLength(filteredByExclusion.length);

    if (JSON.stringify(filteredByExclusion) !== JSON.stringify(prevFilteredProductsRef.current)) {
      onFilteredProducts(filteredByExclusion);
      prevFilteredProductsRef.current = filteredByExclusion;
    }
  }, [activeFilters, products, excludedCategories, excludedBrands, excludedPreoccupations, excludedSkinTypes, excludedBundle, selectedBundle, sortBy, onFilteredProducts]);

  // Clear functions
  const handleDontShowMeClearAll = () => {
    setExcludedCategories([]);
    setExcludedBrands([]);
    setExcludedPreoccupations([]);
    setExcludedSkinTypes([]);
    setExcludedBundle(false);
  };

  const handleClearAll = () => {
    setActiveFilters([]);
    setSelectedBundle(null);
    setSortBy('');
  };

  // Mobile filter toggle
  const toggleFilterVisibility = () => {
    setIsFilterVisible(prev => {
      const newValue = !prev;
      if (typeof document !== 'undefined') {
        document.body.style.overflow = newValue ? 'hidden' : 'auto';
      }
      return newValue;
    });
  };

  // Close filter function
  const closeFilter = () => {
    setIsFilterVisible(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };

  // Clean up body overflow on component unmount
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, []);

  const displayCount = activeFilters.length > 0 ||
    excludedCategories.length > 0 ||
    excludedBrands.length > 0 ||
    excludedPreoccupations.length > 0 ||
    excludedSkinTypes.length > 0 ||
    selectedBundle !== null ||
    excludedBundle
    ? filteredProductsLength
    : products.length;

  // Horizontal Filter Content Component
  const HorizontalFilterContent = () => (
    <div className="w-full  py-4">
      <div className="max-w-7xl mx-auto px-13">
        {/* Top Row - Title and Active Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          {/* Title and Count */}
          <div className="flex items-center gap-4 mb-4 lg:mb-0">
            <h3 className="text-lg font-bold uppercase tracking-wide font-sans text-black">ALL PRODUCTS</h3>
            <span className="text-sm font-bold uppercase text-gray-600 font-sans">({displayCount} PRODUCTS)</span>
          </div>

          {/* Active Filters Row */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-gray-600">ACTIVE:</span>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <div key={index} className="bg-[#CCB9A7] px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="text-[#5D5246] text-xs font-bold uppercase tracking-tight font-sans">{filter}</span>
                    <button
                      className="flex w-3 h-3 justify-center items-center bg-transparent border-none cursor-pointer hover:bg-black/10 rounded-full"
                      onClick={() => handleFilterClick(filter)}
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="text-xs font-bold uppercase tracking-tight bg-transparent border-none cursor-pointer text-[#7F6F64] hover:text-black font-sans ml-4"
                onClick={handleClearAll}
              >
                CLEAR ALL
              </button>
            </div>
          )}
        </div>

        {/* Bottom Row - Horizontal Filter Sections */}
        <div className="flex flex-wrap lg:flex-nowrap items-start gap-6 lg:gap-8">

          {/* Sort By Section */}
          <div className="min-w-0 flex-shrink-0">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleToggleFilter("Sort By")}
            >
              <h4 className="text-sm font-bold uppercase tracking-tight font-sans text-black whitespace-nowrap">SORT BY</h4>
              <div className="w-4 h-4 flex items-center justify-center">
                {activeFilterSection === "Sort By" ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </div>
            </div>

            {activeFilterSection === "Sort By" && (
              <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-2 z-50 min-w-[200px] filter-dropdown">
                {sortOptions.map((option) => {
                  const isActive = sortBy === option.value;
                  return (
                    <div
                      key={option.value}
                      className="flex items-center justify-start cursor-pointer py-2 px-2 font-mono text-sm font-normal text-black hover:bg-gray-50 rounded"
                      onClick={() => setSortBy(sortBy === option.value ? '' : option.value)}
                    >
                      <div className="w-4 h-4 mr-3 flex items-center justify-center">
                        {isActive ? <CheckIcon /> : <EmptySquare />}
                      </div>
                      {option.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Categories Section */}
          <div className="min-w-0 flex-shrink-0">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleToggleFilter("Categories")}
            >
              <h4 className="text-sm font-bold uppercase tracking-tight font-sans text-black whitespace-nowrap">CATEGORIES</h4>
              <div className="w-4 h-4 flex items-center justify-center">
                {activeFilterSection === "Categories" ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </div>
            </div>

            {activeFilterSection === "Categories" && (
              <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-2 z-50 min-w-[200px] max-h-64 overflow-y-auto filter-dropdown">
                {subCategoriesArray.map((item, index) => {
                  const isActive = activeFilters.includes(item);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-start cursor-pointer py-2 px-2 font-mono text-sm font-normal text-black hover:bg-gray-50 rounded"
                      onClick={() => handleFilterClick(item)}
                    >
                      <div className="w-4 h-4 mr-3 flex items-center justify-center">
                        {isActive ? <CheckIcon /> : <EmptySquare />}
                      </div>
                      <span className="capitalize">{item}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Brands Section */}
          <div className="min-w-0 flex-shrink-0">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleToggleFilter("Brands")}
            >
              <h4 className="text-sm font-bold uppercase tracking-tight font-sans text-black whitespace-nowrap">BRANDS</h4>
              <div className="w-4 h-4 flex items-center justify-center">
                {activeFilterSection === "Brands" ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </div>
            </div>

            {activeFilterSection === "Brands" && (
              <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-2 z-50 min-w-[200px] max-h-64 overflow-y-auto filter-dropdown">
                {brandsArray.map((item, index) => {
                  const isActive = activeFilters.includes(item);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-start cursor-pointer py-2 px-2 font-mono text-sm font-normal text-black hover:bg-gray-50 rounded"
                      onClick={() => handleFilterClick(item)}
                    >
                      <div className="w-4 h-4 mr-3 flex items-center justify-center">
                        {isActive ? <CheckIcon /> : <EmptySquare />}
                      </div>
                      <span className="capitalize">{item}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Concerns Section */}
          <div className="min-w-0 flex-shrink-0">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleToggleFilter("Concerns")}
            >
              <h4 className="text-sm font-bold uppercase tracking-tight font-sans text-black whitespace-nowrap">CONCERNS</h4>
              <div className="w-4 h-4 flex items-center justify-center">
                {activeFilterSection === "Concerns" ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </div>
            </div>

            {activeFilterSection === "Concerns" && (
              <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-2 z-50 min-w-[200px] max-h-64 overflow-y-auto filter-dropdown">
                {concernsArray.map((item, index) => {
                  const isActive = activeFilters.includes(item);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-start cursor-pointer py-2 px-2 font-mono text-sm font-normal text-black hover:bg-gray-50 rounded"
                      onClick={() => handleFilterClick(item)}
                    >
                      <div className="w-4 h-4 mr-3 flex items-center justify-center">
                        {isActive ? <CheckIcon /> : <EmptySquare />}
                      </div>
                      <span className="capitalize">{item}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Skin Types Section */}
          <div className="min-w-0 flex-shrink-0">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleToggleFilter("Skin Types")}
            >
              <h4 className="text-sm font-bold uppercase tracking-tight font-sans text-black whitespace-nowrap">SKIN TYPES</h4>
              <div className="w-4 h-4 flex items-center justify-center">
                {activeFilterSection === "Skin Types" ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </div>
            </div>

            {activeFilterSection === "Skin Types" && (
              <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-2 z-50 min-w-[200px] max-h-64 overflow-y-auto filter-dropdown">
                {skinTypesArray.map((item, index) => {
                  const isActive = activeFilters.includes(item);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-start cursor-pointer py-2 px-2 font-mono text-sm font-normal text-black hover:bg-gray-50 rounded"
                      onClick={() => handleFilterClick(item)}
                    >
                      <div className="w-4 h-4 mr-3 flex items-center justify-center">
                        {isActive ? <CheckIcon /> : <EmptySquare />}
                      </div>
                      <span className="capitalize">{item}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Don't Show Me Section */}
          <div className="min-w-0 flex-shrink-0">
            <div
              className="flex items-center gap-2 cursor-pointer group bg-[#CCB9A7] px-3 py-1 rounded-full dont-show-me-section"
              onClick={() => setDontShowBrand(!dontShowBrand)}
            >
              <h4 className="text-sm font-bold uppercase tracking-tight font-sans text-black whitespace-nowrap">DON&apos;T SHOW ME</h4>
              <div className="w-4 h-4 flex items-center justify-center">
                {dontShowBrand ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </div>
            </div>

            {/* Don't Show Me Dropdown */}
            {dontShowBrand && (
              <div className="absolute bg-[#CCB9A7] border border-gray-300 rounded-lg shadow-lg p-4 mt-2 z-50 min-w-[250px] max-h-96 overflow-y-auto dont-show-me-dropdown">
                {/* Excluded Filters Display */}
                {(excludedBrands.length > 0 || excludedCategories.length > 0 || excludedPreoccupations.length > 0 || excludedSkinTypes.length > 0) && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {[...excludedBrands, ...excludedCategories, ...excludedPreoccupations, ...excludedSkinTypes].map((filter, index) => (
                        <div key={index} className="bg-[#F7F6E6] px-2 py-1 rounded-full flex items-center gap-2">
                          <span className="text-[#5D5246] text-xs font-bold uppercase tracking-tight font-sans">{filter}</span>
                          <button
                            className="flex w-3 h-3 justify-center items-center bg-transparent border-none cursor-pointer hover:bg-black/10 rounded-full"
                            onClick={() => handleFilterDontShowMeClick(filter)}
                          >
                            <XIcon />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      className="text-xs font-bold uppercase tracking-tight bg-transparent border-none cursor-pointer text-[#F7F6E6] hover:text-white font-sans"
                      onClick={handleDontShowMeClearAll}
                    >
                      CLEAR ALL
                    </button>
                  </div>
                )}

                {/* Don't Show Me Sections */}
                <div className="space-y-3">
                  {[
                    { title: "CATEGORIES", array: subCategoriesArray, excluded: excludedCategories, setter: setExcludedCategories },
                    { title: "BRANDS", array: brandsArray, excluded: excludedBrands, setter: setExcludedBrands },
                    { title: "CONCERNS", array: concernsArray, excluded: excludedPreoccupations, setter: setExcludedPreoccupations },
                    { title: "SKIN TYPES", array: skinTypesArray, excluded: excludedSkinTypes, setter: setExcludedSkinTypes }
                  ].map(({ title, array, excluded, setter }) => (
                    <div key={title} className="border-b border-black/10 pb-3 last:border-b-0">
                      <div
                        className="flex justify-between items-center w-full cursor-pointer mb-2"
                        onClick={() => handleToggleFilterDontShowMe(title)}
                      >
                        <h5 className="text-sm font-bold uppercase tracking-tight font-sans text-black">{title}</h5>
                        <div className="w-4 h-4 flex items-center justify-center">
                          {activeFilterSectionDontShowMe === title ? <ArrowUpIcon /> : <ArrowDownIcon />}
                        </div>
                      </div>

                      {activeFilterSectionDontShowMe === title && (
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {array.map((item, index) => {
                            const isActive = excluded.includes(item);
                            return (
                              <div
                                key={index}
                                className="flex items-center justify-start cursor-pointer py-1.5 px-2 font-mono text-sm font-normal text-black capitalize hover:bg-black/5 rounded"
                                onClick={() => setter(current =>
                                  current.includes(item) ? current.filter(f => f !== item) : [...current, item]
                                )}
                              >
                                <div className="w-4 h-4 mr-3 flex items-center justify-center">
                                  {isActive ? <XIcon /> : <EmptySquare />}
                                </div>
                                {item}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Main return with responsive layout
  return (
    <>
      {isMobile ? (
        <div className="relative">
          {/* Mobile: Show floating filter button */}
          <div
            onClick={toggleFilterVisibility}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300"
          >
            <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold uppercase shadow-lg hover:bg-gray-800 transition-colors">
              FILTER ({displayCount})
            </button>
          </div>

          {/* Mobile Filter Screen */}
          {isFilterVisible && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
              onClick={closeFilter}
            >
              <div
                className="bg-white w-full h-[85vh] rounded-t-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                  <div className="flex-1">
                    <h1 className="text-xl font-bold text-gray-900 uppercase tracking-wide">FILTER</h1>
                    <p className="text-sm text-gray-600">{displayCount} PRODUCTS</p>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700 transition-colors font-bold text-sm uppercase"
                    onClick={closeFilter}
                  >
                    CLOSE
                  </button>
                </div>

                {/* Mobile filter content - reuse vertical layout for mobile */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {/* Mobile vertical filter sections would go here - keeping simple for now */}
                    <div className="text-center py-8">
                      <p className="text-gray-500">Mobile filter implementation</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
                  <button
                    className="w-full bg-black text-white py-4 rounded-lg text-sm font-bold uppercase hover:bg-gray-800 transition-colors"
                    onClick={closeFilter}
                  >
                    SEE RESULTS ({displayCount})
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Desktop: Show horizontal filter */
        <HorizontalFilterContent />
      )}
    </>
  );
};
