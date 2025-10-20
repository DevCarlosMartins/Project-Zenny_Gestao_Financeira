import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Transaction {
  id: string;
  description: string;
  value: number;
  date: string;
  type: 'entrada' | 'saida';
  status?: 'pending' | 'completed';
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
        .limit(50);

      if (error) throw error;

      if (data) {
        const mappedTransactions: Transaction[] = data.map(t => ({
          id: t.id,
          description: t.description,
          value: Number(t.value),
          date: t.date,
          type: t.type as 'entrada' | 'saida',
          status: new Date(t.date) > new Date() ? 'pending' : 'completed',
        }));
        setTransactions(mappedTransactions);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'status'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('transactions')
        .insert([{
          user_id: user.id,
          type: transaction.type,
          description: transaction.description,
          value: transaction.value,
          date: transaction.date,
        }]);

      if (error) throw error;
      await fetchTransactions();
      return { success: true };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return { success: false, error };
    }
  };

  return { transactions, loading, refetch: fetchTransactions, addTransaction };
};
