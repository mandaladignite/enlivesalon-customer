"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Calendar, Clock, User, Scissors } from 'lucide-react';
import { appointmentAPI } from '@/lib/api';

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    _id: string;
    date: string;
    timeSlot: string;
    serviceId: {
      name: string;
      duration: number;
      price: number;
    };
    stylistId?: {
      name: string;
    };
    status: string;
  };
  onSuccess: () => void;
}

export default function CancelAppointmentModal({
  isOpen,
  onClose,
  appointment,
  onSuccess
}: CancelAppointmentModalProps) {
  const [cancellationReason, setCancellationReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = async () => {
    if (!cancellationReason.trim()) {
      setError('Please provide a reason for cancellation');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      const response = await appointmentAPI.cancel(appointment._id, cancellationReason);
      
      if (response.success) {
        onSuccess();
        onClose();
        setCancellationReason('');
      } else {
        setError(response.message || 'Failed to cancel appointment');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to cancel appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const canCancel = appointment.status === 'pending' || appointment.status === 'confirmed';

  if (!canCancel) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Cancel Appointment</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Appointment Details */}
            <div className="p-6 border-b border-gray-200">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Appointment Details</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{formatDate(appointment.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{appointment.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Scissors className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{appointment.serviceId.name}</span>
                  </div>
                  {appointment.stylistId && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{appointment.stylistId.name}</span>
                    </div>
                  )}
                  <div className="text-sm font-medium text-gray-900">
                    {formatPrice(appointment.serviceId.price)}
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Reason */}
            <div className="p-6">
              <label htmlFor="cancellationReason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Cancellation *
              </label>
              <textarea
                id="cancellationReason"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Please provide a reason for cancelling this appointment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                rows={4}
                maxLength={200}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">
                  {cancellationReason.length}/200 characters</span>
              </div>
              
              {error && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition font-medium"
                disabled={isSubmitting}
              >
                Keep Appointment
              </button>
              <button
                onClick={handleCancel}
                disabled={isSubmitting || !cancellationReason.trim()}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Cancelling...' : 'Cancel Appointment'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
