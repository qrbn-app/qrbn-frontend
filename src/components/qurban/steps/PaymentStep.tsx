import { motion } from 'framer-motion';
import { CreditCard, Wallet, Bank, QrCode, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  fees: number;
}

interface PaymentStepProps {
  amount: number;
  selectedMethod: string;
  onSelectMethod: (methodId: string) => void;
}

const PaymentStep = ({ amount, selectedMethod, onSelectMethod }: PaymentStepProps) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-5 h-5" />,
      fees: 2.5,
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: <Bank className="w-5 h-5" />,
      fees: 0,
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      icon: <Wallet className="w-5 h-5" />,
      fees: 1.5,
    },
    {
      id: 'crypto',
      name: 'Crypto',
      icon: <QrCode className="w-5 h-5" />,
      fees: 0.5,
    },
  ];

  const selectedPayment = paymentMethods.find(m => m.id === selectedMethod);
  const feeAmount = (amount * (selectedPayment?.fees || 0)) / 100;
  const total = amount + feeAmount;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Payment Method</h2>
        <p className="text-text-secondary">Complete your Qurban donation</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Select Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <motion.button
                key={method.id}
                whileHover={{ x: 2 }}
                onClick={() => onSelectMethod(method.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedMethod === method.id
                    ? 'border-trust bg-trust/5'
                    : 'border-accent/20 hover:border-accent/40'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                    {method.icon}
                  </div>
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-text-secondary">
                      {method.fees > 0 ? `${method.fees}% fee` : 'No fees'}
                    </div>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="ml-auto text-trust">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="bg-primary/30 backdrop-blur-sm rounded-xl border border-accent/10 p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-text-secondary">Qurban Donation</span>
              <span>{formatCurrency(amount, 'IDR')}</span>
            </div>
            
            {feeAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Processing Fee</span>
                <span>+{formatCurrency(feeAmount, 'IDR')}</span>
              </div>
            )}
            
            <div className="border-t border-accent/10 pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span className="text-lg text-trust">{formatCurrency(total, 'IDR')}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              className="w-full py-3 px-4 bg-trust text-primary font-medium rounded-lg hover:bg-trust/90 transition-colors"
              onClick={() => {}}
            >
              Complete Donation
            </button>
            
            <p className="text-xs text-text-secondary text-center">
              By completing your donation, you agree to our{' '}
              <a href="#" className="text-trust hover:underline">Terms</a> and{' '}
              <a href="#" className="text-trust hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
