"use client";

import Footer from "@/components/customer/UI/Footer";
import Header from "@/components/customer/UI/Header";
import { motion } from "framer-motion";
import { Heart, Clock, Star, Calendar, Zap, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { serviceAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

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

export default function BodyServices() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const servicesResponse = await serviceAPI.getByCategory("body", { limit: 50 });

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

  const filteredServices = services;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const calculateDiscountedPrice = (service: Service) => {
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
  };

  const isDiscountActive = (service: Service) => {
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
  };

  const handleBookAppointment = (service: Service) => {
    if (!user) {
      // Redirect to login if not authenticated
      router.push('/auth/login');
      return;
    }
    // Redirect to booking form with pre-selected service
    const bookingUrl = `/book?serviceId=${service._id}&step=2`;
    router.push(bookingUrl);
  };


  return (
    <section className="w-full mt-16 bg-white">
      <Header />
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



      {/* All Services */}
      <div className="container mx-auto px-6 mb-16">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-lg p-6 border hover:shadow-md transition ${
                  selectedService === service._id ? 'border-green-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedService(service._id === selectedService ? null : service._id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {service.photo ? (
                      <img
                        src={service.photo}
                        alt={service.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-6 h-6 text-green-600" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        {service.name}
                        {service.isFeatured && (
                          <Star className="w-5 h-5 text-green-500 fill-current" />
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
                        <div className="text-green-700 font-semibold text-lg">
                          {formatPrice(calculateDiscountedPrice(service))}
                        </div>
                        <div className="text-green-600 text-xs font-medium">
                          {service.discount?.percentage}% OFF
                        </div>
                      </div>
                    ) : (
                      <span className="text-green-700 font-semibold text-lg">{formatPrice(service.price)}</span>
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
                      <Heart className="w-4 h-4" />
                      Salon Service
                    </span>
                  )}
                </div>
                
                {selectedService === service._id && (
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
                          handleBookAppointment(service);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition"
                      >
                        Book This Service
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
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
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Enlive Body Services?</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our expert therapists and premium products ensure you get the best results for your body.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Heart className="w-8 h-8 text-green-500" />,
              title: "Expert Therapists",
              description: "Our certified therapists have years of experience and training."
            },
            {
              icon: <Sparkles className="w-8 h-8 text-green-500" />,
              title: "Premium Products",
              description: "We use only the highest quality professional body care products."
            },
            {
              icon: <Zap className="w-8 h-8 text-green-500" />,
              title: "Latest Techniques",
              description: "Stay current with the latest trends and techniques in body care."
            },
            {
              icon: <Heart className="w-8 h-8 text-green-500" />,
              title: "Personalized Service",
              description: "Customized treatments tailored to your specific body needs."
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
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
}