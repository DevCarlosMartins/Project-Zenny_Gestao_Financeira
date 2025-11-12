import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

const Login = () => {
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(nome, password);
        
        if (error) {
          toast({
            title: 'Erro no cadastro',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Cadastro realizado!',
            description: 'Você já pode fazer login.',
          });
          setIsSignUp(false);
        }
      } else {
        const { error } = await signIn(nome, password);
        
        if (error) {
          toast({
            title: 'Erro no login',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image 
            src={logo} 
            alt="Zenny" 
            width={96} 
            height={96} 
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold">Bem-vindo ao Zenny</h1>
          <p className="text-muted-foreground mt-2">
            {isSignUp ? 'Crie sua conta' : 'Entre na sua conta'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome de usuário</Label>
              <Input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Seu nome de usuário"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="mt-1"
                minLength={6}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Carregando...' : isSignUp ? 'Cadastrar' : 'Entrar'}
          </Button>

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            {isSignUp
              ? 'Já tem uma conta? Entre'
              : 'Não tem conta? Cadastre-se'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;