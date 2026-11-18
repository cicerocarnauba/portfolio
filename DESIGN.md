---
name: "Portfólio Cícero Higor — Atlas de Campo & Sistemas"
description: "Sistema editorial catalográfico em papel algodão sálvia e verde-herbário para Engenharia de Software"
colors:
  eucalyptus-primary: "#1C6E46"
  eucalyptus-hover: "#145435"
  herbarium-forest: "#133A27"
  forest-deep: "#0C261A"
  mineral-ochre: "#9A5812"
  ochre-stamp: "#E8B872"
  pine-jade: "#146657"
  cotton-paper: "#F3F5EE"
  sage-plate: "#E9EEE4"
  specimen-surface: "#FAFBF7"
  surface-hover: "#EEF2E9"
  botanical-ink: "#0F1E16"
  forest-slate: "#354A3E"
  muted-on-forest: "#C8DDD0"
  soft-hairline: "#BDC8BE"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.16
    letterSpacing: "-0.018em"
  editorial:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "1.48rem"
    fontWeight: 500
    lineHeight: 1.34
  body:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.04em"
rounded:
  xs: "2px"
  sm: "2px"
  md: "3px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "28px"
  xl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.eucalyptus-primary}"
    textColor: "{colors.cotton-paper}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.eucalyptus-hover}"
  button-outline:
    backgroundColor: "{colors.cotton-paper}"
    textColor: "{colors.botanical-ink}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    height: "44px"
  button-header-cta:
    backgroundColor: "{colors.herbarium-forest}"
    textColor: "{colors.cotton-paper}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "44px"
  spec-tag:
    backgroundColor: "{colors.specimen-surface}"
    textColor: "{colors.botanical-ink}"
    rounded: "{rounded.xs}"
    padding: "5px 11px"
  apparatus-frame:
    backgroundColor: "{colors.specimen-surface}"
    textColor: "{colors.botanical-ink}"
    rounded: "{rounded.sm}"
---

# Design System: Portfólio Cícero Higor — Atlas de Campo & Sistemas

## Overview

**Creative North Star: "O Atlas de Campo de Sistemas"**

O sistema visual estrutura o portfólio de Engenharia de Software como um caderno técnico de campo e atlas catalográfico inspirado na precisão botânica e topográfica do Sertão Central cearense (Quixadá). Em vez de caixas escuras com brilhos artificiais ou *scroll-jacking*, o conteúdo repousa sobre planos abertos de papel algodão sálvia divididos por fios contínuos e ancorados por faixas inteiras de verde-herbário profundo.

Cada projeto real é tratado como uma prancha catalogada aberta: ficha de especificação tabular, taxonomia técnica e um aparelho interativo vivo construído diretamente em HTML, CSS, SVG e Canvas. A densidade equilibra respiro editorial nos cabeçalhos com precisão tabular nas bancadas de código, permitindo leitura contínua e escaneabilidade imediata tanto em monitores largos quanto em celulares de 360px.

Rejeições visuais confirmadas: proibição de *eyebrows/kickers* acima de títulos, proibição de grades repetitivas de cards com cantos inflados ou cards aninhados, ausência de *glassmorphism* decorativo, brilho neon sem deslocamento, texto em gradiente, letreiros *marquee* e adereços falsos de terminal.

**Key Characteristics:**
- Planos abertos de papel algodão sálvia alternados com faixas estruturais sólidas em verde-herbário profundo.
- Fios catalográficos contínuos (`1px` a `1.5px`) substituindo sombras difusas e caixas aninhadas.
- Quatro vozes tipográficas com papéis estritos: `Bricolage Grotesque` para escala estrutural, `Literata` para teses e aberturas editoriais, `Public Sans` para leitura contínua e `JetBrains Mono` exclusivamente para hashes, datas, métricas e estados técnicos.
- Cantos secos de prancha técnica (`2px` a `3px`) e alvos de toque mínimos de `44px` em todos os controles interativos.
- Modo escuro opcional ("Herbário Noturno") derivado da mesma matriz florestal.

## Colors

A paleta combina papéis minerais quentes tingidos de sálvia com verdes botânicos profundos e acentos terrosos de carimbo técnico, mantendo contraste WCAG AA/AAA em todas as superfícies.

