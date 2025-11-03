// Sidebar.tsx — substitua seu arquivo inteiro por este
import { NavLink } from 'react-router-dom';
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
  // Observação: o botão de toggle agora é um elemento FIXED fora da nav,
  // para ficar sempre acima da overlay e sem interferir no layout interno.
  // Ajuste os valores top/offset conforme seu layout (header etc).
  const topOffset = '35px'; // desce o botão um pouco mais (mude se quiser)
  const horizontalOffset = '-18px'; // quanto "sai" da borda da sidebar (metade pra área principal)

  // left calculado para usar largura responsiva (22vw) mas respeitar max width
  // calc(min(22vw,300px) - 18px) -> funciona quando sidebar está expandida
  // quando recolhida usamos 72px (sua largura recolhida) menos o offset
  const leftStyle = isExpanded
    ? 'calc(min(22vw, 300px) - 18px)'
    : 'calc(72px - 18px)';

  return (
    <>
      {/* Botão FIXED "balaozinho" — fora do nav para não atrapalhar conteudo */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls="sidebar-nav"
        title={isExpanded ? 'Recolher barra' : 'Expandir barra'}
        // left e top calculados inline para permitir o mesmo comportamento expandido/recolhido
        style={{ left: leftStyle, top: topOffset }}
        className="fixed z-[9999] flex items-center justify-center w-10 h-10 rounded-full shadow-lg border border-white/10 bg-sidebar-button text-white focus:outline-none focus:ring-2 focus:ring-accent transition-transform hover:scale-105"
      >
        {isExpanded ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>

      {/* NAV permanece exatamente como você tinha — sem alterações no layout interno */}
      <nav
        className={`fixed left-0 top-0 h-screen bg-sidebar-bg z-50 transition-all duration-200 overflow-x-hidden ${
          isExpanded ? 'w-[22vw] min-w-[220px] max-w-[300px]' : 'w-[72px]'
        }`}
        aria-label="Navegação principal"
      >
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
          <img src={logo} alt="Zenny" className="w-10 h-10" />
          {/* Retirei o toggle daqui de propósito — ele vive fora do nav agora */}
        </div>

        <div id="sidebar-nav" className="flex flex-col h-[calc(100vh-3.5rem)]">
          <div className="flex-1 py-4 space-y-1 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActive
                      ? 'bg-sidebar-active/[.56] text-white font-medium'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                    {isExpanded && <span className="truncate">{item.name}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="border-t border-white/10">
            <div className="py-2 space-y-1 px-3">
              {bottomItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                      isActive ? 'bg-sidebar-active/[.56] text-white font-medium' : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                      {isExpanded && <span className="truncate">{item.name}</span>}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="p-2 border-t border-white/10">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActive
                      ? 'bg-sidebar-active/[.56] text-white font-medium'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <User className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                    {isExpanded && <span className="truncate">Perfil</span>}
                  </>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
