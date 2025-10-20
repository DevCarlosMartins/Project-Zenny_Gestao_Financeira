import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  TrendingDown, 
  Wallet, 
  Target, 
  BarChart3,
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
  { name: 'Minhas Contas', path: '/accounts', icon: Wallet },
  { name: 'Metas', path: '/goals', icon: Target },
  { name: 'Relatórios', path: '/reports', icon: BarChart3 },
];

const bottomItems = [
  { name: 'Suporte', path: '/support', icon: HelpCircle },
  { name: 'Configurações', path: '/settings', icon: Settings },
];

export const Sidebar = ({ isExpanded, onToggle }: SidebarProps) => {
  return (
    <nav
      className={`fixed left-0 top-0 h-screen bg-sidebar-bg z-50 transition-all duration-200 overflow-x-hidden ${
        isExpanded ? 'w-[22vw] min-w-[220px] max-w-[300px]' : 'w-[72px]'
      }`}
      aria-label="Navegação principal"
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
        <img src={logo} alt="Zenny" className="w-10 h-10" />
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-white/10 transition-smooth focus:outline-none focus:ring-2 focus:ring-accent"
          aria-expanded={isExpanded}
          aria-controls="sidebar-nav"
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div id="sidebar-nav" className="flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-smooth ${
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

        {/* Bottom section - Support, Settings, Profile */}
        <div className="border-t border-white/10">
          <div className="py-2 space-y-1 px-2">
            {bottomItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg transition-smooth ${
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

          {/* Profile (fixed at bottom) */}
          <div className="p-2 border-t border-white/10">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-smooth ${
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
  );
};
