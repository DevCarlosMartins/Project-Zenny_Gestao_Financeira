import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Overlay } from "@/components/layout/Overlay";
import { useSidebar } from "@/hooks/useSidebar";
import { useAuth } from "@/hooks/useAuth";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Expenses from "./pages/expenses";
import Accounts from "./pages/Accounts";
import Goals from "./pages/goals";
import Reports from "./pages/Reports";
import Support from "./pages/Support";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import Login from "./pages/login";
import NotFound from "./pages/NotFound";
import Cupons from './pages/cupons';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddTransactionModal } from "@/components/modals/AddTransactionModal";
import { useKpis } from "@/hooks/useKpis";
import { useTransactions } from "@/hooks/useTransactions";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isExpanded, toggle, close } = useSidebar();
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refetch: refetchKpis } = useKpis();
  const { refetch: refetchTransactions } = useTransactions();

  // Fechar o menu apenas em dispositivos móveis quando a rota muda
  useEffect(() => {
    if (window.innerWidth <= 768) {
      close();
    }
  }, [location.pathname, close]);

  useEffect(() => {
    if (!loading && !user && location.pathname !== '/login') {
      navigate('/login');
    } else if (!loading && user && location.pathname === '/login') {
      navigate('/');
    }
  }, [user, loading, location.pathname, navigate]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        close();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isExpanded, close]);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Geral';
      case '/transactions':
        return 'Transações';
      case '/expenses':
        return 'Meus Gastos';
          case '/cupons':
            return 'Cupons';
      case '/accounts':
        return 'Minhas Contas';
      case '/goals':
        return 'Metas';
      case '/reports':
        return 'Relatórios';
      case '/support':
        return 'Suporte';
      case '/settings':
        return 'Configurações';
      case '/profile':
        return 'Perfil';
      default:
        return 'Zenny';
    }
  };

  const handleAddTransaction = () => {
    setIsModalOpen(true);
  };

  const handleTransactionSuccess = async () => {
    await refetchKpis();
    await refetchTransactions();
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!user && location.pathname !== '/login') {
    return null;
  }

  if (location.pathname === '/login') {
    return <Login />;
  }

  return (
    <div className="min-h-screen w-full flex">
      <Sidebar isExpanded={isExpanded} onToggle={toggle} />
      <Overlay isVisible={isExpanded} onClick={close} />
      
      <div className="flex-1 flex flex-col ml-[72px]">
        <Header 
          title={getPageTitle()} 
          onAddTransaction={location.pathname === '/' ? handleAddTransaction : undefined}
        />
        
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/expenses" element={<Expenses />} />
              <Route path="/cupons" element={<Cupons />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      <AddTransactionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleTransactionSuccess}
      />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
