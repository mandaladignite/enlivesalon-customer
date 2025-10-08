// app/admin/layout.tsx
import { Inter } from 'next/font/google';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminRouteGuard from '@/components/admin/AdminRouteGuard';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminRouteGuard>
        <div className={`flex h-screen ${inter.className}`}>
          <AdminSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader />
            <main className="flex-1 overflow-y-auto bg-gray-50">
              {children}
            </main>
          </div>
        </div>
      </AdminRouteGuard>
    </AdminAuthProvider>
  );
}