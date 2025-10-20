interface Transaction {
  id: string;
  description: string;
  value: number;
  date: string;
  type: 'entrada' | 'saida';
  status?: 'pending' | 'completed';
}

interface TransactionTableProps {
  transactions: Transaction[];
  title: string;
}

export const TransactionTable = ({ transactions, title }: TransactionTableProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  const getStatusColor = (status?: string) => {
    return status === 'pending' ? 'text-warning' : 'text-muted-foreground';
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Nenhuma transação pendente.
          </p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
            >
              <div className="flex-1">
                <p className="font-medium">{transaction.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {transaction.type === 'entrada' ? 'Entrada' : 'Saída'} • {formatDate(transaction.date)}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === 'entrada' ? 'text-success' : 'text-foreground'}`}>
                  {transaction.type === 'entrada' ? '+' : '-'} {formatCurrency(transaction.value)}
                </p>
                {transaction.status && (
                  <p className={`text-xs mt-1 ${getStatusColor(transaction.status)}`}>
                    {getStatusLabel(transaction.status)}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
