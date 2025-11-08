import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  type: 'entrada' | 'saida';
  value: number;
  date: string;
  description: string;
  category: string;
  status?: 'pending' | 'completed' | 'cancelled';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'entrada',
    value: 1500,
    date: '2024-01-15',
    description: 'Salário',
    category: 'Trabalho'
  },
  {
    id: '2',
    type: 'saida',
    value: 300,
    date: '2024-01-16',
    description: 'Mercado',
    category: 'Alimentação'
  }
];

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ CORREÇÃO: useEffect para carregar do localStorage apenas no cliente
  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    setTransactions(saved ? JSON.parse(saved) : mockTransactions);
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    const updatedTransactions = transactions.map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  return {
    transactions,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};