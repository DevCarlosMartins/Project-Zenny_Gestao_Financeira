import { extratoRepository } from "../repositories/extratoRepository"

// Interface para validação
interface CreateExtratoData {
  valor: number;
  tipo: "CREDITO" | "DEBITO";
  usuarioId: number;
  contraparte?: string;
}

export const extratoService = {
  createExtrato: async (
    valor: number,
    tipo: "CREDITO" | "DEBITO",
    usuarioId: number,
    contraparte?: string
  ) => {
    await validarRegrasExtrato({ valor, tipo, usuarioId, contraparte });
    
    return extratoRepository.create({ valor, tipo, usuarioId, contraparte });
  },

  getExtratos: async() => {
    return extratoRepository.findAll();
  },

  getExtratoById: async(id: number) => {
    return extratoRepository.findById(id);
  },

  getExtratoByUsuario: async(usuarioId: number) => {
    return extratoRepository.findByUsuarioId(usuarioId);
  },

  updateExtrato: async (id: number, data: any) => {
    if (data.valor !== undefined) {
      await validarValor(data.valor);
    }
    if (data.tipo !== undefined) {
      await validarTipo(data.tipo);
    }
    
    return extratoRepository.update(id, data);
  },

  deleteExtrato: async (id: number) => {
    return extratoRepository.delete(id);
  },
};

const validarRegrasExtrato = async (data: CreateExtratoData) => {
  const { valor, tipo, usuarioId } = data;

  // Valor deve ser positivo
  if (valor <= 0) {
    throw new Error('VALOR_INVALIDO: O valor deve ser maior que zero');
  }

  // Tipo deve ser CREDITO ou DEBITO
  if (!['CREDITO', 'DEBITO'].includes(tipo)) {
    throw new Error('TIPO_INVALIDO: Tipo deve ser CREDITO ou DEBITO');
  }

  // Valor máximo por transação (R$ 100.000,00)
  if (valor > 100000) {
    throw new Error('VALOR_EXCEDE_LIMITE: Valor máximo por transação é R$ 100.000,00');
  }

  // Verificar se usuário existe (simulação)
  if (!usuarioId || usuarioId <= 0) {
    throw new Error('USUARIO_INVALIDO: Usuário não encontrado');
  }

  // Limite de transações por dia (opcional)
  const transacoesHoje = await contarTransacoesHoje(usuarioId);
  if (transacoesHoje >= 50) {
    throw new Error('LIMITE_DIARIO: Limite de 50 transações por dia atingido');
  }
};

// Validações individuais para updates
const validarValor = (valor: number) => {
  if (valor <= 0) {
    throw new Error('VALOR_INVALIDO: O valor deve ser maior que zero');
  }
  if (valor > 100000) {
    throw new Error('VALOR_EXCEDE_LIMITE: Valor máximo por transação é R$ 100.000,00');
  }
};

const validarTipo = (tipo: string) => {
  if (!['CREDITO', 'DEBITO'].includes(tipo)) {
    throw new Error('TIPO_INVALIDO: Tipo deve ser CREDITO ou DEBITO');
  }
};

// Função auxiliar para contar transações (simulada)
const contarTransacoesHoje = async (usuarioId: number): Promise<number> => {
  return 0;
};