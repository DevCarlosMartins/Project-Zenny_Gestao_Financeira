# ZENNY - Gerenciador Financeiro Pessoal

## Descrição
ZENNY é um front-end de um sistema de gerenciamento financeiro pessoal desenvolvido em React + TypeScript com Vite, usando Tailwind CSS, Supabase e Radix UI. O projeto faz parte do trabalho em grupo da faculdade e representa a parte de front-end.

## Tecnologias e bibliotecas principais
- React 18 + TypeScript  
- Vite 5.x  
- Tailwind CSS 3.x + tailwind-merge + tailwindcss-animate  
- Supabase (Auth, Realtime, Postgres, Storage)  
- Radix UI (Accordion, Dialog, Popover, Toast, etc.)  
- Recharts (Gráficos)  
- React Hook Form + Zod  
- React Query (Tanstack)  
- Embla Carousel, Lucide Icons, Sonner, cmdk  
- Hooks customizados: `useAuth`, `useSidebar`, `useTransactions`, `useGoals`, `useKpis`, etc.

## Estrutura de pastas principal
```
zenny-financial-calm/
├─ public/
├─ src/
│ ├─ assets/
│ ├─ components/
│ │ ├─ layout/
│ │ ├─ modals/
│ │ └─ ui/
│ ├─ hooks/
│ ├─ integrations/supabase/
│ ├─ lib/
│ ├─ mocks/
│ └─ pages/
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ tailwind.config.ts
├─ postcss.config.js
└─ README.md
```

markdown
Copiar código

## Instalação e configuração
1. Clonar o repositório do grupo: `git clone <url-do-repo-do-grupo> && cd Project-Zenny_Gestao_Financeira/Front-End/zenny-financial-calm`  
2. Instalar dependências: `pnpm install` (ou `npm install` / `yarn install`)  
3. Criar arquivo `.env` com variáveis do Supabase:  
VITE_SUPABASE_URL=<url-do-projeto>
VITE_SUPABASE_ANON_KEY=<chave-anon>

markdown
Copiar código
4. Rodar o projeto: `pnpm run dev` → Acesse `http://localhost:8080/`  

## Scripts principais
- `pnpm run dev` → inicia o servidor de desenvolvimento  
- `pnpm run build` → cria build para produção  
- `pnpm run preview` → pré-visualiza build  

## Observações
- O front-end está totalmente integrado ao repositório do grupo, sem submódulos.  
- Usa lockfile `pnpm-lock.yaml` para consistência de pacotes.  
- Compatível com Node 18+ e PNPM 9+.  
- Componentes Radix UI são amplamente usados para UI/UX consistente.  
- O projeto ainda está em desenvolvimento; algumas páginas e funcionalidades podem usar dados mockados.  
- O README pode ser atualizado conforme novas features forem adicionadas.
