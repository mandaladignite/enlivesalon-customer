"use client";

import { Suspense, lazy, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Zap, Clock, Star, Calendar, Sparkles, Heart, Filter, Grid, List } from "lucide-react";
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

export default function SkinServices() {
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
  } = useServiceFilters({ category: 'skin' });

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
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ea580c%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-orange-500"></div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Zap className="w-10 h-10 text-orange-600" />
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-orange-500"></div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-orange-800 to-amber-700 bg-clip-text text-transparent mb-6"
            >
              Skin Services
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-4xl mb-8 leading-relaxed"
            >
              Discover our comprehensive skin services designed to give you healthy, glowing, and beautiful skin. 
              Experience advanced treatments for radiant, youthful-looking skin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <div className="flex items-center gap-2 text-orange-600">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-orange-600">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Expert Aestheticians</span>
              </div>
              <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-orange-600">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Advanced Treatments</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Why Choose Enlive
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Experience the <span className="text-orange-600">Difference</span>
          </h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our expert aestheticians and premium products ensure you get the best results for your skin. 
            We combine advanced technology with personalized care for radiant, healthy skin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Zap className="w-10 h-10 text-orange-600" />,
              title: "Expert Aestheticians",
              description: "Our certified aestheticians have years of experience and advanced training in skincare treatments.",
              bgColor: "bg-orange-50",
              iconBg: "bg-orange-100"
            },
            {
              icon: <Sparkles className="w-10 h-10 text-amber-600" />,
              title: "Premium Products",
              description: "We use only the highest quality professional skincare products from renowned brands.",
              bgColor: "bg-amber-50",
              iconBg: "bg-amber-100"
            },
            {
              icon: <Heart className="w-10 h-10 text-orange-600" />,
              title: "Latest Techniques",
              description: "Stay current with the latest trends and innovative techniques in skincare and beauty.",
              bgColor: "bg-orange-50",
              iconBg: "bg-orange-100"
            },
            {
              icon: <Star className="w-10 h-10 text-amber-600" />,
              title: "Personalized Service",
              description: "Customized treatments tailored to your specific skin type and beauty goals.",
              bgColor: "bg-amber-50",
              iconBg: "bg-amber-100"
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${benefit.bgColor} p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-white/50`}
            >
              <div className={`${benefit.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {benefit.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h4>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Services Preview */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 py-16 mb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
              <Calendar className="w-4 h-4" />
              Popular Services
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Most <span className="text-orange-600">Booked</span> Treatments
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our most popular skin treatments that our clients love and book repeatedly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "HydraFacial Treatment",
                duration: "60 min",
                price: "₹3,500",
                description: "Deep cleanse, extract, and hydrate your skin with our advanced HydraFacial treatment.",
                image: "/skinservice.jpg"
              },
              {
                name: "Chemical Peel",
                duration: "45 min",
                price: "₹2,800",
                description: "Reveal smoother, brighter skin with our professional chemical peel treatment.",
                image: "/skinservice.jpg"
              },
              {
                name: "Microdermabrasion",
                duration: "50 min",
                price: "₹2,200",
                description: "Exfoliate and rejuvenate your skin with our gentle microdermabrasion treatment.",
                image: "/skinservice.jpg"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <Zap className="w-16 h-16 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-gray-900">{service.name}</h4>
                    <span className="text-sm text-orange-600 font-semibold">{service.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">{service.price}</span>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ServiceReviews 
        serviceCategory="skin"
        limit={6}
        showFeatured={true}
        title="What Our Skin Clients Say"
        subtitle="Don't just take our word for it. Here's what our satisfied clients have to say about their skin service experience."
      />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 py-16 mb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Glow <span className="text-yellow-300">Beautifully</span>?
            </h3>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Book your appointment today and discover why our skin services are the best in the city. 
              Your journey to radiant skin starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg">
                Book Appointment
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors">
                View All Services
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Section with Filters */}
      <LazyWrapper delay={0.3}>
        <div className="container mx-auto px-6 mb-16">
          {/* Filters */}
          <div className="mb-8">
            <ServiceFilters
              filters={filters}
              onFiltersChange={updateFilters}
              subCategories={subCategories}
              category="skin"
              totalServices={filterStats.totalServices}
            />
          </div>

          {/* View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Skin Services
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
                  <Zap className="w-8 h-8 text-red-500" />
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
                    : "No skin services are currently available."
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
                  category="skin"
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
            <h3 className="text-3xl font-bold mb-6">Ready for Glowing Skin?</h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Book your skin treatment today and experience the Enlive difference in skincare expertise.
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