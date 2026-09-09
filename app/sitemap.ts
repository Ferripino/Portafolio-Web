import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: 'https://portafolio-web-ferripinos-projects.vercel.app', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }] }
