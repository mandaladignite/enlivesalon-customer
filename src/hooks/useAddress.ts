import { useState, useEffect } from 'react';
import { addressAPI } from '@/lib/api';

interface Address {
  _id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  landmark?: string;
  isDefault: boolean;
  addressType: 'home' | 'work' | 'other';
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  contactNumber?: string;
  instructions?: string;
  formattedAddress?: string;
  shortAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export function useAddress() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await addressAPI.getAll();
      setAddresses(response.data || []);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch addresses');
    } finally {
      setLoading(false);
    }
  };

  const createAddress = async (addressData: Omit<Address, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError('');
      const response = await addressAPI.create(addressData);
      setAddresses(prev => [response.data, ...prev]);
      return response.data;
    } catch (error: any) {
      setError(error.message || 'Failed to create address');
      throw error;
    }
  };

  const updateAddress = async (id: string, addressData: Partial<Address>) => {
    try {
      setError('');
      const response = await addressAPI.update(id, addressData);
      setAddresses(prev => 
        prev.map(addr => addr._id === id ? response.data : addr)
      );
      return response.data;
    } catch (error: any) {
      setError(error.message || 'Failed to update address');
      throw error;
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      setError('');
      await addressAPI.delete(id);
      setAddresses(prev => prev.filter(addr => addr._id !== id));
    } catch (error: any) {
      setError(error.message || 'Failed to delete address');
      throw error;
    }
  };

  const setDefaultAddress = async (id: string) => {
    try {
      setError('');
      await addressAPI.setDefault(id);
      
      // Update local state
      setAddresses(prev => 
        prev.map(addr => ({
          ...addr,
          isDefault: addr._id === id
        }))
      );
    } catch (error: any) {
      setError(error.message || 'Failed to set default address');
      throw error;
    }
  };

  const duplicateAddress = async (id: string, newLabel?: string) => {
    try {
      setError('');
      const response = await addressAPI.duplicate(id, newLabel || 'Copy');
      setAddresses(prev => [response.data, ...prev]);
      return response.data;
    } catch (error: any) {
      setError(error.message || 'Failed to duplicate address');
      throw error;
    }
  };

  const getDefaultAddress = () => {
    return addresses.find(addr => addr.isDefault);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    addresses,
    loading,
    error,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    duplicateAddress,
    getDefaultAddress,
  };
}
