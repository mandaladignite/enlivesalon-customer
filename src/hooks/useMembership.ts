import { useState, useEffect } from 'react';
import { membershipAPI } from '@/lib/api';

export interface Membership {
  _id: string;
  packageId: string;
  packageName: string;
  description: string;
  startDate: string;
  expiryDate: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  amountPaid: number;
  discountApplied: number;
  remainingAppointments: number;
  usedAppointments: number;
  benefits: string[];
  isActive: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipStats {
  totalMemberships: number;
  activeMemberships: number;
  totalSpent: number;
  totalAppointmentsUsed: number;
  totalAppointmentsRemaining: number;
}

export const useMemberships = (status?: string) => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      setError(null);
      // Only include status in the request if it's provided and not 'all'
      const params = status && status !== 'all' ? { status } : {};
      const response = await membershipAPI.getMyAll(params);
      if (response.success) {
        setMemberships(response.data.memberships);
      } else {
        setError(response.message || 'Failed to fetch memberships');
      }
    } catch (err) {
      console.error('Error fetching memberships:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch memberships');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, [status]);

  return {
    memberships,
    loading,
    error,
    refetch: fetchMemberships
  };
};

export const useMembershipStats = () => {
  const [stats, setStats] = useState<MembershipStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await membershipAPI.getStats();
      if (response.success) {
        setStats(response.data.overview);
      } else {
        setError(response.message || 'Failed to fetch stats');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};

export const useMembershipActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const purchaseMembership = async (packageId: string, paymentMethod: string = 'razorpay', notes?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await membershipAPI.purchase(packageId, notes);
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to purchase membership');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to purchase membership';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cancelMembership = async (membershipId: string, reason?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await membershipAPI.cancel(membershipId, reason);
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to cancel membership');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel membership';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const extendMembership = async (membershipId: string, additionalDays: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await membershipAPI.extend(membershipId, additionalDays);
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to extend membership');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to extend membership';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const useAppointment = async (membershipId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await membershipAPI.useAppointment(membershipId);
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to use appointment');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to use appointment';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    purchaseMembership,
    cancelMembership,
    extendMembership,
    useAppointment,
    loading,
    error
  };
};
