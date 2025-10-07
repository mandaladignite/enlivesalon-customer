"use client";

import { AdminAuthProvider } from '@/contexts/AdminAuthContext';

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      {children}
    </AdminAuthProvider>
  );
}
