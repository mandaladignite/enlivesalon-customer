import { NextRequest, NextResponse } from 'next/server';

// SEO middleware for Next.js
export function seoMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  
  // Add SEO headers
  response.headers.set('X-Robots-Tag', 'index, follow');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Add canonical URL
  const canonicalUrl = `https://enlivesalon.com${url.pathname}`;
  response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);
  
  // Add hreflang for international SEO
  response.headers.set('Link', `<https://enlivesalon.com${url.pathname}>; rel="alternate"; hreflang="en-IN"`);
  response.headers.set('Link', `<https://enlivesalon.com/hi${url.pathname}>; rel="alternate"; hreflang="hi-IN"`);
  
  // Add preconnect headers for performance
  response.headers.set('Link', '<https://fonts.googleapis.com>; rel="preconnect"');
  response.headers.set('Link', '<https://fonts.gstatic.com>; rel="preconnect"; crossorigin');
  response.headers.set('Link', '<https://checkout.razorpay.com>; rel="preconnect"');
  
  // Add DNS prefetch for performance
  response.headers.set('Link', '<//fonts.googleapis.com>; rel="dns-prefetch"');
  response.headers.set('Link', '<//fonts.gstatic.com>; rel="dns-prefetch"');
  response.headers.set('Link', '<//checkout.razorpay.com>; rel="dns-prefetch"');
  
  // Add cache headers for static assets
  if (url.pathname.startsWith('/static/') || url.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Add cache headers for images
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Add cache headers for CSS and JS
  if (url.pathname.match(/\.(css|js)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Add cache headers for HTML pages
  if (url.pathname === '/' || url.pathname.match(/^\/[^.]*$/)) {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  }
  
  return response;
}

// SEO redirects for better URL structure
export function seoRedirects(request: NextRequest) {
  const url = request.nextUrl;
  
  // Redirect old URLs to new SEO-friendly URLs
  const redirects: { [key: string]: string } = {
    '/salon': '/salon-in-pune',
    '/beauty-parlour': '/beauty-parlour-pune',
    '/hair-salon': '/hair-salon-pune',
    '/unisex-salon': '/unisex-salon-pune',
    '/viman-nagar': '/salon-viman-nagar',
    '/near-me': '/best-salon-near-me',
    '/hair-styling': '/hair-styling-pune',
    '/skin-treatment': '/skin-treatment-pune',
    '/nail-art': '/nail-art-pune',
    '/bridal-makeup': '/bridal-makeup-pune',
  };
  
  if (redirects[url.pathname]) {
    return NextResponse.redirect(new URL(redirects[url.pathname], request.url), 301);
  }
  
  return null;
}

// SEO-friendly URL generation
export function generateSEOFriendlyURL(path: string, params?: { [key: string]: string }) {
  let seoUrl = path;
  
  // Add location-based SEO keywords
  if (path.includes('/hair') && !path.includes('pune')) {
    seoUrl = path.replace('/hair', '/hair-salon-pune');
  }
  
  if (path.includes('/skin') && !path.includes('pune')) {
    seoUrl = path.replace('/skin', '/skin-treatment-pune');
  }
  
  if (path.includes('/nail') && !path.includes('pune')) {
    seoUrl = path.replace('/nail', '/nail-art-pune');
  }
  
  if (path.includes('/body') && !path.includes('pune')) {
    seoUrl = path.replace('/body', '/body-treatment-pune');
  }
  
  // Add query parameters for SEO
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value);
    });
    
    if (searchParams.toString()) {
      seoUrl += `?${searchParams.toString()}`;
    }
  }
  
  return seoUrl;
}

// Generate breadcrumb data for SEO
export function generateBreadcrumbData(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: 'Home', url: '/' }
  ];
  
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Convert segment to readable name
    const readableName = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      name: readableName,
      url: currentPath
    });
  });
  
  return breadcrumbs;
}

