import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../utils/content';

export function SEO({ title, description = siteConfig.description, path = '/', schema }) {
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.domain}${path}`;
  const jsonLd =
    schema ||
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.domain,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      sameAs: [siteConfig.domain]
    };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}







