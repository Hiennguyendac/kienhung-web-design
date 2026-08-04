import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://kienhunginvest.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo-512.png`;

export type SEOProps = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
};

type LegacySeoProps = Omit<SEOProps, "canonicalPath" | "ogImage"> & {
  keywords?: string;
  canonical?: string;
  image?: string;
  canonicalPath?: string;
  ogImage?: string;
};

export const absoluteUrl = (value: string) => {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

export const normalizeDescription = (value: string, maxLength = 160) => {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const slice = normalized.slice(0, maxLength + 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cutoff = lastSpace > 110 ? lastSpace : maxLength;
  return `${normalized.slice(0, cutoff).trim()}...`;
};

const canonicalToPath = (canonical?: string) => {
  if (!canonical) return "/";
  if (canonical.startsWith(SITE_URL)) {
    return canonical.replace(SITE_URL, "") || "/";
  }
  return canonical;
};

export const SEO = ({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  jsonLd,
  noindex = false,
}: SEOProps) => {
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(ogImage);
  const metaDescription = normalizeDescription(description);
  const jsonLdItems = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      {jsonLdItems.map((item, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export const Seo = ({
  canonical,
  canonicalPath,
  image,
  ogImage,
  keywords: _keywords,
  ...props
}: LegacySeoProps) => (
  <SEO
    {...props}
    canonicalPath={canonicalPath ?? canonicalToPath(canonical)}
    ogImage={ogImage ?? image}
  />
);
