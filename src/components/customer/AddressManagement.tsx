"use client";

import { useState } from 'react';
import { Plus, MapPin } from 'lucide-react';
import { useAddress } from '@/hooks/useAddress';
import AddressForm from './AddressForm';
import AddressList from './AddressList';
import { Address } from '@/types/address';

export default function AddressManagement() {
  const {
    addresses,
    loading,
    error,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    duplicateAddress,
  } = useAddress();

  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleSaveAddress = async (addressData: Address) => {
    try {
      setSaving(true);

      if (editingAddress && editingAddress._id) {
        await updateAddress(editingAddress._id, addressData);
      } else {
        await createAddress(addressData);
      }

      setShowForm(false);
      setEditingAddress(null);
    } catch (error) {
      // Error is handled by the hook
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }

    try {
      await deleteAddress(addressId);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      await setDefaultAddress(addressId);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleDuplicateAddress = async (addressId: string) => {
    try {
      await duplicateAddress(addressId);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <AddressForm
          address={editingAddress || undefined}
          onSave={handleSaveAddress}
          onCancel={handleCancelForm}
          loading={saving}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">My Addresses</h2>
          <p className="text-gray-600">Manage your delivery addresses</p>
        </div>
        <button
          onClick={handleAddAddress}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Address List */}
      <AddressList
        addresses={addresses}
        onEdit={handleEditAddress}
        onDelete={handleDeleteAddress}
        onSetDefault={handleSetDefault}
        onDuplicate={handleDuplicateAddress}
        loading={loading}
      />

      {/* Empty State */}
      {!loading && addresses.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No addresses yet</h3>
          <p className="text-gray-600 mb-6">Add your first address to get started with deliveries.</p>
          <button
            onClick={handleAddAddress}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            Add Your First Address
          </button>
        </div>
      )}
    </div>
  );
}
