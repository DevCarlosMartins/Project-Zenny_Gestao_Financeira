import { Card } from '@/components/ui/Card';
import { Kpi } from '@/components/ui/Kpi';
import { ChartContainer as Chart } from '@/components/ui/chart';
import { useAuth } from '@/hooks/useAuth';
import * as RechartsPrimitive from 'recharts';
import { TransactionTable } from '@/components/tables/TransactionTable';
import { GoalProgress } from '@/components/ui/GoalProgress';
import { useKpis } from '@/hooks/useKpis';
import { useTransactions } from '@/hooks/useTransactions';
import { useGoals } from '@/hooks/useGoals';

const Home = () => {
  const { kpis, loading: kpisLoading } = useKpis();
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { goals, loading: goalsLoading } = useGoals();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const upcomingTransactions = transactions.filter(t => t.status === 'pending');
  const isLoading = kpisLoading || transactionsLoading || goalsLoading;

  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Você precisa estar logado para acessar esta página.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Carregando seus dados...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Hero section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Seu dinheiro, em ordem. Hoje.</h2>
        <p className="text-muted-foreground">Visão geral das suas finanças</p>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI - Balance */}
        <Card className="p-5">
          <Kpi
            label="Saldo total"
            value={formatCurrency(kpis.balance)}
            trend={kpis.variation}
            subtitle="vs. mês anterior"
          />
        </Card>

        {/* Chart - Income vs Expenses */}
        <Card className="p-5">
          <h3 className="text-lg font-semibold mb-4">Entradas × Saídas</h3>
          <Chart 
            className="h-[300px]"
            config={{
              entradas: { label: 'Entradas', color: '#4ade80' },
              saidas: { label: 'Saídas', color: '#f43f5e' }
            }}
          >
            <RechartsPrimitive.BarChart data={kpis.monthlyData}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <RechartsPrimitive.Tooltip />
              <RechartsPrimitive.Legend />
              <RechartsPrimitive.Bar dataKey="entradas" fill="#4ade80" name="Entradas" />
              <RechartsPrimitive.Bar dataKey="saidas" fill="#f43f5e" name="Saídas" />
            </RechartsPrimitive.BarChart>
          </Chart>
        </Card>

        {/* Upcoming transactions */}
        <Card className="p-5">
          <TransactionTable
            transactions={upcomingTransactions}
            title="Próximas contas a pagar/receber"
          />
        </Card>

        {/* Goals progress */}
        <Card className="p-5">
          <h3 className="text-lg font-semibold mb-6">Progresso das metas</h3>
          <div className="space-y-6">
            {goals.length > 0 ? (
              goals.map((goal) => (
                <GoalProgress key={goal.id} goal={goal} />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Nenhuma meta cadastrada ainda.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
