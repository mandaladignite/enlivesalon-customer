"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/customer/UI/Header";
import Footer from "@/components/customer/UI/Footer";
import { Gift, Percent, CheckCircle, Calendar, Copy, Loader2, ShoppingCart } from "lucide-react";
import { offerAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface Offer {
  _id: string;
  title: string;
  description: string;
  code: string;
  discountType: "percentage" | "fixed" | "free";
  discountValue: number;
  minPurchaseAmount?: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  isValid?: boolean;
  bannerImage?: string;
  termsAndConditions?: string;
  applicableServices?: string[];
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await offerAPI.getAll({ isActive: true });
      if (response.success) {
        setOffers(response.data.offers || []);
      } else {
        setError("Failed to load offers");
      }
    } catch (err) {
      setError("Error loading offers. Please try again later.");
      console.error("Error fetching offers:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDiscount = (offer: Offer) => {
    if (offer.discountType === "percentage") {
      return `${offer.discountValue}% OFF`;
    } else if (offer.discountType === "fixed") {
      return `₹${offer.discountValue} OFF`;
    } else {
      return "FREE";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isOfferValid = (offer: Offer) => {
    const now = new Date();
    const validFrom = new Date(offer.validFrom);
    const validUntil = new Date(offer.validUntil);
    return offer.isActive && now >= validFrom && now <= validUntil;
  };

  const isComboOffer = (offer: Offer) => {
    return offer.applicableServices && offer.applicableServices.length > 1;
  };

  const handleBookCombo = (offer: Offer) => {
    if (!user) {
      router.push('/auth/login?redirect=/offers');
      return;
    }
    
    // Create comma-separated service IDs for URL
    if (offer.applicableServices && offer.applicableServices.length > 0) {
      const serviceIds = offer.applicableServices.join(',');
      router.push(`/book?serviceIds=${serviceIds}&offerCode=${offer.code}&step=1`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-purple-50 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center py-12 px-4">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 mt-8 border border-yellow-100">
          <div className="flex justify-center mb-8">
            <Gift className="text-amber-500 w-14 h-14 shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold text-center text-amber-600 mb-2">Latest Offers</h1>
          <p className="text-gray-600 text-center mb-8">
            Grab the best deals for our services. Hurry, offers valid for a limited period only!
          </p>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-12">
              <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No active offers at the moment</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for exciting deals!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {offers.map((offer) => {
                const valid = isOfferValid(offer);
                return (
                  <div
                    key={offer._id}
                    className={`bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-xl border ${
                      valid ? "border-amber-100" : "border-gray-200 opacity-60"
                    } flex flex-col md:flex-row md:items-center gap-4 shadow hover:shadow-lg transition-all relative group`}
                  >
                    {offer.bannerImage && (
                      <div className="absolute inset-0 opacity-5 rounded-xl overflow-hidden">
                        <img
                          src={offer.bannerImage}
                          alt={offer.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-shrink-0 flex items-center gap-3 relative z-10">
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <Percent className="w-6 h-6 text-amber-700" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-amber-700">{offer.title}</h2>
                        <div className="text-sm font-semibold text-amber-600 mt-1">
                          {formatDiscount(offer)}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 relative z-10">
                      <p className="text-gray-800 mb-2">{offer.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Valid: {formatDate(offer.validFrom)} - {formatDate(offer.validUntil)}</span>
                        </div>
                        {offer.minPurchaseAmount && offer.minPurchaseAmount > 0 && (
                          <span className="text-gray-500">
                            Min. purchase: ₹{offer.minPurchaseAmount}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 relative z-10">
                      <span
                        className={`text-xs font-semibold px-3 py-2 rounded-full flex items-center gap-1 ${
                          valid
                            ? "text-green-700 bg-green-50"
                            : "text-gray-500 bg-gray-100"
                        }`}
                      >
                        <CheckCircle className={`w-3 h-3 ${valid ? "text-green-600" : "text-gray-400"}`} />
                        {valid ? "Active" : "Expired"}
                      </span>
                      <button
                        onClick={() => copyToClipboard(offer.code)}
                        className="inline-flex items-center gap-2 font-mono font-semibold bg-yellow-200 text-amber-800 px-4 py-2 rounded-lg text-sm shadow hover:bg-yellow-300 transition-colors"
                      >
                        <span>Code: {offer.code}</span>
                        {copiedCode === offer.code ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      {copiedCode === offer.code && (
                        <span className="text-xs text-green-600 font-medium">Copied!</span>
                      )}
                      {isComboOffer(offer) && valid && (
                        <button
                          onClick={() => handleBookCombo(offer)}
                          className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B8941F] transition-colors shadow"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Book Combo Services
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {offers.length > 0 && (
            <div className="mt-8 pt-6 border-t border-amber-100">
              <p className="text-sm text-gray-600 text-center">
                * Terms and conditions apply. Offers cannot be combined with other promotions.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
