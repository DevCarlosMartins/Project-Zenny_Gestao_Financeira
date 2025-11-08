import { useState, FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useTransactions } from '@/hooks/useTransactions';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddTransactionModal = ({ open, onClose, onSuccess }: AddTransactionModalProps) => {
  const [type, setType] = useState<'entrada' | 'saida'>('entrada');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const { addTransaction } = useTransactions();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await addTransaction({
        type,
        description,
        value: parseFloat(value),
        date,
      });

      if (result.success) {
        toast({
          title: 'Transação adicionada',
          description: 'Sua transação foi registrada com sucesso!',
        });
        
        // Reset form
        setDescription('');
        setValue('');
        setDate(new Date().toISOString().split('T')[0]);
        setType('entrada');
        
        onSuccess?.();
        onClose();
      } else {
        throw result.error;
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar a transação.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label>Tipo</Label>
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                variant={type === 'entrada' ? 'default' : 'outline'}
                onClick={() => setType('entrada')}
                className="flex-1"
              >
                Entrada
              </Button>
              <Button
                type="button"
                variant={type === 'saida' ? 'default' : 'outline'}
                onClick={() => setType('saida')}
                className="flex-1"
              >
                Saída
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Ex: Salário, Aluguel..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="value">Valor</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              placeholder="0,00"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
