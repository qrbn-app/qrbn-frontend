import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useAccount, useChainId, useWalletClient } from 'wagmi';
import { LISK_SEPOLIA_CHAIN } from '@/config/chains';
import { parseUnits } from 'viem';

type PaymentToken = 'USDT' | 'USDC';

interface PaymentContextType {
  selectedToken: PaymentToken;
  setSelectedToken: (token: PaymentToken) => void;
  isApproving: boolean;
  isApproved: boolean;
  isProcessing: boolean;
  error: string | null;
  approveToken: (tokenAddress: string, amount: string) => Promise<void>;
  processPayment: (tokenAddress: string, amount: string, recipientData: any) => Promise<string>;
  resetPayment: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Mock function to simulate token approval
const mockApproveToken = async (tokenAddress: string, amount: string) => {
  console.log(`Mock approving ${amount} of token ${tokenAddress}`);
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Approval successful');
      resolve();
    }, 1500);
  });
};

// Mock function to simulate payment processing
const mockProcessPayment = async (tokenAddress: string, amount: string, recipientData: any) => {
  console.log(`Mock processing payment of ${amount} ${tokenAddress}`, recipientData);
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`;
      console.log('Payment successful, tx:', mockTxHash);
      resolve(mockTxHash);
    }, 2000);
  });
};

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [selectedToken, setSelectedToken] = useState<PaymentToken>('USDT');
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();

  const resetPayment = useCallback(() => {
    setIsApproving(false);
    setIsApproved(false);
    setIsProcessing(false);
    setError(null);
  }, []);

  const approveToken = useCallback(async (tokenAddress: string, amount: string) => {
    if (!isConnected || !address) {
      setError('Please connect your wallet');
      return;
    }

    if (chainId !== LISK_SEPOLIA_CHAIN.id) {
      setError(`Please switch to ${LISK_SEPOLIA_CHAIN.name}`);
      return;
    }

    if (!walletClient) {
      setError('Wallet client not available');
      return;
    }

    try {
      setIsApproving(true);
      setError(null);
      
      // In a real implementation, we would use the actual contract interaction
      // Example of how you would do it with viem:
      /*
      const hash = await walletClient.writeContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [TREASURY_ADDRESS, parseUnits(amount, 6)], // Adjust decimals as needed
      });
      */
      
      await mockApproveToken(tokenAddress, amount);
      
      setIsApproved(true);
    } catch (err) {
      console.error('Token approval failed:', err);
      setError('Failed to approve token. Please try again.');
      throw err;
    } finally {
      setIsApproving(false);
    }
  }, [address, chainId, walletClient, isConnected]);

  const processPayment = useCallback(async (
    tokenAddress: string, 
    amount: string, 
    recipientData: any
  ): Promise<string> => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet');
    }

    if (chainId !== LISK_SEPOLIA_CHAIN.id) {
      throw new Error(`Please switch to ${LISK_SEPOLIA_CHAIN.name}`);
    }

    if (!walletClient) {
      throw new Error('Wallet client not available');
    }

    if (!isApproved) {
      throw new Error('Token not approved. Please approve the token first.');
    }

    try {
      setIsProcessing(true);
      setError(null);
      
      // In a real implementation, we would use the actual contract interaction
      // Example of how you would do it with viem:
      /*
      const hash = await walletClient.writeContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [TREASURY_ADDRESS, parseUnits(amount, 6)], // Adjust decimals as needed
      });
      */
      
      const txHash = await mockProcessPayment(tokenAddress, amount, recipientData);
      
      return txHash;
    } catch (err) {
      console.error('Payment processing failed:', err);
      setError('Payment failed. Please try again.');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [address, chainId, isApproved, walletClient, isConnected]);

  return (
    <PaymentContext.Provider
      value={{
        selectedToken,
        setSelectedToken,
        isApproving,
        isApproved,
        isProcessing,
        error,
        approveToken,
        processPayment,
        resetPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};