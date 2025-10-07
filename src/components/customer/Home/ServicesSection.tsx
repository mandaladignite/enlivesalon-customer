"use client";

import { motion } from "framer-motion";
import { Scissors, Sparkles, User, Bath } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Haircut",
    subtitle: "Style & Mastership",
    image: "/haircut.jpg",
  },
  {
    icon: Sparkles,
    title: "Skin",
    subtitle: "For Connoisseurs",
    image: "/skinservice.jpg",
  },
  {
    icon: User,
    title: "Nail",
    subtitle: "Best Professionals",
    image: "/nailservice.jpg",
  },
  {
    icon: Bath,
    title: "Body",
    subtitle: "Comprehensive Care",
    image: "/bodyservice.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-sm uppercase tracking-widest font-semibold text-yellow-600 mb-2">
          Our Services
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-black">
          A Range of Premium Services
        </h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-md shadow-lg"
          >
            {/* Background Image (hidden until hover) */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 duration-500 transition-all"
              style={{ backgroundImage: `url(${service.image})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/90 group-hover:bg-black/60 transition duration-500" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-16 px-6">
              <service.icon className="w-12 h-12 mb-6 text-white" />
              <p className="uppercase text-sm tracking-wide text-yellow-500 mb-2">
                {service.subtitle}
              </p>
              <h3 className="text-xl font-bold">{service.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
