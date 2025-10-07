"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  AlertCircle,
  Star,
  Crown,
  Zap,
  Heart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Membership {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  duration: number;
  durationUnit: string;
  benefits: string[];
  isPopular?: boolean;
}

interface PaymentData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface EnhancedMembershipPaymentProps {
  membership: Membership;
  onSuccess: (membership: any) => void;
  onError: (error: string) => void;
  onClose: () => void;
}

export default function EnhancedMembershipPayment({ 
  membership, 
  onSuccess, 
  onError, 
  onClose 
}: EnhancedMembershipPaymentProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success' | 'error'>('details');
  const [processing, setProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Check if Razorpay is loaded
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const checkRazorpay = () => {
      if (window.Razorpay) {
        setRazorpayLoaded(true);
      } else {
        setTimeout(checkRazorpay, 100);
      }
    };
    checkRazorpay();
  }, []);

  const handlePurchase = async () => {
    if (!user) {
      onError('Please login to purchase a membership');
      return;
    }

    if (!razorpayLoaded) {
      onError('Payment system is loading. Please try again.');
      return;
    }

    try {
      setProcessing(true);
      setStep('processing');
      setError('');

      // Create membership order
      const response = await fetch('/api/memberships/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          packageId: membership._id,
          autoRenewal,
          notes
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to create membership order');
      }

      setPaymentData(result.data);

      // Initialize Razorpay payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: result.data.package.totalAmount * 100, // Convert to paise
        currency: 'INR',
        name: 'Enlive Salon',
        description: `Membership: ${membership.name}`,
        order_id: result.data.order.id,
        handler: async (response: any) => {
          try {
            await handlePaymentVerification(response);
          } catch (error: any) {
            setError('Payment verification failed. Please contact support.');
            setStep('error');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        notes: {
          membership: membership.name,
          packageId: membership._id,
          autoRenewal: autoRenewal.toString()
        },
        theme: {
          color: '#f59e0b'
        },
        modal: {
          ondismiss: () => {
            setStep('details');
            setProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', (response: any) => {
        setError('Payment failed. Please try again.');
        setStep('error');
        setProcessing(false);
      });

      razorpay.open();
      setStep('payment');

    } catch (error: any) {
      setError(error.message || 'Failed to initialize payment');
      setStep('error');
      setProcessing(false);
    }
  };

  const handlePaymentVerification = async (paymentResponse: PaymentData) => {
    try {
      const response = await fetch('/api/memberships/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(paymentResponse)
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Payment verification failed');
      }

      setStep('success');
      setTimeout(() => {
        onSuccess(result.data.membership);
      }, 2000);

    } catch (error: any) {
      throw error;
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium': return <Star className="w-5 h-5 text-yellow-500" />;
      case 'vip': return <Crown className="w-5 h-5 text-purple-500" />;
      case 'platinum': return <Zap className="w-5 h-5 text-blue-500" />;
      default: return <Heart className="w-5 h-5 text-pink-500" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'border-yellow-500 bg-yellow-50';
      case 'vip': return 'border-purple-500 bg-purple-50';
      case 'platinum': return 'border-blue-500 bg-blue-50';
      default: return 'border-pink-500 bg-pink-50';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Complete Your Membership</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 'details' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Membership Details */}
                <div className={`border-2 rounded-xl p-6 ${getTierColor('premium')}`}>
                  <div className="flex items-center gap-3 mb-4">
                    {getTierIcon('premium')}
                    <h3 className="text-xl font-bold text-gray-900">{membership.name}</h3>
                    {membership.isPopular && (
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{membership.description}</p>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-gray-900">₹{membership.discountedPrice}</span>
                    {membership.discountedPrice < membership.price && (
                      <>
                        <span className="text-lg text-gray-500 line-through">₹{membership.price}</span>
                        <span className="text-sm text-green-600 font-semibold">
                          ({membership.discountPercentage}% off)
                        </span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500">{membership.duration} {membership.durationUnit}</p>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {membership.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Auto-renewal */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="autoRenewal"
                    checked={autoRenewal}
                    onChange={(e) => setAutoRenewal(e.target.checked)}
                    className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label htmlFor="autoRenewal" className="text-sm text-gray-700">
                    Enable auto-renewal for continuous membership
                  </label>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Any special requests or notes..."
                  />
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePurchase}
                  disabled={!razorpayLoaded}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {!razorpayLoaded ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading Payment System...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Proceed to Payment - ₹{membership.discountedPrice}
                    </div>
                  )}
                </button>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Order</h3>
                <p className="text-gray-600">Please wait while we prepare your membership...</p>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Window Opened</h3>
                <p className="text-gray-600">Complete your payment in the Razorpay window.</p>
                <p className="text-sm text-gray-500 mt-2">
                  If the payment window didn't open, please check your popup blocker settings.
                </p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-600 mb-4">Your membership has been activated successfully.</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    You can now enjoy all the benefits of your {membership.name} membership.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setStep('details');
                      setError('');
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
