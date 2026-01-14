import NewsDetail from "./pages/news/[slug]";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import NewsPage from "./pages/News";
import ContactPage from "./pages/Contact";
import RequestForm from "./pages/RequestForm";
import CommercePage from "./pages/services/Commerce";
import ITPage from "./pages/services/IT";
import MarketingPage from "./pages/services/Marketing";
import LogisticsPage from "./pages/services/Logistics";
import EducationPage from "./pages/services/Education";
import TermsPage from "./pages/policies/Terms";
import PrivacyPage from "./pages/policies/Privacy";
import GeneralRulesPage from "./pages/policies/GeneralRules";
import NotFound from "./pages/NotFound";
import { AIChatWidget } from "./components/AIChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/linh-vuc-hoat-dong" element={<ServicesPage />} />
          <Route path="/dich-vu/thuong-mai-phan-phoi" element={<CommercePage />} />
          <Route path="/dich-vu/cong-nghe-thong-tin" element={<ITPage />} />
          <Route path="/dich-vu/quang-cao-marketing" element={<MarketingPage />} />
          <Route path="/dich-vu/logistics-cho-thue-xe" element={<LogisticsPage />} />
          <Route path="/dich-vu/giao-duc-dao-tao" element={<EducationPage />} />
          <Route path="/chinh-sach/dieu-khoan-su-dung" element={<TermsPage />} />
          <Route path="/chinh-sach/chinh-sach-bao-mat" element={<PrivacyPage />} />
          <Route path="/chinh-sach/quy-dinh-chung" element={<GeneralRulesPage />} />
          <Route path="/tin-tuc" element={<NewsPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/yeu-cau-bao-gia" element={<RequestForm />} />
          <Route path="/tin-tuc/:slug" element={<NewsDetail />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <AIChatWidget />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
