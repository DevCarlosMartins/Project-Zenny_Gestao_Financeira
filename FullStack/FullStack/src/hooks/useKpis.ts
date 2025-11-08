import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface Kpi {
  balance: number;
  variation: number;
  monthlyData: { name: string; entradas: number; saidas: number }[];
}

export const useKpis = () => {
  const [kpis, setKpis] = useState<Kpi>({
    balance: 0,
    variation: 0,
    monthlyData: [],
  });
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchKpis();
    }
  }, [user]);

  const fetchKpis = async () => {
    setLoading(true);
    try {
      // Buscar dados reais do usuário logado (inclui extratos)
      if (!user) {
        setKpis((prev) => ({ ...prev }));
        return;
      }

      const response = await fetch(`/api/usuario/${user.id}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar dados do usuário');
      }

      const usuario = await response.json();

      // Usar o saldo armazenado no usuário (campo `saldo` no DB)
      setKpis((prev) => ({
        ...prev,
        balance: usuario?.saldo ?? 0,
      }));
    } catch (error) {
      console.error('Error fetching KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  return { kpis, loading, refetch: fetchKpis };
};