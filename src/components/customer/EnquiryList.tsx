"use client";

import React, { useState, useEffect } from 'react';
import { enquiryAPI } from '@/lib/api';
import { Enquiry, EnquiryPaginationResponse, EnquiryFilters, EnquiryStatus, Priority, ENQUIRY_STATUSES, PRIORITY_LEVELS } from '@/types/enquiry';

interface EnquiryListProps {
  className?: string;
}

export default function EnquiryList({ className = "" }: EnquiryListProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [pagination, setPagination] = useState<EnquiryPaginationResponse | null>(null);
  const [filters, setFilters] = useState<EnquiryFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await enquiryAPI.getMyEnquiries(filters);
      
      if (response.success) {
        setEnquiries(response.data.docs);
        setPagination(response.data);
      } else {
        setError(response.message || 'Failed to fetch enquiries');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<EnquiryFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const getStatusColor = (status: string) => {
    const statusConfig = ENQUIRY_STATUSES.find(s => s.value === status);
    return statusConfig?.color || 'gray';
  };

  const getPriorityColor = (priority: string) => {
    const priorityConfig = PRIORITY_LEVELS.find(p => p.value === priority);
    return priorityConfig?.color || 'gray';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Enquiries</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchEnquiries}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-gold/5 to-gold/10">
        <div className="flex justify-between items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/10 px-3 py-1 rounded-full mb-2">
              <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                My Enquiries
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Enquiry History</h2>
          </div>
          <div className="text-sm text-gray-500 bg-white px-3 py-2 rounded-lg shadow-sm">
            {pagination?.totalDocs || 0} enquiry{pagination?.totalDocs !== 1 ? 'ies' : 'y'}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange({ status: e.target.value as EnquiryStatus || undefined })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
            >
              <option value="">All Statuses</option>
              {ENQUIRY_STATUSES.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={filters.priority || ''}
              onChange={(e) => handleFilterChange({ priority: e.target.value as Priority || undefined })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
            >
              <option value="">All Priorities</option>
              {PRIORITY_LEVELS.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                handleFilterChange({ sortBy: sortBy as any, sortOrder: sortOrder as any });
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="priority-desc">High Priority First</option>
              <option value="status-asc">Status A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enquiries List */}
      <div className="divide-y divide-gray-200">
        {enquiries.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Enquiries Found</h3>
            <p className="text-gray-600">You haven't submitted any enquiries yet.</p>
          </div>
        ) : (
          enquiries.map((enquiry) => (
            <div key={enquiry._id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {enquiry.subject}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getStatusColor(enquiry.status)}-100 text-${getStatusColor(enquiry.status)}-800`}>
                      {ENQUIRY_STATUSES.find(s => s.value === enquiry.status)?.label}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getPriorityColor(enquiry.priority)}-100 text-${getPriorityColor(enquiry.priority)}-800`}>
                      {PRIORITY_LEVELS.find(p => p.value === enquiry.priority)?.label}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {enquiry.message}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>#{enquiry.enquiryNumber}</span>
                    <span>•</span>
                    <span>{formatDate(enquiry.createdAt)}</span>
                    <span>•</span>
                    <span className="capitalize">{enquiry.enquiryType}</span>
                    {enquiry.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex space-x-1">
                          {enquiry.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                          {enquiry.tags.length > 3 && (
                            <span className="text-xs text-gray-400">+{enquiry.tags.length - 3} more</span>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {enquiry.response && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-green-800">Response:</span>
                        <span className="text-xs text-green-600">
                          {formatDate(enquiry.response.respondedAt || '')}
                        </span>
                      </div>
                      <p className="text-sm text-green-700">{enquiry.response.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.totalDocs)} of {pagination.totalDocs} results
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        page === pagination.page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNextPage}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
