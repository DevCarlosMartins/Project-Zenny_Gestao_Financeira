import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Expenses = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Meus Gastos</h2>
      <p className="text-muted-foreground mt-2">Em breve: análise detalhada de gastos</p>

      <div className="mt-6">
        <Button asChild variant="secondary">
          <Link to="/cupons">Cupons</Link>
        </Button>
      </div>
    </div>
  );
};

export default Expenses;
