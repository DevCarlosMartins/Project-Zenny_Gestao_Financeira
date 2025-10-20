export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: string;
  status: 'paid' | 'pending' | 'received';
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salário',
    amount: 8500.00,
    type: 'income',
    date: '2025-10-05',
    category: 'Trabalho',
    status: 'received',
  },
  {
    id: '2',
    description: 'Aluguel',
    amount: 2800.00,
    type: 'expense',
    date: '2025-10-10',
    category: 'Moradia',
    status: 'pending',
  },
  {
    id: '3',
    description: 'Conta de luz',
    amount: 280.00,
    type: 'expense',
    date: '2025-10-15',
    category: 'Utilidades',
    status: 'pending',
  },
];
