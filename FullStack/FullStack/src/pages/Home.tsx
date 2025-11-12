import { Card } from '@/components/ui/card';
import { Kpi } from '@/components/ui/Kpi';
import { ChartContainer as Chart } from '@/components/ui/chart';
import { useAuth } from '@/hooks/useAuth';
import * as RechartsPrimitive from 'recharts';
import { TransactionTable } from '@/components/tables/TransactionTable';
import { GoalProgress } from '@/components/ui/GoalProgress';
import { useKpis } from '@/hooks/useKpis';
import { useTransactions } from '@/hooks/useTransactions';
import { useGoals } from '@/hooks/useGoals';
import { useExtrato } from '@/hooks/useExtrato';
import { useBoletos } from '@/hooks/useBoleto';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Overlay } from '@/components/layout/Overlay';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const { kpis, loading: kpisLoading } = useKpis();
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { goals, loading: goalsLoading } = useGoals();
  const { extrato, loading: extratoLoading } = useExtrato();
  const { boletos, loading: boletosLoading } = useBoletos();
  const { user } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Calcular saldo baseado no extrato
  const calculatedBalance = extrato.entradas - extrato.saidas;

  // Calcular variação baseada nos últimos meses do extrato
  const calculateVariationFromExtrato = () => {
    if (extrato.monthlyData.length < 2) return 0;

    const currentMonth = extrato.monthlyData[extrato.monthlyData.length - 1];
    const previousMonth = extrato.monthlyData[extrato.monthlyData.length - 2];

    const currentMonthNet = currentMonth.entradas - currentMonth.saidas;
    const previousMonthNet = previousMonth.entradas - previousMonth.saidas;

    if (previousMonthNet === 0) return 0;

    const variation = ((currentMonthNet - previousMonthNet) / Math.abs(previousMonthNet)) * 100;
    return Math.round(variation * 100) / 100;
  };

  const calculatedVariation = calculateVariationFromExtrato();

  const isLoading = kpisLoading || transactionsLoading || goalsLoading || extratoLoading || boletosLoading;

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
    <div className="min-h-screen bg-background">
      <Sidebar
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />

      <Overlay
        isVisible={false}
        onClick={() => setIsSidebarExpanded(true)}
      />

      <div className={`transition-all duration-200 ${isSidebarExpanded ? 'ml-[22vw] min-ml-[220px] max-ml-[300px]' : 'ml-[72px]'
        }`}>
        <Header title="Dashboard" />

        <div className="p-6 space-y-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Seu dinheiro, em ordem. Hoje.</h2>
            <p className="text-muted-foreground">Visão geral das suas finanças</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-5">
              <Kpi
                label="Saldo total"
                value={formatCurrency(calculatedBalance)}
                trend={calculatedVariation}
                subtitle="vs. mês anterior (baseado no extrato)"
              />
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Entradas × Saídas (Extrato)</h3>
                <Link href="/extratos">
                  <Button>
                    Gerenciar Extratos
                  </Button>
                </Link>
              </div>

              <Chart
                className="h-[300px]"
                config={{
                  entradas: { label: 'Entradas', color: '#4ade80' },
                  saidas: { label: 'Saídas', color: '#f43f5e' }
                }}
              >
                <RechartsPrimitive.BarChart data={extrato.monthlyData}>
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                  <RechartsPrimitive.XAxis dataKey="name" />
                  <RechartsPrimitive.YAxis />
                  <RechartsPrimitive.Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                  <RechartsPrimitive.Legend />
                  <RechartsPrimitive.Bar dataKey="entradas" fill="#4ade80" name="Entradas" />
                  <RechartsPrimitive.Bar dataKey="saidas" fill="#f43f5e" name="Saídas" />
                </RechartsPrimitive.BarChart>
              </Chart>

              {/* Resumo do extrato */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="text-green-600">
                  <div className="font-semibold">Total Entradas</div>
                  <div>{formatCurrency(extrato.entradas)}</div>
                </div>
                <div className="text-red-600">
                  <div className="font-semibold">Total Saídas</div>
                  <div>{formatCurrency(extrato.saidas)}</div>
                </div>
                <div className="col-span-2 border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">Saldo Calculado</div>
                    <div className={calculatedBalance >= 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                      {formatCurrency(calculatedBalance)}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Próximas contas a pagar/receber</h3>
                <p className="text-sm text-muted-foreground">
                  {boletos.length} {boletos.length === 1 ? 'boleto pendente' : 'boletos pendentes'}
                </p>
              </div>

              {boletos.length > 0 ? (
                <div className="space-y-3">
                  {boletos.slice(0, 5).map((boleto) => (
                    <div
                      key={boleto.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{boleto.cedente}</div>
                        <div className="text-sm text-muted-foreground">
                          Vence em {formatDate(boleto.dataValid)}
                        </div>
                      </div>
                      <div className={`font-semibold ${boleto.valor >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {formatCurrency(boleto.valor)}
                      </div>
                    </div>
                  ))}
                  {boletos.length > 5 && (
                    <div className="text-center text-sm text-muted-foreground pt-2">
                      +{boletos.length - 5} mais boletos
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-2">
                    Nenhum boleto pendente
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Todos os boletos estão em dia!
                  </div>
                </div>
              )}
            </Card>

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
      </div>
    </div>
  );
};

export default Home;