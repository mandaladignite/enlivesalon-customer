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
              style={{ width: "auto", height: "auto" }}
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
              <a href="tel:+919637733733" className="text-sm hover:text-yellow-500 transition-colors mr-3">+91 96377 33733</a>
              <a
                href="https://wa.me/919637733733"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 bg-green-500 hover:bg-green-600 transition-colors rounded-full inline-flex items-center"
                aria-label="Chat on WhatsApp"
                style={{ marginLeft: '4px' }}
              >
                <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path fill="white" d="M16 3C9.383 3 4 8.383 4 15c0 2.389.66 4.615 1.8 6.524L3.062 29.393c-.177.328-.08.741.227.961a.701.701 0 00.306.101c.118 0 .233-.036.332-.107l7.04-4.934C12.418 26.426 14.169 27 16 27c6.617 0 12-5.383 12-12S22.617 3 16 3zm0 22c-1.821 0-3.572-.574-5.027-1.579a.999.999 0 00-1.076-.062l-5.389 3.779 2.042-5.236a1 1 0 00-.082-.906C5.109 19.024 5 17.026 5 15 5 9.486 9.486 5 15 5s10 4.486 10 10-4.486 10-10 10zm5.065-7.095c-.416-.208-2.424-1.197-2.799-1.333-.375-.136-.65-.208-.926.208-.274.417-1.062 1.333-1.301 1.606-.24.271-.48.312-.896.104-.417-.208-1.764-.666-3.364-2.128-.623-.555-1.043-1.24-1.167-1.456-.24-.416-.025-.64.182-.847.188-.186.417-.481.626-.72.208-.24.278-.417.417-.695.138-.278.07-.521-.033-.73-.104-.208-.926-2.243-1.27-3.036-.334-.804-.677-.697-.926-.71a8.224 8.224 0 00-.771-.014c-.25 0-.651.093-.992.464-.342.37-1.299 1.27-1.299 3.095s1.334 3.583 1.52 3.833c.186.25 2.628 4.058 6.366 5.261.892.294 1.587.469 2.131.6.895.214 1.711.184 2.353.112 1.517-.181 2.316-1.132 2.457-2.221.17-1.307.122-1.267-.293-1.475z"/>
                </svg>
              </a>
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