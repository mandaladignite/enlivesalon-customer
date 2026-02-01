"use client";

import { useState } from 'react';
import { MapPin, Edit, Trash2, Star, Copy, MoreVertical, Home, Building, Map } from 'lucide-react';

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
  contactNumber?: string;
  instructions?: string;
  formattedAddress?: string;
  shortAddress?: string;
}

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (addressId: string) => void;
  onSetDefault: (addressId: string) => void;
  onDuplicate: (addressId: string) => void;
  loading?: boolean;
}

const addressTypeIcons = {
  home: Home,
  work: Building,
  other: Map,
};

export default function AddressList({ 
  addresses, 
  onEdit, 
  onDelete, 
  onSetDefault, 
  onDuplicate, 
  loading = false 
}: AddressListProps) {
  const [expandedAddress, setExpandedAddress] = useState<string | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const getAddressTypeIcon = (type: string) => {
    const Icon = addressTypeIcons[type as keyof typeof addressTypeIcons] || Map;
    return <Icon className="w-4 h-4" />;
  };

  const getAddressTypeColor = (type: string) => {
    switch (type) {
      case 'home':
        return 'text-green-600 bg-green-100';
      case 'work':
        return 'text-blue-600 bg-blue-100';
      case 'other':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleActionClick = (addressId: string, action: string) => {
    setActionMenuOpen(null);
    
    switch (action) {
      case 'edit':
        const address = addresses.find(addr => addr._id === addressId);
        if (address) onEdit(address);
        break;
      case 'delete':
        onDelete(addressId);
        break;
      case 'setDefault':
        onSetDefault(addressId);
        break;
      case 'duplicate':
        onDuplicate(addressId);
        break;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No addresses found</h3>
        <p className="text-gray-600">Add your first address to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div key={address._id} className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${getAddressTypeColor(address.addressType)}`}>
                {getAddressTypeIcon(address.addressType)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{address.label}</h3>
                  {address.isDefault && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gold text-black">
                      <Star className="w-3 h-3" />
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 capitalize">{address.addressType}</p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setActionMenuOpen(actionMenuOpen === address._id ? null : address._id)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {actionMenuOpen === address._id && (
                <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border z-10">
                  <div className="py-1">
                    <button
                      onClick={() => handleActionClick(address._id, 'edit')}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Address
                    </button>
                    {!address.isDefault && (
                      <button
                        onClick={() => handleActionClick(address._id, 'setDefault')}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Star className="w-4 h-4" />
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleActionClick(address._id, 'duplicate')}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Copy className="w-4 h-4" />
                      Duplicate
                    </button>
                    <button
                      onClick={() => handleActionClick(address._id, 'delete')}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">{address.street}</p>
            {address.landmark && (
              <p className="text-sm text-gray-500">Near {address.landmark}</p>
            )}
            <p className="text-gray-700">
              {address.city}, {address.state} - {address.pincode}
            </p>
            <p className="text-sm text-gray-500">{address.country}</p>
            
            {address.contactNumber && (
              <p className="text-sm text-gray-600">Contact: {address.contactNumber}</p>
            )}
            
            {address.instructions && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Instructions:</strong> {address.instructions}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => setExpandedAddress(expandedAddress === address._id ? null : address._id)}
              className="text-sm text-gold hover:text-gold-dark font-medium"
            >
              {expandedAddress === address._id ? 'Show Less' : 'Show More Details'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
