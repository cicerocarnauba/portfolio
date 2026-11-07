/**
 * Dados centralizados do portfólio de Cícero Higor.
 * Para adicionar novos projetos, commits, tecnologias ou links de contato,
 * basta editar este arquivo.
 */

export const CONTACT = {
  github: 'https://github.com/cicerocarnauba',
  email: '',
  linkedin: ''
};

export const TYPED_ROLES = [
  'atua no desenvolvimento',
  'garante a qualidade',
  'gerencia os projetos',
  'estrutura a arquitetura'
];

export const NAV_SECTIONS = [
  { id: 'inicio', label: 'início', navLabel: null },
  { id: 'sobre', label: 'sobre', navLabel: 'Sobre' },
  { id: 'projetos', label: 'projetos', navLabel: 'Projetos' },
  { id: 'stack', label: 'stack', navLabel: 'Stack' },
  { id: 'formacao', label: 'formação', navLabel: 'Formação' },
  { id: 'contato', label: 'contato', navLabel: 'Contato' }
];

export const GIT_GRAPH_BRANCHES = [
  {
    name: 'agenda_cultural',
    short: 'agenda',
    filterLabel: 'agenda_cultural',
    range: 'dez 2025 a jan 2026',
    c: 'b3',
    off: -0.24,
    nodes: [
      { d: '2026-01-10', h: '46868e4', m: 'fix: restruturação do codigo do projeto & feat: adicionando novas roles e implementando suas permissoes' },
      { d: '2026-01-10', h: 'fb7383c', m: 'fix: estrutura dos campos & fix: criacao das tabelas no codigo' },
      { d: '2026-01-14', h: 'de9c579', m: 'refactor: refatorando código para melhor organização & feat: adicionando dashboard' },
      { d: '2026-01-14', h: '0d0d176', m: 'refactor: alterando estrutura da tabela artista & fix: corrigindo a tela CRUD de artista' },
      { d: '2026-01-15', h: '3e86c2b', m: 'fix: corrigindo verificação do cpf com 11 digitos e formatação na entrada do banco de dados' },
      { d: '2026-01-15', h: '47df98b', m: 'adicionando scripts do banco' }
    ]
  },
  {
    name: 'flaquixada-website',
    short: 'fla-quixadá',
    filterLabel: 'flaquixada',
    range: 'jun 2026',
    c: 'b2',
    off: 0.24,
    nodes: [
      { d: '2026-06-05', h: '7fec170', m: 'fix: fix navbar hidden' },
      { d: '2026-06-19', h: '2bebfc1', m: 'feat: paginas de noticias e cardapio && refactor: unificação estilos globais e correção layouts de páginas' },
      { d: '2026-06-20', h: '5d3b8fc', m: 'feat: adicionando tela de gerenciar bolao' },
      { d: '2026-06-21', h: '9bb0436', m: 'feat: integração de cardapio' },
      { d: '2026-06-22', h: 'e9ac65a', m: 'feat: integracao da pagina publica com a api do bolao' },
      { d: '2026-06-22', h: '142e474', m: 'style: melhora responsividade do item da loja no admin' },
      { d: '2026-06-22', h: 'f7ac8a9', m: 'fix: correcao bug de timezone no cadastro de datas de noticias' }
    ]
  },
  {
    name: 'projeto-integrado-3',
    short: 'pi3',
    filterLabel: 'pi3-obras',
    range: 'set a out 2026',
    c: 'b1',
    off: -0.2,
    nodes: [
      { d: '2026-09-13', h: '106552d', m: 'feat(auth): instalando biblioteca bcryptjs e utilitarios de hash e jwt' },
      { d: '2026-09-18', h: '57added', m: 'feat(mobile): implementacao dos componentes react e tela de login' },
      { d: '2026-09-20', h: '82c10c6', m: 'feat(mobile): implementacao do fluxo de login e cadastro integrado ao backend' },
      { d: '2026-10-07', h: '28d5729', m: 'test(backend): cobrir busca de obra por id com testes unitarios' },
      { d: '2026-10-16', h: 'e7b8f4f', m: 'fix(database): adicionar ON DELETE CASCADE nas chaves estrangeiras vinculadas a obras' },
      { d: '2026-10-19', h: 'dabf9fa', m: 'refactor(mobile): aprimorar sistema de responsividade e adaptabilidade de layout' },
      { d: '2026-10-20', h: 'f63c5de', m: 'feat(mobile): implementar rolagem automatica e ajuste de teclado em todas as telas de formulario' }
    ]
  }
];