### Primary
- **Eucalyptus Primary** (`{colors.eucalyptus-primary}`): Acento interativo principal usado em botões primários, indicadores de sincronização ativa, links de destaque e estados selecionados.
- **Eucalyptus Hover** (`{colors.eucalyptus-hover}`): Estado de foco e passagem de ponteiro sobre ações primárias.
- **Herbarium Forest** (`{colors.herbarium-forest}`): Verde-floresta estrutural que domina cabeçalhos de prancha, faixas de seção inteiras (`#commits` e `#contato`), abas ativas e fios divisores primários.
- **Forest Deep** (`{colors.forest-deep}`): Base de fechamento usada no rodapé institucional e divisórias sobre faixas escuras.

### Secondary
- **Mineral Ochre** (`{colors.mineral-ochre}`): Indicador semântico para estados de fila local offline, alertas de divergência de estimativa e metadados secundários sobre fundo claro.
- **Ochre Stamp** (`{colors.ochre-stamp}`): Tinta clara de carimbo técnico reservada para selos e metadados sobre superfícies `Herbarium Forest`.

### Tertiary
- **Pine Jade** (`{colors.pine-jade}`): Terceira voz cromática para distinção de ramos no grafo real de commits e marcadores cronológicos.

### Neutral
- **Cotton Paper** (`{colors.cotton-paper}`): Plano principal da página e do cabeçalho fixo.
- **Sage Plate** (`{colors.sage-plate}`): Fundo secundário para diferenciação de pranchas e seções alternadas sem exigir bordas de card.
- **Specimen Surface** (`{colors.specimen-surface}`): Superfície elevada limpa usada no interior de bancadas interativas, tags técnicas e folhas de especificação.
- **Surface Hover** (`{colors.surface-hover}`): Resposta tátil sutil em botões de contorno e linhas expansíveis.
- **Botanical Ink** (`{colors.botanical-ink}`): Cor principal de títulos e leitura longa sobre papel.
- **Forest Slate** (`{colors.forest-slate}`): Texto secundário matizado no matiz verde (nunca cinza puro) para descrições de apoio e rótulos.
- **Muted on Forest** (`{colors.muted-on-forest}`): Texto secundário legível sobre faixas `Herbarium Forest`.
- **Soft Hairline** (`{colors.soft-hairline}`): Fio interno sutil para subdivisão de listas, linhas de repositório e tabelas técnicas.

### Named Rules
**The Forest Band Rule.** O verde nunca aparece apenas como pílula decorativa solta sobre fundo neutro: superfícies `Herbarium Forest` assumem faixas inteiras da página e cabeçalhos completos de prancha para ancorar o ritmo vertical.

**The Tinted Neutral Rule.** Nenhum texto secundário, borda ou superfície usa cinza acromático puro; todos os tons neutros carregam subtom botânico verde-sálvia.

## Typography

**Display Font:** `Bricolage Grotesque` (fallback `Segoe UI, system-ui, sans-serif`)
**Editorial Font:** `Literata` (fallback `Georgia, serif`)
**Body Font:** `Public Sans` (fallback `-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`)
**Label/Mono Font:** `JetBrains Mono` (fallback `ui-monospace, SFMono-Regular, Menlo, monospace`)

**Character:** O contraste entre a geometria incisiva da `Bricolage Grotesque` e a serifa editorial da `Literata` confere autoridade de publicação técnica, enquanto `Public Sans` assegura leitura limpa e `JetBrains Mono` isola dados verificáveis de engenharia.

### Hierarchy
- **Display** (`800`, `clamp(3rem, 5.2vw, 4.5rem)`, line-height `0.96`, tracking `-0.035em`): Nome autoral na abertura do fólio principal.
- **Headline** (`800`, `clamp(1.85rem, 3vw, 2.5rem)`, line-height `1.08`, tracking `-0.025em`): Títulos de seção e abertura da Prancha I.
- **Title** (`700`–`800`, `clamp(1.35rem, 2vw, 1.75rem)`, line-height `1.16`, tracking `-0.018em`): Títulos das pranchas de sistemas, frentes de engenharia e subseções.
- **Editorial Lead** (`500`, `1.05rem` a `1.48rem`, line-height `1.34`–`1.5` em `Literata`): Tese de posicionamento na primeira dobra e parágrafos introdutórios de cada seção.
- **Body** (`400`, `1rem`, line-height `1.62`, largura máxima `68ch`): Narrativa técnica, escopo de atuação e descrições completas dos repositórios.
- **Label / Spec** (`500`–`600`, `0.74rem`–`0.8rem`, `tabular-nums` em `JetBrains Mono`): Hashes Git, datas, carimbos de prancha, preços BRL e contadores de fila.

