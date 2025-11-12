import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface ExtratoItem {
  id: number;
  valor: number;
  data: string;
  contraparte: string | null;
  tipo: 'CREDITO' | 'DEBITO';
  usuarioId: number;
}

interface ExtratoData {
  entradas: number;
  saidas: number;
  transactions: ExtratoItem[];
  monthlyData: Array<{
    name: string;
    entradas: number;
    saidas: number;
  }>;
}

export const useExtrato = () => {
  const [extrato, setExtrato] = useState<ExtratoData>({
    entradas: 0,
    saidas: 0,
    transactions: [],
    monthlyData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchExtrato = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Busca todos os extratos
        const response = await fetch('/api/extrato');

        if (!response.ok) {
          throw new Error('Erro ao buscar extrato');
        }

        const allExtratos: ExtratoItem[] = await response.json();

        // Filtra apenas os extratos do usuário logado
        const userExtratos = allExtratos.filter(item => item.usuarioId === user.id);

        // Processa os dados para o formato necessário
        const processedData = processExtratoData(userExtratos);
        setExtrato(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao buscar extrato:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExtrato();
  }, [user]);

  return { extrato, loading, error };
};

// Função para processar os dados do extrato
const processExtratoData = (extratos: ExtratoItem[]): ExtratoData => {
  // Calcular totais
  const entradas = extratos
    .filter(item => item.tipo === 'CREDITO')
    .reduce((sum, item) => sum + item.valor, 0);

  const saidas = extratos
    .filter(item => item.tipo === 'DEBITO')
    .reduce((sum, item) => sum + item.valor, 0);

  // Agrupar por mês para o gráfico
  const monthlyData = extratos.reduce((acc, item) => {
    const date = new Date(item.data);
    const monthKey = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });

    const existingMonth = acc.find(m => m.name === monthKey);

    if (existingMonth) {
      if (item.tipo === 'CREDITO') {
        existingMonth.entradas += item.valor;
      } else {
        existingMonth.saidas += item.valor;
      }
    } else {
      acc.push({
        name: monthKey,
        entradas: item.tipo === 'CREDITO' ? item.valor : 0,
        saidas: item.tipo === 'DEBITO' ? item.valor : 0
      });
    }

    return acc;
  }, [] as Array<{ name: string; entradas: number; saidas: number }>);

  // Ordenar por data (mais recente primeiro)
  monthlyData.sort((a, b) => {
    const dateA = new Date('01 ' + a.name); // Converte "jan 2024" para data
    const dateB = new Date('01 ' + b.name);
    return dateB.getTime() - dateA.getTime();
  });

  // Pegar apenas os últimos 6 meses para o gráfico
  const lastSixMonths = monthlyData.slice(0, 6).reverse();

  return {
    entradas,
    saidas,
    transactions: extratos.slice(0, 10), // Últimas 10 transações
    monthlyData: lastSixMonths
  };

  const validarExtratoNoFrontend = (valor: number, tipo: string): string[] => {
    const erros: string[] = [];

    if (!valor || valor <= 0) {
      erros.push('O valor deve ser maior que zero');
    }

    if (valor > 100000) {
      erros.push('Valor máximo por transação é R$ 100.000,00');
    }

    if (!['CREDITO', 'DEBITO'].includes(tipo)) {
      erros.push('Tipo deve ser CREDITO ou DEBITO');
    }

    return erros;
  };
};