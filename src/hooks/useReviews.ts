import { useState, useEffect } from 'react';
import { reviewAPI } from '@/lib/api';

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

interface UseReviewsOptions {
  serviceCategory?: string;
  limit?: number;
  showFeatured?: boolean;
  autoFetch?: boolean;
}

interface UseReviewsReturn {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  stats: {
    averageRating: number;
    totalReviews: number;
    fiveStarReviews: number;
  };
}

export function useReviews({
  serviceCategory,
  limit = 10,
  showFeatured = false,
  autoFetch = true
}: UseReviewsOptions = {}): UseReviewsReturn {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await reviewAPI.getAll({
        limit: limit.toString(),
        isActive: 'true',
        ...(showFeatured && { isFeatured: 'true' }),
        ...(serviceCategory && { service: serviceCategory })
      });
      
      if (response.success && response.data) {
        const fetchedReviews = response.data.reviews || response.data;
        setReviews(fetchedReviews);
      } else {
        throw new Error(response.message || 'Failed to fetch reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchReviews();
    }
  }, [serviceCategory, limit, showFeatured, autoFetch]);

  const stats = {
    averageRating: reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0,
    totalReviews: reviews.length,
    fiveStarReviews: reviews.filter(review => review.rating === 5).length
  };

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews,
    stats
  };
}

