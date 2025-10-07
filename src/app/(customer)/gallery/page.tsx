"use client";

import Footer from "@/components/customer/UI/Footer";
import { motion } from "framer-motion";
import { Scissors, Search, ZoomIn, X, Filter, Grid, List, Heart, Eye, Loader2, ChevronLeft, ChevronRight, Star, Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/customer/UI/Header";
import { galleryAPI } from "@/lib/api";
import Image from "next/image";
import GalleryLightbox from "@/components/customer/GalleryLightbox";

interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  imageUrl: string;
  cloudinarySecureUrl: string;
  altText?: string;
  tags: string[];
  isFeatured: boolean;
  createdAt: string;
  uploadedBy: {
    name: string;
    email: string;
  };
  dimensions: {
    width: number;
    height: number;
  };
  aspectRatio: number;
  views: number;
  likes: number;
}

interface GalleryStats {
  overview: {
    totalImages: number;
  };
  categoryBreakdown: Array<{
    _id: string;
    count: number;
    featuredCount: number;
  }>;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [stats, setStats] = useState<GalleryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "all", name: "All Services", count: stats?.overview.totalImages || 0 },
    { id: "Hair", name: "Hair Styling", count: stats?.categoryBreakdown.find(c => c._id === "Hair")?.count || 0 },
    { id: "Skin", name: "Skin Care", count: stats?.categoryBreakdown.find(c => c._id === "Skin")?.count || 0 },
    { id: "Nail", name: "Nail Art", count: stats?.categoryBreakdown.find(c => c._id === "Nail")?.count || 0 },
    { id: "Bridal", name: "Bridal", count: stats?.categoryBreakdown.find(c => c._id === "Bridal")?.count || 0 },
  ];

  useEffect(() => {
    fetchImages();
    fetchStats();
  }, [selectedCategory, searchQuery, sortBy, sortOrder, currentPage]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError("");
      
      const params: any = {
        page: currentPage,
        limit: 12,
        sortBy,
        sortOrder,
      };

      if (selectedCategory !== "all") {
        params.category = selectedCategory;
      }

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const response = await galleryAPI.getAll(params);
      
      if (response.success) {
        setImages(response.data.images);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setError(response.message || "Failed to fetch images");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching images");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await galleryAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchImages();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img._id === selectedImage._id);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    } else {
      newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(images[newIndex]);
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };


  return (
    <section className="w-full mt-16 bg-white min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-px bg-yellow-500"></div>
              <Scissors className="w-8 h-8 text-yellow-500" />
              <div className="w-12 h-px bg-yellow-500"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Gallery</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Discover our stunning collection of hair, skin, nail, and bridal work. 
              Each image tells a story of transformation and beauty.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.overview.totalImages}</div>
              <div className="text-sm text-gray-600">Total Images</div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Bar */}
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search images by title, description, or tags..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </form>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-6 bg-gray-50 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="createdAt">Date Added</option>
                  <option value="views">Most Viewed</option>
                  <option value="likes">Most Liked</option>
                  <option value="title">Title</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSortBy("createdAt");
                    setSortOrder("desc");
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Content */}
      <div className="container mx-auto px-6 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
            <span className="ml-2 text-gray-600">Loading images...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-500 text-lg mb-2">Error loading images</div>
            <div className="text-gray-600">{error}</div>
            <button
              onClick={fetchImages}
              className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16">
            <Scissors className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <div className="text-gray-500 text-lg mb-2">No images found</div>
            <div className="text-gray-400">
              {searchQuery ? "Try adjusting your search terms" : "Check back later for new content"}
            </div>
          </div>
        ) : (
          <>
            {/* Gallery Grid/List */}
            <motion.div
              layout
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {images.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                  onClick={() => openLightbox(image)}
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative h-64 w-full">
                        <Image
                          src={image.cloudinarySecureUrl}
                          alt={image.altText || image.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                        {image.isFeatured && (
                          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Featured
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{image.title}</h3>
                        {image.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{image.description}</p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="capitalize">{image.category}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {image.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {image.likes}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative w-32 h-24 flex-shrink-0">
                        <Image
                          src={image.cloudinarySecureUrl}
                          alt={image.altText || image.title}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                        {image.isFeatured && (
                          <div className="absolute top-1 left-1 bg-yellow-500 text-white px-1 py-0.5 rounded text-xs">
                            <Star className="w-2 h-2" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                            {image.description && (
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{image.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="capitalize">{image.category}</span>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(image.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-yellow-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        image={selectedImage}
        images={images}
        isOpen={!!selectedImage}
        onClose={closeLightbox}
        onNavigate={navigateImage}
      />

      <Footer />
    </section>
  );
}