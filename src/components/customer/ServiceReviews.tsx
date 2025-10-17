"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, User, Calendar } from "lucide-react";
import { useReviews } from "@/hooks/useReviews";

interface Review {
  _id: string;
  name: string;
  age: string;
  quote: string;
  rating: number;
  service?: string;
  image: {
    secure_url: string;
    public_id: string;
    url?: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
  };
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServiceReviewsProps {
  serviceCategory?: string;
  limit?: number;
  showFeatured?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function ServiceReviews({
  serviceCategory,
  limit = 6,
  showFeatured = true,
  title = "What Our Clients Say",
  subtitle = "Don't just take our word for it. Here's what our satisfied clients have to say about their experience.",
  className = ""
}: ServiceReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsPerView, setReviewsPerView] = useState(3);

  // Use the custom hook for reviews
  const { reviews, loading, error, refetch, stats } = useReviews({
    serviceCategory,
    limit,
    showFeatured
  });

  // Responsive reviews per view
  useEffect(() => {
    const updateReviewsPerView = () => {
      if (window.innerWidth < 768) {
        setReviewsPerView(1);
      } else if (window.innerWidth < 1024) {
        setReviewsPerView(2);
      } else {
        setReviewsPerView(3);
      }
    };

    updateReviewsPerView();
    window.addEventListener('resize', updateReviewsPerView);
    return () => window.removeEventListener('resize', updateReviewsPerView);
  }, []);

  const nextReviews = () => {
    setCurrentIndex((prev) => 
      prev + reviewsPerView >= reviews.length ? 0 : prev + reviewsPerView
    );
  };

  const prevReviews = () => {
    setCurrentIndex((prev) => 
      prev - reviewsPerView < 0 
        ? Math.max(0, reviews.length - reviewsPerView)
        : prev - reviewsPerView
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={`container mx-auto px-6 mb-20 ${className}`}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            Client Reviews
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: reviewsPerView }).map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-pulse">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="space-y-3 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="border-t pt-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`container mx-auto px-6 mb-20 ${className}`}>
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Reviews</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button 
              onClick={refetch}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={`container mx-auto px-6 mb-20 ${className}`}>
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Quote className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
            <p className="text-gray-600">
              {serviceCategory 
                ? `No reviews available for ${serviceCategory} services yet.`
                : "No reviews are currently available."
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  const visibleReviews = reviews.slice(currentIndex, currentIndex + reviewsPerView);
  const totalPages = Math.ceil(reviews.length / reviewsPerView);
  const currentPage = Math.floor(currentIndex / reviewsPerView) + 1;

  return (
    <div className={`container mx-auto px-6 mb-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Star className="w-4 h-4 fill-current" />
          Client Reviews
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      {/* Reviews Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / reviewsPerView}%)`,
              width: `${(reviews.length * 100) / reviewsPerView}%`
            }}
          >
            {reviews.map((review, index) => (
              <div
                key={review._id}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / reviews.length}%` }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Review Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      {review.image?.secure_url ? (
                        <img
                          src={review.image.secure_url}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center ${review.image?.secure_url ? 'hidden' : ''}`}>
                        <User className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <h4 className="font-semibold text-gray-900 truncate">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.age}</p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-4">
                    <Quote className="w-6 h-6 text-yellow-400 mb-2" />
                    <p className="text-gray-600 leading-relaxed italic">
                      "{review.quote}"
                    </p>
                  </div>

                  {/* Review Footer */}
                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      {review.service && (
                        <p className="text-sm font-medium text-yellow-600">
                          {review.service}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                    {review.isFeatured && (
                      <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Controls */}
        {reviews.length > reviewsPerView && (
          <>
            <button
              onClick={prevReviews}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextReviews}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * reviewsPerView)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentPage - 1
                    ? 'bg-yellow-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reviews Stats */}
      {reviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 bg-gray-50 rounded-2xl px-8 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.totalReviews}</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats.fiveStarReviews}
              </div>
              <div className="text-sm text-gray-600">5-Star Reviews</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
