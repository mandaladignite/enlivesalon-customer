"use client";

import Footer from "@/components/customer/UI/Footer";
import { motion } from "framer-motion";
import { 
  Crown, 
  Scissors, 
  Sparkles, 
  Star, 
  Check, 
  Zap, 
  Heart, 
  Loader2, 
  AlertCircle,
  Shield,
  Clock,
  Gift,
  Users,
  Award,
  TrendingUp,
  Calendar,
  Sparkle,
  ArrowRight,
  CheckCircle,
  X,
  Info
} from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/customer/UI/Header";
import { packageAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
// import { useMembershipActions } from "@/hooks/useMembership";
import MembershipPayment from "@/components/payment/MembershipPayment";
import ThankYouDialog from "@/components/customer/ThankYouDialog";

interface Package {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  duration: number;
  durationUnit: 'days' | 'weeks' | 'months' | 'years';
  formattedDuration: string;
  benefits: string[];
  services: string[];
  discountPercentage: number;
  savingsAmount: number;
  maxAppointments: number | null;
  isActive: boolean;
  isPopular: boolean;
  sortOrder: number;
  termsAndConditions?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Membership() {
  const { user } = useAuth();
  // const { purchaseMembership, loading: actionLoading, error: actionError } = useMembershipActions();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [purchasedMembership, setPurchasedMembership] = useState<Package | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await packageAPI.getAll({ isActive: true, sortBy: 'sortOrder', sortOrder: 'asc' });
        if (response.success) {
          setPackages(response.data.packages);
          if (response.data.packages.length > 0) {
            setSelectedPlan(response.data.packages[0]._id);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const benefits = [
    {
      icon: <Star className="w-10 h-10 text-amber-500" />,
      title: "Exclusive Discounts",
      description: "Enjoy up to 40% savings on premium services and exclusive member-only pricing.",
      color: "from-amber-50 to-amber-100",
      iconBg: "bg-amber-100"
    },
    {
      icon: <Zap className="w-10 h-10 text-purple-500" />,
      title: "Priority Booking",
      description: "Get preferred appointment times with our priority scheduling system and VIP treatment.",
      color: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-100"
    },
    {
      icon: <Heart className="w-10 h-10 text-rose-500" />,
      title: "Member-only Events",
      description: "Access to exclusive events, workshops, and service launches before the public.",
      color: "from-rose-50 to-rose-100",
      iconBg: "bg-rose-100"
    },
    {
      icon: <Shield className="w-10 h-10 text-emerald-500" />,
      title: "Premium Support",
      description: "Dedicated customer support with faster response times and personalized service.",
      color: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-100"
    },
    {
      icon: <Gift className="w-10 h-10 text-indigo-500" />,
      title: "Birthday Rewards",
      description: "Special birthday treatments and exclusive gifts to celebrate your special day.",
      color: "from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-100"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-cyan-500" />,
      title: "Loyalty Points",
      description: "Earn points with every visit and redeem them for free services and products.",
      color: "from-cyan-50 to-cyan-100",
      iconBg: "bg-cyan-100"
    }
  ];

  const handleJoinNow = (pkg: any) => {
    if (!user) {
      alert('Please login to purchase a membership');
      return;
    }

    setSelectedPackage(pkg);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (membership: any) => {
    try {
      setPurchaseSuccess(true);
      setShowPayment(false);
      setSelectedPackage(null);
      setPurchasedMembership(membership);
      setShowThankYou(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to purchase membership');
    }
  };

  const handlePaymentError = (error: string) => {
    setError(error);
    setShowPayment(false);
    setSelectedPackage(null);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedPackage(null);
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
    setPurchasedMembership(null);
  };

  const getCardGradient = (isPopular: boolean, index: number) => {
    if (isPopular) return "from-amber-50 via-yellow-50 to-amber-100";
    const gradients = [
      "from-slate-50 via-gray-50 to-slate-100",
      "from-blue-50 via-indigo-50 to-blue-100", 
      "from-purple-50 via-violet-50 to-purple-100"
    ];
    return gradients[index % gradients.length];
  };

  const getBorderColor = (isPopular: boolean) => {
    return isPopular ? "border-amber-300" : "border-gray-200";
  };

  const getButtonStyle = (isPopular: boolean) => {
    return isPopular 
      ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg shadow-amber-500/25"
      : "bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white shadow-lg";
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-purple-50/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f59e0b%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="relative container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center max-w-4xl mx-auto"
          >
            {/* Crown Icon with Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/25">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                <Sparkle className="w-3 h-3 text-white" />
              </div>
            </motion.div>

            {/* Decorative Lines */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full">
                <span className="text-amber-700 font-semibold text-sm tracking-wider">PREMIUM MEMBERSHIP</span>
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-amber-600 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
              Enlive Membership
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
              Elevate your beauty experience with our exclusive membership plans. 
              <span className="text-amber-600 font-semibold"> Unlock premium benefits</span> and 
              <span className="text-purple-600 font-semibold"> save up to 40%</span> on all services.
            </p>

          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-amber-600">Enlive Membership?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our membership program is designed to reward our loyal clients with exclusive benefits, 
              premium services, and significant savings throughout the year.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-full"
              >
                <div className={`relative bg-gradient-to-br ${benefit.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-white/50 h-full flex flex-col`}>
                  <div className={`w-16 h-16 ${benefit.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {benefit.description}
                  </p>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Membership Plans */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your <span className="text-amber-600">Perfect Plan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Select the membership that best fits your lifestyle and beauty needs. 
              All plans include exclusive benefits and significant savings.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                <span className="text-lg text-gray-600">Loading membership plans...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex items-center gap-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
                <span className="text-lg text-red-600">{error}</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group h-full"
                  onMouseEnter={() => setHoveredCard(pkg._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Popular Badge */}
                  {pkg.isPopular && (
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                    >
                      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-amber-500/25">
                        <Star className="w-4 h-4 fill-current" />
                        MOST POPULAR
                      </div>
                    </motion.div>
                  )}

                  <div className={`relative bg-gradient-to-br ${getCardGradient(pkg.isPopular, index)} rounded-3xl overflow-hidden border-2 ${getBorderColor(pkg.isPopular)} shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full flex flex-col`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23f59e0b%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
                    
                    <div className="relative p-8 flex flex-col h-full">
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg">
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                            <Crown className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{pkg.name}</h3>
                          <p className="text-gray-700 leading-relaxed text-base font-medium">{pkg.description}</p>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="text-center mb-8">
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg">
                          <div className="flex items-baseline justify-center mb-3">
                            <span className="text-4xl font-bold text-gray-900">₹{pkg.discountedPrice}</span>
                            {pkg.discountedPrice < pkg.price && (
                              <>
                                <span className="text-2xl text-gray-500 line-through ml-4">₹{pkg.price}</span>
                              </>
                            )}
                          </div>
                          
                          {pkg.discountedPrice < pkg.price && (
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold shadow-lg">
                                {pkg.discountPercentage}% OFF
                              </span>
                              <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full text-xs font-bold shadow-lg">
                                Save ₹{pkg.price - pkg.discountedPrice}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-center gap-2 text-gray-600 font-semibold">
                            <Calendar className="w-4 h-4 text-amber-600" />
                            <span className="text-sm">{pkg.formattedDuration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Membership Details */}
                      <div className="mb-8">
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                          <h4 className="text-base font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-2">
                            <Award className="w-4 h-4 text-amber-600" />
                            Membership Details
                          </h4>
                          
                          {/* Key Stats */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-3 text-center">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Calendar className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-lg font-bold text-gray-900">{pkg.duration}</div>
                              <div className="text-xs text-gray-600 capitalize">{pkg.durationUnit}</div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-3 text-center">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Users className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-lg font-bold text-gray-900">
                                {pkg.maxAppointments ? pkg.maxAppointments : '∞'}
                              </div>
                              <div className="text-xs text-gray-600">Appointments</div>
                            </div>
                          </div>

                          {/* Benefits */}
                          <div className="space-y-2 flex-grow">
                            <h5 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <Gift className="w-3 h-3 text-amber-600" />
                              What's Included:
                            </h5>
                            {pkg.benefits.map((benefit, benefitIndex) => (
                              <motion.div
                                key={benefitIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: benefitIndex * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                              >
                                <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/60 transition-all duration-300">
                                  <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                    <Check className="w-2.5 h-2.5 text-white font-bold" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-gray-800 leading-relaxed font-medium text-xs group-hover:text-gray-900 transition-colors duration-300">
                                      {benefit}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleJoinNow(pkg)}
                        disabled={false}
                        className={`w-full py-3 px-6 rounded-2xl font-bold text-base transition-all duration-300 ${getButtonStyle(pkg.isPopular)} disabled:opacity-50 disabled:cursor-not-allowed mt-auto`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          Join Now
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </motion.button>

                      {/* Hover Effect Overlay */}
                      {hoveredCard === pkg._id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-3xl pointer-events-none"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f59e0b%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="text-amber-400">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Getting started with your Enlive membership is simple and straightforward. 
              Join thousands of satisfied members in just a few steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Choose Your Plan", 
                description: "Select the membership that fits your needs and budget perfectly",
                icon: <Crown className="w-8 h-8" />
              },
              { 
                step: "02", 
                title: "Sign Up", 
                description: "Complete your registration in minutes with our secure process",
                icon: <Users className="w-8 h-8" />
              },
              { 
                step: "03", 
                title: "Enjoy Benefits", 
                description: "Start using your member benefits immediately after purchase",
                icon: <Gift className="w-8 h-8" />
              },
              { 
                step: "04", 
                title: "Save & Relax", 
                description: "Enjoy ongoing savings and premium services throughout your membership",
                icon: <Award className="w-8 h-8" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Membership <span className="text-amber-600">FAQs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our membership program. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "Can I change my membership plan later?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle with prorated adjustments."
                },
                {
                  question: "Is there a commitment period?",
                  answer: "No, our memberships are month-to-month with no long-term commitment. You can cancel anytime with 30 days notice."
                },
                {
                  question: "Do unused services roll over?",
                  answer: "Haircuts and treatments do not roll over to the next month. We encourage you to use your monthly allotment to maximize value."
                },
                {
                  question: "Can I share my membership benefits?",
                  answer: "Membership benefits are personal and non-transferable. Each membership is tied to your account for security purposes."
                },
                {
                  question: "How do I cancel my membership?",
                  answer: "You can cancel by contacting our membership team at least 30 days before your next billing date. We'll help you through the process."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets for your convenience."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Info className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-12 border border-amber-200">
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Become a <span className="text-amber-600">Member?</span>
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join the Enlive family today and start enjoying exclusive benefits, 
                premium services, and significant savings. Your beauty journey starts here.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-12 py-4 font-bold text-lg rounded-2xl shadow-lg shadow-amber-500/25 transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <Crown className="w-6 h-6" />
                Join Now
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Payment Modal */}
      {showPayment && selectedPackage && (
        <MembershipPayment
          membership={selectedPackage}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          onClose={handleClosePayment}
        />
      )}

      {/* Thank You Dialog */}
      {showThankYou && purchasedMembership && (
        <ThankYouDialog
          isOpen={showThankYou}
          onClose={handleCloseThankYou}
          membership={purchasedMembership}
        />
      )}
    </section>
  );
}