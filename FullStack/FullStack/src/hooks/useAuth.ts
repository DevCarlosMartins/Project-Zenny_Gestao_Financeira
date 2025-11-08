import { useState, useEffect } from 'react';

interface User {
  id: number;
  nome: string;
}

// ✅ ADICIONE esta interface
interface AuthResult {
  error: Error | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Carregar usuário do localStorage apenas no cliente
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signIn = async (nome: string, senha: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, senha }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { error: null };
      } else {
        return { error: new Error(data.message) };
      }
    } catch (error) {
      return { error: new Error('Erro de conexão com o servidor') };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (nome: string, senha: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const response = await fetch('/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, senha, saldo: 0 }),
      });

      if (response.ok) {
        return { error: null };
      } else {
        const errorData = await response.json();
        return { error: new Error(errorData.message || 'Erro no cadastro') };
      }
    } catch (error) {
      return { error: new Error('Erro de conexão com o servidor') };
    } finally {
      setLoading(false);
    }
  };

  // ✅ CORREÇÃO: Defina explicitamente o tipo de retorno
  const signOut = async (): Promise<AuthResult> => {
    console.log('🚪 useAuth - Fazendo logout');
    setUser(null);
    localStorage.removeItem('user');
    return { error: null };
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
};