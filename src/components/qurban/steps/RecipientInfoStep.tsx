import { motion } from 'framer-motion';
import { User, Mail, Phone, Gift, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface RecipientInfoStepProps {
  recipient: {
    name: string;
    email: string;
    phone: string;
    dedication: string;
    message: string;
  };
  onUpdateRecipient: (updates: Partial<{
    name: string;
    email: string;
    phone: string;
    dedication: string;
    message: string;
  }>) => void;
}

const RecipientInfoStep = ({ recipient, onUpdateRecender }: RecipientInfoStepProps) => {
  const [isDedicationChecked, setIsDedicationChecked] = useState(!!recipient.dedication);

  const handleDedicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsDedicationChecked(checked);
    if (!checked) {
      onUpdateRecender({ dedication: '' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Recipient Information</h2>
        <p className="text-text-secondary">
          Provide details for the Qurban certificate and updates
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-accent/50" />
            </div>
            <input
              type="text"
              id="name"
              value={recipient.name}
              onChange={(e) => onUpdateRecender({ name: e.target.value })}
              className="block w-full pl-10 pr-3 py-3 border border-accent/20 bg-primary/30 rounded-lg focus:ring-2 focus:ring-trust/50 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-accent/50" />
              </div>
              <input
                type="email"
                id="email"
                value={recipient.email}
                onChange={(e) => onUpdateRecender({ email: e.target.value })}
                className="block w-full pl-10 pr-3 py-3 border border-accent/20 bg-primary/30 rounded-lg focus:ring-2 focus:ring-trust/50 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-accent/50" />
              </div>
              <input
                type="tel"
                id="phone"
                value={recipient.phone}
                onChange={(e) => onUpdateRecender({ phone: e.target.value })}
                className="block w-full pl-10 pr-3 py-3 border border-accent/20 bg-primary/30 rounded-lg focus:ring-2 focus:ring-trust/50 focus:border-transparent"
                placeholder="+62 812-3456-7890"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="isDedication"
              checked={isDedicationChecked}
              onChange={handleDedicationChange}
              className="h-4 w-4 text-trust focus:ring-trust/50 border-accent/20 rounded"
            />
            <label htmlFor="isDedication" className="ml-2 block text-sm text-text-secondary">
              This is a dedication (Sadaqah Jariyah)
            </label>
          </div>

          {isDedicationChecked && (
            <div className="mb-6">
              <label htmlFor="dedication" className="block text-sm font-medium text-text-secondary mb-1">
                Dedication Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Gift className="h-5 w-5 text-accent/50" />
                </div>
                <input
                  type="text"
                  id="dedication"
                  value={recipient.dedication}
                  onChange={(e) => onUpdateRecender({ dedication: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border border-accent/20 bg-primary/30 rounded-lg focus:ring-2 focus:ring-trust/50 focus:border-transparent"
                  placeholder="In memory of..."
                  required={isDedicationChecked}
                />
              </div>
              <p className="mt-1 text-xs text-text-secondary">
                This name will appear on the certificate
              </p>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">
            Personal Message (Optional)
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3">
              <MessageSquare className="h-5 w-5 text-accent/50" />
            </div>
            <textarea
              id="message"
              rows={4}
              value={recipient.message}
              onChange={(e) => onUpdateRecender({ message: e.target.value })}
              className="block w-full pl-10 pr-3 py-3 border border-accent/20 bg-primary/30 rounded-lg focus:ring-2 focus:ring-trust/50 focus:border-transparent"
              placeholder="Add a personal message for the recipient..."
            />
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Your message will be included with the Qurban certificate
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-accent/5 rounded-lg border border-accent/10">
        <h4 className="font-semibold mb-2">Your Privacy Matters</h4>
        <p className="text-sm text-text-secondary">
          We respect your privacy. Your information will only be used to process your Qurban 
          donation and send you updates. We will never share your details with third parties 
          without your permission.
        </p>
      </div>
    </div>
  );
};

export default RecipientInfoStep;
