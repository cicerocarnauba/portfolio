/**
 * Componente <project-list>
 * Índice catalográfico expansível dos repositórios complementares no GitHub.
 */

import { EXTRA_PROJECTS } from '../data/portfolio-data.js?v=13';

const CHEVRON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;
const GITHUB_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;

export class ProjectList extends HTMLElement {
  connectedCallback() {
    const rowsHtml = EXTRA_PROJECTS.map((proj) => {
      const isOpen = Boolean(proj.defaultOpen);
      const chipsHtml = proj.chips.map((c) => `<li>${c}</li>`).join('');
      return `
        <div class="row ${isOpen ? 'open' : ''}">
          <button class="row-btn" type="button" aria-expanded="${isOpen}">
            <span class="row-main">
              <h4>${proj.title}</h4>
              <p>${proj.summary}</p>
            </span>
            <span class="row-meta">${proj.meta}</span>
            <span class="row-toggle-ic" aria-hidden="true">${CHEVRON_SVG}</span>
          </button>
          <div class="more">
            <div>
              <div class="more-in">
                <p>${proj.description}</p>
                <ul class="spec-tags">${chipsHtml}</ul>
                <div class="plate-actions">
                  <a class="btn btn-outline" href="${proj.repoUrl}" target="_blank" rel="noopener noreferrer">
                    ${GITHUB_SVG}
                    <span>Ver código no GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.innerHTML = `
      <div class="repo-ledger-wrap">
        <div class="list-head">
          <h3 class="list-title">Demais repositórios no GitHub</h3>
          <button type="button" class="expand-all" id="expandAll">Expandir todos</button>
        </div>
        <div class="rows">
          ${rowsHtml}
        </div>
      </div>
    `;

    this.initAccordion();
  }

  initAccordion() {
    const rowBtns = Array.from(this.querySelectorAll('.row-btn'));
    const expandBtn = this.querySelector('#expandAll');

    const syncExpandBtn = () => {
      if (!expandBtn) return;
      const allOpen = rowBtns.every((b) => b.getAttribute('aria-expanded') === 'true');
      expandBtn.textContent = allOpen ? 'Recolher todos' : 'Expandir todos';
    };

    rowBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        btn.closest('.row').classList.toggle('open', !isOpen);
        syncExpandBtn();
      });
    });

    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        const allOpen = rowBtns.every((b) => b.getAttribute('aria-expanded') === 'true');
        rowBtns.forEach((btn) => {
          btn.setAttribute('aria-expanded', String(!allOpen));
          btn.closest('.row').classList.toggle('open', !allOpen);
        });
        syncExpandBtn();
      });
    }
  }
}

if (!customElements.get('project-list')) {
  customElements.define('project-list', ProjectList);
}
