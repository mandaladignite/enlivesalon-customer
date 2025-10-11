"use client";

import { Instagram, Facebook, Phone, MapPin, Clock, Crown, ShoppingBag, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 relative">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-gray-800 pb-10">
        {/* Brand Section */}
        <div className="md:col-span-1">
          <div className="flex items-center mb-4">
            <Image 
              src="/logo.png" 
              alt="Enlive Salon Logo" 
              width={100} 
              height={100}
              className="mr-3"
            />
            
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Premium Unisex Salon & Shop in Viman Nagar, Pune
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/enlive_salons?igsh=MWE2dXo4cXNraHZsdQ=="
              className="p-2 bg-gray-800 hover:bg-yellow-500 transition rounded-full"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com/enlivesalon"
              className="p-2 bg-gray-800 hover:bg-yellow-500 transition rounded-full"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">
            Our Services
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/hair" className="hover:text-yellow-500 transition-colors">
                Hair Services
              </Link>
            </li>
            <li>
              <Link href="/skin" className="hover:text-yellow-500 transition-colors">
                Skin Treatments
              </Link>
            </li>
            <li>
              <Link href="/nail" className="hover:text-yellow-500 transition-colors">
                Nail Art & Care
              </Link>
            </li>
            <li>
              <Link href="/body" className="hover:text-yellow-500 transition-colors">
                Body Treatments
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-yellow-500 transition-colors">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Shop & Membership */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">
            Shop & Membership
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/shop" className="hover:text-yellow-500 transition-colors flex items-center">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Products
              </Link>
            </li>
            <li>
              <Link href="/membership" className="hover:text-yellow-500 transition-colors flex items-center">
                <Crown className="w-4 h-4 mr-2" />
                Membership Plans
              </Link>
            </li>
            <li>
              <Link href="/my-memberships" className="hover:text-yellow-500 transition-colors flex items-center">
                <User className="w-4 h-4 mr-2" />
                My Memberships
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-yellow-500 transition-colors flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">
            Support
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/contact" className="hover:text-yellow-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/aboutus" className="hover:text-yellow-500 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/appointments" className="hover:text-yellow-500 transition-colors">
                My Appointments
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-yellow-500 transition-colors">
                My Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">
            Visit Us
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mt-1 text-yellow-500 mr-2 flex-shrink-0" />
              <p className="text-sm">Viman Nagar, Pune, Maharashtra</p>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
              <a href="tel:+919637733733" className="text-sm hover:text-yellow-500 transition-colors">+91 96377 33733</a>
            </div>
            <div className="flex items-start">
              <Clock className="w-4 h-4 mt-1 text-yellow-500 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm">Everyday: 10:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-6 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} <span className="text-yellow-500">Enlive Salon</span>. All rights reserved.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <Link href="/privacy-policy" className="text-gray-500 hover:text-yellow-500 text-sm transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-conditions" className="text-gray-500 hover:text-yellow-500 text-sm transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}