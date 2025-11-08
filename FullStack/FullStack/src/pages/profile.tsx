import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      
      // ✅ CORREÇÃO: Verificar se há erro
      if (error) {
        toast({
          title: 'Erro ao sair',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        // ✅ Logout bem-sucedido
        toast({
          title: 'Logout realizado',
          description: 'Você saiu da sua conta.',
        });
        router.push('/login');
      }
    } catch (error) {
      // ✅ Capturar qualquer erro inesperado
      toast({
        title: 'Erro ao sair',
        description: 'Ocorreu um erro inesperado.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Perfil</h2>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Nome de usuário</p>
            <p className="text-lg font-medium">{user?.nome}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">ID</p>
            <p className="text-lg font-medium">{user?.id}</p>
          </div>

          <div className="pt-4 border-t border-border">
            <Button onClick={handleSignOut} variant="outline" className="w-full">
              Sair da conta
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;