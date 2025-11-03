import { useState, useEffect } from 'react';
import { mockTransactions } from '@/mocks/transactions';

export interface Transaction {
  id: string;
  description: string;
  value: number;
  date: string;
  type: 'entrada' | 'saida';
  status: 'pending' | 'completed';
}

// Helper para garantir que newTransaction está no formato correto
const createNewTransaction = (
  transaction: Omit<Transaction, 'id' | 'status'>
): Transaction => ({
  ...transaction,
  id: Math.random().toString(36).substr(2, 9),
  status: new Date(transaction.date) > new Date() ? 'pending' : 'completed'
});

export const useTransactions = () => {
  // Inicializa com dados do localStorage ou dados mockados se não houver nada no localStorage
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });
  const [loading, setLoading] = useState(false);

  // Salva no localStorage sempre que as transações mudarem
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const fetchTransactions = async () => {
    // Agora apenas retorna os dados do estado local
    return transactions;
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'status'>) => {
    try {
      const newTransaction = createNewTransaction(transaction);

      setTransactions(prev => {
        const updated = [...prev, newTransaction];
        localStorage.setItem('transactions', JSON.stringify(updated));
        return updated;
      });

      return { success: true };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return { success: false, error };
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      setTransactions(prev => {
        const updated = prev.filter(t => t.id !== id);
        localStorage.setItem('transactions', JSON.stringify(updated));
        return updated;
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return { success: false, error };
    }
  };

  return { 
    transactions, 
    loading, 
    refetch: fetchTransactions, 
    addTransaction,
    deleteTransaction
  };
};
