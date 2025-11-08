import { useState, useEffect } from 'react';

export interface Goal {
  id: string; // Mudei para number para compatibilidade com seu banco
  name: string;
  current: number;
  target: number;
  deadline: string;
}

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      // TODO: Substituir por chamada à sua API de metas
      // Por enquanto, usando dados mock
      const mockGoals: Goal[] = [
        {
          id: "1",
          name: "Economia para viagem",
          current: 1500,
          target: 5000,
          deadline: "2024-12-31"
        },
        {
          id: "2", 
          name: "Reserva de emergência",
          current: 3000,
          target: 10000,
          deadline: "2024-10-31"
        }
      ];
      
      setGoals(mockGoals);

      // FUTURO: Quando tiver API de metas
      // const response = await fetch('/api/metas');
      // const data = await response.json();
      // setGoals(data);

    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  return { goals, loading, refetch: fetchGoals };
};