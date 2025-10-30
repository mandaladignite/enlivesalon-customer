"use client";

import { motion } from "framer-motion";
import { Scissors, Users, Heart, Award, Star } from "lucide-react";
import Header from "@/components/customer/UI/Header";
import Footer from "@/components/customer/UI/Footer";

export default function AboutUs() {
  return (
    <section className="w-full mt-16 bg-white">
      {/* Header Section */}
      <Header />

      {/* Intro Section */}
      <div className="container mx-auto px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-yellow-500"></div>
            <Scissors className="w-8 h-8 text-yellow-500" />
            <div className="w-12 h-px bg-yellow-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Enlive</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Where beauty meets wellness, and every visit transforms not just your look but your entire being.
          </p>
        </motion.div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <video
              src="/enlivestore.mp4"
              className="rounded-lg shadow-lg w-full h-auto object-contain"
              controls
              loop
              playsInline
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-4">
              Founded in 1989, Enlive began as a small boutique salon with a big vision: to create a space where 
              clients could experience complete transformation—both in appearance and in spirit.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a single chair operation has now grown into a premier destination for beauty and wellness, 
              but our core philosophy remains the same: everyone deserves to feel confident, rejuvenated, and truly alive.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve thousands of clients with our team of expert stylists, aestheticians, 
              and wellness professionals who share our passion for excellence.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at Enlive, from how we treat our clients to how we train our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-12 h-12 text-yellow-500" />,
                title: "Community",
                description: "We believe in building relationships, not just client lists. Our salon is a space where everyone belongs."
              },
              {
                icon: <Heart className="w-12 h-12 text-yellow-500" />,
                title: "Care",
                description: "We use only the highest quality products and techniques that nourish and protect your hair and skin."
              },
              {
                icon: <Award className="w-12 h-12 text-yellow-500" />,
                title: "Excellence",
                description: "Our team undergoes continuous training to stay at the forefront of beauty and wellness trends."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition"
              >
                <div className="flex justify-center mb-6">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Experience the Enlive Difference</h3>
          <p className="text-gray-600 mb-8">
            Ready to transform your look and elevate your wellness? Book your appointment today and discover why our clients keep coming back.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 font-semibold uppercase tracking-wide shadow-lg transition transform hover:scale-105">
            Book Your Appointment
          </button>
        </motion.div>
      </div>

      <Footer />
    </section>
  );
}