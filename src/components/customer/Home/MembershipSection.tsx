"use client";

import { motion } from "framer-motion";

export default function MembershipSection() {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Small Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-widest font-semibold text-yellow-600 mb-3"
        >
          Membership
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6"
        >
          Exclusive Membership Plans for You
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Become an <span className="font-semibold">Enlive Member</span> and
          enjoy exclusive benefits — special discounts, priority booking,
          complimentary styling on your birthday, and savings on every service.
        </motion.p>

        {/* Membership Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white shadow-lg rounded-xl p-10 border border-gray-200 max-w-md mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Annual Membership
          </h3>
          <p className="text-gray-600 mb-6">
            ₹499 / year (incl. GST) <br />
            Add up to 3 family members.
          </p>

          <ul className="text-gray-700 text-left space-y-2 mb-8">
            <li>✔ Special pricing on all salon services</li>
            <li>✔ Complimentary birthday hairstyling</li>
            <li>✔ Priority booking & reminders</li>
            <li>✔ Membership valid for 1 year</li>
          </ul>

          {/* CTA Button */}
          <a href="/membership" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-md shadow-md uppercase tracking-wide transition">
            Join Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
