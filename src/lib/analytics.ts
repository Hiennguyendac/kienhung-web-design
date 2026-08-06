type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export const trackPageView = () => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
};

export const trackCtaClick = (ctaName: string) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", "cta_click", {
    cta_name: ctaName,
    page_location: window.location.pathname,
  });
};

export {};
