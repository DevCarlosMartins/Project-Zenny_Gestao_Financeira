import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface Boleto {
  id: number;
  cedente: string;
  dataValid: string;
  valor: number;
  status: 'PENDENTE' | 'PAGO' | 'CANCELADO';
  usuarioId: number;
}

export const useBoletos = () => {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBoletos = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // URL CORRIGIDA: /api/boleto (singular)
        const response = await fetch('/api/boleto');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar boletos');
        }

        const allBoletos: Boleto[] = await response.json();
        
        // Filtra apenas os boletos do usuário logado que estão PENDENTES
        const userBoletos = allBoletos
          .filter(boleto => 
            boleto.usuarioId === user.id && 
            boleto.status === 'PENDENTE'
          )
          .sort((a, b) => new Date(a.dataValid).getTime() - new Date(b.dataValid).getTime());

        setBoletos(userBoletos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao buscar boletos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoletos();
  }, [user]);

  return { boletos, loading, error };
};