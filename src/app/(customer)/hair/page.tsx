"use client";

import { Suspense, lazy, memo, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Scissors, Sparkles, Heart, Clock, Star, Calendar, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { serviceAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import LazyWrapper from "@/components/common/LazyWrapper";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SkeletonLoader, { ServiceCardSkeleton } from "@/components/common/SkeletonLoader";
import OptimizedImage, { ServiceImage } from "@/components/common/OptimizedImage";

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

// Memoized service card component for better performance
const ServiceCard = memo(({ 
  service, 
  index, 
  isSelected, 
  onSelect, 
  onBook 
}: {
  service: Service;
  index: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onBook: (service: Service) => void;
}) => {
  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }, []);

  const formatDuration = useCallback((minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  }, []);

  const calculateDiscountedPrice = useCallback((service: Service) => {
    if (!service.discount || !service.discount.isActive || service.discount.percentage === 0) {
      return service.price;
    }

    const now = new Date();
    if (service.discount.validFrom && now < new Date(service.discount.validFrom)) {
      return service.price;
    }
    if (service.discount.validUntil && now > new Date(service.discount.validUntil)) {
      return service.price;
    }

    const discountAmount = (service.price * service.discount.percentage) / 100;
    return Math.max(0, service.price - discountAmount);
  }, []);

  const isDiscountActive = useCallback((service: Service) => {
    if (!service.discount || !service.discount.isActive || service.discount.percentage === 0) {
      return false;
    }

    const now = new Date();
    if (service.discount.validFrom && now < new Date(service.discount.validFrom)) {
      return false;
    }
    if (service.discount.validUntil && now > new Date(service.discount.validUntil)) {
      return false;
    }

    return true;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`bg-white rounded-lg p-6 border hover:shadow-md transition cursor-pointer ${
        isSelected ? 'border-yellow-500' : 'border-gray-200'
      }`}
      onClick={() => onSelect(service._id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {service.photo ? (
            <ServiceImage
              src={service.photo}
              alt={service.name}
              className="w-12 h-12 rounded-lg"
            />
          ) : (
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-yellow-600" />
            </div>
          )}
          <div>
            <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {service.name}
              {service.isFeatured && (
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
              )}
            </h4>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatDuration(service.duration)}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{service.category}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          {isDiscountActive(service) ? (
            <div className="space-y-1">
              <div className="text-gray-500 text-sm line-through">
                {formatPrice(service.price)}
              </div>
              <div className="text-yellow-700 font-semibold text-lg">
                {formatPrice(calculateDiscountedPrice(service))}
              </div>
              <div className="text-green-600 text-xs font-medium">
                {service.discount?.percentage}% OFF
              </div>
            </div>
          ) : (
            <span className="text-yellow-700 font-semibold text-lg">{formatPrice(service.price)}</span>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{service.description}</p>
      
      {service.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        {service.availableAtHome && (
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            Home Service
          </span>
        )}
        {service.availableAtSalon && (
          <span className="flex items-center gap-1">
            <Scissors className="w-4 h-4" />
            Salon Service
          </span>
        )}
      </div>
      
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex justify-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onBook(service);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-medium transition"
            >
              Book This Service
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default function HairServices() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const servicesResponse = await serviceAPI.getByCategory("hair", { limit: 50 });

      if (servicesResponse.success) {
        setServices(servicesResponse.data.services || []);
      }
    } catch (err) {
      setError("Failed to load services");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = useMemo(() => services || [], [services]);

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
            <div className="w-12 h-px bg-yellow-500"></div>
            <Scissors className="w-8 h-8 text-yellow-500" />
            <div className="w-12 h-px bg-yellow-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Hair Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mb-6">
            Discover our comprehensive hair services designed to transform your look and enhance your natural beauty.
          </p>
        </motion.div>
      </div>



      {/* Benefits Section */}
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Enlive Hair Services?</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our expert stylists and premium products ensure you get the best results for your hair.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Scissors className="w-8 h-8 text-yellow-500" />,
              title: "Expert Stylists",
              description: "Our certified stylists have years of experience and training."
            },
            {
              icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
              title: "Premium Products",
              description: "We use only the highest quality professional hair products."
            },
            {
              icon: <Zap className="w-8 h-8 text-yellow-500" />,
              title: "Latest Techniques",
              description: "Stay current with the latest trends and techniques in hair care."
            },
            {
              icon: <Heart className="w-8 h-8 text-yellow-500" />,
              title: "Personalized Service",
              description: "Customized treatments tailored to your specific hair needs."
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>


      {/* All Services */}
      <LazyWrapper delay={0.3}>
        <div className="container mx-auto px-6 mb-16">
          {loading ? (
            <div className="grid grid-cols-1 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchServices}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg transition"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  index={index}
                  isSelected={selectedService === service._id}
                  onSelect={handleServiceSelect}
                  onBook={handleBookAppointment}
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
            <h3 className="text-3xl font-bold mb-6">Ready for a Hair Transformation?</h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Book your hair appointment today and experience the Enlive difference in hair care expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 font-semibold rounded-lg transition flex items-center justify-center gap-2">
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