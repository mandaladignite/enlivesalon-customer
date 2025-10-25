// Sitemap generator for SEO optimization
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://enlivesalon.com';

// Define all important pages for SEO
export const seoPages = [
  // Main pages
  {
    url: '/',
    priority: 1.0,
    changefreq: 'daily',
    lastmod: new Date().toISOString(),
    images: [
      {
        loc: '/logo.png',
        title: 'Enlive Salon - Best Salon in Pune',
        caption: 'Premium unisex salon in Pune offering hair styling, skin treatments, and nail art services'
      },
      {
        loc: '/herobg.jpg',
        title: 'Professional Salon Services in Pune',
        caption: 'Expert hair styling and beauty services at Enlive Salon Pune'
      }
    ]
  },
  
  // Service pages
  {
    url: '/hair',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: new Date().toISOString(),
    images: [
      {
        loc: '/haircut.jpg',
        title: 'Hair Styling Services in Pune',
        caption: 'Professional hair cutting, styling, and coloring services at Enlive Salon Pune'
      }
    ]
  },
  {
    url: '/skin',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: new Date().toISOString(),
    images: [
      {
        loc: '/skinservice.jpg',
        title: 'Skin Treatment Services in Pune',
        caption: 'Expert facial treatments and skin care services at Enlive Salon Pune'
      }
    ]
  },
  {
    url: '/nail',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: new Date().toISOString(),
    images: [
      {
        loc: '/nailservice.jpg',
        title: 'Nail Art Services in Pune',
        caption: 'Professional manicure, pedicure, and nail art services at Enlive Salon Pune'
      }
    ]
  },
  {
    url: '/body',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: new Date().toISOString(),
    images: [
      {
        loc: '/bodyservice.jpg',
        title: 'Body Treatment Services in Pune',
        caption: 'Luxury body massage and spa treatments at Enlive Salon Pune'
      }
    ]
  },
  
  // Booking and appointments
  {
    url: '/book',
    priority: 0.9,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  {
    url: '/appointments',
    priority: 0.8,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  
  // Information pages
  {
    url: '/about',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: new Date().toISOString(),
    images: [
      {
        loc: '/about.jpg',
        title: 'About Enlive Salon Pune',
        caption: 'Learn about our salon team and services in Pune'
      }
    ]
  },
  {
    url: '/contact',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/gallery',
    priority: 0.5,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  
  // Membership and packages
  {
    url: '/memberships',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/packages',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  
  // Reviews and testimonials
  {
    url: '/reviews',
    priority: 0.6,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  
  // SEO-optimized local business pages
  {
    url: '/salon-in-pune',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/beauty-parlour-pune',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/hair-salon-pune',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/unisex-salon-pune',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/salon-viman-nagar',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/best-salon-near-me',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/hair-styling-pune',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/skin-treatment-pune',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/nail-art-pune',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/bridal-makeup-pune',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  
  // Legal pages
  {
    url: '/privacy',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: new Date().toISOString()
  },
  {
    url: '/terms',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: new Date().toISOString()
  }
];

// Generate XML sitemap
export function generateSitemapXML() {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  const urlsetClose = '</urlset>';
  
  let sitemap = xmlHeader + urlsetOpen;
  
  seoPages.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    
    // Add image sitemap data if images exist
    if (page.images && page.images.length > 0) {
      page.images.forEach(image => {
        sitemap += '    <image:image>\n';
        sitemap += `      <image:loc>${baseUrl}${image.loc}</image:loc>\n`;
        sitemap += `      <image:title>${image.title}</image:title>\n`;
        sitemap += `      <image:caption>${image.caption}</image:caption>\n`;
        sitemap += '    </image:image>\n';
      });
    }
    
    sitemap += '  </url>\n';
  });
  
  sitemap += urlsetClose;
  
  return sitemap;
}

// Generate robots.txt content
export function generateRobotsTxt() {
  return `# Robots.txt for Enlive Salon - Best Salon in Pune
# Optimized for search engine crawling and indexing

# Allow all search engines to crawl the site
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/
Disallow: /_next/
Disallow: /private/
Disallow: /*.json$
Disallow: /*.xml$
Disallow: /uploads/temp/

# Specific instructions for major search engines
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/
Disallow: /_next/
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/
Disallow: /_next/
Crawl-delay: 2

User-agent: Slurp
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/
Disallow: /_next/
Crawl-delay: 2

User-agent: DuckDuckBot
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/
Disallow: /_next/

User-agent: Baiduspider
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/
Disallow: /_next/

User-agent: YandexBot
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/
Disallow: /_next/

# Block problematic bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Sitemap locations
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-0.xml

# Host directive
Host: ${baseUrl}`;
}

// Generate sitemap index
export function generateSitemapIndex() {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const sitemapindexOpen = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const sitemapindexClose = '</sitemapindex>';
  
  let sitemapIndex = xmlHeader + sitemapindexOpen;
  
  // Add main sitemap
  sitemapIndex += '  <sitemap>\n';
  sitemapIndex += `    <loc>${baseUrl}/sitemap.xml</loc>\n`;
  sitemapIndex += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
  sitemapIndex += '  </sitemap>\n';
  
  // Add image sitemap
  sitemapIndex += '  <sitemap>\n';
  sitemapIndex += `    <loc>${baseUrl}/sitemap-images.xml</loc>\n`;
  sitemapIndex += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
  sitemapIndex += '  </sitemap>\n';
  
  sitemapIndex += sitemapindexClose;
  
  return sitemapIndex;
}

// Generate image sitemap
export function generateImageSitemap() {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  const urlsetClose = '</urlset>';
  
  let imageSitemap = xmlHeader + urlsetOpen;
  
  // Add all images from pages
  seoPages.forEach(page => {
    if (page.images && page.images.length > 0) {
      imageSitemap += '  <url>\n';
      imageSitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
      
      page.images.forEach(image => {
        imageSitemap += '    <image:image>\n';
        imageSitemap += `      <image:loc>${baseUrl}${image.loc}</image:loc>\n`;
        imageSitemap += `      <image:title>${image.title}</image:title>\n`;
        imageSitemap += `      <image:caption>${image.caption}</image:caption>\n`;
        imageSitemap += '    </image:image>\n';
      });
      
      imageSitemap += '  </url>\n';
    }
  });
  
  imageSitemap += urlsetClose;
  
  return imageSitemap;
}

// Export all sitemap functions
export default {
  generateSitemapXML,
  generateRobotsTxt,
  generateSitemapIndex,
  generateImageSitemap,
  seoPages
};
