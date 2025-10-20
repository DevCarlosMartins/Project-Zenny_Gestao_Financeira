import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Erro ao sair',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Perfil</h2>
      
      <Card>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-lg font-medium">{user?.email}</p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Button onClick={handleSignOut} variant="outline">
              Sair da conta
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
