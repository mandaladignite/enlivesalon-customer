"use client";

import { motion } from "framer-motion";
import { Scissors, Sparkles, User, Bath, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Scissors,
    title: "Haircut",
    subtitle: "Style & Mastership",
    description: "Expert haircuts tailored to your unique style and personality",
    image: "/haircut.jpg",
    color: "from-blue-500 to-purple-600",
    link: "/hair",
  },
  {
    icon: Sparkles,
    title: "Skin Care",
    subtitle: "For Connoisseurs",
    description: "Luxurious treatments for radiant and healthy-looking skin",
    image: "/skinservice.jpg",
    color: "from-pink-500 to-rose-600",
    link: "/skin",
  },
  {
    icon: User,
    title: "Nail Art",
    subtitle: "Best Professionals",
    description: "Creative nail designs and professional manicure services",
    image: "/nailservice.jpg",
    color: "from-green-500 to-emerald-600",
    link: "/nail",
  },
  {
    icon: Bath,
    title: "Body Care",
    subtitle: "Comprehensive Care",
    description: "Rejuvenating treatments for complete body wellness",
    image: "/bodyservice.jpg",
    color: "from-amber-500 to-orange-600",
    link: "/body",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-24 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-widest font-semibold text-yellow-600 mb-3">
            Our Premium Services
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Elevate Your Beauty
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our exclusive range of beauty services designed to bring out your natural radiance
          </p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            {/* Card */}
            <Link href={service.link} className="block">
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer">
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                    <service.icon className="w-6 h-6 text-gray-800" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-10">
                <p className="text-xs uppercase tracking-widest font-semibold text-yellow-600 mb-2">
                  {service.subtitle}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                {/* CTA Button */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-sm font-semibold text-gray-800 hover:text-yellow-600 transition-colors duration-300"
                >
                  View Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                <div className="bg-white rounded-2xl h-[calc(100%-4px)] w-[calc(100%-4px)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <Link href="/book">
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
            Book Appointment Now
          </button>
        </Link>
        <p className="text-gray-500 text-sm mt-4">
          Limited slots available. Book in advance to secure your preferred time.
        </p>
      </motion.div>
    </section>
  );
}