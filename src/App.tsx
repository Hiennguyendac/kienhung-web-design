import NewsDetail from "./pages/news/[slug]";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import type { RouteRecord } from "vite-react-ssg";
import Index from "./pages/Index";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import NewsPage from "./pages/News";
import AIToolsPage from "./pages/AIToolsPage";
import ProUpgradePage from "./pages/ProUpgrade";
import AuthCallback from "./pages/AuthCallback";
import ContactPage from "./pages/Contact";
import RequestForm from "./pages/RequestForm";
import CaseStudies from "./pages/CaseStudies";
import Schedule from "./pages/Schedule";
import CommercePage from "./pages/services/Commerce";
import ITPage from "./pages/services/IT";
import MarketingPage from "./pages/services/Marketing";
import LogisticsPage from "./pages/services/Logistics";
import EducationPage from "./pages/services/Education";
import TrainingProgramDetailPage from "./pages/services/TrainingProgramDetail";
import TermsPage from "./pages/policies/Terms";
import PrivacyPage from "./pages/policies/Privacy";
import GeneralRulesPage from "./pages/policies/GeneralRules";
import BeaconProduct from "./pages/BeaconProduct";
import NotFound from "./pages/NotFound";
import { AIChatWidget } from "./components/AIChatWidget";
import { AIChatWidget as AIToolsWidget } from "./components/ai/AIChatWidget";
import { getPostStaticPaths } from "./lib/posts";

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
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

const AppLayout = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RootStructuredData />
        <Toaster />
        <Sonner />
        <AnimatedOutlet />
        <AIChatWidget />
        <AIToolsWidget />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <AppLayout />,
    entry: "src/App.tsx",
    children: [
      { index: true, element: <Index />, entry: "src/pages/Index.tsx" },
      { path: "gioi-thieu", element: <AboutPage />, entry: "src/pages/About.tsx" },
      { path: "linh-vuc-hoat-dong", element: <ServicesPage />, entry: "src/pages/Services.tsx" },
      { path: "dich-vu/thuong-mai-phan-phoi", element: <CommercePage />, entry: "src/pages/services/Commerce.tsx" },
      { path: "dich-vu/cong-nghe-thong-tin", element: <ITPage />, entry: "src/pages/services/IT.tsx" },
      { path: "dich-vu/quang-cao-marketing", element: <MarketingPage />, entry: "src/pages/services/Marketing.tsx" },
      { path: "dich-vu/logistics-cho-thue-xe", element: <LogisticsPage />, entry: "src/pages/services/Logistics.tsx" },
      { path: "dich-vu/giao-duc-dao-tao", element: <EducationPage />, entry: "src/pages/services/Education.tsx" },
      {
        path: "dich-vu/giao-duc-dao-tao/linh-vuc/:domainId/chuong-trinh/:programId",
        element: <TrainingProgramDetailPage />,
        entry: "src/pages/services/TrainingProgramDetail.tsx",
      },
      { path: "chinh-sach/dieu-khoan-su-dung", element: <TermsPage />, entry: "src/pages/policies/Terms.tsx" },
      { path: "chinh-sach/chinh-sach-bao-mat", element: <PrivacyPage />, entry: "src/pages/policies/Privacy.tsx" },
      { path: "chinh-sach/quy-dinh-chung", element: <GeneralRulesPage />, entry: "src/pages/policies/GeneralRules.tsx" },
      { path: "tin-tuc", element: <NewsPage />, entry: "src/pages/News.tsx" },
      { path: "ai-tools", element: <AIToolsPage />, entry: "src/pages/AIToolsPage.tsx" },
      { path: "ai-tools/pro", element: <ProUpgradePage />, entry: "src/pages/ProUpgrade.tsx" },
      { path: "san-pham/beacon", element: <BeaconProduct />, entry: "src/pages/BeaconProduct.tsx" },
      { path: "auth/callback", element: <AuthCallback />, entry: "src/pages/AuthCallback.tsx" },
      { path: "case-studies", element: <CaseStudies />, entry: "src/pages/CaseStudies.tsx" },
      { path: "lien-he", element: <ContactPage />, entry: "src/pages/Contact.tsx" },
      { path: "yeu-cau-bao-gia", element: <RequestForm />, entry: "src/pages/RequestForm.tsx" },
      { path: "dat-lich-hen", element: <Schedule />, entry: "src/pages/Schedule.tsx" },
      {
        path: "tin-tuc/:slug",
        element: <NewsDetail />,
        entry: "src/pages/news/[slug].tsx",
        getStaticPaths: getPostStaticPaths,
      },
      { path: "*", element: <NotFound />, entry: "src/pages/NotFound.tsx" },
    ],
  },
];

export default AppLayout;
