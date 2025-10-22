/**
 * Enhanced booking hook with comprehensive error handling and retry mechanisms
 */

import { useState, useCallback } from 'react';
import { appointmentAPI } from '../lib/api';
import { 
  parseApiError, 
  getUserFriendlyMessage, 
  isRetryableError, 
  logError, 
  withRetry,
  BookingError,
  NetworkError,
  ValidationError
} from '../lib/errorHandler';

export interface BookingData {
  serviceId: string;
  stylistId?: string;
  date: string;
  timeSlot: string;
  location: 'home' | 'salon';
  notes?: string;
  specialInstructions?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface BookingState {
  isSubmitting: boolean;
  isRetrying: boolean;
  error: string | null;
  validationErrors: Record<string, string>;
  success: boolean;
  bookingReference: string | null;
  retryCount: number;
}

export interface BookingActions {
  submitBooking: (data: BookingData) => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
  retryBooking: () => Promise<void>;
}

export interface UseBookingReturn {
  state: BookingState;
  actions: BookingActions;
}

export function useBooking(): UseBookingReturn {
  const [state, setState] = useState<BookingState>({
    isSubmitting: false,
    isRetrying: false,
    error: null,
    validationErrors: {},
    success: false,
    bookingReference: null,
    retryCount: 0
  });

  const [lastBookingData, setLastBookingData] = useState<BookingData | null>(null);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
      validationErrors: {}
    }));
  }, []);

  const clearSuccess = useCallback(() => {
    setState(prev => ({
      ...prev,
      success: false,
      bookingReference: null
    }));
  }, []);

  const handleBookingError = useCallback((error: Error) => {
    const parsedError = parseApiError(error);
    const userMessage = getUserFriendlyMessage(parsedError);
    
    logError(parsedError, { 
      context: 'useBooking',
      bookingData: lastBookingData 
    });

    if (parsedError instanceof ValidationError) {
      const validationErrors: Record<string, string> = {};
      parsedError.errors.forEach(err => {
        validationErrors[err.field] = err.message;
      });
      
      setState(prev => ({
        ...prev,
        error: userMessage,
        validationErrors,
        isSubmitting: false,
        isRetrying: false
      }));
    } else {
      setState(prev => ({
        ...prev,
        error: userMessage,
        validationErrors: {},
        isSubmitting: false,
        isRetrying: false
      }));
    }
  }, [lastBookingData]);

  const submitBooking = useCallback(async (data: BookingData) => {
    setLastBookingData(data);
    
    setState(prev => ({
      ...prev,
      isSubmitting: true,
      error: null,
      validationErrors: {},
      success: false,
      retryCount: 0
    }));

    try {
      const response = await withRetry(
        () => appointmentAPI.create(data),
        {
          maxRetries: 3,
          retryDelay: 1000,
          onRetry: (attempt, error) => {
            setState(prev => ({
              ...prev,
              retryCount: attempt,
              isRetrying: true
            }));
          }
        }
      );

      if (response.success) {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          isRetrying: false,
          success: true,
          bookingReference: response.data.bookingReference,
          error: null,
          validationErrors: {}
        }));
      } else {
        throw new Error(response.message || 'Booking failed');
      }
    } catch (error) {
      handleBookingError(error as Error);
    }
  }, [handleBookingError]);

  const retryBooking = useCallback(async () => {
    if (!lastBookingData) return;

    setState(prev => ({
      ...prev,
      isRetrying: true,
      error: null,
      validationErrors: {}
    }));

    try {
      await submitBooking(lastBookingData);
    } catch (error) {
      handleBookingError(error as Error);
    }
  }, [lastBookingData, submitBooking, handleBookingError]);

  return {
    state,
    actions: {
      submitBooking,
      clearError,
      clearSuccess,
      retryBooking
    }
  };
}

/**
 * Hook for checking stylist availability with error handling
 */
export function useStylistAvailability() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const checkAvailability = useCallback(async (stylistId: string, date: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await withRetry(
        () => appointmentAPI.getAvailableSlots(stylistId, date),
        {
          maxRetries: 2,
          retryDelay: 500
        }
      );

      if (response.success) {
        setAvailableSlots(response.data.availableSlots || []);
      } else {
        throw new Error(response.message || 'Failed to check availability');
      }
    } catch (error) {
      const parsedError = parseApiError(error as Error);
      const userMessage = getUserFriendlyMessage(parsedError);
      
      logError(parsedError, { 
        context: 'useStylistAvailability',
        stylistId,
        date 
      });
      
      setError(userMessage);
      setAvailableSlots([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    availableSlots,
    checkAvailability,
    clearError
  };
}

/**
 * Hook for managing appointment operations with error handling
 */
export function useAppointmentOperations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelAppointment = useCallback(async (appointmentId: string, reason?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await withRetry(
        () => appointmentAPI.cancel(appointmentId, reason),
        {
          maxRetries: 2,
          retryDelay: 1000
        }
      );

      if (!response.success) {
        throw new Error(response.message || 'Failed to cancel appointment');
      }

      return response.data;
    } catch (error) {
      const parsedError = parseApiError(error as Error);
      const userMessage = getUserFriendlyMessage(parsedError);
      
      logError(parsedError, { 
        context: 'cancelAppointment',
        appointmentId,
        reason 
      });
      
      setError(userMessage);
      throw parsedError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const rescheduleAppointment = useCallback(async (
    appointmentId: string, 
    newDate: string, 
    newTimeSlot: string, 
    reason?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await withRetry(
        () => appointmentAPI.reschedule(appointmentId, `${newDate}T${newTimeSlot}`),
        {
          maxRetries: 2,
          retryDelay: 1000
        }
      );

      if (!response.success) {
        throw new Error(response.message || 'Failed to reschedule appointment');
      }

      return response.data;
    } catch (error) {
      const parsedError = parseApiError(error as Error);
      const userMessage = getUserFriendlyMessage(parsedError);
      
      logError(parsedError, { 
        context: 'rescheduleAppointment',
        appointmentId,
        newDate,
        newTimeSlot,
        reason 
      });
      
      setError(userMessage);
      throw parsedError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    cancelAppointment,
    rescheduleAppointment,
    clearError
  };
}
