import NewsDetail from "./pages/news/[slug]";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/linh-vuc-hoat-dong" element={<ServicesPage />} />
          <Route path="/dich-vu/thuong-mai-phan-phoi" element={<CommercePage />} />
          <Route path="/dich-vu/cong-nghe-thong-tin" element={<ITPage />} />
          <Route path="/dich-vu/quang-cao-marketing" element={<MarketingPage />} />
          <Route path="/dich-vu/logistics-cho-thue-xe" element={<LogisticsPage />} />
          <Route path="/dich-vu/giao-duc-dao-tao" element={<EducationPage />} />
          <Route
            path="/dich-vu/giao-duc-dao-tao/linh-vuc/:domainId/chuong-trinh/:programId"
            element={<TrainingProgramDetailPage />}
          />
          <Route path="/chinh-sach/dieu-khoan-su-dung" element={<TermsPage />} />
          <Route path="/chinh-sach/chinh-sach-bao-mat" element={<PrivacyPage />} />
          <Route path="/chinh-sach/quy-dinh-chung" element={<GeneralRulesPage />} />
          <Route path="/tin-tuc" element={<NewsPage />} />
          <Route path="/ai-tools" element={<AIToolsPage />} />
          <Route path="/ai-tools/pro" element={<ProUpgradePage />} />
          <Route path="/san-pham/beacon" element={<BeaconProduct />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/yeu-cau-bao-gia" element={<RequestForm />} />
          <Route path="/dat-lich-hen" element={<Schedule />} />
          <Route path="/tin-tuc/:slug" element={<NewsDetail />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      <AIChatWidget />
      <AIToolsWidget />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
