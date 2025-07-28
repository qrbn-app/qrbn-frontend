'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, Check, Gift, Heart, ShieldCheck } from 'lucide-react';

// Step components
import QurbanTypeStep from './steps/QurbanTypeStep';
import AnimalSelectionStep from './steps/AnimalSelectionStep';
import RecipientInfoStep from './steps/RecipientInfoStep';
import PaymentStep from './steps/PaymentStep';
import ConfirmationStep from './steps/ConfirmationStep';

type Step = {
  id: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 'type',
    title: 'Qurban Type',
    description: 'Choose your Qurban type',
  },
  {
    id: 'animal',
    title: 'Animal Selection',
    description: 'Select your preferred animal',
  },
  {
    id: 'recipient',
    title: 'Recipient Info',
    description: 'Provide recipient details',
  },
  {
    id: 'payment',
    title: 'Payment',
    description: 'Complete your donation',
  },
  {
    id: 'confirmation',
    title: 'Confirmation',
    description: 'Your Qurban is confirmed!',
  },
];

const QurbanStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    qurbanType: '',
    animal: null as any,
    recipient: {
      name: '',
      email: '',
      phone: '',
      dedication: '',
      message: '',
    },
    paymentMethod: '',
  });

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const isStepComplete = (stepIndex: number) => completedSteps.includes(stepIndex);

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => {
        const nextStep = prev + 1;
        if (!completedSteps.includes(prev)) {
          setCompletedSteps([...completedSteps, prev]);
        }
        return nextStep;
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <QurbanTypeStep
            selectedType={formData.qurbanType}
            onSelectType={(type) => updateFormData('qurbanType', type)}
          />
        );
      case 1:
        return (
          <AnimalSelectionStep
            selectedAnimal={formData.animal}
            onSelectAnimal={(animal) => updateFormData('animal', animal)}
            qurbanType={formData.qurbanType}
          />
        );
      case 2:
        return (
          <RecipientInfoStep
            recipient={formData.recipient}
            onUpdateRecipient={(updates) =>
              updateFormData('recipient', { ...formData.recipient, ...updates })
            }
          />
        );
      case 3:
        return (
          <PaymentStep
            selectedMethod={formData.paymentMethod}
            onSelectMethod={(method) => updateFormData('paymentMethod', method)}
            amount={formData.animal?.price || 0}
          />
        );
      case 4:
        return <ConfirmationStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-accent/10 -translate-y-1/2 -z-10"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-trust -translate-y-1/2 transition-all duration-300"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>
        <div className="flex justify-between relative">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = isStepComplete(index);
            const isClickable = isCompleted || index === currentStep;
            
            return (
              <button
                key={step.id}
                onClick={() => isClickable && setCurrentStep(index)}
                className={`flex flex-col items-center group ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-trust text-primary scale-110'
                      : isCompleted
                      ? 'bg-trust/20 text-trust scale-100'
                      : 'bg-accent/10 text-text-secondary scale-100'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="font-medium">{index + 1}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium text-center ${
                    isActive || isCompleted ? 'text-trust' : 'text-text-secondary'
                  }`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px] py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {!isLastStep && (
        <div className="flex justify-between pt-6 border-t border-accent/10">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
          
          <Button
            onClick={nextStep}
            rightIcon={
              isLastStep ? (
                <Gift className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )
            }
            disabled={
              (currentStep === 0 && !formData.qurbanType) ||
              (currentStep === 1 && !formData.animal) ||
              (currentStep === 2 && !formData.recipient.name) ||
              (currentStep === 3 && !formData.paymentMethod)
            }
          >
            {isLastStep ? 'Complete Donation' : 'Continue'}
          </Button>
        </div>
      )}

      {/* Trust Badges */}
      {currentStep < steps.length - 1 && (
        <div className="mt-8 pt-6 border-t border-accent/10 flex flex-wrap items-center justify-center gap-4 text-text-secondary text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-trust" />
            <span>Shariah Compliant</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-accent/20"></div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-trust" />
            <span>100% Donation Policy</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-accent/20"></div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-trust" />
            <span>NFT Certificate</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QurbanStepper;
