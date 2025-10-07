"use client";

import { motion } from "framer-motion";
import { Scissors, Users, Heart, Award, Star, ArrowLeft, Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Clock, Sparkles, Loader2 } from "lucide-react";
import Footer from "@/components/customer/UI/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { stylistAPI } from "@/lib/api";

interface Stylist {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  experience: number;
  rating: number;
  bio?: string;
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: string[];
  availableForHome: boolean;
  availableForSalon: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<Stylist | null>(null);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch stylists from backend
  useEffect(() => {
    const fetchStylists = async () => {
      try {
        setLoading(true);
        const response = await stylistAPI.getAll({ isActive: true });
        if (response.success) {
          setStylists(response.data.stylists || []);
        } else {
          setError(response.message || "Failed to fetch stylists");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stylists");
      } finally {
        setLoading(false);
      }
    };

    fetchStylists();
  }, []);

  const openMemberModal = (member: Stylist) => {
    setSelectedMember(member);
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
  };

  // Helper function to format working days
  const formatWorkingDays = (days: string[]) => {
    const dayMap: { [key: string]: string } = {
      monday: "Mon",
      tuesday: "Tue", 
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun"
    };
    return days.map(day => dayMap[day] || day).join(", ");
  };

  // Helper function to format working hours
  const formatWorkingHours = (hours: { start: string; end: string }) => {
    return `${hours.start} - ${hours.end}`;
  };

  // Helper function to get specialty display names
  const getSpecialtyDisplayName = (specialty: string) => {
    const specialtyMap: { [key: string]: string } = {
      hair: "Hair Styling",
      nails: "Nail Art",
      skincare: "Skincare",
      massage: "Massage Therapy",
      makeup: "Makeup Artistry",
      other: "Other Services"
    };
    return specialtyMap[specialty] || specialty;
  };

  return (
    <section className="w-full bg-white min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* Back Button */}
            <div className="w-full max-w-7xl mb-8">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-px bg-yellow-500"></div>
              <Users className="w-8 h-8 text-yellow-500" />
              <div className="w-12 h-px bg-yellow-500"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h1>
            <p className="text-lg text-gray-600 max-w-3xl text-center">
              Our talented team of beauty and wellness professionals is here to help you look and feel your absolute best. 
              Each member brings unique expertise and passion to create your perfect experience.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: stylists.length.toString(), label: "Expert Professionals" },
              { number: `${stylists.reduce((sum, stylist) => sum + stylist.experience, 0)}+`, label: "Years Combined Experience" },
              { number: "2,500+", label: "Happy Clients" },
              { number: stylists.length > 0 ? (stylists.reduce((sum, stylist) => sum + stylist.rating, 0) / stylists.length).toFixed(1) : "0.0", label: "Average Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4"
              >
                <p className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
            <span className="ml-2 text-gray-600">Loading team members...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-500 text-lg mb-2">Error loading team members</div>
            <div className="text-gray-600">{error}</div>
          </div>
        ) : stylists.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <div className="text-gray-500 text-lg mb-2">No team members found</div>
            <div className="text-gray-400">Check back later for updates</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stylists.map((stylist, index) => (
              <motion.div
                key={stylist._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                onClick={() => openMemberModal(stylist)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src="/client.jpg" 
                    alt={stylist.name} 
                    className="w-full h-80 object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{stylist.rating.toFixed(1)}</span>
                      <span className="text-sm">({stylist.experience} years exp)</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{stylist.name}</h3>
                  <p className="text-yellow-600 font-medium mb-2">
                    {stylist.specialties.map(s => getSpecialtyDisplayName(s)).join(", ")}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{stylist.experience} years of experience</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {stylist.specialties.slice(0, 3).map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                        >
                          {getSpecialtyDisplayName(specialty)}
                        </span>
                      ))}
                      {stylist.specialties.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{stylist.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{formatWorkingDays(stylist.workingDays)}: {formatWorkingHours(stylist.workingHours)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {stylist.availableForHome && stylist.availableForSalon ? "Home & Salon" :
                         stylist.availableForHome ? "Home Only" : "Salon Only"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <button
                onClick={closeMemberModal}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <div>
                  <img 
                    src="/client.jpg" 
                    alt={selectedMember.name} 
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedMember.name}</h2>
                    <p className="text-yellow-600 font-medium text-lg mb-4">
                      {selectedMember.specialties.map(s => getSpecialtyDisplayName(s)).join(", ")}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                        <span>{selectedMember.rating.toFixed(1)}</span>
                      </div>
                      <div>{selectedMember.experience} years experience</div>
                    </div>
                  </div>

                  {selectedMember.bio && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedMember.bio}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.specialties.map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full"
                        >
                          {getSpecialtyDisplayName(specialty)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Availability</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{formatWorkingDays(selectedMember.workingDays)}: {formatWorkingHours(selectedMember.workingHours)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {selectedMember.availableForHome && selectedMember.availableForSalon ? "Available at Home & Salon" :
                           selectedMember.availableForHome ? "Available at Home Only" : "Available at Salon Only"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{selectedMember.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{selectedMember.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <Link 
                      href="/book"
                      className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Book with {selectedMember.name.split(' ')[0]}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-3xl font-bold mb-6">Ready to Meet Your Perfect Match?</h3>
            <p className="text-gray-300 mb-8">
              Book an appointment with one of our expert professionals and experience the Enlive difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/book"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Book Appointment
              </Link>
              <Link 
                href="/gallery"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
