"use client";

import { motion } from "framer-motion";
import { Scissors, Star, Users, Award, Sparkles } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { icon: Users, value: "5,000+", label: "Happy Clients" },
    { icon: Star, value: "4.9", label: "Customer Rating" },
    { icon: Award, value: "35+", label: "Years Experience" },
    { icon: Scissors, value: "15+", label: "Expert Stylists" }
  ];

  return (
    <section id="about" className="relative bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden w-full">
      {/* Background Decorations - positioned within bounds */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-gold uppercase tracking-wider">
              About Enlive
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Best Salon in Pune - Where Style Meets{' '}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              Personality
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover Pune's premier unisex salon offering the perfect blend of modern beauty trends and traditional craftsmanship. Located in Viman Nagar, we serve all areas of Pune with expert hair styling, skin treatments, and nail art services.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Image with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Video */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video
                src="/enlivestore.mp4"
                className="w-full h-auto object-contain"
                autoPlay
                controls
                playsInline
              />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-gray-900">Open Now</span>
                </div>
              </motion.div>
            </div>

            
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Introduction */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Pune's Premier Beauty Destination
              </h3>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                At <span className="font-semibold text-gold">Enlive Unisex Salon</span> in Viman Nagar, Pune, 
                we believe that grooming is an art form that celebrates your unique personality. 
                As Pune's most trusted salon, our mission is to provide more than just a haircut—we deliver an experience 
                that boosts your confidence and reflects your identity.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg">
                Our talented team of certified stylists combines <span className="font-semibold">European barbering traditions</span> 
                with the latest beauty trends, ensuring every visit leaves you looking and feeling 
                exceptional. From precision hair cuts to luxurious skin treatments, nail art, and bridal makeup services, we're dedicated 
                to excellence in every detail for our Pune clients.
              </p>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-center p-4 bg-white rounded-xl shadow-lg border border-gray-100"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="p-2 bg-gold/10 rounded-full">
                        <IconComponent className="w-4 h-4 text-gold" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-gray-700 font-medium">Premium quality products</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-gray-700 font-medium">Expert certified stylists</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-gray-700 font-medium">Hygienic & modern equipment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-gray-700 font-medium">Personalized consultations</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <a 
                href="/aboutus" 
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gold/30"
              >
                <span>Discover Our Story</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}