-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('entrada', 'saida')),
  description text NOT NULL,
  value numeric NOT NULL CHECK (value > 0),
  date date NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create goals table
CREATE TABLE IF NOT EXISTS public.goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  target_value numeric NOT NULL CHECK (target_value > 0),
  current_value numeric DEFAULT 0 NOT NULL CHECK (current_value >= 0),
  due_date date NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create kpis table
CREATE TABLE IF NOT EXISTS public.kpis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  balance numeric DEFAULT 0 NOT NULL,
  month_change numeric DEFAULT 0 NOT NULL,
  last_update timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpis ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for transactions
CREATE POLICY "Users can view their own transactions"
  ON public.transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions"
  ON public.transactions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions"
  ON public.transactions FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for goals
CREATE POLICY "Users can view their own goals"
  ON public.goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
  ON public.goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON public.goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals"
  ON public.goals FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for kpis
CREATE POLICY "Users can view their own kpis"
  ON public.kpis FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own kpis"
  ON public.kpis FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own kpis"
  ON public.kpis FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update KPIs after transaction changes
CREATE OR REPLACE FUNCTION public.update_user_kpis()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_balance numeric;
  prev_month_balance numeric;
  current_month_start date;
  prev_month_start date;
BEGIN
  -- Calculate current month start
  current_month_start := date_trunc('month', CURRENT_DATE)::date;
  prev_month_start := (date_trunc('month', CURRENT_DATE) - interval '1 month')::date;
  
  -- Calculate current balance
  SELECT COALESCE(
    SUM(CASE WHEN type = 'entrada' THEN value ELSE -value END), 
    0
  ) INTO user_balance
  FROM public.transactions
  WHERE user_id = COALESCE(NEW.user_id, OLD.user_id);
  
  -- Calculate previous month balance for comparison
  SELECT COALESCE(
    SUM(CASE WHEN type = 'entrada' THEN value ELSE -value END), 
    0
  ) INTO prev_month_balance
  FROM public.transactions
  WHERE user_id = COALESCE(NEW.user_id, OLD.user_id)
    AND date < current_month_start;
  
  -- Upsert KPI record
  INSERT INTO public.kpis (user_id, balance, month_change, last_update)
  VALUES (
    COALESCE(NEW.user_id, OLD.user_id),
    user_balance,
    CASE 
      WHEN prev_month_balance != 0 THEN ((user_balance - prev_month_balance) / ABS(prev_month_balance)) * 100
      ELSE 0
    END,
    now()
  )
  ON CONFLICT (user_id) 
  DO UPDATE SET
    balance = EXCLUDED.balance,
    month_change = EXCLUDED.month_change,
    last_update = EXCLUDED.last_update;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create triggers to update KPIs on transaction changes
CREATE TRIGGER update_kpis_on_transaction_insert
  AFTER INSERT ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_kpis();

CREATE TRIGGER update_kpis_on_transaction_update
  AFTER UPDATE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_kpis();

CREATE TRIGGER update_kpis_on_transaction_delete
  AFTER DELETE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_kpis();