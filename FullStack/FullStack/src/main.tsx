import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);



// import { createRoot } from "react-dom/client";
// import "./index.css";
// import Login from "./pages/Login"; // Importa a página de Login

// // IMPORTAÇÕES DOS PROVIDERS (Dependencies)
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter } from "react-router-dom";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";

// const queryClient = new QueryClient();

// // Renderiza o Login envolvido nos Providers necessários
// createRoot(document.getElementById("root")!).render(
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );