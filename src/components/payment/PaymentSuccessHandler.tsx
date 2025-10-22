'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface PaymentSuccessHandlerProps {
  onViewAppointment?: (appointmentId: string) => void;
}

const PaymentSuccessHandler: React.FC<PaymentSuccessHandlerProps> = ({ 
  onViewAppointment 
}) => {
  const router = useRouter();

  const handleViewAppointments = () => {
    router.push('/appointments');
  };

  const handleContinueShopping = () => {
    router.push('/services');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Payment Successful!
          </h2>
          
          <p className="text-gray-600 mb-4">
            Your payment has been processed successfully. Your appointment is now confirmed.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleViewAppointments}
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
            >
              View My Appointments
            </button>
            
            <button
              onClick={handleContinueShopping}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Browse More Services
            </button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>You will receive an email confirmation shortly.</p>
            <p className="mt-1">
              Thank you for choosing Enlive Salon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessHandler;