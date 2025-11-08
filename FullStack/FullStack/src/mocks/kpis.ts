export interface KPIData {
  balance: number;
  variation: number;
  income: number;
  expenses: number;
  monthlyData: { month: string; income: number; expenses: number }[];
}

export const mockKPIs: KPIData = {
  balance: 12450.00,
  variation: 3,
  income: 8500.00,
  expenses: 6200.00,
  monthlyData: [
    { month: 'Jan', income: 7800, expenses: 6500 },
    { month: 'Fev', income: 8200, expenses: 6100 },
    { month: 'Mar', income: 8500, expenses: 6200 },
  ],
};
