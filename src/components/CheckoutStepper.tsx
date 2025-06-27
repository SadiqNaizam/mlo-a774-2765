import React from 'react';
import { Truck, CreditCard, PartyPopper, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckoutStepperProps {
  /** The current active step, 1-indexed. */
  currentStep: number;
}

const steps = [
  { name: 'Shipping', icon: <Truck className="h-5 w-5 sm:h-6 sm:w-6" /> },
  { name: 'Payment', icon: <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" /> },
  { name: 'Confirmation', icon: <PartyPopper className="h-5 w-5 sm:h-6 sm:w-6" /> },
];

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ currentStep }) => {
  console.log('CheckoutStepper loaded, current step:', currentStep);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-4">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={step.name}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 sm:w-12 sm:w-12 rounded-full border-2 transition-all duration-300',
                    isCompleted ? 'bg-blue-600 border-blue-600 text-white' : '',
                    isActive ? 'border-blue-600 bg-blue-100 text-blue-600' : '',
                    !isCompleted && !isActive ? 'border-gray-300 bg-gray-50 text-gray-400' : ''
                  )}
                >
                  {isCompleted ? <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" /> : step.icon}
                </div>
                <p
                  className={cn(
                    'mt-2 text-xs sm:text-sm font-medium transition-colors duration-300',
                    isCompleted || isActive ? 'text-gray-800' : 'text-gray-500'
                  )}
                >
                  {step.name}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-auto border-t-2 transition-colors duration-500 mx-2 sm:mx-4',
                    isCompleted ? 'border-blue-600' : 'border-gray-300'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutStepper;