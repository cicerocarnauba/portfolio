# Portfólio — Cícero Higor

Portfólio pessoal desenvolvido com **HTML5 semântico**, **CSS Modular (Design Tokens)** e **JavaScript (ES Modules + Web Components nativos)**, pronto para execução direta no GitHub Pages sem etapa de build.

## Estrutura do Projeto

```text
├── index.html                  # Estrutura principal e marcação dos Web Components
├── css/
│   ├── main.css                # Ponto de entrada que importa os módulos de estilo
│   ├── tokens.css              # Design Tokens (Paleta Verde Musgo Dark/Light, tipografia, raios)
│   ├── base.css                # Reset, acessibilidade (WCAG 2.1 AA) e utilitários globais
│   ├── layout.css              # Grid, cabeçalho, rail lateral, seções e rodapé
│   └── components.css          # Estilos dos componentes visuais e interativos
└── js/
    ├── main.js                 # Inicializador principal (ES Module)
    ├── data/
    │   └── portfolio-data.js   # Dados centralizados (commits, projetos, stack, semestres, contato)
    ├── components/
    │   ├── app-header.js       # <app-header> e <side-rail> (navegação e tema claro/escuro)
    │   ├── git-graph.js        # <git-graph> (grafo de commits em Canvas + filtro por branch)
    │   ├── offline-diagram.js  # <offline-diagram> (simulador interativo SQLite <-> Express)
    │   ├── browser-preview.js  # <browser-preview> (prévia interativa em abas do Fla-Quixadá)
    │   ├── project-list.js     # <project-list> (accordion de repositórios complementares)
    │   ├── stack-section.js    # <stack-section> (marquee duplo + bento grid de ferramentas)
    │   └── timeline-section.js # <timeline-section> (grade de semestres cursados na UFC)
    └── effects/
        └── animations.js       # Animações e microinterações (Typewriter, Reveal, Counters, Tilt 3D, Spotlight)
```

## Como Executar Localmente

Por utilizar ES Modules (`<script type="module">`), sirva a pasta raiz com qualquer servidor HTTP estático:

```bash
npx serve .
# ou
python3 -m http.server 8080
```
