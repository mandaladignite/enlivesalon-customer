"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Scissors, ChevronLeft, ChevronRight, Star, Users, Award, Clock, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

// Carousel data with different images
const carouselSlides = [
  {
    id: 1,
    image: "/diwali-offer.jpg",
    title: "Celebrate This Diwali with a Glow!",
    subtitle: "25% Off on All Beauty & Wellness Services",
    description: "This festive season, treat yourself to a radiant transformation! Enjoy premium beauty services from our expert stylists at an exclusive 25% Diwali discount. Shine brighter than ever before.",
    cta: "Book Now & Save 25%",
    ctaSecondary: "View Offers",
    stats: [
      { icon: Users, value: "10K+", label: "Delighted Clients" },
      { icon: Star, value: "4.5", label: "Customer Rating" },
      { icon: Award, value: "35+", label: "Years of Expertise" }
    ]
  },
  {
    id: 2,
    image: "/herobg.jpg",
    title: "Professional Stylists",
    subtitle: "Expert Beauty Team",
    description: "Our certified professionals bring years of experience and the latest techniques to give you the perfect look.",
    cta: "Meet Our Team",
    ctaSecondary: "View Gallery",
    stats: [
      { icon: Users, value: "50+", label: "Expert Stylists" },
      { icon: Clock, value: "24/7", label: "Support" },
      { icon: Award, value: "100%", label: "Satisfaction" }
    ]
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  
  // Auto-advance slides (pauses on hover)
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [isHovered]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      className="relative min-h-screen overflow-hidden w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-rose-900/20 z-0" />
      
      {/* Carousel slides */}
      <div className="relative h-full min-h-screen">
        <AnimatePresence mode="wait">
          {carouselSlides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <div 
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${slide.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/90" />
                </div>

                {/* Content */}
                <div className="relative flex items-center justify-center text-white h-full min-h-screen z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                    {/* Left Content */}
                    <motion.div
                      initial={{ opacity: 0, x: -80 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                      <div className="space-y-4 lg:space-y-6">
                        {/* Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2"
                        >
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                          <span className="text-gold font-medium text-xs sm:text-sm tracking-wider">
                            {slide.subtitle}
                          </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent"
                        >
                          {slide.title}
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.9 }}
                          className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed mx-auto lg:mx-0"
                        >
                          {slide.description}
                        </motion.p>
                      </div>

                      {/* Stats */}
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 py-2"
                      >
                        {slide.stats.map((stat, statIndex) => {
                          const IconComponent = stat.icon;
                          return (
                            <motion.div 
                              key={statIndex} 
                              className="text-center group"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="flex justify-center mb-2">
                                <div className="p-1.5 sm:p-2 bg-gold/20 rounded-full group-hover:bg-gold/30 transition-colors">
                                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gold" />
                                </div>
                              </div>
                              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-1">
                                {stat.value}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-400 font-medium">
                                {stat.label}
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>

                      {/* CTA Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                      >
                        <Link
                          href={slide.cta === "Book Appointment" ? (user ? "/book" : "/auth/login") : 
                                slide.cta === "Meet Our Team" ? "/team" : (user ? "/book" : "/auth/login")}
                          className="group relative bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gold/30 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          <span>{slide.cta}</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                        </Link>
                        
                        <Link
                          href={slide.ctaSecondary === "Explore Services" ? "/services" : 
                                slide.ctaSecondary === "View Gallery" ? "/gallery" : "/services"}
                          className="group border-2 border-white/30 hover:border-gold text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:bg-gold/10 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          <span>{slide.ctaSecondary}</span>
                        </Link>
                      </motion.div>
                    </motion.div>

                    {/* Right Content - Decorative Element */}
                    <motion.div
                      initial={{ opacity: 0, x: 80, rotate: 10 }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="hidden lg:flex justify-center items-center order-1 lg:order-2"
                    >
                      <div className="relative max-w-sm mx-auto">
                        {/* Main decorative circle */}
                        <div className="w-64 h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 bg-gradient-to-br from-gold/10 to-gold/5 rounded-full border border-gold/20 backdrop-blur-lg shadow-2xl flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                              <Scissors className="w-12 h-12 lg:w-16 lg:h-16 text-gold mx-auto" />
                            </motion.div>
                            <p className="text-gold font-semibold text-base lg:text-lg tracking-wide">
                              Luxury Experience
                            </p>
                          </div>
                        </div>
                        
                        {/* Floating elements - positioned within bounds */}
                        <motion.div 
                          className="absolute top-0 right-0 w-16 h-16 lg:w-20 lg:h-20 bg-gold/20 rounded-full blur-xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div 
                          className="absolute bottom-0 left-0 w-20 h-20 lg:w-24 lg:h-24 bg-gold/10 rounded-full blur-2xl"
                          animate={{ scale: [1.2, 1, 1.2] }}
                          transition={{ duration: 5, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      

      {/* Indicator dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {carouselSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-gold scale-125 shadow-gold/50" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gold"
                layoutId="activeDot"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-gold to-gold-dark"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "pause" : "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          key={currentSlide}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-4 right-8 hidden lg:flex flex-col items-center text-white/60"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <span className="text-sm mb-2 rotate-90 origin-center whitespace-nowrap">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-gold"
        />
      </motion.div>
    </section>
  );
}