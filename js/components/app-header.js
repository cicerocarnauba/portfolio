/**
 * Componentes Espaciais de Navegação:
 * - <side-rail>: Menu Lateral em Liquid Glass com indicador fluido e ícones por camada
 * - <app-header>: Barra Superior HUD minimalista com telemetria de profundidade (Eixo Z) e tema
 */

import { NAV_SECTIONS } from '../data/portfolio-data.js';

const ICONS = {
  compass: '<circle cx="12" cy="12" r="9"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  'git-branch': '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  'git-commit': '<circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
  milestone: '<circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><path d="M9 12h6"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>'
};

export class SideRail extends HTMLElement {
  connectedCallback() {
    const itemsHtml = NAV_SECTIONS.map((sec, idx) => {
      const svgContent = ICONS[sec.icon] || ICONS.compass;
      return `
        <button
          type="button"
          class="lg-dock-btn ${idx === 0 ? 'on' : ''}"
          data-layer-target="${idx}"
          aria-label="Ir para ${sec.label}"
          aria-current="${idx === 0 ? 'step' : 'false'}"
        >
          <span class="lg-dock-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              ${svgContent}
            </svg>
          </span>
          <span class="lg-dock-meta">
            <small class="mono">${sec.short}</small>
            <strong>${sec.label}</strong>
          </span>
        </button>
      `;
    }).join('');

    this.innerHTML = `
      <nav class="liquid-dock" id="rail" aria-label="Menu lateral">
        <div class="liquid-dock-glass">
          <div class="liquid-active-pill" id="dockPill" aria-hidden="true"></div>
          <div class="liquid-dock-items">
            ${itemsHtml}
          </div>
          <div class="liquid-dock-depth" aria-hidden="true">
            <div class="liquid-depth-bar"><div class="liquid-depth-fill" id="dockFill"></div></div>
          </div>
        </div>
      </nav>
    `;
  }
}

export class AppHeader extends HTMLElement {
  connectedCallback() {
    const contactIdx = Math.max(0, NAV_SECTIONS.findIndex((s) => s.id === 'contato'));

    this.innerHTML = `
      <header class="top-hud" id="top">
        <a class="brand" href="#inicio" data-layer-target="0" aria-label="Cícero Higor, voltar ao início">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="5" cy="4" r="2.3" stroke="var(--b3)" stroke-width="1.8"/>
            <circle cx="5" cy="16" r="2.3" stroke="var(--b1)" stroke-width="1.8"/>
            <circle cx="15" cy="8" r="2.3" stroke="var(--b2)" stroke-width="1.8"/>
            <path d="M5 6.3v7.4M15 10.3c0 2.6-2.4 3.4-5.2 4.2" stroke="var(--line-strong)" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <span>Cícero Higor</span>
          <span class="brand-branch" aria-hidden="true">git:(main)</span>
        </a>

        <div class="hud-telemetry" aria-live="polite">
          <span class="hud-layer-badge">
            <i class="hud-pulse" aria-hidden="true"></i>
            <span class="mono" id="hudLayerName">00 · INÍCIO</span>
          </span>
        </div>

        <div class="hud-actions">
          <button class="hud-contact-btn" type="button" data-layer-target="${contactIdx}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            <span>Contato</span>
          </button>
          <button class="hud-step-btn" id="prevLayerBtn" type="button" aria-label="Seção anterior" title="Seção anterior (↑)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
          <button class="hud-step-btn" id="nextLayerBtn" type="button" aria-label="Próxima seção" title="Próxima seção (↓)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <button class="icon-btn" id="theme" type="button" aria-label="Alternar tema claro e escuro" title="Alternar tema">
            <svg id="theme-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"></svg>
          </button>
        </div>
      </header>
    `;

    this.initThemeToggle();
  }

  effectiveTheme() {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr) return attr;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  syncThemeUI() {
    const themeBtn = this.querySelector('#theme');
    const themeIc = this.querySelector('#theme-ic');
    if (!themeBtn || !themeIc) return;

    const isLight = this.effectiveTheme() === 'light';
    themeBtn.setAttribute('aria-pressed', String(isLight));
    themeIc.innerHTML = isLight
      ? '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'
      : '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  }

  initThemeToggle() {
    const themeBtn = this.querySelector('#theme');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      const next = this.effectiveTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      this.syncThemeUI();
    });

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
      this.syncThemeUI();
    });

    this.syncThemeUI();
  }
}

customElements.define('side-rail', SideRail);
customElements.define('app-header', AppHeader);
