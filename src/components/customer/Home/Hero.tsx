"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  ChevronRight,
  ChevronLeft,
  Star,
  Users,
  Award,
  Clock,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { heroAPI } from "@/lib/api";
import LoadingSpinner from "@/components/common/LoadingSpinner";

// Icon mapping for stats
const iconMap: Record<string, any> = {
  Users,
  Star,
  Award,
  Clock,
};

interface HeroSection {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage: string;
  ctaPrimary: {
    text: string;
    link: string;
  };
  ctaSecondary?: {
    text: string;
    link: string;
  };
  stats?: Array<{
    icon: string;
    value: string;
    label: string;
  }>;
  isActive?: boolean;
  sortOrder: number;
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  // Fetch hero sections from API
  useEffect(() => {
    const fetchHeroSections = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await heroAPI.getAll({ isActive: true, sortOrder: 'asc' });
        if (response.success && response.data?.heroSections) {
          // Filter to only show active sections
          const activeSections = response.data.heroSections.filter(
            (section: HeroSection) => section.isActive !== false
          );
          setHeroSections(activeSections);
          
          // Preload images for better performance
          activeSections.forEach((section: HeroSection) => {
            const img = new Image();
            img.src = section.backgroundImage;
          });
        } else {
          setError('No hero sections available');
        }
      } catch (err) {
        console.error('Error fetching hero sections:', err);
        setError(err instanceof Error ? err.message : 'Failed to load hero sections');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSections();
  }, []);

  // Auto slide
  useEffect(() => {
    if (isHovered || heroSections.length === 0 || heroSections.length === 1) return;
    const timer = setInterval(
      () => setCurrentSlide((p) => (p + 1) % heroSections.length),
      6000
    );
    return () => clearInterval(timer);
  }, [isHovered, heroSections.length]);

  const goToSlide = useCallback((i: number) => {
    if (i >= 0 && i < heroSections.length) {
      setCurrentSlide(i);
    }
  }, [heroSections.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSections.length);
  }, [heroSections.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSections.length) % heroSections.length);
  }, [heroSections.length]);

  const handleImageError = useCallback((imageUrl: string) => {
    setImageErrors((prev) => new Set(prev).add(imageUrl));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (heroSections.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [heroSections.length, nextSlide, prevSlide]);

  // Check if link is external
  const isExternalLink = (link: string): boolean => {
    return link.startsWith('http://') || link.startsWith('https://') || link.startsWith('//');
  };

  // Show loading state
  if (loading) {
    return (
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-black to-rose-900/20">
        <div className="text-white">
          <LoadingSpinner size="lg" text="Loading..." />
        </div>
      </section>
    );
  }

  // Fallback to default hero section if no sections or error
  if (heroSections.length === 0 || error) {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-rose-900/20 z-0" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/herobg.jpg)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-6">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Welcome to Enlive Salon</h1>
            <p className="text-lg mb-6">Premium Beauty Services in Pune</p>
            <Link
              href={user ? "/book" : "/auth/login"}
              className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black font-semibold px-6 py-3 rounded-md transition-transform hover:scale-105 inline-flex items-center gap-2"
            >
              Book Now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Hero carousel"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-rose-900/20 z-0" />

      {/* Slides */}
      <AnimatePresence mode="wait">
        {heroSections.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center h-screen"
              >
                {/* Background Image */}
                {!imageErrors.has(slide.backgroundImage) ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url('${slide.backgroundImage}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <img
                      src={slide.backgroundImage}
                      alt={slide.title}
                      className="hidden"
                      onError={() => handleImageError(slide.backgroundImage)}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-rose-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />

                {/* Content */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-white h-full">
                  {/* Left section */}
                  <div className="max-w-xl text-center lg:text-left space-y-5">
                    {slide.subtitle && (
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
                    )}

                    <motion.h1
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent"
                    >
                      {slide.title}
                    </motion.h1>

                    {slide.description && (
                      <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-base sm:text-lg text-gray-300 leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>
                    )}

                    {/* Stats */}
                    {slide.stats && slide.stats.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="grid grid-cols-3 gap-4 pt-4"
                      >
                        {slide.stats.map((stat, i) => {
                          const Icon = iconMap[stat.icon] || Users;
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
                    )}

                    {/* Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start"
                    >
                      {isExternalLink(slide.ctaPrimary.link) ? (
                        <a
                          href={slide.ctaPrimary.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black font-semibold px-6 py-3 rounded-md transition-transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          {slide.ctaPrimary.text}
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <Link
                          href={slide.ctaPrimary.link}
                          className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black font-semibold px-6 py-3 rounded-md transition-transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          {slide.ctaPrimary.text}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      )}

                      {slide.ctaSecondary?.text && slide.ctaSecondary?.link && (
                        isExternalLink(slide.ctaSecondary.link) ? (
                          <a
                            href={slide.ctaSecondary.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-white/40 hover:border-gold text-white font-medium px-6 py-3 rounded-md backdrop-blur-sm hover:bg-gold/10 transition-transform hover:scale-105 text-sm sm:text-base"
                          >
                            {slide.ctaSecondary.text}
                          </a>
                        ) : (
                          <Link
                            href={slide.ctaSecondary.link}
                            className="border border-white/40 hover:border-gold text-white font-medium px-6 py-3 rounded-md backdrop-blur-sm hover:bg-gold/10 transition-transform hover:scale-105 text-sm sm:text-base"
                          >
                            {slide.ctaSecondary.text}
                          </Link>
                        )
                      )}
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

      {/* Navigation Arrows */}
      {heroSections.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {heroSections.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {heroSections.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all hover:scale-125 ${
                i === currentSlide ? "bg-gold scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