### Named Rules
**The No-Kicker Rule.** Títulos (`h1`–`h4`) nunca são precedidos por pequenos rótulos em caixa-alta (*eyebrows*); metadados técnicos ficam alinhados lateralmente na mesma linha de base ou em barras de especificação abaixo do título.

**The Honest Mono Rule.** `JetBrains Mono` é restrita a código, hashes de commits, ramos Git, datas, grandezas numéricas e estados de sistema — nunca usada como fantasia estética para parágrafos comuns.

## Layout

O layout opera em rolagem vertical nativa contínua com contêiner central `.wrap` de `1320px` e margens laterais simétricas (`clamp(20px, 4vw, 56px)`). Na primeira dobra desktop (`> 980px`), o `.opening-grid` divide a tela em duas colunas assimétricas (`0.92fr` para o fólio autoral à esquerda e `1.08fr` para a Prancha I viva à direita), sangrando o cabeçalho `Herbarium Forest` e o fundo `Sage Plate` até a borda direita da janela enquanto preserva o alinhamento interno rigoroso com o `.wrap`.

As seções subsequentes alternam ritmo e densidade (`Cotton Paper` → `Sage Plate` → `Herbarium Forest` → `Cotton Paper` → `Herbarium Forest`) com respiro vertical de `clamp(56px, 8vw, 96px)`. Em telas `<= 980px`, divisões de duas colunas empilham em coluna única com o texto precedendo o aparelho interativo; em smartphones (`360px`–`640px`), os CTAs secundários organizam-se lado a lado (`1fr 1fr`) sob o CTA primário e a taxonomia mantém grade compacta `2×2` para expor o início da Prancha I ainda na primeira tela.

## Elevation & Depth

O sistema é plano e arquitetônico por padrão: a hierarquia espacial nasce da justaposição de planos de papel (`#F3F5EE`, `#E9EEE4`, `#FAFBF7`), faixas sólidas `#133A27` e fios estruturais de `1px`, sem sombras em cards ou efeito de vidro fosco (`backdrop-filter`).

### Shadow Vocabulary
- **Float Tooltip** (`box-shadow: 0 10px 28px -8px rgba(15, 30, 22, 0.16)`): Reservada exclusivamente a camadas efêmeras flutuantes quando necessárias sobre canvas, nunca aplicada a blocos de layout estáticos.

### Named Rules
**The Flat Sheet Rule.** Superfícies em repouso não possuem `box-shadow` nem *blur*; a separação entre regiões ocorre apenas por contraste tonal de papel e fios de `1px`.

## Shapes

A linguagem formal adota cantos retos e secos de papelaria técnica (`2px` em controles, células e tags; `3px` no máximo em quadros maiores), recusando pílulas infladas (`999px`) em containers e cards arredondados genéricos (`16px`–`24px`). Os únicos elementos circulares (`50%`) são marcadores semânticos pontuais: nós de commit no grafo Git, indicadores luminosos de rede (`8px`) e selos de ano na linha cronológica acadêmica (`58px`). Bordas estruturais mantêm espessura uniforme de `1px` em todo o perímetro ou `border-top` / `border-bottom`, sem barras laterais grossas coloridas (`border-left`).

## Components

### Buttons
Botões táteis, diretos e contidos em um único par visual.
- **Shape:** Cantos secos catalográficos (`2px`), altura mínima obrigatória de `44px` para acessibilidade de toque.
- **Primary:** Fundo `Eucalyptus Primary`, texto `Cotton Paper`, `padding: 10px 20px`, peso `600` em `Public Sans`.
- **Hover / Focus:** Escurece para `Eucalyptus Hover` com elevação sutil de `translateY(-2px)` em `0.18s cubic-bezier(0.16, 1, 0.3, 1)`, retorno `translateY(1px)` no clique e anel `:focus-visible` de `2px solid` com `outline-offset: 3px`.
- **Secondary / Outline:** Fundo transparente, borda `1px solid` `Herbarium Forest`, texto `Botanical Ink`, preenchendo com `Surface Hover` na interação.

