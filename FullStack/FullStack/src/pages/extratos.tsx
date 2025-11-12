// pages/extratos.tsx
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Overlay } from '@/components/layout/Overlay';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface Extrato {
    id: number;
    valor: number;
    tipo: 'CREDITO' | 'DEBITO';
    contraparte?: string;
    usuarioId: number;
    createdAt: string;
    updatedAt: string;
}

interface FormErrors {
    valor?: string;
    tipo?: string;
    contraparte?: string;
}

const ExtratosPage = () => {
    const { user } = useAuth();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [extratos, setExtratos] = useState<Extrato[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        valor: '',
        tipo: 'DEBITO' as 'CREDITO' | 'DEBITO',
        contraparte: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (user) {
            fetchExtratos();
        }
    }, [user]);

    const fetchExtratos = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/extrato');
            if (response.ok) {
                const data = await response.json();
                setExtratos(data);
            } else {
                throw new Error('Erro ao carregar extratos');
            }
        } catch (error) {
            toast({
                title: 'Erro ao carregar extratos',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    // Validações
    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'valor':
                if (!value.trim()) return 'Valor é obrigatório';
                const numValue = parseFloat(value);
                if (isNaN(numValue)) return 'Valor deve ser um número válido';
                if (numValue <= 0) return 'Valor deve ser maior que zero';
                if (numValue > 1000000) return 'Valor não pode ser maior que R$ 1.000.000';
                if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Use no máximo 2 casas decimais';
                return '';

            case 'tipo':
                if (!value) return 'Tipo é obrigatório';
                return '';

            case 'contraparte':
                if (value.length > 100) return 'Descrição deve ter no máximo 100 caracteres';
                if (value.trim().length === 0 && touched.contraparte) return 'Descrição é recomendada';
                return '';

            default:
                return '';
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validar todos os campos
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field as keyof typeof formData]);
            if (error) {
                newErrors[field as keyof FormErrors] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));

        const error = validateField(field, formData[field as keyof typeof formData]);
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Validação em tempo real se o campo já foi tocado
        if (touched[field]) {
            const error = validateField(field, value);
            setErrors(prev => ({ ...prev, [field]: error }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Marcar todos os campos como tocados para mostrar erros
        const allTouched = {
            valor: true,
            tipo: true,
            contraparte: true
        };
        setTouched(allTouched);

        if (!validateForm()) {
            toast({
                title: 'Por favor, corrija os erros no formulário',
                variant: 'destructive',
            });
            return;
        }

        if (!user) {
            toast({
                title: 'Usuário não autenticado',
                variant: 'destructive',
            });
            return;
        }

        setSubmitting(true);
        try {
            const extratoData = {
                valor: parseFloat(formData.valor),
                tipo: formData.tipo,
                contraparte: formData.contraparte.trim() || undefined,
                usuarioId: user.id
            };

            const url = editingId ? `/api/extrato/${editingId}` : '/api/extrato';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(extratoData),
            });

            if (response.ok) {
                toast({
                    title: editingId ? 'Extrato atualizado!' : 'Extrato adicionado!',
                    description: `${formData.tipo === 'CREDITO' ? 'Crédito' : 'Débito'} de ${formatCurrency(parseFloat(formData.valor))} cadastrado.`
                });

                resetForm();
                fetchExtratos();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao salvar extrato');
            }
        } catch (error: any) {
            toast({
                title: 'Erro ao salvar extrato',
                description: error.message || 'Tente novamente',
                variant: 'destructive',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (extrato: Extrato) => {
        setEditingId(extrato.id);
        setFormData({
            valor: extrato.valor.toString(),
            tipo: extrato.tipo,
            contraparte: extrato.contraparte || ''
        });
        setErrors({});
        setTouched({});
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir este extrato? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            const response = await fetch(`/api/extrato/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast({
                    title: 'Extrato excluído com sucesso!',
                });
                fetchExtratos();
            } else {
                throw new Error('Erro ao excluir extrato');
            }
        } catch (error) {
            toast({
                title: 'Erro ao excluir extrato',
                variant: 'destructive',
            });
        }
    };

    const resetForm = () => {
        setFormData({
            valor: '',
            tipo: 'DEBITO',
            contraparte: ''
        });
        setErrors({});
        setTouched({});
        setEditingId(null);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const getTipoDisplay = (tipo: 'CREDITO' | 'DEBITO') => {
        return tipo === 'CREDITO' ? 'CRÉDITO' : 'DÉBITO';
    };

    const getTipoColor = (tipo: 'CREDITO' | 'DEBITO') => {
        return tipo === 'CREDITO' ? 'text-green-600' : 'text-red-600';
    };

    const getTipoSymbol = (tipo: 'CREDITO' | 'DEBITO') => {
        return tipo === 'CREDITO' ? '+' : '-';
    };

    const isFormValid = () => {
        return !errors.valor && !errors.tipo && !errors.contraparte &&
            formData.valor && formData.tipo;
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">Você precisa estar logado para acessar esta página.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Sidebar
                isExpanded={isSidebarExpanded}
                onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
            />

            <Overlay
                isVisible={false}
                onClick={() => setIsSidebarExpanded(true)}
            />

            <div className={`transition-all duration-200 ${isSidebarExpanded ? 'ml-[22vw] min-ml-[220px] max-ml-[300px]' : 'ml-[72px]'
                }`}>
                <Header title="Gerenciar Extratos" />

                <div className="p-6 space-y-6">
                    {/* Botão para voltar ao Home */}
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <Button variant="outline">
                                ← Voltar para Dashboard
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Formulário */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                {editingId ? 'Editar Extrato' : 'Adicionar Novo Extrato'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Tipo */}
                                <div className="space-y-2">
                                    <Label htmlFor="tipo">Tipo *</Label>
                                    <Select
                                        value={formData.tipo}
                                        onValueChange={(value: 'CREDITO' | 'DEBITO') =>
                                            handleChange('tipo', value)
                                        }
                                    >
                                        <SelectTrigger className={errors.tipo ? 'border-red-500' : ''}>
                                            <SelectValue>
                                                {formData.tipo === 'CREDITO' ? 'CRÉDITO' : 'DÉBITO'}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CREDITO">CRÉDITO</SelectItem>
                                            <SelectItem value="DEBITO">DÉBITO</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.tipo && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <span>⚠</span>
                                            {errors.tipo}
                                        </p>
                                    )}
                                </div>

                                {/* Valor */}
                                <div className="space-y-2">
                                    <Label htmlFor="valor">Valor (R$) *</Label>
                                    <Input
                                        id="valor"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        max="1000000"
                                        placeholder="0,00"
                                        value={formData.valor}
                                        onChange={(e) => handleChange('valor', e.target.value)}
                                        onBlur={() => handleBlur('valor')}
                                        className={errors.valor ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.valor && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <span>⚠</span>
                                            {errors.valor}
                                        </p>
                                    )}
                                </div>

                                {/* Contraparte (Descrição) */}
                                <div className="space-y-2">
                                    <Label htmlFor="contraparte">
                                        Descrição {!errors.contraparte && touched.contraparte && (
                                            <span className="text-orange-500 text-xs">(recomendado)</span>
                                        )}
                                    </Label>
                                    <Input
                                        id="contraparte"
                                        placeholder="Ex: Salário, Conta de luz, Supermercado..."
                                        value={formData.contraparte}
                                        onChange={(e) => handleChange('contraparte', e.target.value)}
                                        onBlur={() => handleBlur('contraparte')}
                                        className={errors.contraparte ? 'border-red-500' : ''}
                                        maxLength={100}
                                    />
                                    <div className="flex justify-between">
                                        {errors.contraparte ? (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <span>⚠</span>
                                                {errors.contraparte}
                                            </p>
                                        ) : (
                                            <div className="text-xs text-muted-foreground">
                                                {touched.contraparte && !formData.contraparte && 'Descrição ajuda a identificar a transação'}
                                            </div>
                                        )}
                                        <div className="text-xs text-muted-foreground">
                                            {formData.contraparte.length}/100
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-2 pt-4">
                                    {editingId && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={resetForm}
                                            disabled={submitting}
                                        >
                                            Cancelar
                                        </Button>
                                    )}
                                    <Button
                                        type="submit"
                                        className="flex-1"
                                        disabled={submitting || !isFormValid()}
                                    >
                                        {submitting ? 'Salvando...' : editingId ? 'Atualizar Extrato' : 'Adicionar Extrato'}
                                    </Button>
                                </div>

                                <div className="text-xs text-muted-foreground">
                                    <p>* Campos obrigatórios</p>
                                </div>
                            </form>
                        </Card>

                        {/* Lista de Extratos */}
                        <Card className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Seus Extratos</h2>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-muted-foreground">
                                        {extratos.length} {extratos.length === 1 ? 'registro' : 'registros'}
                                    </span>
                                    {extratos.length > 0 && (
                                        <div className="flex gap-2 text-xs">
                                            <span className="text-green-600">● {extratos.filter(e => e.tipo === 'CREDITO').length} créditos</span>
                                            <span className="text-red-600">● {extratos.filter(e => e.tipo === 'DEBITO').length} débitos</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {loading ? (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">Carregando extratos...</p>
                                </div>
                            ) : extratos.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">Nenhum extrato cadastrado ainda.</p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Adicione seu primeiro extrato usando o formulário ao lado.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                    {extratos.map((extrato) => (
                                        <div
                                            key={extrato.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`inline-block w-2 h-2 rounded-full ${extrato.tipo === 'CREDITO' ? 'bg-green-500' : 'bg-red-500'
                                                        }`} />
                                                    <span className="font-medium">
                                                        {extrato.contraparte || getTipoDisplay(extrato.tipo)}
                                                    </span>
                                                    {editingId === extrato.id && (
                                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                            Editando
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {formatDate(extrato.createdAt)}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className={`font-semibold ${getTipoColor(extrato.tipo)}`}>
                                                    {getTipoSymbol(extrato.tipo)} {formatCurrency(extrato.valor)}
                                                </span>

                                                <div className="flex gap-1 ml-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(extrato)}
                                                        disabled={submitting}
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(extrato.id)}
                                                        disabled={submitting}
                                                    >
                                                        Excluir
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtratosPage;