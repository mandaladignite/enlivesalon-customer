// app/components/Testimonials.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Barbering is a craft and one of the oldest professions in the world. A refreshing beverage of your choice, and a hot towel finish – you’ll never want to leave. It’s not only a job. It’s a way of living.",
    name: "Rame Jack",
    age: "25 years old",
    image: "/client.jpg", // replace with your image path
  },
  {
    id: 2,
    quote:
      "The service is exceptional, the staff is friendly, and the atmosphere is perfect. It’s more than just grooming, it’s an experience you always look forward to.",
    name: "John Doe",
    age: "32 years old",
    image: "/client.jpg",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[index];

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
            key={testimonial.id}
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
            key={testimonial.image}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={testimonial.image}
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
