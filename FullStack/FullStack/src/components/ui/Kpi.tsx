import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiProps {
  label: string;
  value: string;
  trend?: number;
  subtitle?: string;
}

export const Kpi = ({ label, value, trend, subtitle }: KpiProps) => {
  const isPositive = trend !== undefined && trend > 0;
  
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <div className="flex items-baseline gap-3">
        <p className="text-3xl font-bold">{value}</p>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-success' : 'text-error'}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
};
