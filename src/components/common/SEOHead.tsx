"use client";

import Head from "next/head";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
  noindex?: boolean;
  nofollow?: boolean;
}

export default function SEOHead({
  title = "Best Salon in Pune | Enlive Unisex Salon - Hair, Skin, Nail & Beauty Services",
  description = "Premium unisex salon in Pune offering expert hair styling, skin treatments, nail art, and beauty services. Book appointment at Enlive Salon - Viman Nagar, Pune. 4.9★ rated salon with certified stylists.",
  keywords = "salon in Pune, beauty parlour Pune, hair salon Pune, unisex salon Pune, skin treatment Pune, nail art Pune, hair styling Pune, beauty services Pune, Viman Nagar salon, best salon near me, professional hair stylist Pune, beauty parlour near me, salon booking Pune, hair cut Pune, facial treatment Pune, bridal makeup Pune, hair coloring Pune, keratin treatment Pune, hair spa Pune, skin care Pune",
  canonical,
  ogImage = "/logo.png",
  ogType = "website",
  structuredData,
  noindex = false,
  nofollow = false,
}: SEOHeadProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://enlivesalon.com';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Enlive Salon Team" />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      <meta name="googlebot" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en-IN" />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Pune" />
      <meta name="geo.position" content="18.5204;73.8567" />
      <meta name="ICBM" content="18.5204, 73.8567" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Enlive Salon - Best Beauty Salon in Pune" />
      <meta property="og:site_name" content="Enlive Salon" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content="Enlive Salon - Best Beauty Salon in Pune" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content="Enlive Salon" />
      <meta name="apple-mobile-web-app-title" content="Enlive Salon" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#D4AF37" />
      <meta name="msapplication-TileColor" content="#D4AF37" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Business Information */}
      <meta name="business:contact_data:street_address" content="Viman Nagar" />
      <meta name="business:contact_data:locality" content="Pune" />
      <meta name="business:contact_data:region" content="Maharashtra" />
      <meta name="business:contact_data:postal_code" content="411014" />
      <meta name="business:contact_data:country_name" content="India" />
      <meta name="business:contact_data:phone_number" content="+91-9876543210" />
      <meta name="business:contact_data:email" content="info@enlivesalon.com" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://checkout.razorpay.com" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//checkout.razorpay.com" />
    </Head>
  );
}

