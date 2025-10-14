"use client";

import { motion } from "framer-motion";
import { CheckCircle, Crown, Sparkles, ArrowRight, Calendar, Gift } from "lucide-react";
import { useRouter } from "next/navigation";

interface ThankYouDialogProps {
  isOpen: boolean;
  onClose: () => void;
  membership: {
    name: string;
    description: string;
    formattedDuration: string;
    benefits: string[];
    discountedPrice: number;
  };
}

export default function ThankYouDialog({ isOpen, onClose, membership }: ThankYouDialogProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleViewMemberships = () => {
    onClose();
    router.push('/my-memberships');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.5, type: "spring", damping: 20 }}
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl mx-4"
      >
        {/* Success Animation */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="relative mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/25">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center"
            >
              <Crown className="w-3 h-3 text-white" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Welcome to Enlive!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base text-gray-600 mb-4"
          >
            Thank you for purchasing your membership. You're now part of our premium family!
          </motion.p>
        </div>

        {/* Membership Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 mb-4 border border-amber-200"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{membership.name}</h3>
              <p className="text-gray-600 text-xs">{membership.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-white/60 rounded-lg p-2 text-center">
              <Calendar className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <div className="text-xs font-semibold text-gray-900">{membership.formattedDuration}</div>
              <div className="text-xs text-gray-600">Duration</div>
            </div>
            <div className="bg-white/60 rounded-lg p-2 text-center">
              <Gift className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <div className="text-xs font-semibold text-gray-900">₹{membership.discountedPrice}</div>
              <div className="text-xs text-gray-600">Paid</div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-gray-800 mb-1">Your benefits include:</h4>
            {membership.benefits.slice(0, 2).map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-2 h-2 text-white" />
                </div>
                <span className="text-xs text-gray-700">{benefit}</span>
              </motion.div>
            ))}
            {membership.benefits.length > 2 && (
              <p className="text-xs text-gray-500 ml-5">
                +{membership.benefits.length - 2} more exclusive benefits
              </p>
            )}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 mb-4 border border-blue-200"
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-semibold text-gray-900">What's Next?</h4>
          </div>
          <p className="text-xs text-gray-600">
            Your membership is now active! You can start booking appointments and enjoying your exclusive benefits immediately.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-2"
        >
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            Close
          </button>
          <button
            onClick={handleViewMemberships}
            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 text-sm"
          >
            View My Memberships
            <ArrowRight className="w-3 h-3" />
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-3 right-3 opacity-20">
          <Sparkles className="w-4 h-4 text-amber-500" />
        </div>
        <div className="absolute bottom-3 left-3 opacity-20">
          <Crown className="w-4 h-4 text-amber-500" />
        </div>
      </motion.div>
    </div>
  );
}
