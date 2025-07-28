import { useEffect, useState, useCallback } from 'react';
import { useChainId } from 'wagmi';
import { LISK_SEPOLIA_CHAIN } from '@/config/chains';

// Default exchange rates (1 USD = X IDR)
const DEFAULT_RATES = {
  USDT: 15500, // 1 USDT = 15,500 IDR
  USDC: 15500, // 1 USDC = 15,500 IDR
};

interface CurrencyConversion {
  idrAmount: number;
  tokenAmount: string;
  tokenSymbol: string;
  rate: number;
  isLoading: boolean;
  error: string | null;
  convertToToken: (amount: number, token: 'USDT' | 'USDC') => string;
  convertToIDR: (amount: string, token: 'USDT' | 'USDC') => number;
}

export const useCurrencyConversion = (
  initialAmount: number = 0, 
  initialToken: 'USDT' | 'USDC' = 'USDT'
): CurrencyConversion => {
  const [idrAmount, setIdrAmount] = useState(initialAmount);
  const [tokenAmount, setTokenAmount] = useState('0');
  const [tokenSymbol, setTokenSymbol] = useState(initialToken);
  const [rate, setRate] = useState(DEFAULT_RATES[initialToken]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chainId = useChainId();

  // In a real app, this would fetch from an oracle or API
  const fetchExchangeRate = useCallback(async (token: 'USDT' | 'USDC') => {
    if (chainId !== LISK_SEPOLIA_CHAIN.id) {
      // Use default rate if not on Lisk Sepolia
      return DEFAULT_RATES[token];
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual oracle call
      // const response = await fetch('https://api.oracle.com/rates/USD-IDR');
      // const data = await response.json();
      // return data.rate;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, use default rate
      return DEFAULT_RATES[token];
    } catch (err) {
      console.error('Failed to fetch exchange rate:', err);
      setError('Failed to fetch exchange rate. Using default rate.');
      return DEFAULT_RATES[token];
    } finally {
      setIsLoading(false);
    }
  }, [chainId]);

  // Convert IDR to token amount
  const convertToToken = useCallback((
    amount: number, 
    token: 'USDT' | 'USDC' = tokenSymbol as 'USDT' | 'USDC'
  ): string => {
    const currentRate = token === 'USDT' ? DEFAULT_RATES.USDT : DEFAULT_RATES.USDC;
    const tokenValue = amount / currentRate;
    return tokenValue.toFixed(6); // 6 decimal places for USDT/USDC
  }, [tokenSymbol]);

  // Convert token amount to IDR
  const convertToIDR = useCallback((
    amount: string, 
    token: 'USDT' | 'USDC' = tokenSymbol as 'USDT' | 'USDC'
  ): number => {
    const currentRate = token === 'USDT' ? DEFAULT_RATES.USDT : DEFAULT_RATES.USDC;
    const tokenValue = parseFloat(amount) || 0;
    return tokenValue * currentRate;
  }, [tokenSymbol]);

  // Update token amount when IDR amount or token changes
  useEffect(() => {
    setTokenAmount(convertToToken(idrAmount, tokenSymbol as 'USDT' | 'USDC'));
  }, [idrAmount, tokenSymbol, convertToToken]);

  // Update exchange rate when token changes
  useEffect(() => {
    const updateRate = async () => {
      const newRate = await fetchExchangeRate(tokenSymbol as 'USDT' | 'USDC');
      setRate(newRate);
    };
    
    updateRate();
  }, [tokenSymbol, fetchExchangeRate]);

  // Update IDR amount when initialAmount changes
  useEffect(() => {
    setIdrAmount(initialAmount);
  }, [initialAmount]);

  // Update token symbol when initialToken changes
  useEffect(() => {
    setTokenSymbol(initialToken);
  }, [initialToken]);

  return {
    idrAmount,
    tokenAmount,
    tokenSymbol: tokenSymbol as 'USDT' | 'USDC',
    rate,
    isLoading,
    error,
    convertToToken,
    convertToIDR,
  };
};

export default useCurrencyConversion;