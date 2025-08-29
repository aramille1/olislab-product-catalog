'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BagContextType {
  bagItems: Record<string, number>; // productId -> quantity
  totalQuantity: number;
  addToBag: (productId: string, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromBag: (productId: string) => void;
  clearBag: () => void;
}

const BagContext = createContext<BagContextType | undefined>(undefined);

interface BagProviderProps {
  children: ReactNode;
}

export function BagProvider({ children }: BagProviderProps) {
  const [bagItems, setBagItems] = useState<Record<string, number>>({});

  const totalQuantity = Object.values(bagItems).reduce((sum, quantity) => sum + quantity, 0);

  const addToBag = (productId: string, quantity: number) => {
    setBagItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBag(productId);
    } else {
      setBagItems(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  const removeFromBag = (productId: string) => {
    setBagItems(prev => {
      const newItems = { ...prev };
      delete newItems[productId];
      return newItems;
    });
  };

  const clearBag = () => {
    setBagItems({});
  };

  const value: BagContextType = {
    bagItems,
    totalQuantity,
    addToBag,
    updateQuantity,
    removeFromBag,
    clearBag
  };

  return (
    <BagContext.Provider value={value}>
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const context = useContext(BagContext);
  if (context === undefined) {
    throw new Error('useBag must be used within a BagProvider');
  }
  return context;
}
