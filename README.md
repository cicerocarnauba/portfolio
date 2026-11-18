# Portfólio — Cícero Higor

Portfólio de Engenharia de Software desenvolvido com **HTML5 semântico**, **CSS Modular (Design Tokens)** e **JavaScript nativo (ES Modules + Web Components)**, projetado para hospedagem estática direta no **GitHub Pages** sem etapa de build.

## Direção Visual & Arquitetura de Interface

Estruturado como um **Atlas de Campo & Caderno Catalográfico de Sistemas** (mantendo a identidade verde botânica e florestal com rolagem vertical nativa fluida, leitura integral em qualquer tela e zero clichês de templates gerados por IA):

- **Primeira dobra em fólio duplo**: apresentação direta de Cícero Higor (Engenharia de Software + Design Digital na UFC Quixadá) ao lado da prancha viva do sistema **Medições de Obras** com simulador interativo *Offline-First* (`SQLite` local ⇄ API `Express` + `PostgreSQL`).
- **Pranchas de sistemas reais**: demonstrações interativas em HTML/CSS/SVG para o portal em produção **Consulado Fla-Quixadá** (`flaquixada.com.br`) e para a mesa colaborativa em tempo real **Planning Poker Scrum** (`Socket.io` + consenso Fibonacci), acompanhadas pelo índice expansível dos demais repositórios públicos.
- **Caderno das 4 frentes de atuação**: Desenvolvimento Full Stack & Mobile, Arquitetura, Garantia de Qualidade (QA) e Gerência de Projetos.
- **Rastreabilidade Git & Formação**: grafo interativo de commits reais em HTML5 Canvas (`<git-graph>`), linha cronológica acadêmica (2019 → 2022 → 2024) e matriz técnica aberta.

## Estrutura do Projeto

```text
├── index.html                  # Documento semântico principal e pranchas de sistemas
├── PRODUCT.md                  # Contexto de produto, público e restrições
├── DESIGN.md                   # Sistema visual documentado (tokens, tipografia, componentes)
├── css/
│   ├── tokens.css              # Tokens da paleta Papel Algodão Sálvia & Verde-Herbário (Claro/Escuro)
│   ├── base.css                # Tipografia, superfícies do navegador e acessibilidade (WCAG 2.1 AA)
│   ├── layout.css              # Cabeçalho fixo, fólio de abertura, seções e rodapé
│   └── components.css          # Pranchas, bancadas interativas, grafo Git e matriz técnica
└── js/
    ├── main.js                 # Inicializador principal (ES Module)
    ├── data/
    │   └── portfolio-data.js   # Dados verificados de projetos, branches Git, stack e formação
    ├── components/
    │   ├── app-header.js       # <app-header> (navegação por âncoras, menu móvel e tema)
    │   ├── offline-diagram.js  # <offline-diagram> (simulador Offline-First SQLite <-> Express)
    │   ├── browser-preview.js  # <browser-preview> (navegador dos módulos do Fla-Quixadá)
    │   ├── poker-preview.js    # <poker-preview> (mesa Fibonacci interativa do Planning Poker)
    │   ├── project-list.js     # <project-list> (índice expansível de repositórios no GitHub)
    │   ├── git-graph.js        # <git-graph> (grafo de commits reais em Canvas + filtro de branches)
    │   ├── timeline-section.js # <timeline-section> (trajetória acadêmica aberta)
    │   └── stack-section.js    # <stack-section> (matriz técnica em 4 colunas)
    └── effects/
        └── animations.js       # Controlador do caderno de atuação e utilitários de movimento
```

## Como Executar Localmente

Por utilizar ES Modules (`<script type="module">`), sirva a raiz com qualquer servidor HTTP estático:

```bash
python3 -m http.server 8080
# ou
npx serve .
```
