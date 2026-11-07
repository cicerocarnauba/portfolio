/**
 * Componentes de Navegação: <side-rail> e <app-header>
 * Gerencia links das seções e alternância entre os temas Verde Musgo Escuro e Claro.
 */

import { NAV_SECTIONS } from '../data/portfolio-data.js';

export class SideRail extends HTMLElement {
  connectedCallback() {
    const linksHtml = NAV_SECTIONS.map((sec, idx) => {
      const topPct = (idx / (NAV_SECTIONS.length - 1)) * 100;
      return `<a href="#${sec.id}" style="top:${topPct}%"><span>${sec.label}</span></a>`;
    }).join('');

    this.innerHTML = `
      <nav class="rail" id="rail" aria-label="Navegação por seções">
        <div class="rail-fill"></div>
        ${linksHtml}
      </nav>
    `;
  }
}

export class AppHeader extends HTMLElement {
  connectedCallback() {
    const navLinksHtml = NAV_SECTIONS
      .filter((sec) => sec.navLabel)
      .map((sec) => `<a href="#${sec.id}">${sec.navLabel}</a>`)
      .join('');

    this.innerHTML = `
      <header class="top" id="top">
        <a class="brand" href="#inicio" aria-label="Cícero Higor, início">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="5" cy="4" r="2.3" stroke="var(--b3)" stroke-width="1.8"/>
            <circle cx="5" cy="16" r="2.3" stroke="var(--b1)" stroke-width="1.8"/>
            <circle cx="15" cy="8" r="2.3" stroke="var(--b2)" stroke-width="1.8"/>
            <path d="M5 6.3v7.4M15 10.3c0 2.6-2.4 3.4-5.2 4.2" stroke="var(--line-strong)" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <span>Cícero Higor</span>
          <span class="brand-branch" aria-hidden="true">git:(main)</span>
        </a>
        <div class="nav">
          ${navLinksHtml}
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

