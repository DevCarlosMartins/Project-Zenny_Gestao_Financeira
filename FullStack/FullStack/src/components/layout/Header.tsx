import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  onAddTransaction?: () => void;
}

export const Header = ({ title, onAddTransaction }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm">
      <h1 className="text-2xl font-semibold">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 bg-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent w-64 transition-smooth"
          />
        </div>
        
        {onAddTransaction && (
          <Button onClick={onAddTransaction} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar transação
          </Button>
        )}
      </div>
    </header>
  );
};