export const FLA_QUIXADA_MODULES = [
  {
    tab: 'Jogos',
    title: 'Próximos e últimos jogos',
    badge: 'API ao vivo',
    items: ['Calendário em tempo real', 'Escalações dos jogos', 'Dados da API Cartola/Globo']
  },
  {
    tab: 'Bolão',
    title: 'Bolão de palpites',
    badge: 'Interativo',
    items: ['Sorteio por slots', 'Status de pagamento', 'Ranking e resultado do bolão']
  },
  {
    tab: 'Cardápio',
    title: 'Cardápio do bar',
    badge: 'Preços dinâmicos',
    items: ['Preço para associados', 'Preço para não associados', 'Máscara de moeda BRL']
  },
  {
    tab: 'Loja',
    title: 'Loja do consulado',
    badge: 'E-commerce',
    items: ['Produtos com galeria', 'Controle de estoque', 'Máscara de moeda BRL']
  },
  {
    tab: 'Notícias',
    title: 'Portal de notícias',
    badge: 'Publicação',
    items: ['Upload com imagem', 'Datas com fuso horário correto', 'Validação de caracteres']
  },
  {
    tab: 'Admin',
    title: 'Painel administrativo',
    badge: 'JWT + RBAC',
    items: ['CRUD de todas as entidades', 'Autenticação com JWT', 'Perfis admin e super-admin']
  }
];

export const EXTRA_PROJECTS = [
  {
    title: 'Agenda Cultural',
    summary: 'Gestão de eventos culturais com controle de permissões e relatórios em PDF',
    meta: 'Python · PostgreSQL',
    colorVar: '--b3',
    defaultOpen: true,
    description: 'Sistema web para gestão de eventos e espaços culturais com quatro níveis de permissão (visitante, comum, gerente e admin), dashboard mensal e geração de relatórios de inscritos em PDF. Contribuí com 24 commits entre dez 2025 e jan 2026: controle de acesso por perfil, modelagem das tabelas, dashboard e validação de CPF.',
    chips: ['Python', 'Panel', 'PostgreSQL', 'SQLAlchemy'],
    repoUrl: 'https://github.com/cicerocarnauba/Agenda_Cultural'
  },
  {
    title: 'Biblioteca escolar para desktop',
    summary: 'Aplicação desktop offline para controle de acervo e empréstimos',
    meta: 'Next.js · Electron',
    colorVar: '--b1',
    defaultOpen: false,
    description: 'Aplicação desktop instalável desenvolvida para a Creche Maria de Lourdes, em Piquet Carneiro (CE), substituindo o controle manual em papel. Opera sem dependência de internet com banco SQLite local, ambiente padronizado em Docker e validação automatizada de Conventional Commits via GitHub Actions.',
    chips: ['Next.js', 'Electron', 'Tailwind CSS', 'SQLite', 'Docker', 'GitHub Actions'],
    repoUrl: 'https://github.com/cicerocarnauba/projeto-integrado-1'
  },
  {
    title: 'Banco Imobiliário no console',
    summary: 'Motor de jogo em Java estruturado com padrões de projeto GoF',
    meta: 'Java 21 · Design Patterns',
    colorVar: '--b2',
    defaultOpen: false,
    description: 'Implementação de jogo de tabuleiro em Java aplicando arquitetura desacoplada e padrões de projeto: regras encapsuladas via Strategy (compra, aluguel, imposto, sorte e prisão), ações modeladas com Command, notificações de eventos por Observer, travessia com Iterator e criação via Factory.',
    chips: ['Java 21', 'Maven', 'Strategy', 'Command', 'Observer', 'Factory'],
    repoUrl: 'https://github.com/cicerocarnauba/trabalho_pds'
  },
  {
    title: 'Simulador de CPU de 16 bits',
    summary: 'Interpretador e simulador de arquitetura de 16 bits em C',
    meta: 'C · Arquitetura 16-bit',
    colorVar: '--b3',
    defaultOpen: false,
    description: 'Simulador de processador de 16 bits desenvolvido em C. Lê instruções em hexadecimal, realiza a conversão binária e executa o ciclo de decodificação para operações aritméticas, lógicas, movimentação de memória e desvios condicionais (ADD, SUB, MUL, AND, XOR, MOV, LDR, STR, JMP, JEQ, JLT, NOP e HALT).',
    chips: ['C', 'Arquitetura de Computadores'],
    repoUrl: 'https://github.com/cicerocarnauba/simulador_cpu'
  },
  {
    title: 'speak_command',
    summary: 'Utilitário CLI em Python com síntese de voz e tradução para o terminal',
    meta: 'Python · CLI Package',
    colorVar: '--b1',
    defaultOpen: false,
    description: 'Pacote CLI em Python (comando scmd) que intercepta a saída de comandos do terminal, scripts Python ou arquivos de texto e realiza síntese de voz do resultado, contando também com tradução integrada para outros idiomas.',
    chips: ['Python', 'CLI'],
    repoUrl: 'https://github.com/cicerocarnauba/speak_command'
  }
];

