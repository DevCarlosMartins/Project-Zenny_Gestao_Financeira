import { Coupon } from '@/hooks/useCoupons';
import { DeleteButton } from '@/components/ui/DeleteButton';
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

const ICON_MAP: Record<string, any> = {
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
};

interface CouponCardProps {
  coupon: Coupon;
  onDelete: (id: string) => void;
}

export const CouponCard = ({ coupon, onDelete }: CouponCardProps) => {
  const Icon = ICON_MAP[coupon.icon] || Tag;

  return (
    <div className="flex items-center gap-3 p-3 rounded-md border bg-transparent" style={{ minWidth: 0 }}>
      <div className="flex-shrink-0 h-12 w-12 rounded-md flex items-center justify-center" style={{ background: coupon.color }}>
        <Icon className="h-6 w-6 text-gray-800" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{coupon.name}</p>
        <p className="text-xs text-muted-foreground truncate">{coupon.sponsor} • {coupon.discount}%</p>
      </div>

      <div className="flex-shrink-0">
        <DeleteButton onDelete={() => onDelete(coupon.id)} itemName={coupon.name} />
      </div>
    </div>
  );
};
