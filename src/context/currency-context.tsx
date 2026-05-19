"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'BTC' | 'USDT';

interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // Rate relative to USD
}

export const SUPPORTED_CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.78 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.5 },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 },
  BTC: { code: 'BTC', symbol: '₿', name: 'Bitcoin', rate: 0.000015 },
  USDT: { code: 'USDT', symbol: '₮', name: 'Tether', rate: 1.0 },
};

interface CurrencyContextType {
  selectedCurrency: Currency;
  setCurrency: (code: CurrencyCode) => void;
  convert: (amount: number, from?: CurrencyCode) => number;
  format: (amount: number, code?: CurrencyCode) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(SUPPORTED_CURRENCIES.USD);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Automatic country/currency detection based on locale
    const locale = navigator.language;
    let initialCurrency = SUPPORTED_CURRENCIES.USD;

    if (locale.includes('IN')) initialCurrency = SUPPORTED_CURRENCIES.INR;
    else if (locale.includes('GB')) initialCurrency = SUPPORTED_CURRENCIES.GBP;
    else if (locale.includes('AE')) initialCurrency = SUPPORTED_CURRENCIES.AED;
    else if (locale.includes('EU') || ['de', 'fr', 'it', 'es'].some(l => locale.startsWith(l))) 
      initialCurrency = SUPPORTED_CURRENCIES.EUR;
    
    // Check local storage for preference
    const saved = localStorage.getItem('user-currency') as CurrencyCode;
    if (saved && SUPPORTED_CURRENCIES[saved]) {
      initialCurrency = SUPPORTED_CURRENCIES[saved];
    }

    setSelectedCurrency(initialCurrency);
    setIsHydrated(true);
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    const currency = SUPPORTED_CURRENCIES[code];
    if (currency) {
      setSelectedCurrency(currency);
      localStorage.setItem('user-currency', code);
    }
  }, []);

  const convert = useCallback((amount: number, from: CurrencyCode = 'USD'): number => {
    const fromRate = SUPPORTED_CURRENCIES[from].rate;
    const toRate = selectedCurrency.rate;
    return (amount / fromRate) * toRate;
  }, [selectedCurrency]);

  const format = useCallback((amount: number, code?: CurrencyCode): string => {
    // Prevent hydration mismatch by using a stable state until hydrated
    if (!isHydrated && !code) return `...`;

    const currency = code ? SUPPORTED_CURRENCIES[code] : selectedCurrency;
    const converted = code ? amount : convert(amount);
    
    if (currency.code === 'BTC') {
      return `${currency.symbol}${converted.toFixed(6)}`;
    }
    
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.code === 'USDT' ? 'USD' : currency.code,
      currencyDisplay: 'narrowSymbol',
    }).format(converted).replace('US$', '₮').replace('$', currency.symbol);
  }, [selectedCurrency, convert, isHydrated]);

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setCurrency, convert, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}