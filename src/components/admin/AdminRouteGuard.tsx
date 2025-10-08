"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { isAuthenticated, isAdmin, loading, admin } = useAdminAuth();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    console.log('AdminRouteGuard - Auth state:', { isAuthenticated, isAdmin, loading, admin: admin?.email });
    
    if (!loading) {
      if (!isAuthenticated || !isAdmin) {
        console.log('AdminRouteGuard - Not authenticated, redirecting to login');
        // Only redirect if we're not already on the login page
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/admin/login')) {
          setShouldRedirect(true);
          router.push('/auth/admin/login');
        }
      } else {
        console.log('AdminRouteGuard - Authenticated as admin, allowing access');
        // If authenticated and admin, clear any pending redirect
        setShouldRedirect(false);
      }
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" suppressHydrationWarning={true}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" suppressHydrationWarning={true}></div>
      </div>
    );
  }

  // Don't render children if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return null; // Let the useEffect handle the redirect
  }

  return <>{children}</>;
}
