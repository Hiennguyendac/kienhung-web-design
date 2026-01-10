import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>;
};

const setMeta = (name: string, content: string) => {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setProperty = (property: string, content: string) => {
  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setCanonical = (href: string) => {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

export const Seo = ({
  title,
  description,
  keywords,
  canonical,
  image,
  type = "website",
  jsonLd,
}: SeoProps) => {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    if (keywords) {
      setMeta("keywords", keywords);
    }
    if (canonical) {
      setCanonical(canonical);
    }
    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:type", type);
    if (canonical) {
      setProperty("og:url", canonical);
    }
    if (image) {
      setProperty("og:image", image);
      setMeta("twitter:image", image);
    }
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
  }, [title, description, keywords, canonical, image, type]);

  if (!jsonLd) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
