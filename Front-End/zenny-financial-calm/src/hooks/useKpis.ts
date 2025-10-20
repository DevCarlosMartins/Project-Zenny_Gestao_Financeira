import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
      const { data: kpiData } = await supabase
        .from('kpis')
        .select('*')
        .single();

      if (kpiData) {
        // Fetch monthly data for chart
        const monthlyData = await fetchMonthlyData();
        
        setKpis({
          balance: Number(kpiData.balance),
          variation: Number(kpiData.month_change),
          monthlyData,
        });
      }
    } catch (error) {
      console.error('Error fetching KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyData = async () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const monthlyData = [];

    for (let i = 0; i < 6; i++) {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - (5 - i));
      monthStart.setDate(1);

      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);

      const { data: transactions } = await supabase
        .from('transactions')
        .select('type, value')
        .gte('date', monthStart.toISOString().split('T')[0])
        .lt('date', monthEnd.toISOString().split('T')[0]);

      const entradas = transactions
        ?.filter(t => t.type === 'entrada')
        .reduce((sum, t) => sum + Number(t.value), 0) || 0;

      const saidas = transactions
        ?.filter(t => t.type === 'saida')
        .reduce((sum, t) => sum + Number(t.value), 0) || 0;

      monthlyData.push({
        name: months[i],
        entradas,
        saidas,
      });
    }

    return monthlyData;
  };

  return { kpis, loading, refetch: fetchKpis };
};
