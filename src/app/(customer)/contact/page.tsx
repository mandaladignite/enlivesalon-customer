"use client";

import React, { useState } from 'react';
import Navbar from '@/components/customer/UI/Header';
import EnquiryForm from '@/components/customer/EnquiryForm';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle
} from 'lucide-react';

export default function ContactPage() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleEnquirySuccess = (enquiry: any) => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const handleEnquiryError = (error: string) => {
    console.error('Enquiry submission error:', error);
    // You could show a toast notification here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      
      {/* Main Content - Aligned to header bottom */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-6">
              <MessageSquare className="h-5 w-5 text-gold" />
              <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact <span className="text-gold">Enlive</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have a question or need assistance? We're here to help! Send us an enquiry and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">Enquiry Submitted Successfully!</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto mb-16">
            <EnquiryForm
              onSuccess={handleEnquirySuccess}
              onError={handleEnquiryError}
            />
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Ways to Reach Us</h2>
              <p className="text-lg text-gray-600">
                Prefer to contact us directly? Here are other ways to get in touch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Phone */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600 mb-3">Call us during business hours</p>
                <a href="tel:+919637733733" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  +91 9637733733
                </a>
              </div>

              {/* Email */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600 mb-3">Send us an email anytime</p>
                <a href="mailto:enlivesalon@gmail.com" className="text-green-600 font-medium hover:text-green-800 transition-colors">
                  enlivesalon@gmail.com
                </a>
              </div>

              {/* WhatsApp */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-3">Chat with us instantly</p>
                <a href="https://wa.me/919637733733" className="text-green-600 font-medium hover:text-green-800 transition-colors">
                  +91 9637733733
                </a>
              </div>

              {/* Location */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-3">Come see us in person</p>
                <p className="text-purple-600 font-medium">
                  Viman Nagar<br />
                  Pune, Maharashtra
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-12 bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-gold mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Business Hours</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-medium text-gray-900">Monday - Friday</p>
                  <p className="text-gray-600">9:00 AM - 7:00 PM</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Saturday - Sunday</p>
                  <p className="text-gray-600">10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Find quick answers to common questions about our services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How quickly do you respond to enquiries?</h3>
                <p className="text-gray-600 leading-relaxed">
                  We typically respond to all enquiries within 24 hours during business days. 
                  Urgent enquiries are prioritized and may receive a response within a few hours.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What information should I include in my enquiry?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Please provide as much detail as possible about your question or concern. 
                  Include your contact information and any relevant details about our services or products.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What services do you offer?</h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer comprehensive beauty services including hair styling, skin treatments, 
                  nail care, and body treatments. Visit our services page to explore all options.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Do you offer phone support?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we offer phone support during business hours. You can also reach us via WhatsApp 
                  for quick questions or to schedule appointments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
