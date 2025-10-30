"use client";

import React from "react";
import Header from "@/components/customer/UI/Header";
import Footer from "@/components/customer/UI/Footer";
import { Gift, Percent, CheckCircle } from "lucide-react";

const offers = [
  // Replace with real backend-fetched offers later
  {
    id: 1,
    title: "Diwali Special!",
    description: "Get 20% off on all hair and skin services. Limited time offer!",
    code: "DIWALI20",
    isActive: true,
  },
  {
    id: 2,
    title: "Refer a Friend",
    description: "Refer and get ₹200 off for both you and your friend on your next visit.",
    code: "REFR200",
    isActive: true,
  },
];

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-purple-50 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 mt-8 border border-yellow-100">
          <div className="flex justify-center mb-8">
            <Gift className="text-amber-500 w-14 h-14 shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold text-center text-amber-600 mb-2">Latest Offers</h1>
          <p className="text-gray-600 text-center mb-8">Grab the best deals for our services. Hurry, offers valid for a limited period only!</p>
          <div className="space-y-6">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-xl border border-amber-100 flex flex-col md:flex-row md:items-center gap-4 shadow hover:shadow-lg transition-all relative group">
                <div className="flex-shrink-0 flex items-center gap-2">
                  <Percent className="w-8 h-8 text-green-500" />
                  <h2 className="text-lg font-bold text-amber-700">{offer.title}</h2>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{offer.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-green-600 text-xs font-semibold bg-green-50 px-3 py-2 rounded-full mb-2 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Active
                  </span>
                  <span className="inline-block font-mono font-semibold bg-yellow-200 text-amber-800 px-3 py-1 rounded-lg text-xs shadow">Code: {offer.code}</span>
                </div>
              </div>
            ))}
          </div>
          {/* CTA or more offer details can go here */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
