"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { serviceAPI, stylistAPI, appointmentAPI } from '@/lib/api';
import { Calendar, Clock, User, Scissors, CheckCircle, AlertCircle, MapPin, Star, Phone, Mail, ArrowLeft, ArrowRight, Home, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/customer/UI/Header';
import Footer from '@/components/customer/UI/Footer';

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
  availableAtHome: boolean;
  availableAtSalon: boolean;
  discount?: {
    percentage: number;
    isActive: boolean;
    validFrom?: string;
    validUntil?: string;
  };
}

interface Stylist {
  _id: string;
  name: string;
  specialties: string[];
  experience: number;
  rating: number;
  isActive: boolean;
  workingHours: {
    start: string;
    end: string;
  };
  availableForHome: boolean;
  availableForSalon: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  serviceIds: string[];
  stylistId: string;
  date: string;
  timeSlot: string;
  location: 'home' | 'salon';
  notes: string;
  specialInstructions: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const steps = [
  { id: 1, title: 'Select Service', description: 'Choose your preferred service' },
  { id: 2, title: 'Select Location', description: 'Home or Salon service' },
  { id: 3, title: 'Choose Stylist', description: 'Pick your preferred stylist' },
  { id: 4, title: 'Pick Date & Time', description: 'Schedule your appointment' },
  { id: 5, title: 'Add Details', description: 'Special instructions & notes' },
  { id: 6, title: 'Confirm Booking', description: 'Review and confirm' }
];

export default function BookPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);
  
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceIds: [],
    stylistId: '',
    date: '',
    timeSlot: '',
    location: 'salon',
    notes: '',
    specialInstructions: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    }
  });

  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Don't redirect if auth is still loading
    if (authLoading) {
      return;
    }
    
    if (user) {
      fetchData();
      
      // Handle URL parameters for pre-selected service
      const serviceId = searchParams.get('serviceId');
      const step = searchParams.get('step');
      
      if (serviceId && step) {
        // Set the step from URL parameter
        setCurrentStep(parseInt(step));
      }
    } else {
      // Only redirect if auth is not loading and user is not authenticated
      router.push('/auth/login');
    }
  }, [user, authLoading, router, searchParams]);

  // Handle pre-selected service after data is loaded
  useEffect(() => {
    const serviceId = searchParams.get('serviceId');
    if (serviceId && services.length > 0) {
      const preSelectedService = services.find(service => service._id === serviceId);
      if (preSelectedService) {
        setSelectedServices([preSelectedService]);
        setBookingData(prev => ({
          ...prev,
          serviceIds: [serviceId]
        }));
      }
    }
  }, [services, searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [servicesResponse, stylistsResponse] = await Promise.all([
        serviceAPI.getAll(),
        stylistAPI.getAll()
      ]);
      
      setServices(servicesResponse.data?.services || servicesResponse.data || []);
      setStylists(stylistsResponse.data?.stylists || stylistsResponse.data || []);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async (stylistId: string, date: string) => {
    try {
      setLoadingSlots(true);
      const response = await appointmentAPI.getAvailableTimeSlots(stylistId, date);
      const slots = response.data?.availableSlots || [];
      
      if (slots.length > 0) {
        setAvailableSlots(slots.map((time: string) => ({ time, available: true })));
      } else {
        // Generate fallback time slots if API returns empty
        const fallbackSlots = [];
        for (let hour = 9; hour <= 17; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            fallbackSlots.push({ time, available: true });
          }
        }
        setAvailableSlots(fallbackSlots);
      }
    } catch (error: any) {
      console.error('Error fetching time slots:', error);
      // Generate fallback time slots on error
      const fallbackSlots = [];
      for (let hour = 9; hour <= 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          fallbackSlots.push({ time, available: true });
        }
      }
      setAvailableSlots(fallbackSlots);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleServiceSelect = (service: Service) => {
    const isSelected = selectedServices.some(s => s._id === service._id);
    
    if (isSelected) {
      // Remove service if already selected
      const updatedServices = selectedServices.filter(s => s._id !== service._id);
      setSelectedServices(updatedServices);
      setBookingData(prev => ({ 
        ...prev, 
        serviceIds: updatedServices.map(s => s._id) 
      }));
    } else {
      // Add service if not selected
      const updatedServices = [...selectedServices, service];
      setSelectedServices(updatedServices);
      setBookingData(prev => ({ 
        ...prev, 
        serviceIds: updatedServices.map(s => s._id) 
      }));
    }
  };

  const handleLocationSelect = (location: 'home' | 'salon') => {
    setBookingData(prev => ({ ...prev, location }));
    // Reset selected stylist when location changes
    setSelectedStylist(null);
    setBookingData(prev => ({ ...prev, stylistId: '' }));
    setCurrentStep(3);
  };

  const handleStylistSelect = (stylist: Stylist) => {
    setSelectedStylist(stylist);
    setBookingData(prev => ({ ...prev, stylistId: stylist._id }));
    setCurrentStep(4);
  };

  // Filter stylists based on location availability
  const getAvailableStylists = () => {
    if (!bookingData.location) return stylists;
    
    return stylists.filter(stylist => {
      if (bookingData.location === 'home') {
        return stylist.availableForHome;
      } else if (bookingData.location === 'salon') {
        return stylist.availableForSalon;
      }
      return true;
    });
  };

  const handleDateSelect = (date: string) => {
    setBookingData(prev => ({ ...prev, date }));
    if (selectedStylist?._id) {
      fetchAvailableSlots(selectedStylist._id, date);
    }
  };

  const handleTimeSelect = (time: string) => {
    setBookingData(prev => ({ ...prev, timeSlot: time }));
    setCurrentStep(5);
  };

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: 'street' | 'city' | 'state' | 'zipCode' | 'country', value: string) => {
    setBookingData(prev => ({
      ...prev,
      address: { ...prev.address!, [field]: value }
    }));
  };

  // Discount calculation functions
  const calculateDiscountedPrice = (service: Service) => {
    if (!service.discount || !service.discount.isActive || service.discount.percentage === 0) {
      return service.price;
    }

    const now = new Date();
    if (service.discount.validFrom && now < new Date(service.discount.validFrom)) {
      return service.price;
    }
    if (service.discount.validUntil && now > new Date(service.discount.validUntil)) {
      return service.price;
    }

    const discountAmount = (service.price * service.discount.percentage) / 100;
    return Math.max(0, service.price - discountAmount);
  };

  const isDiscountActive = (service: Service) => {
    if (!service.discount || !service.discount.isActive || service.discount.percentage === 0) {
      return false;
    }

    const now = new Date();
    if (service.discount.validFrom && now < new Date(service.discount.validFrom)) {
      return false;
    }
    if (service.discount.validUntil && now > new Date(service.discount.validUntil)) {
      return false;
    }

    return true;
  };

  const calculateTotalPrice = () => {
    return selectedServices.reduce((total, service) => {
      return total + calculateDiscountedPrice(service);
    }, 0);
  };

  const calculateOriginalTotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const calculateTotalDiscount = () => {
    return calculateOriginalTotal() - calculateTotalPrice();
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError('');
      
      // For multiple services, we'll create separate appointments
      const appointmentPromises = bookingData.serviceIds.map(serviceId => {
        const appointmentData = {
          serviceId,
          stylistId: bookingData.stylistId,
          date: bookingData.date,
          timeSlot: bookingData.timeSlot,
          location: bookingData.location,
          notes: bookingData.notes,
          specialInstructions: bookingData.specialInstructions,
          address: bookingData.location === 'home' ? bookingData.address : undefined
        };
        return appointmentAPI.create(appointmentData);
      });

      const responses = await Promise.all(appointmentPromises);
      setSuccess(`Successfully booked ${responses.length} appointment${responses.length > 1 ? 's' : ''}!`);
      
      // Reset form after success
      setTimeout(() => {
        setBookingData({
          serviceIds: [],
          stylistId: '',
          date: '',
          timeSlot: '',
          location: 'salon',
          notes: '',
          specialInstructions: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India'
          }
        });
        setSelectedServices([]);
        setSelectedStylist(null);
        setCurrentStep(1);
        setSuccess('');
      }, 3000);
      
    } catch (error: any) {
      // Enhanced error handling
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        // Handle validation errors
        const validationErrors: Record<string, string> = {};
        error.response.data.errors.forEach((err: any) => {
          validationErrors[err.field] = err.message;
        });
        setValidationErrors(validationErrors);
        setError('Please fix the validation errors below');
      } else {
        setError(error.message || 'Failed to book appointment');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Validation functions for each step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Service selection
        return bookingData.serviceIds.length > 0;
      case 2: // Location selection
        return bookingData.location === 'home' || bookingData.location === 'salon';
      case 3: // Stylist selection
        return bookingData.stylistId !== '';
      case 4: // Date and time selection
        return bookingData.date !== '' && bookingData.timeSlot !== '';
      case 5: // Details (optional)
        return true; // This step is optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 6) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
        setValidationErrors({}); // Clear any previous errors
      } else {
        // Show validation error
        const stepErrors: Record<string, string> = {};
        switch (currentStep) {
          case 1:
            stepErrors.services = 'Please select at least one service';
            break;
          case 2:
            stepErrors.location = 'Please select a location';
            break;
          case 3:
            stepErrors.stylist = 'Please select a stylist';
            break;
          case 4:
            if (!bookingData.date) stepErrors.date = 'Please select a date';
            if (!bookingData.timeSlot) stepErrors.timeSlot = 'Please select a time slot';
            break;
        }
        setValidationErrors(stepErrors);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  // Show loading state while checking authentication or loading data
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-600">
              {authLoading ? 'Checking authentication...' : 'Loading booking options...'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book an Appointment</h1>
            <p className="text-lg text-gray-600">
              Choose your service, stylist, and preferred time slot
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            {success}
          </motion.div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-gold text-black' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 transition-colors ${
                    currentStep > step.id ? 'bg-gold' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {steps[currentStep - 1].title}
              </h3>
              <p className="text-sm text-gray-600">
                {steps[currentStep - 1].description}
              </p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Service */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Choose Services</h2>
                  <p className="text-gray-600">You can select multiple services for your appointment</p>
                  {selectedServices.length > 0 && (
                    <div className="mt-4 p-3 bg-gold/10 rounded-lg">
                      <p className="text-sm text-gold font-medium">
                        {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
                      </p>
                      {calculateTotalDiscount() > 0 && (
                        <p className="text-sm text-red-600 font-medium mt-1">
                          🎉 You're saving ₹{calculateTotalDiscount()} with current discounts!
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Validation Error */}
                {validationErrors.services && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {validationErrors.services}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => {
                    const isSelected = selectedServices.some(s => s._id === service._id);
                    return (
                      <motion.div
                        key={service._id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleServiceSelect(service)}
                        className={`card card-hover cursor-pointer p-6 border-2 transition-all duration-200 ${
                          isSelected 
                            ? 'border-gold bg-gold/5' 
                            : 'border-transparent hover:border-gold'
                        }`}
                      >
                        <div className="text-center">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Scissors className="w-8 h-8 text-gold" />
                            </div>
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-black" />
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {service.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              {isDiscountActive(service) ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl font-bold text-gold">
                                    ₹{calculateDiscountedPrice(service)}
                                  </span>
                                  <span className="text-lg text-gray-400 line-through">
                                    ₹{service.price}
                                  </span>
                                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                                    {service.discount?.percentage}% OFF
                                  </span>
                                </div>
                              ) : (
                                <span className="text-2xl font-bold text-gold">
                                  ₹{service.price}
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">
                              {service.duration} min
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

              </motion.div>
            )}

            {/* Step 2: Select Location */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-gold hover:text-gold-dark"
                  >
                    ← Back
                  </button>
                  <h2 className="text-2xl font-semibold text-gray-900">Select Location</h2>
                </div>

                {/* Validation Error */}
                {validationErrors.location && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {validationErrors.location}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLocationSelect('salon')}
                    className={`card cursor-pointer p-8 text-center border-2 transition-all duration-200 ${
                      bookingData.location === 'salon' 
                        ? 'border-gold bg-gold/5' 
                        : 'border-gray-200 hover:border-gold'
                    }`}
                  >
                    <Building2 className="w-12 h-12 text-gold mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Salon Service</h3>
                    <p className="text-gray-600">Visit our salon for the best experience</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLocationSelect('home')}
                    className={`card cursor-pointer p-8 text-center border-2 transition-all duration-200 ${
                      bookingData.location === 'home' 
                        ? 'border-gold bg-gold/5' 
                        : 'border-gray-200 hover:border-gold'
                    }`}
                  >
                    <Home className="w-12 h-12 text-gold mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Home Service</h3>
                    <p className="text-gray-600">We come to you for convenience</p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Choose Stylist */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-gold hover:text-gold-dark"
                  >
                    ← Back
                  </button>
                  <div className="text-center flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Choose Your Stylist</h2>
                    <p className="text-gray-600">
                      Available stylists for {bookingData.location === 'home' ? 'home' : 'salon'} service
                    </p>
                  </div>
                </div>

                {/* Validation Error */}
                {validationErrors.stylist && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {validationErrors.stylist}
                  </div>
                )}
                
                {getAvailableStylists().length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getAvailableStylists().map((stylist) => (
                      <motion.div
                        key={stylist._id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStylistSelect(stylist)}
                        className="card card-hover cursor-pointer p-6 border-2 border-transparent hover:border-gold transition-all duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-gold" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {stylist.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {stylist.specialties?.join(', ') || 'No specialties listed'}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{stylist.experience} years experience</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{stylist.rating}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Available for {bookingData.location} service
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No stylists available</h3>
                    <p className="text-gray-500 mb-4">
                      No stylists are currently available for {bookingData.location} service.
                    </p>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-gold hover:text-gold-dark font-medium"
                    >
                      ← Change location
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Pick Date & Time */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-gold hover:text-gold-dark"
                  >
                    ← Back
                  </button>
                  <h2 className="text-2xl font-semibold text-gray-900">Pick Date & Time</h2>
                </div>

                {/* Validation Errors */}
                {(validationErrors.date || validationErrors.timeSlot) && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {validationErrors.date || validationErrors.timeSlot}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleDateSelect(e.target.value)}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="form-input w-full"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    {loadingSlots ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-2"></div>
                        <p className="text-gray-500 text-sm">Loading available time slots...</p>
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                        {availableSlots.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => slot.available && handleTimeSelect(slot.time)}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg border text-center transition-colors ${
                              slot.available
                                ? 'border-gray-300 hover:border-gold hover:bg-gold/5'
                                : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            } ${bookingData.timeSlot === slot.time ? 'border-gold bg-gold/10' : ''}`}
                          >
                            <Clock className="w-4 h-4 mx-auto mb-1" />
                            <span className="text-sm font-medium">{slot.time}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">
                          {bookingData.date ? 'No available time slots for this date' : 'Please select a date first'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Add Details */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Details</h2>
                
                <div className="space-y-6">
                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={bookingData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                      className="form-input w-full"
                      placeholder="Any special requests or notes for your appointment..."
                    />
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      value={bookingData.specialInstructions}
                      onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                      rows={3}
                      className="form-input w-full"
                      placeholder="Any specific instructions for the stylist..."
                    />
                  </div>

                  {/* Home Address (if home service) */}
                  {bookingData.location === 'home' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Home Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address
                          </label>
                          <input
                            type="text"
                            value={bookingData.address?.street || ''}
                            onChange={(e) => handleAddressChange('street', e.target.value)}
                            className="form-input w-full"
                            placeholder="Enter street address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            value={bookingData.address?.city || ''}
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                            className="form-input w-full"
                            placeholder="Enter city"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            value={bookingData.address?.state || ''}
                            onChange={(e) => handleAddressChange('state', e.target.value)}
                            className="form-input w-full"
                            placeholder="Enter state"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            value={bookingData.address?.zipCode || ''}
                            onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                            className="form-input w-full"
                            placeholder="Enter ZIP code"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 6: Confirm Booking */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="text-gold hover:text-gold-dark"
                  >
                    ← Back
                  </button>
                  <h2 className="text-2xl font-semibold text-gray-900">Confirm Booking</h2>
                </div>
                
                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Services:</span>
                      <div className="text-right">
                        {selectedServices.map((service, index) => (
                          <div key={service._id} className="font-semibold">
                            {service.name} - {isDiscountActive(service) ? (
                              <span>
                                ₹{calculateDiscountedPrice(service)}
                                <span className="text-sm text-gray-400 line-through ml-2">
                                  ₹{service.price}
                                </span>
                                <span className="text-xs text-red-600 ml-1">
                                  ({service.discount?.percentage}% OFF)
                                </span>
                              </span>
                            ) : (
                              `₹${service.price}`
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stylist:</span>
                      <span className="font-semibold">{selectedStylist?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold capitalize">{bookingData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold">
                        {new Date(bookingData.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-semibold">{bookingData.timeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Duration:</span>
                      <span className="font-semibold">
                        {selectedServices.reduce((total, service) => total + service.duration, 0)} minutes
                      </span>
                    </div>
                    {bookingData.notes && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Notes:</span>
                        <span className="font-semibold">{bookingData.notes}</span>
                      </div>
                    )}
                    {bookingData.specialInstructions && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Special Instructions:</span>
                        <span className="font-semibold">{bookingData.specialInstructions}</span>
                      </div>
                    )}
                    {calculateTotalDiscount() > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Original Total:</span>
                        <span className="text-gray-400 line-through">
                          ₹{calculateOriginalTotal()}
                        </span>
                      </div>
                    )}
                    {calculateTotalDiscount() > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discount:</span>
                        <span className="text-red-600 font-semibold">
                          -₹{calculateTotalDiscount()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-gray-200 pt-3">
                      <span className="text-gray-900 font-semibold">Total:</span>
                      <span className="text-xl font-bold text-gold">
                        ₹{calculateTotalPrice()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-gold text-black px-8 py-3 rounded-lg font-semibold hover:bg-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Booking...' : `Book ${selectedServices.length} Appointment${selectedServices.length > 1 ? 's' : ''}`}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep < 6 ? (
              <button
                onClick={nextStep}
                disabled={currentStep === 1 && selectedServices.length === 0}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Booking...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Confirm Booking
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}