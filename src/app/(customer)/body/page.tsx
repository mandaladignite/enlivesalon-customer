"use client";

import { Suspense, lazy, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, Clock, Star, Calendar, Zap, Sparkles, Filter, Grid, List } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import LazyWrapper from "@/components/common/LazyWrapper";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SkeletonLoader, { ServiceCardSkeleton } from "@/components/common/SkeletonLoader";
import ServiceFilters from "@/components/common/ServiceFilters";
import EnhancedServiceCard from "@/components/common/EnhancedServiceCard";
import { useServiceFilters } from "@/hooks/useServiceFilters";
import ServiceReviews from "@/components/customer/ServiceReviews";

// Lazy load components
const Header = lazy(() => import("@/components/customer/UI/Header"));
const Footer = lazy(() => import("@/components/customer/UI/Footer"));

interface Service {
  _id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  currency: string;
  category: string;
  subCategory: string;
  icon: string;
  photo?: string;
  tags: string[];
  isFeatured: boolean;
  availableAtHome: boolean;
  availableAtSalon: boolean;
  discount?: {
    percentage: number;
    isActive: boolean;
    validFrom?: string;
    validUntil?: string;
  };
}

export default function BodyServices() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { user } = useAuth();
  const router = useRouter();

  // Use the custom hook for service filtering
  const {
    services,
    subCategories,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    filterStats,
    refetch
  } = useServiceFilters({ category: 'body' });

  const handleBookAppointment = useCallback((service: Service) => {
    if (!user) {
      // Redirect to login if not authenticated
      router.push('/auth/login');
      return;
    }
    const bookingUrl = `/book?serviceId=${service._id}&step=2`;
    router.push(bookingUrl);
  }, [router, user]);

  const handleServiceSelect = useCallback((serviceId: string) => {
    setSelectedService(selectedService === serviceId ? null : serviceId);
  }, [selectedService]);


  return (
    <section className="w-full mt-16 bg-white">
      {/* Header Section */}
      <Suspense fallback={<LoadingSpinner size="lg" text="Loading header..." />}>
        <Header />
      </Suspense>
      <div className="container mx-auto px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-green-500"></div>
            <Heart className="w-8 h-8 text-green-500" />
            <div className="w-12 h-px bg-green-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Body Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mb-6">
            Discover our comprehensive body services designed to relax, rejuvenate, and pamper your entire body.
          </p>
        </motion.div>
      </div>


      {/* Reviews Section */}
      <ServiceReviews 
        serviceCategory="body"
        limit={6}
        showFeatured={true}
        title="What Our Body Service Clients Say"
        subtitle="Don't just take our word for it. Here's what our satisfied clients have to say about their body service experience."
      />

      {/* Services Section with Filters */}
      <LazyWrapper delay={0.3}>
        <div className="container mx-auto px-6 mb-16">
          {/* Filters */}
          <div className="mb-8">
            <ServiceFilters
              filters={filters}
              onFiltersChange={updateFilters}
              subCategories={subCategories}
              category="body"
              totalServices={filterStats.totalServices}
            />
          </div>

          {/* View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Body Services
                {filterStats.hasActiveFilters && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({filterStats.filteredCount} of {filterStats.totalServices} services)
                  </span>
                )}
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-gold text-black' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-gold text-black' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Services Grid/List */}
          {loading ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid grid-cols-1 gap-6'}>
              {Array.from({ length: 6 }).map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Services</h3>
                <p className="text-red-600 mb-6">{error}</p>
                <button 
                  onClick={refetch}
                  className="bg-gold hover:bg-gold-dark text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Services Found</h3>
                <p className="text-gray-600 mb-6">
                  {filterStats.hasActiveFilters 
                    ? "Try adjusting your filters to see more services."
                    : "No body services are currently available."
                  }
                </p>
                {filterStats.hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="bg-gold hover:bg-gold-dark text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid grid-cols-1 gap-6'}>
              {services.map((service, index) => (
                <EnhancedServiceCard
                  key={service._id}
                  service={service}
                  index={index}
                  isSelected={selectedService === service._id}
                  onSelect={handleServiceSelect}
                  onBook={handleBookAppointment}
                  category="body"
                  className={viewMode === 'list' ? 'flex flex-row' : ''}
                />
              ))}
            </div>
          )}
        </div>
      </LazyWrapper>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">Ready for a Body Transformation?</h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Book your body treatment today and experience the Enlive difference in body care expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gold hover:bg-gold-dark text-black px-8 py-3 font-semibold rounded-lg transition flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
              <button className="border border-white hover:bg-white hover:text-black px-8 py-3 font-semibold rounded-lg transition">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <LazyWrapper delay={0.8}>
        <Suspense fallback={<LoadingSpinner size="lg" text="Loading footer..." />}>
          <Footer />
        </Suspense>
      </LazyWrapper>
    </section>
  );
}