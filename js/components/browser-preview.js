/**
 * Componente <browser-preview>
 * Navegador interativo dos módulos reais da plataforma Consulado Fla-Quixadá.
 */

import { FLA_QUIXADA_MODULES } from '../data/portfolio-data.js?v=13';

export class BrowserPreview extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="browser" role="region" aria-label="Inspeção dos módulos da plataforma Consulado Fla-Quixadá">
        <div class="b-bar" aria-hidden="true">
          <span class="b-dots"><i></i><i></i><i></i></span>
          <span class="b-url">flaquixada.com.br</span>
        </div>
        <div class="b-tabs" id="btabs" role="tablist" aria-label="Módulos da plataforma"></div>
        <div class="b-screen" id="bpanel" role="tabpanel">
          <div class="b-screen-head">
            <h4 id="bt"></h4>
            <span class="b-badge" id="bbadge"></span>
          </div>
          <div class="b-ctrl-row" id="bctrl" hidden></div>
          <ul class="b-rows" id="brows"></ul>
        </div>
      </div>
    `;

    this.initTabs();
  }

  initTabs() {
    const tabsContainer = this.querySelector('#btabs');
    const titleEl = this.querySelector('#bt');
    const badgeEl = this.querySelector('#bbadge');
    const ctrlRow = this.querySelector('#bctrl');
    const rowsContainer = this.querySelector('#brows');
    const panel = this.querySelector('#bpanel');
    if (!tabsContainer || !titleEl || !rowsContainer || !ctrlRow) return;

    let isMemberPrice = true;
    let homeGoals = 2;
    let currentIdx = 0;

    FLA_QUIXADA_MODULES.forEach((mod, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = `fla-tab-${idx}`;
      btn.setAttribute('role', 'tab');
      btn.textContent = mod.tab;
      btn.addEventListener('click', () => {
        currentIdx = idx;
        renderTab();
      });
      tabsContainer.appendChild(btn);
    });

    const buttons = Array.from(tabsContainer.querySelectorAll('button'));

    const renderTab = () => {
      const mod = FLA_QUIXADA_MODULES[currentIdx];
      buttons.forEach((btn, j) => {
        const active = j === currentIdx;
        btn.classList.toggle('on', active);
        btn.setAttribute('aria-selected', String(active));
      });
      if (panel) panel.setAttribute('aria-labelledby', `fla-tab-${currentIdx}`);

      titleEl.textContent = mod.title;
      if (badgeEl) badgeEl.textContent = mod.badge;

      if (mod.interactive === 'cardapio') {
        ctrlRow.hidden = false;
        ctrlRow.innerHTML = `
          <button type="button" class="b-mode-btn ${isMemberPrice ? 'is-active' : ''}" data-price-mode="member">
            Tabela Associado
          </button>
          <button type="button" class="b-mode-btn ${!isMemberPrice ? 'is-active' : ''}" data-price-mode="regular">
            Não associado
          </button>
        `;
        ctrlRow.querySelectorAll('[data-price-mode]').forEach((b) => {
          b.addEventListener('click', () => {
            isMemberPrice = b.getAttribute('data-price-mode') === 'member';
            renderTab();
          });
        });

        rowsContainer.innerHTML = mod.items
          .map(
            (item) => `
            <li>
              <span>${item.label}</span>
              <span class="b-row-val">${isMemberPrice ? item.member : item.regular}</span>
            </li>
          `
          )
          .join('');
      } else if (mod.interactive === 'bolao') {
        ctrlRow.hidden = false;
        ctrlRow.innerHTML = `
          <span class="mono" style="font-size:0.82rem">Seu palpite: <strong>FLA ${homeGoals} × 0 FOR</strong></span>
          <button type="button" class="b-mode-btn" id="bolaoStepBtn">Alterar placar</button>
        `;
        const stepBtn = ctrlRow.querySelector('#bolaoStepBtn');
        if (stepBtn) {
          stepBtn.addEventListener('click', () => {
            homeGoals = (homeGoals % 4) + 1;
            renderTab();
          });
        }
        rowsContainer.innerHTML = mod.rows
          .map((r) => `<li><span>${r.label}</span><span class="b-row-val">${r.val}</span></li>`)
          .join('');
      } else {
        ctrlRow.hidden = true;
        ctrlRow.innerHTML = '';
        rowsContainer.innerHTML = (mod.rows || [])
          .map((r) => `<li><span>${r.label}</span><span class="b-row-val">${r.val}</span></li>`)
          .join('');
      }
    };

    renderTab();
  }
}

if (!customElements.get('browser-preview')) {
  customElements.define('browser-preview', BrowserPreview);
}
