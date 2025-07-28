import { motion } from 'framer-motion';
import { CheckCircle, Download, Share2, Clock, MapPin, Gift, MessageSquare } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ConfirmationStepProps {
  formData: {
    qurbanType: string;
    animal: {
      name: string;
      price: number;
      id: string;
    };
    recipient: {
      name: string;
      email: string;
      dedication?: string;
      message?: string;
    };
    paymentMethod: string;
  };
}

const ConfirmationStep = ({ formData }: ConfirmationStepProps) => {
  const getQurbanTypeName = (type: string) => {
    switch (type) {
      case 'goat':
        return 'Goat/Sheep';
      case 'cow':
        return 'Cow (1/7 Share)';
      case 'camel':
        return 'Camel (1/7 Share)';
      default:
        return 'Qurban';
    }
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'credit-card':
        return 'Credit/Debit Card';
      case 'bank-transfer':
        return 'Bank Transfer';
      case 'ewallet':
        return 'E-Wallet';
      case 'crypto':
        return 'Cryptocurrency';
      default:
        return method;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-trust/10 mb-4">
          <CheckCircle className="w-12 h-12 text-trust" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Donation Confirmed!</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Thank you for your Qurban donation. Your contribution will help provide food to those in need.
        </p>
      </div>

      <div className="bg-primary/30 backdrop-blur-sm rounded-xl border border-accent/10 overflow-hidden">
        <div className="p-6 border-b border-accent/10">
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-text-secondary mb-1">Order Number</div>
                <div className="font-mono">QRBN-{Date.now().toString().slice(-8)}</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">Date</div>
                <div>{new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">Payment Method</div>
                <div>{getPaymentMethodName(formData.paymentMethod)}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-text-secondary mb-1">Qurban Type</div>
                <div>{getQurbanTypeName(formData.qurbanType)}</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">Animal</div>
                <div>{formData.animal?.name || 'N/A'}</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">Amount</div>
                <div className="text-trust font-semibold">
                  {formatCurrency(formData.animal?.price || 0, 'IDR')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-accent/10">
          <h3 className="text-lg font-semibold mb-4">Recipient Information</h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-text-secondary mb-1">Name</div>
              <div>{formData.recipient.name}</div>
            </div>
            <div>
              <div className="text-sm text-text-secondary mb-1">Email</div>
              <div>{formData.recipient.email}</div>
            </div>
            {formData.recipient.dedication && (
              <div>
                <div className="text-sm text-text-secondary mb-1">Dedication</div>
                <div className="flex items-start">
                  <Gift className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-trust" />
                  <span>{formData.recipient.dedication}</span>
                </div>
              </div>
            )}
            {formData.recipient.message && (
              <div>
                <div className="text-sm text-text-secondary mb-1">Your Message</div>
                <div className="flex items-start">
                  <MessageSquare className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-trust" />
                  <span className="italic">"{formData.recipient.message}"</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">What Happens Next?</h3>
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 rounded-full bg-trust/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-trust" />
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Processing Your Donation</h4>
                <p className="text-sm text-text-secondary">
                  Your donation is being processed. You'll receive a confirmation email with all the details within a few minutes.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 rounded-full bg-trust/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-trust" />
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Qurban Execution</h4>
                <p className="text-sm text-text-secondary">
                  Your Qurban will be performed on the day of Eid al-Adha in accordance with Islamic guidelines. We'll send you updates and photos of the process.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 rounded-full bg-trust/10 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-trust" />
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Your NFT Certificate</h4>
                <p className="text-sm text-text-secondary mb-3">
                  Your Qurban NFT certificate will be minted on the blockchain and sent to your wallet address. This serves as proof of your donation.
                </p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <button className="inline-flex items-center px-4 py-2 bg-trust text-primary rounded-lg text-sm font-medium hover:bg-trust/90 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-accent/20 rounded-lg text-sm font-medium hover:bg-accent/5 transition-colors">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-text-secondary mb-6">
          Thank you for your generosity. May Allah accept your Qurban and reward you abundantly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="/" 
            className="px-6 py-3 bg-trust text-primary rounded-lg font-medium hover:bg-trust/90 transition-colors"
          >
            Back to Home
          </a>
          <a 
            href="/dashboard" 
            className="px-6 py-3 border border-accent/20 rounded-lg font-medium hover:bg-accent/5 transition-colors"
          >
            View Donation History
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
