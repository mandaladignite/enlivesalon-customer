import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Best Salon in Pune | Enlive Unisex Salon - Hair, Skin, Nail & Beauty Services",
    template: "%s | Enlive Salon Pune",
  },
  description: "Premium unisex salon in Pune offering expert hair styling, skin treatments, nail art, and beauty services. Book appointment at Enlive Salon - Viman Nagar, Pune. 4.9★ rated salon with certified stylists.",
  keywords: "salon in Pune, beauty parlour Pune, hair salon Pune, unisex salon Pune, skin treatment Pune, nail art Pune, hair styling Pune, beauty services Pune, Viman Nagar salon, best salon near me, professional hair stylist Pune, beauty parlour near me, salon booking Pune, hair cut Pune, facial treatment Pune, bridal makeup Pune, hair coloring Pune, keratin treatment Pune, hair spa Pune, skin care Pune",
  authors: [{ name: "Enlive Salon Team" }],
  creator: "Enlive Salon",
  publisher: "Enlive Salon",
  applicationName: "Enlive Salon",
  category: "Beauty & Wellness",
  classification: "Beauty Salon",
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo.png', sizes: '48x48', type: 'image/png' },
      { url: '/logo.png', sizes: '64x64', type: 'image/png' },
      { url: '/logo.png', sizes: '96x96', type: 'image/png' },
      { url: '/logo.png', sizes: '128x128', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '256x256', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'icon', url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { rel: 'icon', url: '/logo.png', sizes: '16x16', type: 'image/png' }
    ]
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://enlivesalon.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/',
      'hi-IN': '/hi',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'Best Salon in Pune | Enlive Unisex Salon - Hair, Skin, Nail & Beauty Services',
    description: 'Premium unisex salon in Pune offering expert hair styling, skin treatments, nail art, and beauty services. Book appointment at Enlive Salon - Viman Nagar, Pune.',
    siteName: 'Enlive Salon',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Enlive Salon - Best Beauty Salon in Pune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Salon in Pune | Enlive Unisex Salon',
    description: 'Premium unisex salon in Pune offering expert hair styling, skin treatments, nail art, and beauty services.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Pune',
    'geo.position': '18.5204;73.8567',
    'ICBM': '18.5204, 73.8567',
    'DC.title': 'Best Salon in Pune | Enlive Unisex Salon',
    'DC.description': 'Premium unisex salon in Pune offering expert hair styling, skin treatments, nail art, and beauty services.',
    'DC.subject': 'Beauty Salon, Hair Styling, Skin Treatment, Nail Art, Pune',
    'DC.creator': 'Enlive Salon',
    'DC.publisher': 'Enlive Salon',
    'DC.contributor': 'Enlive Salon Team',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.identifier': 'https://enlivesalon.com',
    'DC.source': 'https://enlivesalon.com',
    'DC.language': 'en-IN',
    'DC.relation': 'https://enlivesalon.com',
    'DC.coverage': 'Pune, Maharashtra, India',
    'DC.rights': 'Copyright Enlive Salon',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Enlive Salon',
    'application-name': 'Enlive Salon',
    'msapplication-TileColor': '#D4AF37',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#D4AF37',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://checkout.razorpay.com" />
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
          defer
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance optimization: Preload critical resources
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                  // Preload critical images - only the first slide image
                  const criticalImages = ['/logo.png', '/diwali-offer.jpg'];
                  criticalImages.forEach(src => {
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.as = 'image';
                    link.href = src;
                    document.head.appendChild(link);
                  });
                });
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "Enlive Unisex Salon",
              "alternateName": "Enlive Salon",
              "description": "Premium unisex salon in Pune offering expert hair styling, skin treatments, nail art, and beauty services. Book appointment at Enlive Salon - Viman Nagar, Pune.",
              "url": "https://enlivesalon.com",
              "logo": "https://enlivesalon.com/logo.png",
              "image": [
                "https://enlivesalon.com/logo.png",
                "https://enlivesalon.com/about.jpg",
                "https://enlivesalon.com/herobg.jpg"
              ],
              "telephone": "+91-9876543210",
              "email": "info@enlivesalon.com",
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
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 18.5204,
                  "longitude": 73.8567
                },
                "geoRadius": "50000"
              },
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
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "500",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Priya Sharma"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "reviewBody": "Excellent service and professional staff. Highly recommended salon in Pune."
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Rajesh Kumar"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "reviewBody": "Best unisex salon in Viman Nagar. Great experience and quality service."
                }
              ],
              "sameAs": [
                "https://www.facebook.com/enlivesalon",
                "https://www.instagram.com/enlivesalon",
                "https://www.google.com/maps/place/enlive+salon"
              ],
              "foundingDate": "2010",
              "founder": {
                "@type": "Person",
                "name": "Enlive Salon Team"
              },
              "employee": {
                "@type": "Person",
                "name": "Professional Stylists",
                "jobTitle": "Beauty Expert"
              },
              "knowsAbout": [
                "Hair Styling",
                "Skin Treatment",
                "Nail Art",
                "Beauty Services",
                "Bridal Makeup",
                "Hair Coloring",
                "Keratin Treatment",
                "Hair Spa",
                "Facial Treatment"
              ],
              "makesOffer": [
                {
                  "@type": "Offer",
                  "name": "Diwali Special Offer",
                  "description": "25% Off on All Beauty & Wellness Services",
                  "validFrom": "2024-01-01",
                  "validThrough": "2024-12-31"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
