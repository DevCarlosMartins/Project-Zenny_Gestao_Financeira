import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Goal {
  id: string;
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
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;

      if (data) {
        const mappedGoals: Goal[] = data.map(g => ({
          id: g.id,
          name: g.name,
          current: Number(g.current_value),
          target: Number(g.target_value),
          deadline: g.due_date,
        }));
        setGoals(mappedGoals);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  return { goals, loading, refetch: fetchGoals };
};
