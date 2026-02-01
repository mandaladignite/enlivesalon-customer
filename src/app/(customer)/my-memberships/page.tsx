"use client";

import Footer from "@/components/customer/UI/Footer";
import Header from "@/components/customer/UI/Header";
import { motion } from "framer-motion";
import { 
  Crown, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Loader2,
  RefreshCw,
  Plus
} from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMemberships, useMembershipStats, Membership } from "@/hooks/useMembership";
import Link from "next/link";

export default function MyMemberships() {
  const { user } = useAuth();
  const { memberships, loading: membershipsLoading, error: membershipsError, refetch: refetchMemberships } = useMemberships();
  const { stats, loading: statsLoading, error: statsError } = useMembershipStats();

  const loading = membershipsLoading || statsLoading;
  const error = membershipsError || statsError;


  const getStatusBadge = (membership: Membership) => {
    const now = new Date();
    const isExpired = new Date(membership.expiryDate) < now;
    const isActive = membership.isActive && membership.paymentStatus === 'paid' && !isExpired;

    if (membership.paymentStatus === 'pending') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          Pending Payment
        </span>
      );
    }

    if (membership.paymentStatus === 'failed') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Payment Failed
        </span>
      );
    }

    if (isActive) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
        </span>
      );
    }

    if (isExpired) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <XCircle className="w-3 h-3 mr-1" />
          Expired
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle className="w-3 h-3 mr-1" />
        Cancelled
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <section className="w-full mt-16 bg-white min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your memberships.</p>
          <Link 
            href="/auth/login" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold"
          >
            Login
          </Link>
        </div>
        <Footer />
      </section>
    );
  }

  return (
    <section className="w-full mt-16 bg-white min-h-screen">
      <Header />

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900">My Memberships</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Manage your salon memberships and track your benefits
          </p>
        </motion.div>

        {/* Stats Overview */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Total Memberships</p>
                  <p className="text-3xl font-bold">{stats.totalMemberships}</p>
                </div>
                <Crown className="w-8 h-8 text-yellow-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-400 to-green-500 p-6 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Memberships</p>
                  <p className="text-3xl font-bold">{stats.activeMemberships}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-6 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Spent</p>
                  <p className="text-3xl font-bold">₹{stats.totalSpent}</p>
                </div>
                <RefreshCw className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-6 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Appointments Used</p>
                  <p className="text-3xl font-bold">{stats.totalAppointmentsUsed}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-200" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Memberships List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
            <span className="ml-2 text-gray-600">Loading memberships...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-12">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <span className="ml-2 text-red-600">{error}</span>
          </div>
        ) : memberships.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Crown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Memberships Yet</h3>
            <p className="text-gray-600 mb-6">You haven't purchased any memberships yet.</p>
            <Link 
              href="/membership" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Browse Memberships
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {memberships.map((membership, index) => (
              <motion.div
                key={membership._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {membership.packageName}
                      </h3>
                      <p className="text-gray-600 text-sm">{membership.description}</p>
                    </div>
                    {getStatusBadge(membership)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{formatDate(membership.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expiry Date</p>
                      <p className="font-medium">{formatDate(membership.expiryDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount Paid</p>
                      <p className="font-medium">₹{membership.amountPaid}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Remaining Appointments</p>
                      <p className="font-medium">{membership.remainingAppointments || 0}</p>
                    </div>
                  </div>

                  {membership.benefits && membership.benefits.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Benefits:</p>
                      <div className="flex flex-wrap gap-2">
                        {membership.benefits.map((benefit, benefitIndex) => (
                          <span
                            key={benefitIndex}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      <p>Payment Method: {membership.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </section>
  );
}
