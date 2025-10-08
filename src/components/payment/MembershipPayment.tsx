"use client";

import { useState } from 'react';
import { Loader2, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { membershipAPI } from '@/lib/api';

interface MembershipPaymentProps {
  membership: any;
  onSuccess: (membership: any) => void;
  onError: (error: string) => void;
  onClose: () => void;
}

export default function MembershipPayment({ 
  membership, 
  onSuccess, 
  onError, 
  onClose 
}: MembershipPaymentProps) {
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const handlePayment = async () => {
    if (!user) {
      onError('Please login to purchase a membership');
      return;
    }

    try {
      setProcessing(true);

      // First, create the membership order with the backend
      const result = await membershipAPI.purchase(membership._id, '', false);
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to create membership order');
      }

      const { membership: membershipData, order } = result.data;

      // Initialize Razorpay with the order from backend
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Enlive Salon',
        description: `Membership: ${membership.name}`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            // Verify payment with backend
            const verifyResult = await membershipAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            
            if (verifyResult.success) {
              onSuccess(verifyResult.data.membership);
            } else {
              console.error('Payment verification failed:', verifyResult);
              onError(verifyResult.message || 'Payment verification failed');
            }
          } catch (error: any) {
            onError('Payment verification failed. Please contact support.');
            console.error('Payment verification error:', error);
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        notes: {
          membership: membership.name,
          packageId: membership._id
        },
        theme: {
          color: '#f59e0b' // Yellow theme to match the site
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.on('payment.failed', (response: any) => {
        onError('Payment failed. Please try again.');
        console.error('Payment failed:', response);
      });
      
      razorpay.open();
    } catch (error: any) {
      onError(error.message || 'Failed to initialize payment');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Complete Payment</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Membership Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">{membership.name}</h4>
          <p className="text-sm text-gray-600 mb-3">{membership.description}</p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{membership.formattedDuration}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Amount</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{membership.discountedPrice}
                </span>
                {membership.discountedPrice < membership.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{membership.price}
                    </span>
                    <span className="text-sm text-green-600 font-semibold">
                      ({membership.discountPercentage}% off)
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Method
          </label>
          <div className="space-y-2">
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <CreditCard className="w-5 h-5 mr-3 text-gray-500" />
              <span className="text-sm font-medium">Razorpay (Cards, UPI, Net Banking)</span>
            </label>
          </div>
        </div>

        {/* Benefits Preview */}
        {membership.benefits && membership.benefits.length > 0 && (
          <div className="mb-6">
            <h5 className="text-sm font-medium text-gray-700 mb-2">What you'll get:</h5>
            <ul className="space-y-1">
              {membership.benefits.slice(0, 3).map((benefit: string, index: number) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
              {membership.benefits.length > 3 && (
                <li className="text-sm text-gray-500 ml-6">
                  +{membership.benefits.length - 3} more benefits
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={processing}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              `Pay ₹${membership.discountedPrice}`
            )}
          </button>
        </div>

        {/* Security Notice */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Your payment is secure and encrypted. We use Razorpay for payment processing.
        </p>
      </div>
    </div>
  );
}
