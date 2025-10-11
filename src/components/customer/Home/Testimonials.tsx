// app/components/Testimonials.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { reviewAPI } from "@/lib/api";

interface Review {
  _id: string;
  name: string;
  age: string;
  quote: string;
  image: {
    public_id: string;
    secure_url: string;
    url: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
  };
  rating: number;
  isActive: boolean;
  isFeatured: boolean;
  service?: string;
}

// Fallback testimonials in case API fails
const fallbackTestimonials = [
  {
    _id: "1",
    quote:
      "Barbering is a craft and one of the oldest professions in the world. A refreshing beverage of your choice, and a hot towel finish – you'll never want to leave. It's not only a job. It's a way of living.",
    name: "Rame Jack",
    age: "25 years old",
    image: {
      public_id: "fallback-image-1",
      secure_url: "/client.jpg",
      url: "/client.jpg"
    },
    rating: 5,
    isActive: true,
    isFeatured: true,
  },
  {
    _id: "2",
    quote:
      "The service is exceptional, the staff is friendly, and the atmosphere is perfect. It's more than just grooming, it's an experience you always look forward to.",
    name: "John Doe",
    age: "32 years old",
    image: {
      public_id: "fallback-image-2",
      secure_url: "/client.jpg",
      url: "/client.jpg"
    },
    rating: 5,
    isActive: true,
    isFeatured: false,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Review[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewAPI.getActive({ limit: 10 });
        if (response.data && response.data.reviews && response.data.reviews.length > 0) {
          setTestimonials(response.data.reviews);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Keep fallback testimonials
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextTestimonial = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[index];

  // Show loading state
  if (loading) {
    return (
      <section className="bg-[#faf8f6] flex flex-col md:flex-row items-center justify-between min-h-[500px]">
        <div className="w-full md:w-1/2 p-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
        <div className="w-full md:w-1/2 relative h-[500px] bg-gray-200 animate-pulse"></div>
      </section>
    );
  }

  return (
    <section className=" bg-[#faf8f6] flex flex-col md:flex-row items-center justify-between">
      {/* Left Content */}
      <div className="w-full md:w-1/2 p-10 relative">
        {/* Quote Icon */}
        <div className="text-yellow-500 text-7xl font-bold leading-none mb-4">
          “
        </div>

        <p className="text-sm uppercase font-semibold tracking-widest mb-3">
          What Clients Say
        </p>

        <AnimatePresence mode="wait">
          <motion.p
            key={testimonial._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-gray-700 italic mb-8"
          >
            {testimonial.quote}
          </motion.p>
        </AnimatePresence>

        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-bold uppercase"
        >
          {testimonial.name}
          <p className="text-gray-500 normal-case font-normal">{testimonial.age}</p>
          {testimonial.service && (
            <p className="text-sm text-gray-400 normal-case font-normal mt-1">
              {testimonial.service}
            </p>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex space-x-2 mt-6">
          <button
            onClick={prevTestimonial}
            className="bg-black text-white p-3 hover:opacity-80 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="bg-yellow-600 text-white p-3 hover:opacity-80 transition"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 relative h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonial._id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={testimonial.image.secure_url || testimonial.image.url}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
