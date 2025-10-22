// app/components/GroomingSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function GroomingSection() {
  return (
    <section className=" bg-black text-white flex flex-col md:flex-row items-center md:items-stretch">
      {/* Left Text Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 p-10 flex flex-col justify-center"
      >
        <p className="text-sm uppercase tracking-widest text-yellow-400 font-semibold mb-3">
          Our Services
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Finest Men’s <br /> Grooming Products
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          We have delivered the best finest men’s products in London since 1896.
        </p>
        <motion.a
          href="/services"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-yellow-400 text-yellow-400 px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-yellow-400 hover:text-black transition-all duration-300"
        >
          View Products
        </motion.a>
      </motion.div>

      {/* Right Image Section */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 h-[500px] relative"
      >
        <Image
          src="/products.jpg" // replace with your image path
          alt="Men's Grooming Products"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
