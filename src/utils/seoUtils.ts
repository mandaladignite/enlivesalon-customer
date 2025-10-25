// SEO utility functions for Enlive Salon
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://enlivesalon.com';

// Common SEO data
export const defaultSEO = {
  siteName: 'Enlive Salon',
  author: 'Enlive Salon Team',
  locale: 'en_IN',
  region: 'IN-MH',
  city: 'Pune',
  coordinates: '18.5204, 73.8567',
  phone: '+91-9876543210',
  email: 'info@enlivesalon.com',
  address: 'Viman Nagar, Pune, Maharashtra 411014, India',
  rating: '4.9',
  reviewCount: '500',
  foundingYear: '2010',
};

// Generate page-specific SEO metadata
export function generatePageSEO(page: string, customData?: any) {
  const seoData = {
    home: {
      title: "Best Salon in Pune | Enlive Unisex Salon - Hair, Skin, Nail & Beauty Services",
      description: "Premium unisex salon in Pune offering expert hair styling, skin treatments, nail art, and beauty services. Book appointment at Enlive Salon - Viman Nagar, Pune. 4.9★ rated salon with certified stylists.",
      keywords: "salon in Pune, beauty parlour Pune, hair salon Pune, unisex salon Pune, skin treatment Pune, nail art Pune, hair styling Pune, beauty services Pune, Viman Nagar salon, best salon near me, professional hair stylist Pune, beauty parlour near me, salon booking Pune, hair cut Pune, facial treatment Pune, bridal makeup Pune, hair coloring Pune, keratin treatment Pune, hair spa Pune, skin care Pune",
      canonical: "/",
      ogType: "business.business",
    },
    hair: {
      title: "Hair Styling Services in Pune | Professional Hair Cut & Coloring | Enlive Salon",
      description: "Expert hair styling services in Pune at Enlive Salon. Professional hair cuts, coloring, keratin treatment, hair spa, and styling. Book appointment with certified stylists in Viman Nagar, Pune.",
      keywords: "hair styling Pune, hair cut Pune, hair coloring Pune, keratin treatment Pune, hair spa Pune, professional hair stylist Pune, hair salon Pune, hair treatment Pune, hair care Pune, hair styling Viman Nagar",
      canonical: "/hair",
      ogType: "service",
    },
    skin: {
      title: "Skin Treatment Services in Pune | Facial & Beauty Therapy | Enlive Salon",
      description: "Premium skin treatment services in Pune at Enlive Salon. Expert facial treatments, skin care, beauty therapy, and skincare services. Book appointment with certified beauticians in Viman Nagar, Pune.",
      keywords: "skin treatment Pune, facial treatment Pune, skin care Pune, beauty therapy Pune, facial Pune, skincare Pune, skin treatment Viman Nagar, beauty parlour Pune, skin care services Pune, facial therapy Pune",
      canonical: "/skin",
      ogType: "service",
    },
    nail: {
      title: "Nail Art Services in Pune | Manicure & Pedicure | Enlive Salon",
      description: "Professional nail art services in Pune at Enlive Salon. Expert manicure, pedicure, nail art, nail care, and nail treatments. Book appointment with certified nail artists in Viman Nagar, Pune.",
      keywords: "nail art Pune, manicure Pune, pedicure Pune, nail care Pune, nail treatment Pune, nail art Viman Nagar, nail services Pune, nail salon Pune, nail design Pune, nail care services Pune",
      canonical: "/nail",
      ogType: "service",
    },
    body: {
      title: "Body Treatment Services in Pune | Massage & Spa Therapy | Enlive Salon",
      description: "Luxury body treatment services in Pune at Enlive Salon. Professional massage, spa therapy, body care, and wellness services. Book appointment with certified therapists in Viman Nagar, Pune.",
      keywords: "body treatment Pune, massage Pune, spa therapy Pune, body care Pune, wellness services Pune, body massage Pune, spa treatment Pune, body therapy Pune, massage Viman Nagar, spa services Pune",
      canonical: "/body",
      ogType: "service",
    },
    book: {
      title: "Book Appointment | Salon Booking in Pune | Enlive Salon",
      description: "Book your salon appointment online at Enlive Salon Pune. Easy online booking for hair styling, skin treatment, nail art, and beauty services. Professional stylists in Viman Nagar, Pune.",
      keywords: "book salon appointment Pune, salon booking Pune, online booking Pune, appointment booking Pune, salon booking Viman Nagar, book hair appointment Pune, salon booking online Pune, beauty appointment Pune",
      canonical: "/book",
      ogType: "website",
    },
    about: {
      title: "About Enlive Salon | Best Salon in Pune | Our Story",
      description: "Learn about Enlive Salon, Pune's premier unisex salon. Our story, expert team, and commitment to excellence in hair styling, skin treatment, and beauty services in Viman Nagar, Pune.",
      keywords: "about Enlive Salon, salon story Pune, salon team Pune, salon history Pune, salon information Pune, salon details Pune, salon background Pune, salon founder Pune, salon experience Pune",
      canonical: "/about",
      ogType: "website",
    },
    contact: {
      title: "Contact Enlive Salon | Best Salon in Pune | Get in Touch",
      description: "Contact Enlive Salon in Pune for appointments and inquiries. Visit our salon in Viman Nagar or call us. Professional hair styling, skin treatment, and beauty services in Pune.",
      keywords: "contact salon Pune, salon contact Pune, salon phone Pune, salon address Pune, salon location Pune, salon inquiry Pune, salon information Pune, salon details Pune, salon Viman Nagar contact",
      canonical: "/contact",
      ogType: "website",
    },
    gallery: {
      title: "Salon Gallery | Before & After Photos | Enlive Salon Pune",
      description: "View our salon gallery showcasing amazing transformations at Enlive Salon Pune. See our work in hair styling, skin treatment, nail art, and beauty services. Professional results in Viman Nagar, Pune.",
      keywords: "salon gallery Pune, salon photos Pune, salon work Pune, salon results Pune, salon portfolio Pune, salon images Pune, salon pictures Pune, salon gallery Viman Nagar, salon showcase Pune",
      canonical: "/gallery",
      ogType: "website",
    },
    reviews: {
      title: "Customer Reviews | Enlive Salon Pune | 4.9★ Rated Salon",
      description: "Read customer reviews and testimonials for Enlive Salon Pune. See why we're rated 4.9★ by our clients. Professional hair styling, skin treatment, and beauty services in Viman Nagar, Pune.",
      keywords: "salon reviews Pune, salon testimonials Pune, salon feedback Pune, salon ratings Pune, salon reviews Viman Nagar, salon customer reviews Pune, salon feedback Pune, salon testimonials Viman Nagar",
      canonical: "/reviews",
      ogType: "website",
    },
  };

  return {
    ...seoData[page as keyof typeof seoData],
    ...customData,
  };
}

