"use client";

import { Suspense, lazy } from "react";
import LazyWrapper from "@/components/common/LazyWrapper";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { motion } from "framer-motion";

// Lazy load all components for better performance
const Header = lazy(() => import("@/components/customer/UI/Header"));
const Hero = lazy(() => import("@/components/customer/Home/Hero"));
const AboutSection = lazy(() => import("@/components/customer/Home/AboutSection"));
const ServicesSection = lazy(() => import("@/components/customer/Home/ServicesSection"));
const ProductsShowcase = lazy(() => import("@/components/customer/Home/ProductsSection"));
const MembershipSection = lazy(() => import("@/components/customer/Home/MembershipSection"));
const Testimonials = lazy(() => import("@/components/customer/Home/Testimonials"));
const AppointmentForm = lazy(() => import("@/components/customer/Home/AppointmentForm"));
const Footer = lazy(() => import("@/components/customer/UI/Footer"));

// Loading fallback component
const SectionFallback = ({ height = "min-h-[400px]" }: { height?: string }) => (
  <div className={`flex items-center justify-center ${height} bg-gray-50`}>
    <LoadingSpinner size="lg" text="Loading section..." />
  </div>
);

export default function Home() {
  return (
    <main>
      {/* Header - Load immediately */}
      <section>
        <Suspense fallback={<SectionFallback height="min-h-[80px]" />}>
          <Header />
        </Suspense>
      </section>

      {/* Hero - Critical above-the-fold content */}
      <section>
        <Suspense fallback={<SectionFallback height="min-h-[600px]" />}>
          <Hero />
        </Suspense>
      </section>

      {/* About Section - Lazy load with delay */}
      <LazyWrapper delay={0.1}>
        <section>
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
        </section>
      </LazyWrapper>
      
      {/* Services Section - Lazy load with delay */}
      <LazyWrapper delay={0.2}>
        <section>
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>
        </section>
      </LazyWrapper>

      {/* Products Section - Lazy load with delay */}
      <LazyWrapper delay={0.3}>
        <section>
          <Suspense fallback={<SectionFallback />}>
            <ProductsShowcase />
          </Suspense>
        </section>
      </LazyWrapper>

      {/* Membership Section - Lazy load with delay */}
      <LazyWrapper delay={0.4}>
        <section>
          <Suspense fallback={<SectionFallback />}>
            <MembershipSection />
          </Suspense>
        </section>
      </LazyWrapper>

      {/* Testimonials Section - Lazy load with delay */}
      <LazyWrapper delay={0.45}>
        <section>
          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>
        </section>
      </LazyWrapper>

      {/* Appointment Form - Lazy load with delay */}
      <LazyWrapper delay={0.5}>
        <section>
          <Suspense fallback={<SectionFallback />}>
            <AppointmentForm />
          </Suspense>
        </section>
      </LazyWrapper>

      {/* Footer - Lazy load with delay */}
      <LazyWrapper delay={0.6}>
        <section>
          <Suspense fallback={<SectionFallback height="min-h-[300px]" />}>
            <Footer />
          </Suspense>
        </section>
      </LazyWrapper>
    </main>
  );
}
