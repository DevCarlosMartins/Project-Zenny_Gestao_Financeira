interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  deadline: string;
}

interface GoalProgressProps {
  goal: Goal;
}

export const GoalProgress = ({ goal }: GoalProgressProps) => {
  const progress = (goal.current / goal.target) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{goal.name}</h4>
        <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
      </div>
      
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatCurrency(goal.current)} de {formatCurrency(goal.target)}</span>
        <span>Meta: {formatDate(goal.deadline)}</span>
      </div>
    </div>
  );
};
