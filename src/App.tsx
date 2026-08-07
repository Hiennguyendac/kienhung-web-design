import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import type { RouteRecord } from "vite-react-ssg";
import { AIChatWidget } from "./components/AIChatWidget";
import { AIChatWidget as AIToolsWidget } from "./components/ai/AIChatWidget";
import { trackPageView } from "./lib/analytics";

const queryClient = new QueryClient();

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Công ty TNHH Thương mại Dịch vụ Đầu tư Kiến Hưng",
  "alternateName": "Kiến Hưng Investment",
  "url": "https://kienhunginvest.com",
  "logo": "https://kienhunginvest.com/logo-512.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "MP2-3.11 Mizuki Park, Bình Hưng",
    "addressLocality": "TP.HCM",
    "addressCountry": "VN",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Công ty TNHH Thương mại Dịch vụ Đầu tư Kiến Hưng",
  "url": "https://kienhunginvest.com",
  "logo": "https://kienhunginvest.com/logo-512.png",
  "image": "https://kienhunginvest.com/logo-512.png",
  "telephone": "+84 903 103 198",
  "openingHours": ["Mo-Fr 08:00-17:30", "Sa 08:00-12:00"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "MP2-3.11 Mizuki Park, Bình Hưng",
    "addressLocality": "TP.HCM",
    "addressCountry": "VN",
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "12:00",
    },
  ],
};

const RootStructuredData = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
    <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
  </Helmet>
);

const AnimatedOutlet = () => {
  const location = useLocation();
  const [hasHydrated, setHasHydrated] = React.useState(false);

  React.useEffect(() => {
    setHasHydrated(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={hasHydrated ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        exit={hasHydrated ? { opacity: 0 } : undefined}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <React.Suspense fallback={null}>
          <Outlet />
        </React.Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

const AnalyticsRouteTracker = () => {
  const location = useLocation();

  React.useEffect(() => {
    trackPageView();
  }, [location.pathname, location.search]);

  return null;
};

const AppLayout = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RootStructuredData />
        <AnalyticsRouteTracker />
        <Toaster />
        <Sonner />
        <AnimatedOutlet />
        <AIChatWidget />
        <AIToolsWidget />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

const newsLoader = async () => {
  const { loader } = await import("./pages/News");
  return loader();
};

const newsDetailLoader = async ({ params }: { params: { slug?: string } }) => {
  const { loader } = await import("./pages/news/[slug]");
  return loader({ params });
};

const faqLoader = async () => {
  const { loader } = await import("./pages/FAQ");
  return loader();
};

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <AppLayout />,
    entry: "src/App.tsx",
    children: [
      { index: true, lazy: async () => ({ Component: (await import("./pages/Index")).default }), entry: "src/pages/Index.tsx" },
      { path: "gioi-thieu", lazy: async () => ({ Component: (await import("./pages/About")).default }), entry: "src/pages/About.tsx" },
      { path: "linh-vuc-hoat-dong", lazy: async () => ({ Component: (await import("./pages/Services")).default }), entry: "src/pages/Services.tsx" },
      { path: "dich-vu/thuong-mai-phan-phoi", lazy: async () => ({ Component: (await import("./pages/services/Commerce")).default }), entry: "src/pages/services/Commerce.tsx" },
      { path: "dich-vu/cong-nghe-thong-tin", lazy: async () => ({ Component: (await import("./pages/services/IT")).default }), entry: "src/pages/services/IT.tsx" },
      { path: "dich-vu/quang-cao-marketing", lazy: async () => ({ Component: (await import("./pages/services/Marketing")).default }), entry: "src/pages/services/Marketing.tsx" },
      { path: "dich-vu/logistics-cho-thue-xe", lazy: async () => ({ Component: (await import("./pages/services/Logistics")).default }), entry: "src/pages/services/Logistics.tsx" },
      { path: "dich-vu/giao-duc-dao-tao", lazy: async () => ({ Component: (await import("./pages/services/Education")).default }), entry: "src/pages/services/Education.tsx" },
      {
        path: "dich-vu/giao-duc-dao-tao/linh-vuc/:domainId/chuong-trinh/:programId",
        lazy: async () => ({ Component: (await import("./pages/services/TrainingProgramDetail")).default }),
        entry: "src/pages/services/TrainingProgramDetail.tsx",
      },
      { path: "chinh-sach/dieu-khoan-su-dung", lazy: async () => ({ Component: (await import("./pages/policies/Terms")).default }), entry: "src/pages/policies/Terms.tsx" },
      { path: "chinh-sach/chinh-sach-bao-mat", lazy: async () => ({ Component: (await import("./pages/policies/Privacy")).default }), entry: "src/pages/policies/Privacy.tsx" },
      { path: "chinh-sach/quy-dinh-chung", lazy: async () => ({ Component: (await import("./pages/policies/GeneralRules")).default }), entry: "src/pages/policies/GeneralRules.tsx" },
      {
        path: "tin-tuc",
        loader: newsLoader,
        lazy: async () => ({ Component: (await import("./pages/News")).default }),
        entry: "src/pages/News.tsx",
      },
      {
        path: "hoi-dap",
        loader: faqLoader,
        lazy: async () => ({ Component: (await import("./pages/FAQ")).default }),
        entry: "src/pages/FAQ.tsx",
      },
      { path: "ai-tools", lazy: async () => ({ Component: (await import("./pages/AIToolsPage")).default }), entry: "src/pages/AIToolsPage.tsx" },
      { path: "ai-tools/pro", lazy: async () => ({ Component: (await import("./pages/ProUpgrade")).default }), entry: "src/pages/ProUpgrade.tsx" },
      { path: "san-pham/beacon", lazy: async () => ({ Component: (await import("./pages/BeaconProduct")).default }), entry: "src/pages/BeaconProduct.tsx" },
      { path: "auth/callback", lazy: async () => ({ Component: (await import("./pages/AuthCallback")).default }), entry: "src/pages/AuthCallback.tsx" },
      { path: "case-studies", lazy: async () => ({ Component: (await import("./pages/CaseStudies")).default }), entry: "src/pages/CaseStudies.tsx" },
      { path: "lien-he", lazy: async () => ({ Component: (await import("./pages/Contact")).default }), entry: "src/pages/Contact.tsx" },
      { path: "yeu-cau-bao-gia", lazy: async () => ({ Component: (await import("./pages/RequestForm")).default }), entry: "src/pages/RequestForm.tsx" },
      { path: "dat-lich-hen", lazy: async () => ({ Component: (await import("./pages/Schedule")).default }), entry: "src/pages/Schedule.tsx" },
      {
        path: "tin-tuc/:slug",
        loader: newsDetailLoader,
        lazy: async () => ({ Component: (await import("./pages/news/[slug]")).default }),
        entry: "src/pages/news/[slug].tsx",
        getStaticPaths: import.meta.env.SSR
          ? async () => (await import("./lib/posts")).getPostStaticPaths()
          : undefined,
      },
      { path: "*", lazy: async () => ({ Component: (await import("./pages/NotFound")).default }), entry: "src/pages/NotFound.tsx" },
    ],
  },
];

export default AppLayout;
