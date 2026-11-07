/**
 * Componente <browser-preview>
 * Simula a interface em abas do sistema Consulado Fla-Quixadá.
 */

import { FLA_QUIXADA_MODULES } from '../data/portfolio-data.js';
import { prefersReducedMotion } from '../effects/animations.js';

export class BrowserPreview extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="feat-vis tilt">
        <div class="browser" role="region" aria-label="Prévia interativa dos módulos do site Consulado Fla-Quixadá">
          <div class="b-bar" aria-hidden="true">
            <i></i><i></i><i></i>
            <span class="b-url">flaquixada-website.vercel.app</span>
          </div>
          <div class="b-tabs" id="btabs" role="tablist" aria-label="Módulos do sistema"></div>
          <div class="b-screen" id="bpanel" role="tabpanel">
            <div class="b-screen-head">
              <h4 id="bt"></h4>
              <span class="b-badge" id="bbadge">módulo ativo</span>
            </div>
            <div class="b-rows" id="brows"></div>
          </div>
        </div>
      </div>
    `;

    this.initTabs();
  }

  initTabs() {
    const tabsContainer = this.querySelector('#btabs');
    const titleEl = this.querySelector('#bt');
    const badgeEl = this.querySelector('#bbadge');
    const rowsContainer = this.querySelector('#brows');
    if (!tabsContainer || !titleEl || !rowsContainer) return;

    let currentIdx = 0;
    let holdUntil = 0;

    FLA_QUIXADA_MODULES.forEach((mod, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.textContent = mod.tab;
      btn.addEventListener('click', () => {
        holdUntil = Date.now() + 9000;
        showTab(idx);
      });
      tabsContainer.appendChild(btn);
    });

    const buttons = Array.from(tabsContainer.querySelectorAll('button'));

    function showTab(idx) {
      currentIdx = idx;
      const mod = FLA_QUIXADA_MODULES[idx];

      buttons.forEach((btn, j) => {
        const active = j === idx;
        btn.classList.toggle('on', active);
        btn.setAttribute('aria-selected', String(active));
      });

      titleEl.textContent = mod.title;
      if (badgeEl) badgeEl.textContent = mod.badge;

      rowsContainer.innerHTML = '';
      mod.items.forEach((text, itemIdx) => {
        const row = document.createElement('div');
        const icon = document.createElement('i');
        const span = document.createElement('span');
        icon.textContent = `0${itemIdx + 1}`;
        span.textContent = text;
        row.appendChild(icon);
        row.appendChild(span);
        rowsContainer.appendChild(row);
      });
    }

    showTab(0);

    if (!prefersReducedMotion()) {
      setInterval(() => {
        if (Date.now() > holdUntil) {
          showTab((currentIdx + 1) % FLA_QUIXADA_MODULES.length);
        }
      }, 2800);
    }
  }
}

customElements.define('browser-preview', BrowserPreview);

