import Image from 'next/image';
import Link from 'next/link'; // ← MUDAR: next/link em vez de react-router-dom
import { useRouter } from 'next/router'; // ← ADICIONAR para verificar rota ativa
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingDown,
  Wallet,
  Target,
  BarChart3,
  Gift,
  HelpCircle,
  Settings,
  User,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import logo from '@/assets/logo.png';

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const navItems = [
  { name: 'Geral', path: '/', icon: LayoutDashboard },
  { name: 'Transações', path: '/transactions', icon: ArrowLeftRight },
  { name: 'Meus Gastos', path: '/expenses', icon: TrendingDown },
  { name: 'Cupons', path: '/cupons', icon: Gift },
  { name: 'Minhas Contas', path: '/accounts', icon: Wallet },
  { name: 'Metas', path: '/goals', icon: Target },
  { name: 'Relatórios', path: '/reports', icon: BarChart3 },
];

const bottomItems = [
  { name: 'Suporte', path: '/support', icon: HelpCircle },
  { name: 'Configurações', path: '/settings', icon: Settings },
];

export const Sidebar = ({ isExpanded, onToggle }: SidebarProps) => {
  const router = useRouter(); // ← Para verificar rota ativa
  const currentPath = router.pathname;

  const topOffset = '35px';
  const leftStyle = isExpanded
    ? 'calc(min(22vw, 300px) - 18px)'
    : 'calc(72px - 18px)';

  // Função para verificar se o link está ativo
  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <>
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls="sidebar-nav"
        title={isExpanded ? 'Recolher barra' : 'Expandir barra'}
        style={{ left: leftStyle, top: topOffset }}
        className="fixed z-[9999] flex items-center justify-center w-10 h-10 rounded-full shadow-lg border border-white/10 bg-sidebar-button text-white focus:outline-none focus:ring-2 focus:ring-accent transition-transform hover:scale-105"
      >
        {isExpanded ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>

      <nav
        className={`fixed left-0 top-0 h-screen bg-sidebar-bg z-50 transition-all duration-200 overflow-x-hidden ${
          isExpanded ? 'w-[22vw] min-w-[220px] max-w-[300px]' : 'w-[72px]'
        }`}
        aria-label="Navegação principal"
      >
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
          <Image src={logo} alt="Zenny" width={40} height={40} />
        </div>

        <div id="sidebar-nav" className="flex flex-col h-[calc(100vh-3.5rem)]">
          <div className="flex-1 py-4 space-y-1 px-3">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                    active
                      ? 'bg-sidebar-active/[.56] text-white font-medium'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : ''}`} />
                  {isExpanded && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-white/10">
            <div className="py-2 space-y-1 px-3">
              {bottomItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                      active ? 'bg-sidebar-active/[.56] text-white font-medium' : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : ''}`} />
                    {isExpanded && <span className="truncate">{item.name}</span>}
                  </Link>
                );
              })}
            </div>

            <div className="p-2 border-t border-white/10">
              <Link
                href="/profile"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                  isActive('/profile')
                    ? 'bg-sidebar-active/[.56] text-white font-medium'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <User className={`w-5 h-5 flex-shrink-0 ${isActive('/profile') ? 'text-white' : ''}`} />
                {isExpanded && <span className="truncate">Perfil</span>}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};