export const STACK_DATA = {
  marqueeRow1: [
    'JavaScript', 'React Native', 'Node.js', 'Express', 'PostgreSQL',
    'Docker', 'Python', 'Java', 'C', 'MongoDB', 'SQLite', 'Tailwind CSS'
  ],
  marqueeRow2: [
    'Expo', 'JWT', 'Zod', 'Web Components', 'GitHub Actions',
    'Conventional Commits', 'Figma', 'Testes unitários', 'React', 'HTML', 'CSS', 'Git'
  ],
  groups: [
    {
      title: 'Front-end & Mobile',
      colorVar: '--b1',
      items: [
        'JavaScript, HTML e CSS',
        'React e React Native com Expo',
        'Web Components',
        'Tailwind CSS'
      ]
    },
    {
      title: 'Back-end & Linguagens',
      colorVar: '--b2',
      items: [
        'Node.js e Express',
        'Autenticação com JWT e bcrypt',
        'Validação de esquemas com Zod',
        'Python, Java e C'
      ]
    },
    {
      title: 'Dados & Infraestrutura',
      colorVar: '--b3',
      items: [
        'PostgreSQL, MongoDB e SQLite',
        'Docker e Docker Compose',
        'Pipelines com GitHub Actions'
      ]
    },
    {
      title: 'Qualidade & Processo',
      colorVar: '--b1',
      items: [
        'Testes unitários no backend',
        'Conventional Commits',
        'Fluxo Git e GitHub em equipe',
        'Implementação fiel a partir do Figma'
      ]
    }
  ]
};

export const EDUCATION_TIMELINE = [
  {
    year: '2019',
    period: '2019 — 2021',
    status: 'Concluído',
    isCurrent: false,
    title: 'Técnico em Informática',
    institution: 'EEEP Alfredo Nunes de Melo',
    description: 'Integrado ao Ensino Médio. Primeiros fundamentos em lógica de programação, algoritmos, redes de computadores e introdução a banco de dados.',
    colorVar: '--b3',
    position: 'top' // Círculo no topo, texto embaixo
  },
  {
    year: '2022',
    period: '2022 — 2023',
    status: 'Formação anterior',
    isCurrent: false,
    title: 'Design Digital',
    institution: 'UFC · Campus Quixadá',
    description: 'Foco em UI/UX, Interação Humano-Computador, prototipação no Figma, tipografia e interfaces digitais centradas no usuário.',
    colorVar: '--b2',
    position: 'bottom' // Texto em cima, círculo embaixo
  },
  {
    year: '2024',
    period: '2024 — Atual',
    status: 'Em andamento',
    isCurrent: true,
    title: 'Engenharia de Software',
    institution: 'UFC · Campus Quixadá',
    description: 'Desenvolvimento Full Stack (React, Node.js), QA, testes unitários, arquitetura de software e governança de código em equipe.',
    repoUrl: 'https://github.com/cicerocarnauba/formacao_eng_de_software',
    repoLabel: 'Ver matérias no GitHub',
    colorVar: '--b1',
    position: 'top' // Círculo no topo, texto embaixo
  }
];

