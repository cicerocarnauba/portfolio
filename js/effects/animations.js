/**
 * Controladores de Interação do Caderno de Engenharia (#atuacao) e Utilitários de Movimento.
 */

import { ENGINEERING_PILLARS } from '../data/portfolio-data.js?v=13';

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const NODE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

export function initEngineeringLedger() {
  const indexBox = document.querySelector('#pillarsIndex');
  const sheetBox = document.querySelector('#pillarSheet');
  if (!indexBox || !sheetBox) return null;

  const buttons = Array.from(indexBox.querySelectorAll('.pillar-row-btn'));

  const selectPillar = (pillarId) => {
    const pillar =
      ENGINEERING_PILLARS.find((p) => p.id === pillarId) || ENGINEERING_PILLARS[0];
    if (!pillar) return;

    buttons.forEach((btn) => {
      const active = btn.getAttribute('data-pillar-id') === pillar.id;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    const deliverablesHtml = pillar.deliverables
      .map((item) => `<li>${NODE_SVG}<span>${item}</span></li>`)
      .join('');

    sheetBox.innerHTML = `
      <div class="pillar-sheet-head">
        <h3>${pillar.title}</h3>
        <span class="pillar-sheet-scope">${pillar.badge}</span>
      </div>
      <p class="pillar-sheet-desc">${pillar.fullDesc}</p>
      <ul class="pillar-deliverables-list">
        ${deliverablesHtml}
      </ul>
      <div class="pillar-sheet-foot">
        <span>Aplicado em: <strong>${pillar.relatedProject}</strong></span>
        <a class="btn btn-outline" href="#projetos">Inspecionar projetos</a>
      </div>
    `;
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-pillar-id');
      if (id) selectPillar(id);
    });
  });

  document.querySelectorAll('[data-pillar-select]').forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('data-pillar-select');
      if (id) selectPillar(id);
    });
  });

  selectPillar(ENGINEERING_PILLARS[0].id);
  return { selectPillar };
}
