"use client";

import { motion } from "framer-motion";
import { FileText, Shield, Lock, AlertCircle, ArrowLeft, Eye, Database, UserCheck, Server } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
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
            <Shield className="w-8 h-8 text-yellow-500" />
            <div className="w-12 h-px bg-yellow-500"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Learn how we collect, use, and protect your personal information at Enlive Unisex Salons.
          </p>
        </motion.div>
      </div>

      {/* Privacy Policy Content */}
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
              At Enlive Unisex Salons, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our salon, use our website, 
              or interact with our services.
            </p>
            <p className="text-gray-600">
              By using our services, you consent to the data practices described in this Privacy Policy. 
              If you do not agree with the data practices described, you should not use our services.
            </p>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-12">
            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Database className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  We may collect personal information that you provide to us directly, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Demographic information (age, gender, preferences)</li>
                  <li>Appointment history and service preferences</li>
                  <li>Payment information (credit/debit card details, billing address)</li>
                  <li>Health information relevant to services (allergies, medical conditions)</li>
                  <li>Images (before/after service photos with your consent)</li>
                  <li>Information you provide through feedback, surveys, or promotions</li>
                </ul>
              </div>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To process your appointments and transactions</li>
                  <li>To send appointment reminders, confirmations, and updates</li>
                  <li>To personalize your experience and recommend services</li>
                  <li>To communicate with you about promotions, offers, and events</li>
                  <li>To respond to your comments, questions, and requests</li>
                  <li>To monitor and analyze trends, usage, and activities</li>
                  <li>To detect, prevent, and address technical issues or fraudulent activities</li>
                  <li>To comply with legal obligations and protect our rights</li>
                </ul>
              </div>
            </motion.div>

            {/* How We Share Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Server className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. How We Share Your Information</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  We may share your personal information in the following situations:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf (payment processing, data analysis, marketing)</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition of all or a portion of our business</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
                  <li><strong>Protection of Rights:</strong> To protect the rights, property, or safety of Enlive, our customers, or others</li>
                  <li><strong>With Your Consent:</strong> For any other purpose disclosed to you with your consent</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  We do not sell your personal information to third parties for their marketing purposes.
                </p>
              </div>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Lock className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">4. Data Security</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Encryption of sensitive data during transmission and storage</li>
                  <li>Regular security assessments and vulnerability testing</li>
                  <li>Access controls limiting who can view and use your information</li>
                  <li>Employee training on data protection and privacy practices</li>
                  <li>Secure storage of physical records</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. 
                  We cannot guarantee absolute security but we work to maintain appropriate safeguards.
                </p>
              </div>
            </motion.div>

            {/* Data Retention */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">5. Data Retention</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  We retain your personal information only for as long as necessary to fulfill the purposes for which we collected it, including to satisfy any legal, accounting, or reporting requirements. Our retention periods are based on:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>The amount, nature, and sensitivity of the personal data</li>
                  <li>The potential risk of harm from unauthorized use or disclosure</li>
                  <li>The purposes for which we process your data</li>
                  <li>Applicable legal requirements</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Typically, we retain customer records for 3 years after your last visit, unless a longer retention period is required by law.
                </p>
              </div>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <UserCheck className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">6. Your Rights</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li><strong>Access:</strong> The right to request copies of your personal information</li>
                  <li><strong>Rectification:</strong> The right to request correction of inaccurate or incomplete information</li>
                  <li><strong>Erasure:</strong> The right to request deletion of your personal information</li>
                  <li><strong>Restriction:</strong> The right to request limiting how we use your information</li>
                  <li><strong>Data Portability:</strong> The right to request transfer of your data to another organization</li>
                  <li><strong>Objection:</strong> The right to object to processing of your personal information</li>
                  <li><strong>Withdraw Consent:</strong> The right to withdraw consent where we rely on consent to process your information</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  To exercise any of these rights, please contact us using the details provided at the end of this policy.
                </p>
              </div>
            </motion.div>

            {/* Cookies and Tracking Technologies */}
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
                <h2 className="text-2xl font-bold text-gray-900">7. Cookies and Tracking Technologies</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  Our website may use cookies and similar tracking technologies to collect information about your browsing activities. These technologies help us:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze how our website is used</li>
                  <li>Personalize your experience</li>
                  <li>Deliver targeted advertisements</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
                </p>
              </div>
            </motion.div>

            {/* Children's Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">8. Children's Privacy</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. 
                  If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will delete such information from our systems.
                </p>
                <p className="text-gray-600">
                  For children between 13-18 years, we require consent from a parent or guardian before collecting any personal information.
                </p>
              </div>
            </motion.div>

            {/* Changes to This Policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">9. Changes to This Policy</h2>
              </div>
              <div className="ml-14 space-y-4">
                <p className="text-gray-600">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
                  We may also provide additional notice (such as adding a statement to our website or sending you a notification).
                </p>
                <p className="text-gray-600">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
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
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>Phone: +91 96377 33733</li>
              <li>Email: enlivesalon@gmail.com</li>
              <li>Data Protection Officer: enlivesalon@gmail.com</li>
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