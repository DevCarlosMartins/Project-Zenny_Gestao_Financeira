# Documentação Técnica - Zenny Financial Calm (Front-End)

## Sumário
1. Visão Geral
2. Tecnologias Utilizadas
3. Estrutura do Projeto
4. Funcionalidades Implementadas
5. Sistema de Armazenamento
6. Componentes Principais
7. Estilização e Design System
8. Roteamento e Navegação
9. Estado e Gerenciamento de Dados
10. Integração e Persistência

## 1. Visão Geral
O Zenny Financial Calm é uma aplicação web para gestão financeira pessoal, desenvolvida com React e TypeScript. A interface oferece funcionalidades para controle de gastos, gestão de cupons, acompanhamento de transações e definição de metas financeiras.

## 2. Tecnologias Utilizadas
- **Core:**
  - React 18.3.1
  - TypeScript
  - Vite (build tool)
- **UI/Styling:**
  - TailwindCSS
  - Radix UI (componentes primitivos)
  - Lucide React (ícones)
  - shadcn/ui (design system)
- **Gerenciamento de Estado:**
  - React Query
  - Custom Hooks
  - LocalStorage
- **Roteamento:**
  - React Router DOM
- **Validação:**
  - Zod

## 3. Estrutura do Projeto
```
zenny-financial-calm/
├── src/
│   ├── assets/              # Recursos estáticos (imagens, ícones)
│   ├── components/
│   │   ├── layout/         # Componentes estruturais (Sidebar, Header)
│   │   ├── modals/         # Modais (CreateCoupon, AddTransaction)
│   │   ├── tables/         # Componentes de tabela
│   │   └── ui/            # Componentes base (Button, Card, etc.)
│   ├── hooks/              # Hooks personalizados
│   │   ├── useCoupons.ts
│   │   ├── useTransactions.ts
│   │   └── useAuth.ts
│   ├── lib/                # Utilidades e configurações
│   ├── pages/              # Páginas da aplicação
│   └── styles/             # Estilos globais
├── public/                 # Arquivos públicos
└── supabase/              # Configurações Supabase (futuro)
```

## 4. Funcionalidades Implementadas

### 4.1 Sistema de Autenticação
- Login/Logout de usuários
- Proteção de rotas
- Gerenciamento de sessão

### 4.2 Dashboard (Home)
- Visão geral das finanças
- Saldo total
- Gráfico de entradas vs saídas
- Lista de próximas contas
- Progresso das metas

### 4.3 Transações
- Listagem de transações
- Adição de nova transação
- Filtros e ordenação
- Categorização (entrada/saída)

### 4.4 Sistema de Cupons
- Criação de cupons com:
  - Nome do cupom
  - Patrocinadora
  - Valor do desconto
  - Ícone personalizado (10 opções)
  - Cor pastel aleatória
- Listagem em grid responsivo (até 6 por linha)
- Exclusão com confirmação
- Ordenação por data de criação
- Persistência local

### 4.5 Meus Gastos
- Análise de despesas
- Acesso rápido aos cupons
- Futura integração com análise detalhada

## 5. Sistema de Armazenamento

### 5.1 LocalStorage
Dados armazenados localmente com as seguintes chaves:
- `transactions`: Lista de transações
- `coupons`: Lista de cupons
- `auth`: Dados de autenticação

### 5.2 Estrutura dos Dados

#### Transação
```typescript
interface Transaction {
  id: string;
  description: string;
  value: number;
  date: string;
  type: 'entrada' | 'saida';
  status: 'pending' | 'completed';
}
```

#### Cupom
```typescript
interface Coupon {
  id: string;
  name: string;
  sponsor: string;
  discount: number;
  icon: string;
  color: string;
  createdAt: string;
}
```

## 6. Componentes Principais

### 6.1 Layout
- `Sidebar`: Navegação principal, responsiva
- `Header`: Cabeçalho com título e ações
- `Card`: Container base para conteúdo

### 6.2 Modais
- `AddTransactionModal`: Criação de transações
- `CreateCouponModal`: Criação de cupons
- `DeleteButton`: Confirmação de exclusão

### 6.3 UI Components
- Buttons (múltiplas variantes)
- Cards
- Inputs
- Dialog/Modal
- Toast notifications
- Alert dialogs

## 7. Estilização e Design System

### 7.1 Cores
- Tema escuro
- Cores de destaque para ações
- Tons pastéis para cupons
- Estados hover/focus consistentes

### 7.2 Layout Responsivo
- Mobile-first
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

### 7.3 Componentes Shadcn/UI
- Base consistente de componentes
- Customizados via Tailwind
- Acessíveis (WAI-ARIA)

## 8. Roteamento e Navegação

### 8.1 Rotas Principais
- `/`: Dashboard
- `/transactions`: Transações
- `/expenses`: Meus Gastos
- `/cupons`: Gestão de Cupons
- `/accounts`: Minhas Contas
- `/goals`: Metas
- `/reports`: Relatórios
- `/profile`: Perfil
- `/settings`: Configurações
- `/support`: Suporte

### 8.2 Proteção de Rotas
- Verificação de autenticação
- Redirecionamento para login
- Manutenção de estado de navegação

## 9. Estado e Gerenciamento de Dados

### 9.1 Hooks Personalizados
- `useTransactions`: Gestão de transações
- `useCoupons`: Gestão de cupons
- `useAuth`: Autenticação
- `useToast`: Notificações

### 9.2 Persistência
- Salvamento automático no localStorage
- Sincronização de estado React
- Ordenação e filtragem local

## 10. Integração e Persistência

### 10.1 Armazenamento Local
- Persistência completa no localStorage
- Estrutura de dados consistente
- Backup de estado

### 10.2 Futura Integração Backend
- Preparado para integração com API
- Estrutura Supabase configurada
- Modelos de dados definidos

## 11. Próximos Passos Planejados

### 11.1 Melhorias Técnicas
- Implementação de testes unitários
- Otimização de performance
- Refinamento de tipos TypeScript

### 11.2 Novas Funcionalidades
- Edição de cupons
- Filtros avançados
- Exportação de dados
- Relatórios detalhados

---
Última atualização: 3 de novembro de 2025