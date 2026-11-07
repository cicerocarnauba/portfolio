/**
 * Componente <project-list>
 * Renderiza o accordion de projetos complementares a partir de `EXTRA_PROJECTS`.
 */

import { EXTRA_PROJECTS } from '../data/portfolio-data.js';

export class ProjectList extends HTMLElement {
  connectedCallback() {
    const rowsHtml = EXTRA_PROJECTS.map((proj) => {
      const isOpen = Boolean(proj.defaultOpen);
      const chipsHtml = proj.chips.map((c) => `<li>${c}</li>`).join('');
      return `
        <div class="row ${isOpen ? 'open ' : ''}rv" style="--c:var(${proj.colorVar})">
          <button class="row-btn" type="button" aria-expanded="${isOpen}">
            <span class="dot"></span>
            <h3>${proj.title}</h3>
            <p>${proj.summary}</p>
            <span class="row-meta">${proj.meta}</span>
            <span class="pm" aria-hidden="true"></span>
          </button>
          <div class="more">
            <div>
              <div class="more-in">
                <p>${proj.description}</p>
                <ul class="chips">${chipsHtml}</ul>
                <div class="actions">
                  <a class="btn ghost" href="${proj.repoUrl}" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.innerHTML = `
      <div class="list-head rv">
        <h3 class="list-title">Mais trabalhos no GitHub</h3>
        <button type="button" class="expand-all" id="expandAll">Expandir todos</button>
      </div>
      <div class="rows">
        ${rowsHtml}
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

customElements.define('project-list', ProjectList);

