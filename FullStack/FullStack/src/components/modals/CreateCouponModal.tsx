import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCoupons } from '@/hooks/useCoupons';
import { toast } from '@/hooks/use-toast';
import {
  Tag,
  Percent,
  Gift,
  Coffee,
  ShoppingCart,
  Star,
  Heart,
  ShoppingBag,
  Award,
  Sparkles,
} from 'lucide-react';

const ICONS = [
  { name: 'Tag', comp: Tag },
  { name: 'Percent', comp: Percent },
  { name: 'Gift', comp: Gift },
  { name: 'Coffee', comp: Coffee },
  { name: 'ShoppingCart', comp: ShoppingCart },
  { name: 'Star', comp: Star },
  { name: 'Heart', comp: Heart },
  { name: 'ShoppingBag', comp: ShoppingBag },
  { name: 'Award', comp: Award },
  { name: 'Sparkles', comp: Sparkles },
];

const PASTEL_COLORS = [
  '#FFDCE5', '#E6F7FF', '#FFF4E6', '#EAF7E0', '#F5E6FF', '#FFEFE6', '#E8F0FF', '#FFF0F6', '#F0FFF4', '#FFF8E8'
];

interface CreateCouponModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCouponModal = ({ open, onOpenChange }: CreateCouponModalProps) => {
  const [name, setName] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [discount, setDiscount] = useState('10');
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0].name);
  const { addCoupon } = useCoupons();

  const pickPastel = () => {
    return PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
  };

  const handleCreate = async () => {
    if (!name.trim() || !sponsor.trim()) {
      toast({ title: 'Preencha nome e patrocinadora', variant: 'destructive' });
      return;
    }

    const color = pickPastel();

    const result = await addCoupon({
      name: name.trim(),
      sponsor: sponsor.trim(),
      discount: Number(discount),
      icon: selectedIcon,
      color,
    });

    if (result.success) {
      toast({ title: 'Cupom criado' });
      setName('');
      setSponsor('');
      setDiscount('10');
      setSelectedIcon(ICONS[0].name);
      onOpenChange(false);
    } else {
      toast({ title: 'Erro ao criar cupom', variant: 'destructive' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Cupom</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label>Nome do cupom</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: DESCONTO10" className="mt-2" />
          </div>

          <div>
            <Label>Patrocinadora</Label>
            <Input value={sponsor} onChange={(e) => setSponsor(e.target.value)} placeholder="Nome da empresa" className="mt-2" />
          </div>

          <div>
            <Label>Desconto (%)</Label>
            <Input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="mt-2" />
          </div>

          <div>
            <Label>Ícone</Label>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {ICONS.map((ic) => {
                const IconComp: any = ic.comp;
                const selected = selectedIcon === ic.name;
                return (
                  <button
                    key={ic.name}
                    type="button"
                    onClick={() => setSelectedIcon(ic.name)}
                    className={`flex items-center justify-center p-2 rounded-md border ${selected ? 'border-accent' : 'border-white/10'} bg-transparent`}
                  >
                    <IconComp className="h-5 w-5" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">Cancelar</Button>
            <Button className="flex-1" onClick={handleCreate}>Criar cupom</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
