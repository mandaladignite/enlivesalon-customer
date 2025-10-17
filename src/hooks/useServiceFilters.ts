"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { serviceAPI } from "@/lib/api";
import { ServiceFilterOptions } from "@/components/common/ServiceFilters";

interface Service {
  _id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  currency: string;
  category: string;
  subCategory: string;
  icon: string;
  photo?: string;
  tags: string[];
  isFeatured: boolean;
  availableAtHome: boolean;
  availableAtSalon: boolean;
  discount?: {
    percentage: number;
    isActive: boolean;
    validFrom?: string;
    validUntil?: string;
  };
}

interface UseServiceFiltersProps {
  category: string;
  initialFilters?: ServiceFilterOptions;
}

export function useServiceFilters({ category, initialFilters }: UseServiceFiltersProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ServiceFilterOptions>({
    sortBy: 'featured',
    sortOrder: 'desc',
    ...initialFilters
  });

  // Fetch services and subcategories
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch services by category
      const servicesResponse = await serviceAPI.getByCategory(category, { 
        limit: 100,
        isActive: true 
      });

      if (servicesResponse.success) {
        setServices(servicesResponse.data.services || []);
        
        // Extract unique subcategories
        const subCategories = (servicesResponse.data.services as Service[])?.map((s: Service) => s.subCategory) || [];
        const uniqueSubCategories: string[] = Array.from(new Set(subCategories)).sort();
        setSubCategories(uniqueSubCategories);
      } else {
        setError("Failed to load services");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let filtered = [...services];

    // Apply filters
    if (filters.subCategory) {
      filtered = filtered.filter(service => 
        service.subCategory.toLowerCase() === filters.subCategory?.toLowerCase()
      );
    }

    if (filters.gender) {
      // This is a simplified gender filter - in a real app, you'd have gender-specific services
      // For now, we'll filter based on service name or tags
      filtered = filtered.filter(service => {
        const name = service.name.toLowerCase();
        const tags = service.tags.join(' ').toLowerCase();
        
        if (filters.gender === 'male') {
          return name.includes('men') || name.includes('male') || tags.includes('men') || tags.includes('male');
        } else if (filters.gender === 'female') {
          return name.includes('women') || name.includes('female') || name.includes('ladies') || 
                 tags.includes('women') || tags.includes('female') || tags.includes('ladies');
        }
        return true; // unisex
      });
    }

    if (filters.availability) {
      if (filters.availability === 'home') {
        filtered = filtered.filter(service => service.availableAtHome);
      } else if (filters.availability === 'salon') {
        filtered = filtered.filter(service => service.availableAtSalon);
      }
      // 'both' means no filtering needed
    }

    if (filters.priceRange) {
      filtered = filtered.filter(service => {
        const price = service.discount?.isActive ? 
          service.price - (service.price * service.discount.percentage / 100) : 
          service.price;
        return price >= filters.priceRange!.min && price <= filters.priceRange!.max;
      });
    }

    if (filters.duration) {
      filtered = filtered.filter(service => 
        service.duration >= filters.duration!.min && service.duration <= filters.duration!.max
      );
    }

    if (filters.featured) {
      filtered = filtered.filter(service => service.isFeatured);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.subCategory.toLowerCase().includes(searchTerm) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort services
    filtered.sort((a, b) => {
      if (filters.sortBy === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      } else if (filters.sortBy === 'price') {
        const priceA = a.discount?.isActive ? 
          a.price - (a.price * a.discount.percentage / 100) : a.price;
        const priceB = b.discount?.isActive ? 
          b.price - (b.price * b.discount.percentage / 100) : b.price;
        return filters.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      } else if (filters.sortBy === 'duration') {
        return filters.sortOrder === 'asc' ? a.duration - b.duration : b.duration - a.duration;
      } else if (filters.sortBy === 'name') {
        return filters.sortOrder === 'asc' ? 
          a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return 0;
    });

    return filtered;
  }, [services, filters]);

  // Update filters
  const updateFilters = useCallback((newFilters: ServiceFilterOptions) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      sortBy: 'featured',
      sortOrder: 'desc'
    });
  }, []);

  // Get filter statistics
  const filterStats = useMemo(() => {
    const totalServices = services.length;
    const filteredCount = filteredServices.length;
    const activeFilters = Object.entries(filters).filter(([key, value]) => 
      value !== undefined && value !== '' && value !== null && 
      !(key === 'sortBy' && value === 'featured') && 
      !(key === 'sortOrder' && value === 'desc')
    ).length;

    return {
      totalServices,
      filteredCount,
      activeFilters,
      hasActiveFilters: activeFilters > 0
    };
  }, [services.length, filteredServices.length, filters]);

  return {
    services: filteredServices,
    allServices: services,
    subCategories,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    filterStats,
    refetch: fetchData
  };
}
