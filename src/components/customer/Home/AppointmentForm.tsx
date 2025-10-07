// app/components/AppointmentInfo.tsx
"use client";

import { motion } from "framer-motion";
import { Phone, Calendar, Clock } from "lucide-react";

export default function AppointmentInfo() {
  return (
    <section className="relative  bg-[#faf8f6] py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <p className="uppercase text-sm tracking-widest font-semibold text-yellow-600">
            Online Book
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Make an Appointment
          </h2>
        </div>

        {/* Promo Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="p-6 bg-white shadow-md rounded-xl">
            <Phone className="mx-auto h-10 w-10 text-yellow-600 mb-3" />
            <h3 className="font-semibold text-lg">Call Us</h3>
            <p className="text-gray-600 mt-2">+91 946 889 3355</p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-xl">
            <Calendar className="mx-auto h-10 w-10 text-yellow-600 mb-3" />
            <h3 className="font-semibold text-lg">Visit Anytime</h3>
            <p className="text-gray-600 mt-2">Walk-ins Welcome</p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-xl">
            <Clock className="mx-auto h-10 w-10 text-yellow-600 mb-3" />
            <h3 className="font-semibold text-lg">Working Hours</h3>
            <p className="text-gray-600 mt-2">Mon – Sun: 9AM – 9PM</p>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/book"
            className="inline-block bg-yellow-600 text-white px-10 py-4 rounded-xl uppercase tracking-widest font-semibold hover:bg-yellow-700 transition"
          >
            Book Now
          </motion.a>
        </div>
      </div>
    </section>
  );
}
