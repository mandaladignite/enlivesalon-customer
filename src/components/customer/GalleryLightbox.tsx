"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  Heart, 
  Share2, 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  Star,
  Maximize2,
  Minimize2,
  Info
} from "lucide-react";
import Image from "next/image";

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
}

interface GalleryLightboxProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export default function GalleryLightbox({
  image,
  images,
  isOpen,
  onClose,
  onNavigate
}: GalleryLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentIndex = image ? images.findIndex(img => img._id === image._id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setZoom(1);
      setRotation(0);
      setImageLoaded(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrev) onNavigate('prev');
          break;
        case 'ArrowRight':
          if (hasNext) onNavigate('next');
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'i':
        case 'I':
          e.preventDefault();
          setShowInfo(!showInfo);
          break;
        case '+':
        case '=':
          e.preventDefault();
          setZoom(prev => Math.min(prev + 0.25, 3));
          break;
        case '-':
          e.preventDefault();
          setZoom(prev => Math.max(prev - 0.25, 0.5));
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          setRotation(prev => (prev + 90) % 360);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasPrev, hasNext, onClose, onNavigate, showInfo]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    
    const link = document.createElement('a');
    link.href = image.cloudinarySecureUrl;
    link.download = `${image.title}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!image) return;

    const shareData = {
      title: image.title,
      text: image.description || `Check out this ${image.category.toLowerCase()} work from our salon`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!isOpen || !image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Navigation Arrows */}
        {hasPrev && (
          <button
            onClick={() => onNavigate('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={() => onNavigate('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        )}

        {/* Image Container */}
        <div className="relative max-w-7xl max-h-full mx-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transformOrigin: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              <Image
                src={image.cloudinarySecureUrl}
                alt={image.altText || image.title}
                width={image.dimensions.width}
                height={image.dimensions.height}
                className="max-w-full max-h-[80vh] object-contain"
                onLoad={() => setImageLoaded(true)}
                priority
              />
              
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} of {images.length}
            </div>

            {/* Featured Badge */}
            {image.isFeatured && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star className="w-4 h-4" />
                Featured
              </div>
            )}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black bg-opacity-50 rounded-full px-4 py-2">
          <button
            onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.5))}
            className="p-2 text-white hover:text-gray-300 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <span className="text-white text-sm min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          
          <button
            onClick={() => setZoom(prev => Math.min(prev + 0.25, 3))}
            className="p-2 text-white hover:text-gray-300 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-600 mx-2"></div>

          <button
            onClick={() => setRotation(prev => (prev + 90) % 360)}
            className="p-2 text-white hover:text-gray-300 transition-colors"
            title="Rotate"
          >
            <RotateCw className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-600 mx-2"></div>

          <button
            onClick={handleDownload}
            className="p-2 text-white hover:text-gray-300 transition-colors"
            title="Download"
          >
            <Download className="w-5 h-5" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 text-white hover:text-gray-300 transition-colors"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>


          <div className="w-px h-6 bg-gray-600 mx-2"></div>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-white hover:text-gray-300 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 transition-colors ${
              showInfo ? "text-yellow-500" : "text-white hover:text-gray-300"
            }`}
            title="Image Info"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        {/* Image Information Panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="absolute right-0 top-0 h-full w-80 bg-black bg-opacity-90 text-white p-6 overflow-y-auto"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                  {image.description && (
                    <p className="text-gray-300 text-sm leading-relaxed">{image.description}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span className="capitalize">{image.category}</span>
                      </div>
                      {image.subcategory && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Subcategory:</span>
                          <span>{image.subcategory}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Dimensions:</span>
                        <span>{image.dimensions.width} × {image.dimensions.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Aspect Ratio:</span>
                        <span>{image.aspectRatio}</span>
                      </div>
                    </div>
                  </div>


                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Upload Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400 flex items-center gap-1">
                          <User className="w-4 h-4" />
                          Uploaded by:
                        </span>
                        <span>{image.uploadedBy.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Date:
                        </span>
                        <span>{formatDate(image.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {image.tags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {image.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-yellow-500 text-black text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard Shortcuts Help */}
        <div className="absolute bottom-4 right-4 text-white text-xs opacity-60">
          <div className="space-y-1">
            <div>← → Navigate</div>
            <div>+ - Zoom</div>
            <div>R Rotate</div>
            <div>F Fullscreen</div>
            <div>I Info</div>
            <div>ESC Close</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
