# 🎯 TaskTracker Frontend

> 📄 Read this documentation in [English 🇺🇸](./README.md)

Uma aplicação moderna e responsiva de gerenciamento de tarefas construída com Next.js 15, React 19 e TypeScript. Possui componentes de UI bonitos, análises de produtividade em tempo real e experiência de usuário perfeita.

## 🏗️ Visão Geral da Arquitetura

Esta aplicação frontend segue padrões modernos do React e melhores práticas do Next.js:

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Rotas de autenticação
│   │   ├── sign-in/       # Página de login
│   │   └── sign-up/       # Página de registro
│   ├── (dashboard)/       # Rotas protegidas do dashboard
│   │   ├── profille/      # Perfil do usuário e análises
│   │   ├── study/         # Página de sessão de estudo
│   │   └── task/          # Gerenciamento de tarefas
│   ├── (root)/            # Rotas públicas
│   │   └── home/          # Página inicial
│   └── api/               # Rotas da API
├── components/            # Componentes de UI reutilizáveis
│   ├── card/             # Componentes de card
│   ├── charts/           # Componentes de gráfico
│   ├── form/             # Componentes de formulário
│   ├── modal/            # Componentes de modal
│   └── ui/               # Componentes de UI base
├── actions/              # Server actions
├── lib/                  # Bibliotecas utilitárias
├── schemas/              # Esquemas de validação Zod
└── types/                # Definições de tipos TypeScript
```

## 🛠️ Stack Tecnológica

### Tecnologias Principais
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca de UI com recursos mais recentes
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first

### Componentes de UI e Estilização
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos de UI headless
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones bonita
- **[React Icons](https://react-icons.github.io/)** - Conjuntos de ícones populares
- **[Tailwind Animate](https://tailwindcss-animate.vercel.app/)** - Utilitários de animação

### Formulários e Validação
- **[React Hook Form](https://react-hook-form.com/)** - Formulários performáticos
- **[Zod](https://zod.dev/)** - Validação de esquema primeiro em TypeScript
- **[Hookform Resolvers](https://github.com/react-hook-form/resolvers)** - Resolvedores de validação

### Gráficos e Visualização de Dados
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos composável
- **[Date-fns](https://date-fns.org/)** - Biblioteca utilitária de datas moderna

### Gerenciamento de Estado e Busca de Dados
- **[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)** - Mutações de dados do lado do servidor
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Notificações toast
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast (alternativa)

### Ferramentas de Desenvolvimento
- **[ESLint](https://eslint.org/)** - Linting de código
- **[PostCSS](https://postcss.org/)** - Processamento CSS
- **[Turbopack](https://turbo.build/pack)** - Bundler rápido (Next.js 15)

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- API Backend rodando (veja [README do backend](../task-tracker-backend/README.md))

### 1. Clone e Instale
```bash
git clone https://github.com/NicolasYMonteiro/task-tracker.git
cd task-tracker/task-tracker-frontend
npm install
```

### 2. Configuração do Ambiente
Crie um arquivo `.env.local` no diretório raiz:

```env
# URL da API Backend
NEXT_PUBLIC_BASE_URL="http://localhost:3001"

# Configuração da App
NEXT_PUBLIC_APP_NAME="TaskTracker"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### 3. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📱 Visão Geral das Funcionalidades

### 🔐 Autenticação
- **Login/Registro Seguro** com tokens JWT
- **Validação de Formulário** com feedback em tempo real
- **Rotas Protegidas** com middleware
- **Atualização Automática de Token** e gerenciamento de logout

### 📋 Gerenciamento de Tarefas
- **Criar, Editar, Deletar** tarefas com formulários ricos
- **Níveis de Prioridade** e gerenciamento de data de vencimento
- **Filtragem de Tarefas** por data, status e prioridade
- **Organização Drag & Drop** (planejado)
- **Operações em Lote** para múltiplas tarefas

### 📊 Análises e Insights
- **Gráficos de Produtividade** com Recharts
- **Rastreamento de Atividade** diário/semanal/mensal
- **Taxas de Conclusão** e métricas de eficiência
- **Rastreamento de Sequência** para motivação
- **Análise de Distribuição de Prioridades**

### 🎨 Experiência do Usuário
- **Design Responsivo** para todos os dispositivos
- **Suporte a Modo Escuro/Claro** (planejado)
- **Estados de Carregamento** com componentes skeleton
- **Notificações Toast** para feedback do usuário
- **Animações Suaves** e transições

