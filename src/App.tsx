
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import Cryptocurrency from "./pages/Cryptocurrency";
import Exchange from "./pages/Exchange";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import CreditScorePage from "./pages/CreditScorePage";
import LandingPage from "./pages/LandingPage";
import AllPaymentsPage from "./pages/AllPaymentsPage";

const queryClient = new QueryClient();

// Simulating authentication for demo purposes
const isAuthenticated = true; // In a real app, this would be determined by an auth system

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Index /> : <LandingPage />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/cryptocurrency" element={<Cryptocurrency />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/credit-score" element={<CreditScorePage />} />
          <Route path="/payments" element={<AllPaymentsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
