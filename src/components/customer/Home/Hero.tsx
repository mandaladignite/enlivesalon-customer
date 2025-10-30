"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  ChevronRight,
  Star,
  Users,
  Award,
  Clock,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

// Carousel data
const carouselSlides = [
  {
    id: 1,
    image: "/diwali-offer.jpg",
    title: "Best Salon in Pune | Premium Beauty Services",
    subtitle: "25% Off on All Beauty & Wellness Services",
    description:
      "Experience the finest salon services in Pune! Our expert stylists in Viman Nagar offer premium hair styling, skin treatments, nail art, and beauty services. Book your appointment today and enjoy exclusive Diwali discounts.",
    cta: "Book Now & Save 25%",
    ctaSecondary: "View Offers",
    stats: [
      { icon: Users, value: "10K+", label: "Happy Clients" },
      { icon: Star, value: "4.9", label: "Customer Rating" },
      { icon: Award, value: "15+", label: "Years Experience" },
    ],
  },
  {
    id: 2,
    image: "/herobg.jpg",
    title: "Top Unisex Salon in Pune | Professional Stylists",
    subtitle: "Expert Beauty Team in Viman Nagar",
    description:
      "Pune's most trusted unisex salon with certified professionals. We specialize in haircuts, coloring, skin treatments, and bridal makeup. Located in Viman Nagar with premium beauty services daily.",
    cta: "Meet Our Team",
    ctaSecondary: "View Gallery",
    stats: [
      { icon: Users, value: "50+", label: "Expert Stylists" },
      { icon: Clock, value: "9AM–8PM", label: "Open Daily" },
      { icon: Award, value: "100%", label: "Satisfaction" },
    ],
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();

  // Auto slide
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(
      () => setCurrentSlide((p) => (p + 1) % carouselSlides.length),
      6000
    );
    return () => clearInterval(timer);
  }, [isHovered]);

  const goToSlide = (i: number) => setCurrentSlide(i);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-rose-900/20 z-0" />

      {/* Slides */}
      <AnimatePresence mode="wait">
        {carouselSlides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center h-screen"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />

                {/* Content */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-white h-full">
                  {/* Left section */}
                  <div className="max-w-xl text-center lg:text-left space-y-5">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-3 py-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span className="text-gold text-sm tracking-wide">
                        {slide.subtitle}
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-base sm:text-lg text-gray-300 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="grid grid-cols-3 gap-4 pt-4"
                    >
                      {slide.stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                          <div key={i} className="text-center">
                            <div className="flex justify-center mb-1">
                              <div className="p-2 bg-gold/20 rounded-full">
                                <Icon className="w-4 h-4 text-gold" />
                              </div>
                            </div>
                            <div className="text-xl font-bold">{stat.value}</div>
                            <div className="text-sm text-gray-400">
                              {stat.label}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start"
                    >
                      <Link
                        href={
                          slide.cta === "Book Now & Save 25%"
                            ? user
                              ? "/book"
                              : "/auth/login"
                            : "/team"
                        }
                        className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black font-semibold px-6 py-3 rounded-md transition-transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        {slide.cta}
                        <ChevronRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href={
                          slide.ctaSecondary === "View Gallery"
                            ? "/gallery"
                            : "/services"
                        }
                        className="border border-white/40 hover:border-gold text-white font-medium px-6 py-3 rounded-md backdrop-blur-sm hover:bg-gold/10 transition-transform hover:scale-105 text-sm sm:text-base"
                      >
                        {slide.ctaSecondary}
                      </Link>
                    </motion.div>
                  </div>

                  {/* Right graphic */}
                  <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="hidden lg:flex justify-center items-center relative"
                  >
                    <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Scissors className="w-14 h-14 text-gold" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {carouselSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentSlide ? "bg-gold scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
