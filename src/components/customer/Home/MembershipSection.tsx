"use client";

import { motion } from "framer-motion";
import { Crown, Star, Gift, Clock, Users, Sparkles } from "lucide-react";

export default function MembershipSection() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Crown className="w-4 h-4" />
            Exclusive Membership
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Join the <span className="text-yellow-600">Enlive</span> Family
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the ultimate in beauty and wellness with our exclusive membership program. 
            Unlock premium benefits, special privileges, and a world of luxury treatments designed just for you.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Star className="w-12 h-12 text-yellow-600" />,
              title: "Premium Benefits",
              description: "Exclusive access to special treatments, priority booking, and member-only services that aren't available to regular customers.",
              bgColor: "bg-yellow-50",
              iconBg: "bg-yellow-100"
            },
            {
              icon: <Gift className="w-12 h-12 text-amber-600" />,
              title: "Special Discounts",
              description: "Enjoy significant savings on all services with our member-exclusive pricing and seasonal promotional offers throughout the year.",
              bgColor: "bg-amber-50",
              iconBg: "bg-amber-100"
            },
            {
              icon: <Clock className="w-12 h-12 text-yellow-600" />,
              title: "Priority Access",
              description: "Skip the wait with priority booking, flexible scheduling, and exclusive time slots reserved just for our valued members.",
              bgColor: "bg-yellow-50",
              iconBg: "bg-yellow-100"
            },
            {
              icon: <Users className="w-12 h-12 text-amber-600" />,
              title: "Family Inclusion",
              description: "Extend your membership benefits to your loved ones with our family-friendly membership options and shared privileges.",
              bgColor: "bg-amber-50",
              iconBg: "bg-amber-100"
            },
            {
              icon: <Sparkles className="w-12 h-12 text-yellow-600" />,
              title: "Birthday Privileges",
              description: "Celebrate your special day with complimentary services, birthday surprises, and exclusive treatments to make you feel extra special.",
              bgColor: "bg-yellow-50",
              iconBg: "bg-yellow-100"
            },
            {
              icon: <Crown className="w-12 h-12 text-amber-600" />,
              title: "VIP Treatment",
              description: "Experience the royal treatment with personalized service, dedicated staff attention, and a luxury salon experience every time you visit.",
              bgColor: "bg-amber-50",
              iconBg: "bg-amber-100"
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${benefit.bgColor} p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-white/50`}
            >
              <div className={`${benefit.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience the <span className="text-yellow-200">Difference</span>?
            </h3>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied members who enjoy exclusive benefits and premium services at Enlive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a 
                href="/membership" 
                className="bg-white text-yellow-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Explore Membership Plans
              </a>
              <a 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-yellow-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
