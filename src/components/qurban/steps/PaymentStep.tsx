import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Loader2, Wallet, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useState, useEffect, useCallback } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { parseEther, parseUnits } from 'viem';
import { LISK_SEPOLIA_CHAIN } from '@/config/chains';
import { USDT_ABI, USDC_ABI } from '@/config/contracts';
import { usePayment } from '@/contexts/PaymentContext';
import useCurrencyConversion from '@/hooks/useCurrencyConversion';

// Token information for display
const TOKENS = {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    icon: '💵',
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    icon: '💠',
  },
} as const;

interface PaymentStepProps {
  amount: number; // Amount in IDR
  recipientData: {
    name: string;
    email: string;
    dedication?: string;
    message?: string;
  };
  onComplete: (txHash: string) => void;
}

// Token contract addresses on Lisk Sepolia (replace with actual addresses)
const TOKEN_ADDRESSES = {
  USDT: '0x1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f',
  USDC: '0x2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f',
} as const;

// Treasury address that will receive the funds
const TREASURY_ADDRESS = '0x1234567890123456789012345678901234567890';

// Conversion rate (for demo purposes, in a real app this should come from an oracle)
const IDR_TO_USD_RATE = 0.000064; // 1 IDR = 0.000064 USD

const PaymentStep = ({ amount, recipientData, onComplete }: PaymentStepProps) => {
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  // Initialize payment context
  const { 
    selectedToken, 
    setSelectedToken, 
    isApproving, 
    isApproved, 
    isProcessing: isPaymentProcessing, 
    error: paymentError,
    approveToken,
    processPayment,
    resetPayment,
  } = usePayment();
  
  // Initialize currency conversion
  const {
    tokenAmount,
    tokenSymbol,
    rate,
    isLoading: isRateLoading,
    error: rateError,
    convertToIDR,
  } = useCurrencyConversion(amount, selectedToken);
  
  // Check if connected to Lisk Sepolia
  const isCorrectChain = chainId === LISK_SEPOLIA_CHAIN.id;
  
  // Handle token approval
  const handleApprove = useCallback(async () => {
    try {
      setError(null);
      await approveToken(TOKEN_ADDRESSES[selectedToken], tokenAmount);
    } catch (err) {
      console.error('Approval failed:', err);
      setError('Failed to approve token. Please try again.');
    }
  }, [selectedToken, tokenAmount, approveToken]);
  
  // Handle payment submission
  const handleSubmit = useCallback(async () => {
    if (!isApproved) {
      await handleApprove();
      return;
    }
    
    try {
      setIsProcessing(true);
      setError(null);
      
      // Process the payment
      const txHash = await processPayment(
        TOKEN_ADDRESSES[selectedToken],
        tokenAmount,
        {
          ...recipientData,
          amountInToken: tokenAmount,
          tokenSymbol: selectedToken,
          amountInIDR: amount,
        }
      );
      
      // Notify parent component of successful payment
      onComplete(txHash);
    } catch (err) {
      console.error('Payment failed:', err);
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [isApproved, selectedToken, tokenAmount, amount, recipientData, handleApprove, processPayment, onComplete]);
  
  // Switch to Lisk Sepolia if needed
  const handleSwitchNetwork = useCallback(() => {
    if (switchChain) {
      switchChain({ chainId: LISK_SEPOLIA_CHAIN.id });
    }
  }, [switchChain]);
  
  // Reset payment state when component unmounts
  useEffect(() => {
    return () => {
      resetPayment();
    };
  }, [resetPayment]);
  
  // Display any errors from the payment context
  useEffect(() => {
    if (paymentError) {
      setError(paymentError);
    }
  }, [paymentError]);
  
  // Display rate loading state
  if (isRateLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-trust animate-spin mb-4" />
        <p className="text-text-secondary">Loading exchange rates...</p>
      </div>
    );
  }
  
  // Display rate error
  if (rateError) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500 text-center">
        <AlertCircle className="w-6 h-6 mx-auto mb-2" />
        <p className="font-medium">Error loading exchange rates</p>
        <p className="text-sm">{rateError}</p>
      </div>
    );
  }

  // Network switch prompt
  if (!isCorrectChain) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
          <Wallet className="w-8 h-8 text-trust" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Switch to Lisk Sepolia</h2>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Please switch to the Lisk Sepolia network to proceed with your donation using {selectedToken}.
        </p>
        <button
          onClick={handleSwitchNetwork}
          className="px-6 py-3 bg-trust text-primary font-medium rounded-lg hover:bg-trust/90 transition-colors flex items-center mx-auto"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Switch to Lisk Sepolia
        </button>
        
        {error && (
          <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Complete Your Donation</h2>
        <p className="text-text-secondary">Pay with {selectedToken} on Lisk Sepolia</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-primary/30 backdrop-blur-sm rounded-xl border border-accent/10 p-6">
            <h3 className="font-semibold mb-4">Payment Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Pay with</label>
                <div className="relative">
                  <button
                    onClick={() => setIsTokenDropdownOpen(!isTokenDropdownOpen)}
                    className="w-full flex items-center justify-between p-3 border border-accent/20 rounded-lg hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                        {TOKENS[selectedToken].icon}
                      </div>
                      <span>{selectedToken}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${isTokenDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isTokenDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 mt-1 w-full bg-primary border border-accent/20 rounded-lg shadow-lg overflow-hidden"
                      >
                        {Object.entries(TOKENS).map(([symbol, token]) => (
                          <button
                            key={symbol}
                            onClick={() => {
                              setSelectedToken(symbol as 'USDT' | 'USDC');
                              setIsTokenDropdownOpen(false);
                            }}
                            className={`w-full flex items-center p-3 text-left hover:bg-accent/5 transition-colors ${
                              selectedToken === symbol ? 'bg-accent/10' : ''
                            }`}
                          >
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                              {token.icon}
                            </div>
                            <div>
                              <div className="font-medium">{symbol}</div>
                              <div className="text-xs text-text-secondary">{token.name}</div>
                            </div>
                            {selectedToken === symbol && (
                              <Check className="w-4 h-4 ml-auto text-trust" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">Amount to pay</label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={`${tokenAmount} ${selectedToken}`}
                    className="w-full p-3 pr-24 border border-accent/20 bg-primary/30 rounded-lg"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary">
                    ≈ {formatCurrency(amount, 'IDR')}
                  </div>
                </div>
                <p className="mt-1 text-xs text-text-secondary">
                  1 {selectedToken} ≈ {Math.round(1 / IDR_TO_USD_RATE).toLocaleString()} IDR
                </p>
              </div>
            </div>
          </div>

          <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
            <h4 className="font-medium mb-2">How it works</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-trust/10 text-trust text-xs flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">1</div>
                <span>Approve {selectedToken} spending (one-time per token)</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-trust/10 text-trust text-xs flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">2</div>
                <span>Confirm the transaction in your wallet</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-trust/10 text-trust text-xs flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">3</div>
                <span>Receive your Qurban NFT certificate</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-primary/30 backdrop-blur-sm rounded-xl border border-accent/10 p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-text-secondary">Qurban Donation</span>
              <span>{formatCurrency(amount, 'IDR')}</span>
            </div>
            
            <div className="border-t border-accent/10 pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span className="text-lg text-trust">{tokenAmount} {selectedToken}</span>
              </div>
              <p className="text-right text-sm text-text-secondary">
                ≈ {formatCurrency(amount, 'IDR')}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {!isApproved ? (
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="w-full py-3 px-4 bg-trust text-primary font-medium rounded-lg hover:bg-trust/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isApproving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Approving...
                  </>
                ) : (
                  `Approve ${selectedToken} Spending`
                )}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isProcessing || isPaymentProcessing}
                className="w-full py-3 px-4 bg-trust text-primary font-medium rounded-lg hover:bg-trust/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {(isProcessing || isPaymentProcessing) ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Donation
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
            
            <p className="text-xs text-text-secondary text-center">
              By completing your donation, you agree to our{' '}
              <a href="#" className="text-trust hover:underline">Terms</a> and{' '}
              <a href="#" className="text-trust hover:underline">Privacy Policy</a>.
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;