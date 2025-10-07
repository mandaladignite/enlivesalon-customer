"use client";

import { motion } from "framer-motion";
import { FileText, Shield, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <section className="w-full py-16 bg-white">
      {/* Header Section */}
      {/* Back Button */}
      <div className="container mx-auto px-6 mb-8">
        <Link href="/" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>


      <div className="container mx-auto px-6 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-yellow-500"></div>
            <FileText className="w-8 h-8 text-yellow-500" />
            <div className="w-12 h-px bg-yellow-500"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Please read these terms and conditions carefully before using our services.
          </p>
        </motion.div>
      </div>

      
      {/* Terms Content */}
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-gray-600 mb-6">
              Welcome to Enlive Unisex Salons. These terms and conditions outline the rules and regulations for the use of
              our services, both in-salon and through our digital platforms.
            </p>
            <p className="text-gray-600">
              By accessing our services, we assume you accept these terms and conditions. Do not continue to use Enlive
              services if you do not agree to all the terms and conditions stated on this page.
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-12">
            {/* Appointment Booking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Appointment Booking & Cancellations</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  We recommend booking appointments in advance to ensure availability. Same-day appointments are subject to availability.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>A 24-hour notice is required for cancellations or rescheduling.</li>
                  <li>Late cancellations (less than 24 hours) may incur a cancellation fee of 50% of the service cost.</li>
                  <li>No-shows will be charged 100% of the service cost.</li>
                  <li>We reserve the right to refuse service to any client who repeatedly misses appointments.</li>
                </ul>
              </div>
            </motion.div>

            {/* Payments & Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <CreditCard className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. Payments & Pricing</h2>
              </div>
              <div className="ml-14 space-y-4">
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>All prices are subject to change without prior notice.</li>
                  <li>Service taxes are applicable on all services as per government regulations.</li>
                  <li>We accept cash, credit/debit cards, and digital payment methods.</li>
                  <li>Membership discounts apply only to regular-priced services, not already discounted services.</li>
                </ul>
              </div>
            </motion.div>

            {/* Service Policies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Scissors className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. Service Policies</h2>
              </div>
              <div className="ml-14 space-y-4">
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>We strive to provide the exact service requested, but results may vary based on hair type, condition, and other factors.</li>
                  <li>Chemical services may require a patch test 24 hours prior to appointment for new clients.</li>
                  <li>We are not liable for any allergic reactions to products used during services.</li>
                  <li>Client satisfaction is our priority. If you're unsatisfied with a service, please notify us within 48 hours for resolution.</li>
                  <li>Refunds are not provided for services rendered, but we will make every effort to rectify any issues.</li>
                </ul>
              </div>
            </motion.div>

            {/* Membership Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Crown className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">4. Membership Terms</h2>
              </div>
              <div className="ml-14 space-y-4">
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Membership fee of ₹499 is non-refundable and non-transferable.</li>
                  <li>Primary member can add up to 3 additional members.</li>
                  <li>20% discount applies to all regular-priced services.</li>
                  <li>Membership benefits cannot be combined with other ongoing promotions.</li>
                  <li>Birthday benefit (free hair styling) is valid for primary member only on their birthday.</li>
                  <li>Membership is valid for one year from the date of purchase.</li>
                </ul>
              </div>
            </motion.div>


            {/* Privacy & Data Protection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">5. Privacy & Data Protection</h2>
              </div>
              <div className="ml-14 space-y-4">
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>We collect personal information necessary for providing our services and processing payments.</li>
                  <li>Client information is kept confidential and not shared with third parties without consent.</li>
                  <li>We may use contact information to send service reminders, promotions, and important updates.</li>
                  <li>You can opt-out of marketing communications at any time.</li>
                  <li>We implement security measures to protect your personal information.</li>
                </ul>
              </div>
            </motion.div>

            {/* Liability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">6. Limitation of Liability</h2>
              </div>
              <div className="ml-14 space-y-4">
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Enlive is not liable for any damage to personal property during your visit.</li>
                  <li>We are not responsible for any allergic reactions to products used, though we will conduct patch tests when required.</li>
                  <li>Clients are responsible for providing accurate information about allergies, medical conditions, or medications that may affect services.</li>
                  <li>Our liability for any service-related issues is limited to the cost of the service.</li>
                </ul>
              </div>
            </motion.div>

            {/* Changes to Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Edit className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">7. Changes to Terms</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting to our website or in-salon notice. Continued use of our services after any changes constitutes acceptance of the modified terms.
                </p>
              </div>
            </motion.div>

            {/* Governing Law */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Scale className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">9. Governing Law</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Pune, Maharashtra.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            className="mt-16 p-6 bg-yellow-50 rounded-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>Phone: +91 9637733733</li>
              <li>Email: enlivesalon@gmail.com</li>
              <li>Address: Viman Nagar, Pune, Maharashtra</li>
            </ul>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-gray-500 text-sm">
              Last updated: November 15, 2023
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Additional icons needed for the terms sections
function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function CreditCard({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function Scissors({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
    </svg>
  );
}

function Crown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function Gift({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  );
}

function Edit({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}

function Scale({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  );
}