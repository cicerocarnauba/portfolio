/**
 * Componente <stack-section>
 * Matriz técnica aberta das linguagens, bancos de dados, infraestrutura e processos utilizados.
 */

import { STACK_DATA } from '../data/portfolio-data.js?v=13';

export class StackSection extends HTMLElement {
  connectedCallback() {
    const colsHtml = STACK_DATA.groups
      .map(
        (grp) => `
        <div class="stack-col">
          <h4>${grp.title}</h4>
          <ul>
            ${grp.items.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `
      )
      .join('');

    this.innerHTML = `
      <div class="stack-block">
        <div class="stack-block-head">
          <h3>Repertório técnico</h3>
        </div>
        <div class="stack-matrix">
          ${colsHtml}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('stack-section')) {
  customElements.define('stack-section', StackSection);
}
