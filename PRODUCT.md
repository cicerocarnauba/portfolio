# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recrutadores técnicos, engenheiros seniores e tech leads avaliando candidatos para vagas de **estágio e Engenharia de Software júnior** (web, mobile, backend e QA). Acessam o portfólio tanto pelo desktop quanto pelo celular (ex.: Galaxy S26) a partir de links no LinkedIn, currículo ou perfil do GitHub, buscando entender em poucos segundos quem é Cícero Higor, o que ele realmente construiu, como estrutura código em equipe e como entrar em contato.

## Product Purpose

Apresentar de forma clara, navegável e verificável o repertório técnico e os projetos reais de **Cícero Higor** (graduando em Engenharia de Software na UFC — Campus Quixadá, com base anterior em Design Digital na UFC e formação técnica em Informática). O sucesso significa o avaliador explorar os projetos reais sem barreiras de leitura ou travas de rolagem, inspecionar os repositórios no GitHub/produção e iniciar contato direto via WhatsApp ou LinkedIn.

## Positioning

Engenheiro de Software em formação pela UFC Quixadá que combina base formal em **Design Digital (UI/UX, IHC)** com atuação prática nas quatro frentes do ciclo de software em projetos reais de equipe e produção: **Desenvolvimento Full Stack & Mobile** (React, React Native/Expo, Node.js/Express), **Arquitetura** (Offline-First com SQLite + PostgreSQL, Design Patterns GoF, WebSockets em tempo real), **Garantia de Qualidade** (testes unitários, validação de casos críticos) e **Gerência de Projetos** (Scrum, Planning Poker, organização de branches e GitHub Actions).

## Operating Context

- Hospedado estaticamente no **GitHub Pages** (`https://cicerocarnauba.github.io/portfolio/`) diretamente a partir da branch `main`, exigindo arquitetura estática enxuta (HTML5 semântico, CSS modular e JavaScript nativo em ES Modules, sem etapa obrigatória de bundler/servidor).
- Integrado diretamente ao ecossistema GitHub do autor (`https://github.com/cicerocarnauba`), onde residem os códigos-fonte, históricos de commits reais e repositórios acadêmicos/profissionais.

## Capabilities and Constraints

- **Rolagem vertical nativa fluida** em desktop e dispositivos móveis (substituindo o antigo palco 3D travado em `100vh`), permitindo leitura integral sem cortes de texto (`line-clamp`), busca na página e navegação natural por âncoras.
- **Demonstrações interativas reais em HTML/CSS/JS** para provar o funcionamento técnico dos sistemas em destaque sem depender de capturas de tela externas inexistentes:
  1. **Medições de Obras** (`projeto-integrado-3`): aplicativo mobile React Native + API Express/PostgreSQL com operação *Offline-First* (fila SQLite local e sincronização).
  2. **Consulado Fla-Quixadá** (`flaquixada-website`): plataforma web em produção (`https://flaquixada.com.br`) com calendário ao vivo, bolão, cardápio com preços para sócios, loja, portal de notícias e painel administrativo JWT/RBAC.
  3. **Planning Poker Scrum** (`planing-poker`): aplicação colaborativa em tempo real com Node.js, Socket.io e SQLite para estimativa ágil com sequência de Fibonacci e consenso automático.
- **Índice complementar de repositórios verificáveis**: Agenda Cultural (Python/PostgreSQL), Biblioteca Escolar Desktop (Next.js/Electron/SQLite), Banco Imobiliário (Java 21/GoF Patterns), Simulador de CPU 16-bit (C) e `speak_command` (Python CLI).
- **Rastreabilidade de histórico Git real** (commits reais documentados sem inflar métricas de contagem individual por projeto — foco no escopo de atuação) e **trajetória de formação** (2019 Técnico em Informática -> 2022 Design Digital UFC -> 2024 Engenharia de Software UFC).
- **Canais diretos de contato**: WhatsApp (`https://wa.me/5588988626355`), LinkedIn (`https://www.linkedin.com/in/cicerocarnauba/`) e GitHub (`https://github.com/cicerocarnauba`), sem exibição do número de telefone em texto aberto.

## Brand Commitments

- **Identidade cromática verde preservada**: o verde permanece como cor central de identidade do portfólio, mas trabalhado com maturidade editorial e técnica (afastando-se de brilho neon artificial e clichês visuais gerados por IA).
- **Idioma**: Português do Brasil (`pt-BR`), tom direto, técnico, honesto e sem jargões inflados.

## Evidence on Hand

- Dados verificados em `js/data/portfolio-data.js`: links reais de GitHub para todos os 8 repositórios + repositório de disciplinas da UFC (`formacao_eng_de_software`), URL em produção do Consulado Fla-Quixadá (`https://flaquixada.com.br`), hashes e mensagens reais de commits (`GIT_GRAPH_BRANCHES`), escopo real de atuação em cada projeto e linha do tempo acadêmica real em Quixadá/CE.
- Ausências confirmadas (não fabricar): não há fotografias pessoais do autor, capturas de tela rasterizadas dos aplicativos nem depoimentos de clientes/empresas; toda prova visual deve usar interfaces funcionais construídas em HTML/CSS/SVG e links reais para os repositórios.

## Product Principles

1. **Usabilidade e leitura acima de malabarismo visual**: o visitante nunca luta contra o scroll; toda informação essencial é legível do desktop ao celular de 360px sem truncamento forçado.
2. **Provar mostrando o mecanismo, não adjetivos**: cada projeto em destaque demonstra sua arquitetura ou interface real funcionando na própria página e leva direto ao código no GitHub.
3. **Nativo do GitHub Pages**: leve, sem dependências pesadas de runtime, carregamento rápido e links diretos que funcionam sem servidor intermediário.
4. **Honestidade de engenharia**: destacar o papel técnico real cumprido em cada projeto e na equipe, sem métricas artificiais ou ornamentos genéricos de template.