### 📚 Sessão de Estudo
- **Timer Pomodoro** para trabalho focado
- **Integração de Tarefas** com sessões de estudo
- **Tomada de Notas** durante as sessões
- **Histórico de Sessões** e estatísticas

## 🎨 Componentes de UI

### Componentes Base
```typescript
// Variantes de botão
<Button variant="default">Primário</Button>
<Button variant="outline">Secundário</Button>
<Button variant="ghost">Ghost</Button>

// Componentes de formulário
<Input placeholder="Digite o texto..." />
<Textarea placeholder="Digite a descrição..." />
<Select>
  <SelectItem value="opcao1">Opção 1</SelectItem>
</Select>

// Componentes de carregamento
<LoadingSpinner size="md" />
<LoadingSkeleton lines={3} />
<LoadingPage title="Carregando..." />
```

### Componentes de Card
```typescript
// Cards de tarefa
<TaskCard task={task} />
<TaskMinimalist task={task} />

// Cards de estatísticas
<StatCard 
  icon={<FiCheckCircle />}
  title="Concluídas"
  value={25}
  percentage={80}
/>

// Card de notas
<NotesCard />
```

### Componentes de Gráfico
```typescript
// Gráficos de produtividade
<ProductivityCharts data={productivityData} />

// Gráficos individuais
<LineChart data={data} />
<BarChart data={data} />
<PieChart data={data} />
```

## 🔧 Configuração

### Configuração do Next.js
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['localhost'],
  },
}
```

### Configuração do Tailwind
```typescript
// tailwind.config.ts
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

## 📊 Fluxo de Dados

### Server Actions
```typescript
// actions/user/user.actions.ts
'use server'

export async function getUserProfile() {
  const token = await getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}
```

### Componentes Cliente
```typescript
'use client'

import { useEffect, useState } from 'react';
import { getUserProfile } from '@actions/user/user.actions';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getUserProfile();
      setProfile(data);
      setLoading(false);
    };
    loadProfile();
  }, []);

  if (loading) return <LoadingPage />;
  
  return <div>{/* Conteúdo do perfil */}</div>;
}
```

## 🚀 Deploy

### Variáveis de Ambiente
```env
# Produção
NEXT_PUBLIC_BASE_URL="https://api.seudominio.com"
NEXT_PUBLIC_APP_NAME="TaskTracker"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### Build para Produção
```bash
# Build da aplicação
npm run build

# Iniciar servidor de produção
npm start

# Ou deploy para Vercel
vercel --prod
```

## 🤝 Contribuindo

### Fluxo de Desenvolvimento
1. Faça um fork do repositório
2. Crie uma branch de feature: `git checkout -b feature/funcionalidade-incrivel`
3. Faça suas mudanças
4. Adicione testes para nova funcionalidade
5. Execute testes: `npm test`
6. Commit das mudanças: `git commit -m 'Adiciona funcionalidade incrível'`
7. Push para a branch: `git push origin feature/funcionalidade-incrivel`
8. Abra um Pull Request

### Padrões de Código
- **ESLint** configuração para qualidade de código
- **Prettier** para formatação de código
- **TypeScript** modo strict
- **Commits Convencionais** para mensagens de commit
- **Documentação de Componentes** com JSDoc

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Nícolas Yan Santos Monteiro**
- GitHub: [@NicolasYMonteiro](https://github.com/NicolasYMonteiro)
- LinkedIn: [Nícolas Monteiro](https://linkedin.com/in/nicolas-monteiro)

---

## 🎯 Roadmap

### Próximas Funcionalidades
- [ ] Suporte a modo escuro
- [ ] Organização de tarefas drag & drop
- [ ] Colaboração em tempo real
- [ ] App móvel (React Native)
- [ ] Modelos avançados de tarefas
- [ ] Integração com apps de calendário
- [ ] Sugestões de tarefas com IA
- [ ] Espaços de trabalho em equipe

### Melhorias de Performance
- [ ] Service worker para suporte offline
- [ ] Scroll virtual para listas grandes de tarefas
- [ ] Otimização de imagens e lazy loading
- [ ] Otimização do tamanho do bundle
- [ ] Integração CDN

### Melhorias de UI/UX
- [ ] Micro-interações e animações
- [ ] Melhorias de acessibilidade
- [ ] Atalhos de teclado
- [ ] Temas personalizados
- [ ] Opções de filtragem avançadas

---

*Construído com ❤️ e tecnologias web modernas*
