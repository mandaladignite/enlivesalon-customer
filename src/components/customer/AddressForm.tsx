"use client";

import { useState, useEffect } from 'react';
import { MapPin, Home, Building, Map, Phone, MessageSquare, Save, X, Loader } from 'lucide-react';
import { Address, AddressFormProps } from '@/types/address';

const addressTypes = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'work', label: 'Work', icon: Building },
  { value: 'other', label: 'Other', icon: Map },
];

export default function AddressForm({ address, onSave, onCancel, loading = false }: AddressFormProps) {
  const [formData, setFormData] = useState<Address>({
    label: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    landmark: '',
    isDefault: false,
    addressType: 'home',
    contactNumber: '',
    instructions: '',
    ...address,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (address) {
      setFormData({ ...address });
    }
  }, [address]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.label.trim()) {
      newErrors.label = 'Address label is required';
    } else if (formData.label.length > 50) {
      newErrors.label = 'Label cannot exceed 50 characters';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
    } else if (formData.street.length < 5) {
      newErrors.street = 'Street address must be at least 5 characters';
    } else if (formData.street.length > 200) {
      newErrors.street = 'Street address cannot exceed 200 characters';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.length < 2) {
      newErrors.city = 'City must be at least 2 characters';
    } else if (formData.city.length > 50) {
      newErrors.city = 'City cannot exceed 50 characters';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    } else if (formData.state.length < 2) {
      newErrors.state = 'State must be at least 2 characters';
    } else if (formData.state.length > 50) {
      newErrors.state = 'State cannot exceed 50 characters';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be a valid 6-digit number';
    }

    if (formData.landmark && formData.landmark.length > 100) {
      newErrors.landmark = 'Landmark cannot exceed 100 characters';
    }

    if (formData.contactNumber && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid contact number';
    }

    if (formData.instructions && formData.instructions.length > 200) {
      newErrors.instructions = 'Instructions cannot exceed 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleInputChange = (field: keyof Address, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {address ? 'Edit Address' : 'Add New Address'}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Address Label */}
        <div>
          <label className="form-label">Address Label *</label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => handleInputChange('label', e.target.value)}
            className={`form-input ${errors.label ? 'border-red-500' : ''}`}
            placeholder="e.g., Home, Work, Office"
            maxLength={50}
          />
          {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label}</p>}
        </div>

        {/* Address Type */}
        <div>
          <label className="form-label">Address Type</label>
          <div className="grid grid-cols-3 gap-3">
            {addressTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleInputChange('addressType', type.value)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors ${
                    formData.addressType === type.value
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Street Address */}
        <div>
          <label className="form-label">Street Address *</label>
          <textarea
            value={formData.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
            className={`form-input ${errors.street ? 'border-red-500' : ''}`}
            placeholder="Enter your complete street address"
            rows={3}
            maxLength={200}
          />
          {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
        </div>

        {/* City, State, Pincode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">City *</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`form-input ${errors.city ? 'border-red-500' : ''}`}
              placeholder="City"
              maxLength={50}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="form-label">State *</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={`form-input ${errors.state ? 'border-red-500' : ''}`}
              placeholder="State"
              maxLength={50}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          <div>
            <label className="form-label">Pincode *</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              className={`form-input ${errors.pincode ? 'border-red-500' : ''}`}
              placeholder="123456"
              maxLength={6}
            />
            {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
          </div>
        </div>

        {/* Landmark */}
        <div>
          <label className="form-label">Landmark (Optional)</label>
          <input
            type="text"
            value={formData.landmark}
            onChange={(e) => handleInputChange('landmark', e.target.value)}
            className={`form-input ${errors.landmark ? 'border-red-500' : ''}`}
            placeholder="e.g., Near Metro Station, Opposite Mall"
            maxLength={100}
          />
          {errors.landmark && <p className="text-red-500 text-sm mt-1">{errors.landmark}</p>}
        </div>

        {/* Contact Number */}
        <div>
          <label className="form-label">Contact Number (Optional)</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              className={`form-input pl-10 ${errors.contactNumber ? 'border-red-500' : ''}`}
              placeholder="+91 9876543210"
            />
          </div>
          {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
        </div>

        {/* Instructions */}
        <div>
          <label className="form-label">Delivery Instructions (Optional)</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              value={formData.instructions}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              className={`form-input pl-10 ${errors.instructions ? 'border-red-500' : ''}`}
              placeholder="Any special instructions for delivery"
              rows={3}
              maxLength={200}
            />
          </div>
          {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
        </div>

        {/* Default Address Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isDefault"
            checked={formData.isDefault}
            onChange={(e) => handleInputChange('isDefault', e.target.checked)}
            className="w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold focus:ring-2"
          />
          <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
            Set as default address
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline flex-1"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex-1 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {address ? 'Update Address' : 'Add Address'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