// Generate structured data for different page types
export function generateStructuredData(page: string, customData?: any) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Enlive Unisex Salon",
    "alternateName": "Enlive Salon",
    "description": "Premium unisex salon in Pune offering expert hair styling, skin treatments, nail art, and beauty services.",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": [
      `${baseUrl}/logo.png`,
      `${baseUrl}/about.jpg`,
      `${baseUrl}/herobg.jpg`
    ],
    "telephone": defaultSEO.phone,
    "email": defaultSEO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Viman Nagar",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411014",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5204,
      "longitude": 73.8567
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "₹₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
    "areaServed": {
      "@type": "City",
      "name": "Pune"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": defaultSEO.rating,
      "reviewCount": defaultSEO.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/enlivesalon",
      "https://www.instagram.com/enlivesalon",
      "https://www.google.com/maps/place/enlive+salon"
    ],
    "foundingDate": defaultSEO.foundingYear,
  };

  // Page-specific structured data
  const pageStructuredData = {
    home: {
      ...baseStructuredData,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Beauty Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hair Styling",
              "description": "Professional hair cutting, styling, and coloring services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Skin Treatment",
              "description": "Facial treatments, skin care, and beauty therapies"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Nail Art",
              "description": "Manicure, pedicure, and nail art services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Body Treatment",
              "description": "Body massage, spa treatments, and wellness services"
            }
          }
        ]
      }
    },
    hair: {
      ...baseStructuredData,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Hair Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hair Cut",
              "description": "Professional hair cutting and styling"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hair Coloring",
              "description": "Expert hair coloring and highlighting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Keratin Treatment",
              "description": "Professional keratin treatment for smooth hair"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hair Spa",
              "description": "Relaxing hair spa and treatment"
            }
          }
        ]
      }
    },
    skin: {
      ...baseStructuredData,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Skin Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Facial Treatment",
              "description": "Professional facial treatments and skin care"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Skin Care",
              "description": "Expert skin care and beauty therapy"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Beauty Therapy",
              "description": "Comprehensive beauty therapy services"
            }
          }
        ]
      }
    },
    nail: {
      ...baseStructuredData,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Nail Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Manicure",
              "description": "Professional manicure services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Pedicure",
              "description": "Expert pedicure services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Nail Art",
              "description": "Creative nail art and design"
            }
          }
        ]
      }
    },
    body: {
      ...baseStructuredData,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Body Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Body Massage",
              "description": "Professional body massage services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Spa Treatment",
              "description": "Luxury spa treatments and therapy"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Wellness Services",
              "description": "Comprehensive wellness and body care"
            }
          }
        ]
      }
    }
  };

  return {
    ...pageStructuredData[page as keyof typeof pageStructuredData] || baseStructuredData,
    ...customData,
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.url}`
    }))
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Generate local business structured data
export function generateLocalBusinessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Enlive Unisex Salon",
    "description": "Premium unisex salon in Pune offering expert hair styling, skin treatments, nail art, and beauty services.",
    "url": baseUrl,
    "telephone": defaultSEO.phone,
    "email": defaultSEO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Viman Nagar",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411014",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5204,
      "longitude": 73.8567
    },
    "openingHours": "Mo-Sa 09:00-20:00, Su 10:00-18:00",
    "priceRange": "₹₹₹",
    "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
    "currenciesAccepted": "INR",
    "areaServed": {
      "@type": "City",
      "name": "Pune"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": defaultSEO.rating,
      "reviewCount": defaultSEO.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