### Chips
Etiquetas catalográficas retangulares usadas para listar tecnologias e escopo técnico.
- **Style:** Fundo `Specimen Surface`, texto `Botanical Ink`, borda `1px solid` `Soft Hairline`, raio `2px`, tipografia `JetBrains Mono` (`0.78rem`).
- **State:** Estáticas em listas de especificação; na variante interativa de filtro de branches (`.bf-btn`, altura `44px`), o estado selecionado assume fundo `Herbarium Forest` e texto `Cotton Paper`.

### Cards / Containers
O sistema substitui cards isolados por **Pranchas Abertas** (`.specimen-plate`) e **Quadros de Aparelho** (`.apparatus-frame`).
- **Corner Style:** Raio seco (`2px`).
- **Background:** Pranchas abertas usam o próprio fundo da seção; quadros interativos internos usam `Specimen Surface`.
- **Shadow Strategy:** Sem sombra (`none`), seguindo **The Flat Sheet Rule**.
- **Border:** Fio perimetral `1px solid` `Herbarium Forest` nos aparelhos e divisórias horizontais `1px` entre pranchas.
- **Internal Padding:** `16px` a `20px` nas bancadas interativas; `clamp(24px, 3.5vw, 40px)` na folha de inspeção de engenharia.

### Navigation
Cabeçalho superior fixo (`sticky`, altura mínima `64px`) sobre `Cotton Paper` com fio inferior `1px solid` `Herbarium Forest`.
- **Desktop:** Marca autoral à esquerda, links de âncora centrais em `Public Sans` (`600`, `0.92rem`) com sublinhado animado em `Eucalyptus Primary` (`scaleX`), botão de alternância de tema (`44px × 44px`) e CTA `Herbarium Forest` à direita.
- **Mobile (`<= 980px`):** Links centrais recolhem-se em gaveta vertical acessível (`#mobileDrawer`, links com `46px` de altura) acionada por botão hambúrguer de `44px × 44px`, mantendo cabeçalho em linha única até `320px`.

### Specimen Apparatus Bench
Componente assinatura do portfólio que demonstra cada sistema real funcionando na própria página (`<offline-diagram>`, `<browser-preview>`, `<poker-preview>` e `<git-graph>`). Combina barra superior de controle com botões de `44px`, registros reais do domínio (medições de obra, tabela dupla de preços em BRL, cartas Fibonacci ou inspetor de commits com hash/data) e feedback imediato via `aria-live="polite"`.

## Do's and Don'ts

### Do:
- **Do** estruturar novos projetos como pranchas abertas numeradas (`Prancha I`, `Prancha II`...) acompanhadas de barra `<dl class="spec-strip">` e demonstração funcional real.
- **Do** manter todos os botões, abas, filtros e links de controle fora de parágrafos com altura mínima de `44px` e espaçamento mínimo de `8px`.
- **Do** usar `Literata` nos parágrafos introdutórios de seção (`.section-intro p`) para sustentar a voz editorial do atlas do início ao fim da página.
- **Do** utilizar exclusivamente ícones `<svg>` inline com traço consistente (`1.8px`–`2px`) e tematizar superfícies nativas do navegador (`::selection`, barra de rolagem e foco).

### Don't:
- **Don't** adicionar *eyebrows* ou pequenos rótulos em caixa-alta acima de `h1`, `h2`, `h3` ou `h4`.
- **Don't** criar grades de cards iguais com `[ícone + título + texto]`, cards dentro de cards ou bordas laterais grossas (`border-left` > `1px`).
- **Don't** introduzir `backdrop-filter: blur()`, brilho neon, animações de digitação (*typewriter*), carrosséis automáticos ou travas de rolagem (`overflow: hidden` no `body`).
- **Don't** usar caracteres Unicode ou emojis (`✓`, `☕`, `⚡`, `↗`) no lugar de ícones vetoriais desenhados.

