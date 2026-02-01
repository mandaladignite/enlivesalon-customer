/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://enlivesalon.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/auth/*', '/api/*', '/_next/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/api/', '/_next/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_BASE_URL || 'https://enlivesalon.com'}/sitemap.xml`,
    ],
    host: process.env.NEXT_PUBLIC_BASE_URL || 'https://enlivesalon.com',
  },
  transform: async (config, path) => {
    // Custom transform for different page types
    const customConfig = {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };

    // Homepage gets highest priority
    if (path === '/') {
      customConfig.priority = 1.0;
      customConfig.changefreq = 'daily';
    }

    // Service pages get high priority
    if (path.includes('/hair') || path.includes('/skin') || path.includes('/nail') || path.includes('/body')) {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'weekly';
    }

    // Booking pages get high priority
    if (path.includes('/book') || path.includes('/appointments')) {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'daily';
    }

    // Profile and membership pages get medium-high priority
    if (path.includes('/profile') || path.includes('/memberships') || path.includes('/packages')) {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'weekly';
    }

    // Static pages get medium priority
    if (path.includes('/about') || path.includes('/contact') || path.includes('/gallery')) {
      customConfig.priority = 0.6;
      customConfig.changefreq = 'monthly';
    }

    // Reviews get medium priority
    if (path.includes('/reviews')) {
      customConfig.priority = 0.6;
      customConfig.changefreq = 'daily';
    }

    // Privacy and terms get low priority
    if (path.includes('/privacy') || path.includes('/terms')) {
      customConfig.priority = 0.3;
      customConfig.changefreq = 'yearly';
    }

    return customConfig;
  },
};
