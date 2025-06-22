import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function generateSitemap() {
  const typesDir = path.resolve('./public/types_markdowns');
  const files = fs.readdirSync(typesDir);

  const urls = files.map((file) => {
    if (path.extname(file) === '.mdx') {
      const slug = path.basename(file, '.mdx');
      return `<url><loc>${BASE_URL}/types/${slug}</loc></url>`;
    }
    return null;
  }).filter(Boolean);

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('')}
    </urlset>
  `.trim();

  fs.writeFileSync(path.resolve('./public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully.');
}

generateSitemap(); 