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
    default: "Enlive - Premium Beauty & Wellness",
    template: "%s | Enlive",
  },
  description: "Professional beauty services, premium products, and wellness solutions for your complete transformation.",
  keywords: "beauty, salon, wellness, hair, skin, nail, spa, premium, Pune, Viman Nagar",
  authors: [{ name: "Enlive Team" }],
  creator: "Enlive",
  publisher: "Enlive",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'Enlive - Premium Beauty & Wellness',
    description: 'Professional beauty services, premium products, and wellness solutions for your complete transformation.',
    siteName: 'Enlive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enlive - Premium Beauty & Wellness',
    description: 'Professional beauty services, premium products, and wellness solutions for your complete transformation.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
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
