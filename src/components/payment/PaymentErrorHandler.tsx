'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaymentErrorHandlerProps {
  onRetry?: () => void;
  onCancel?: () => void;
}

const PaymentErrorHandler: React.FC<PaymentErrorHandlerProps> = ({ 
  onRetry, 
  onCancel 
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    
    if (error === 'true' && message) {
      setErrorMessage(decodeURIComponent(message));
    }
  }, [searchParams]);

  const handleRetry = async () => {
    if (onRetry) {
      setIsRetrying(true);
      try {
        await onRetry();
      } catch (error) {
        console.error('Retry failed:', error);
      } finally {
        setIsRetrying(false);
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push('/services');
    }
  };

  const handleContactSupport = () => {
    // You can implement a support ticket system or redirect to contact page
    router.push('/contact');
  };

  if (!errorMessage) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Payment Failed
          </h2>
          
          <p className="text-gray-600 mb-6">
            {errorMessage}
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </button>
            
            <button
              onClick={handleCancel}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Back to Services
            </button>
            
            <button
              onClick={handleContactSupport}
              className="w-full text-pink-600 py-2 px-4 rounded-md hover:bg-pink-50 transition-colors"
            >
              Contact Support
            </button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>If the problem persists, please contact our support team.</p>
            <p className="mt-1">
              Reference: {new Date().toISOString().slice(0, 19)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentErrorHandler;