// Generate meta tags for different page types
export function generatePageMetaTags(pathname: string) {
  const baseUrl = 'https://enlivesalon.com';
  
  // Page-specific meta tags
  const pageMetaTags: { [key: string]: any } = {
    '/': {
      title: 'Best Salon in Pune | Enlive Unisex Salon - Hair, Skin, Nail & Beauty Services',
      description: 'Premium unisex salon in Pune offering expert hair styling, skin treatments, nail art, and beauty services. Book appointment at Enlive Salon - Viman Nagar, Pune.',
      keywords: 'salon in Pune, beauty parlour Pune, hair salon Pune, unisex salon Pune, skin treatment Pune, nail art Pune, hair styling Pune, beauty services Pune, Viman Nagar salon, best salon near me',
      ogType: 'business.business'
    },
    '/hair': {
      title: 'Hair Styling Services in Pune | Professional Hair Cut & Coloring | Enlive Salon',
      description: 'Expert hair styling services in Pune at Enlive Salon. Professional hair cuts, coloring, keratin treatment, hair spa, and styling. Book appointment with certified stylists in Viman Nagar, Pune.',
      keywords: 'hair styling Pune, hair cut Pune, hair coloring Pune, keratin treatment Pune, hair spa Pune, professional hair stylist Pune, hair salon Pune, hair treatment Pune, hair care Pune, hair styling Viman Nagar',
      ogType: 'service'
    },
    '/skin': {
      title: 'Skin Treatment Services in Pune | Facial & Beauty Therapy | Enlive Salon',
      description: 'Premium skin treatment services in Pune at Enlive Salon. Expert facial treatments, skin care, beauty therapy, and skincare services. Book appointment with certified beauticians in Viman Nagar, Pune.',
      keywords: 'skin treatment Pune, facial treatment Pune, skin care Pune, beauty therapy Pune, facial Pune, skincare Pune, skin treatment Viman Nagar, beauty parlour Pune, skin care services Pune, facial therapy Pune',
      ogType: 'service'
    },
    '/nail': {
      title: 'Nail Art Services in Pune | Manicure & Pedicure | Enlive Salon',
      description: 'Professional nail art services in Pune at Enlive Salon. Expert manicure, pedicure, nail art, nail care, and nail treatments. Book appointment with certified nail artists in Viman Nagar, Pune.',
      keywords: 'nail art Pune, manicure Pune, pedicure Pune, nail care Pune, nail treatment Pune, nail art Viman Nagar, nail services Pune, nail salon Pune, nail design Pune, nail care services Pune',
      ogType: 'service'
    },
    '/body': {
      title: 'Body Treatment Services in Pune | Massage & Spa Therapy | Enlive Salon',
      description: 'Luxury body treatment services in Pune at Enlive Salon. Professional massage, spa therapy, body care, and wellness services. Book appointment with certified therapists in Viman Nagar, Pune.',
      keywords: 'body treatment Pune, massage Pune, spa therapy Pune, body care Pune, wellness services Pune, body massage Pune, spa treatment Pune, body therapy Pune, massage Viman Nagar, spa services Pune',
      ogType: 'service'
    },
    '/book': {
      title: 'Book Appointment | Salon Booking in Pune | Enlive Salon',
      description: 'Book your salon appointment online at Enlive Salon Pune. Easy online booking for hair styling, skin treatment, nail art, and beauty services. Professional stylists in Viman Nagar, Pune.',
      keywords: 'book salon appointment Pune, salon booking Pune, online booking Pune, appointment booking Pune, salon booking Viman Nagar, book hair appointment Pune, salon booking online Pune, beauty appointment Pune',
      ogType: 'website'
    }
  };
  
  return pageMetaTags[pathname] || pageMetaTags['/'];
}

export default {
  seoMiddleware,
  seoRedirects,
  generateSEOFriendlyURL,
  generateBreadcrumbData,
  generatePageMetaTags
};
