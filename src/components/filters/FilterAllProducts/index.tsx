'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FilterProduct } from '@/types';
import { ArrowDownIcon, ArrowUpIcon, CheckIcon, XIcon, EmptySquare } from '@/components/common/Icons';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { useFilterOptions } from '@/hooks/useFilterOptions';

interface FilterAllProductsProps {
  products: FilterProduct[];
  onFilteredProducts: (products: FilterProduct[]) => void;
  targetComponentRef?: React.RefObject<HTMLDivElement | null>;
}

export const FilterAllProducts: React.FC<FilterAllProductsProps> = ({
  products,
  onFilteredProducts,
  targetComponentRef
}) => {
  const [filteredProductsLength, setFilteredProductsLength] = useState<number>(products.length);
  const prevFilteredProductsRef = useRef<FilterProduct[]>([]);

  // Use custom hooks
  const isMobile = useMobileDetection();
  const { skinTypesArray, brandsArray, subCategoriesArray, concernsArray } = useFilterOptions(products);

  // Mobile state management
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Filter state
  const [selectedBundle, setSelectedBundle] = useState<boolean | null>(null);

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
  }, [activeFilters, products, excludedCategories, excludedBrands, excludedPreoccupations, excludedSkinTypes, excludedBundle, selectedBundle, onFilteredProducts]);

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

  // Mobile Filter Content Component
  const FilterContent = () => (
    <div className="space-y-4 lg:space-y-6">
      {/* Total Products Section */}
      <div className="hidden lg:block">
        <h3 className="text-lg lg:text-xl font-bold uppercase tracking-wide mb-1 font-sans text-black">ALL PRODUCTS</h3>
        <p className="text-xs font-bold uppercase text-black font-sans">{displayCount} PRODUCTS</p>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="space-y-2 relative pr-8 lg:pr-12">
          <div className="flex flex-wrap gap-1.5 lg:gap-2">
            {activeFilters.map((filter, index) => (
              <div key={index} className="bg-[#CCB9A7] px-2 py-1 rounded-2xl flex items-center gap-1.5">
                <span className="text-[#5D5246] text-[10px] lg:text-xs font-bold uppercase tracking-tight font-sans">{filter}</span>
                <button
                  className="flex w-2 h-2 justify-center items-center bg-transparent border-none cursor-pointer"
                  onClick={() => handleFilterClick(filter)}
                >
                  <XIcon />
                </button>
              </div>
            ))}
          </div>
          <button
            className="absolute top-0 right-0 text-[10px] lg:text-xs font-bold uppercase tracking-tight bg-transparent border-none cursor-pointer text-[#7F6F64] hover:text-black font-sans"
            onClick={handleClearAll}
          >
            CLEAR ALL
          </button>
        </div>
      )}

      {/* Filter Sections */}
      {/* Categories Section */}
      <div className="border-b border-gray-200 lg:border-none pb-3 lg:pb-0">
        <div
          className="flex justify-between items-center w-full cursor-pointer mb-2 py-2 lg:p-2.5"
          onClick={() => handleToggleFilter("Categories")}
        >
          <h3 className="text-sm lg:text-sm font-bold uppercase tracking-tight font-sans text-black">CATEGORIES</h3>
          <div className="w-3 h-3 lg:w-3.5 lg:h-3.5 flex items-center justify-center">
            {activeFilterSection === "Categories" ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </div>
        </div>

        {activeFilterSection === "Categories" && (
          <div className="space-y-2 lg:space-y-4 pt-2 lg:pt-2.5 max-h-48 lg:max-h-none overflow-y-auto lg:overflow-visible">
            {subCategoriesArray.map((item, index) => {
              const isActive = activeFilters.includes(item);
              return (
                <div
                  key={index}
                  className="flex items-center justify-start cursor-pointer py-2 lg:py-1.5 px-2 lg:px-2.5 font-mono text-sm font-normal text-black capitalize hover:bg-gray-50 lg:hover:bg-transparent rounded lg:rounded-none"
                  onClick={() => handleFilterClick(item)}
                >
                  <div className="w-2.5 h-2.5 mr-2.5 flex items-center justify-center">
                    {isActive ? <CheckIcon /> : <EmptySquare />}
                  </div>
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Brands Section */}
      <div className="border-b border-gray-200 lg:border-none pb-3 lg:pb-0">
        <div
          className="flex justify-between items-center w-full cursor-pointer mb-2 py-2 lg:p-2.5"
          onClick={() => handleToggleFilter("Brands")}
        >
          <h3 className="text-sm font-bold uppercase tracking-tight font-sans text-black">BRANDS</h3>
          <div className="w-3 h-3 lg:w-3.5 lg:h-3.5 flex items-center justify-center">
            {activeFilterSection === "Brands" ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </div>
        </div>

        {activeFilterSection === "Brands" && (
          <div className="space-y-2 lg:space-y-4 pt-2 lg:pt-2.5 max-h-48 lg:max-h-none overflow-y-auto lg:overflow-visible">
            {brandsArray.map((item, index) => {
              const isActive = activeFilters.includes(item);
              return (
                <div
                  key={index}
                  className="flex items-center justify-start cursor-pointer py-2 lg:py-1.5 px-2 lg:px-2.5 font-mono text-sm font-normal text-black capitalize hover:bg-gray-50 lg:hover:bg-transparent rounded lg:rounded-none"
                  onClick={() => handleFilterClick(item)}
                >
                  <div className="w-2.5 h-2.5 mr-2.5 flex items-center justify-center">
                    {isActive ? <CheckIcon /> : <EmptySquare />}
                  </div>
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Concerns Section */}
      <div className="border-b border-gray-200 lg:border-none pb-3 lg:pb-0">
        <div
          className="flex justify-between items-center w-full cursor-pointer mb-2 py-2 lg:p-2.5"
          onClick={() => handleToggleFilter("Concerns")}
        >
          <h3 className="text-sm font-bold uppercase tracking-tight font-sans text-black">CONCERNS</h3>
          <div className="w-3 h-3 lg:w-3.5 lg:h-3.5 flex items-center justify-center">
            {activeFilterSection === "Concerns" ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </div>
        </div>

        {activeFilterSection === "Concerns" && (
          <div className="space-y-2 lg:space-y-4 pt-2 lg:pt-2.5 max-h-48 lg:max-h-none overflow-y-auto lg:overflow-visible">
            {concernsArray.map((item, index) => {
              const isActive = activeFilters.includes(item);
              return (
                <div
                  key={index}
                  className="flex items-center justify-start cursor-pointer py-2 lg:py-1.5 px-2 lg:px-2.5 font-mono text-sm font-normal text-black capitalize hover:bg-gray-50 lg:hover:bg-transparent rounded lg:rounded-none"
                  onClick={() => handleFilterClick(item)}
                >
                  <div className="w-2.5 h-2.5 mr-2.5 flex items-center justify-center">
                    {isActive ? <CheckIcon /> : <EmptySquare />}
                  </div>
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Skin Types Section */}
      <div className="border-b border-gray-200 lg:border-none pb-3 lg:pb-0">
        <div
          className="flex justify-between items-center w-full cursor-pointer mb-2 py-2 lg:p-2.5"
          onClick={() => handleToggleFilter("Skin Types")}
        >
          <h3 className="text-sm font-bold uppercase tracking-tight font-sans text-black">SKIN TYPES</h3>
          <div className="w-3 h-3 lg:w-3.5 lg:h-3.5 flex items-center justify-center">
            {activeFilterSection === "Skin Types" ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </div>
        </div>

        {activeFilterSection === "Skin Types" && (
          <div className="space-y-2 lg:space-y-4 pt-2 lg:pt-2.5 max-h-48 lg:max-h-none overflow-y-auto lg:overflow-visible">
            {skinTypesArray.map((item, index) => {
              const isActive = activeFilters.includes(item);
              return (
                <div
                  key={index}
                  className="flex items-center justify-start cursor-pointer py-2 lg:py-1.5 px-2 lg:px-2.5 font-mono text-sm font-normal text-black capitalize hover:bg-gray-50 lg:hover:bg-transparent rounded lg:rounded-none"
                  onClick={() => handleFilterClick(item)}
                >
                  <div className="w-2.5 h-2.5 mr-2.5 flex items-center justify-center">
                    {isActive ? <CheckIcon /> : <EmptySquare />}
                  </div>
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Don't Show Me Section */}
      <div className="bg-[#CCB9A7] rounded-lg">
        <div
          onClick={() => setDontShowBrand(!dontShowBrand)}
          className="flex justify-between p-2 lg:p-2.5 cursor-pointer"
        >
          <h3 className="text-sm font-bold uppercase tracking-tight font-sans text-black">DON&apos;T SHOW ME</h3>
          <div className="w-3 h-3 lg:w-3.5 lg:h-3.5 flex items-center justify-center">
            {dontShowBrand ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </div>
        </div>

        {/* Excluded Filters Display */}
        {(excludedBrands.length > 0 || excludedCategories.length > 0 || excludedPreoccupations.length > 0 || excludedSkinTypes.length > 0) && (
          <div className="px-2 lg:px-2.5 pb-2">
            <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-2">
              {[...excludedBrands, ...excludedCategories, ...excludedPreoccupations, ...excludedSkinTypes].map((filter, index) => (
                <div key={index} className="bg-[#F7F6E6] px-2 py-1 rounded-2xl flex items-center gap-1.5">
                  <span className="text-[#5D5246] text-[10px] lg:text-xs font-bold uppercase tracking-tight font-sans">{filter}</span>
                  <button
                    className="flex w-2 h-2 justify-center items-center bg-transparent border-none cursor-pointer"
                    onClick={() => handleFilterDontShowMeClick(filter)}
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>
            <button
              className="text-[10px] lg:text-xs font-bold uppercase tracking-tight bg-transparent border-none cursor-pointer text-[#F7F6E6] hover:text-white font-sans"
              onClick={handleDontShowMeClearAll}
            >
              CLEAR ALL
            </button>
          </div>
        )}

        {dontShowBrand && (
          <div className="px-2 lg:px-2.5 pb-2 lg:pb-2.5 space-y-3 lg:space-y-4 max-h-64 lg:max-h-none overflow-y-auto lg:overflow-visible">
            {/* Don't Show Me sections simplified for mobile */}
            {[
              { title: "CATEGORIES", array: subCategoriesArray, excluded: excludedCategories, setter: setExcludedCategories },
              { title: "BRANDS", array: brandsArray, excluded: excludedBrands, setter: setExcludedBrands },
              { title: "CONCERNS", array: concernsArray, excluded: excludedPreoccupations, setter: setExcludedPreoccupations },
              { title: "SKIN TYPES", array: skinTypesArray, excluded: excludedSkinTypes, setter: setExcludedSkinTypes }
            ].map(({ title, array, excluded, setter }) => (
              <div key={title} className="border-b border-black/10 lg:border-none pb-3 lg:pb-0">
                <div
                  className="flex justify-between items-center w-full cursor-pointer mb-2"
                  onClick={() => handleToggleFilterDontShowMe(title)}
                >
                  <h4 className="text-sm font-bold uppercase tracking-tight font-sans text-black">{title}</h4>
                  <div className="w-3 h-3 lg:w-3.5 lg:h-3.5 flex items-center justify-center">
                    {activeFilterSectionDontShowMe === title ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  </div>
                </div>

                {activeFilterSectionDontShowMe === title && (
                  <div className="space-y-1 lg:space-y-2 max-h-32 lg:max-h-none overflow-y-auto lg:overflow-visible">
                    {array.map((item, index) => {
                      const isActive = excluded.includes(item);
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-start cursor-pointer py-1.5 lg:py-1 px-2 font-mono text-sm font-normal text-black capitalize hover:bg-black/5 lg:hover:bg-transparent rounded lg:rounded-none"
                          onClick={() => setter(current =>
                            current.includes(item) ? current.filter(f => f !== item) : [...current, item]
                          )}
                        >
                          <div className="w-2.5 h-2.5 mr-2.5 flex items-center justify-center">
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
        )}
      </div>
    </div>
  );

  // Main return with responsive layout
  return (
    <>
      {isMobile ? (
        <div className="relative">
          {/* Floating Filter Button */}
          <div
            onClick={toggleFilterVisibility}
            className="fixed bottom-6 right-6 z-40 transition-all duration-300 translate-y-0 opacity-100"
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

                {/* Mobile filter content */}
                <div className="flex-1 overflow-y-auto p-4">
                  <FilterContent />
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
        <div className="w-full max-w-xs">
          <FilterContent />
        </div>
      )}
    </>
  );
};
