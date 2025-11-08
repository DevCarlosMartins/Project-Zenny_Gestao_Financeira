import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { CreateCouponModal } from '@/components/modals/CreateCouponModal';
import { useState } from 'react';
import { useCoupons } from '@/hooks/useCoupons';
import { CouponCard } from '@/components/ui/CouponCard';
import { toast } from '@/hooks/use-toast';

const Cupons = () => {
  const [open, setOpen] = useState(false);
  const { coupons, deleteCoupon } = useCoupons();

  // Ordena por createdAt (mais recente primeiro)
  const sorted = [...coupons].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const handleDelete = async (id: string, name?: string) => {
    const res = await deleteCoupon(id);
    if (res.success) {
      toast({ title: name ? `${name} removido` : 'Cupom removido' });
    } else {
      toast({ title: 'Erro ao remover cupom', variant: 'destructive' });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Cupons</h2>
        <p className="text-muted-foreground mt-2">Gerencie seus cupons de desconto</p>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Seus cupons</h3>
          <Button onClick={() => setOpen(true)}>Criar cupom</Button>
        </div>

        <div className="mt-6">
          {sorted.length === 0 ? (
            <p className="text-muted-foreground">Nenhum cupom criado ainda.</p>
          ) : (
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(1, minmax(0,1fr))' }}>
              {/* Responsivo: 1 / 2 / 3 / 4 / 6 colunas conforme largura */}
              <div className="col-span-full">
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {sorted.map((c) => (
                    <div key={c.id} className="p-1">
                      <CouponCard coupon={c} onDelete={() => handleDelete(c.id, c.name)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CreateCouponModal open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default Cupons;
