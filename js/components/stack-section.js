/**
 * Componente <stack-section>
 * Renderiza as faixas de marquee infinito e os grupos de tecnologias da seção Stack.
 */

import { STACK_DATA } from '../data/portfolio-data.js';

function renderMarqueePills(items) {
  const primary = items.map((item) => `<span class="pill">${item}</span>`).join('');
  const duplicate = items
    .map((item) => `<span class="pill" aria-hidden="true">${item}</span>`)
    .join('');
  return primary + duplicate;
}

export class StackSection extends HTMLElement {
  connectedCallback() {
    const groupsHtml = STACK_DATA.groups
      .map(
        (grp) => `
        <div class="grp rv" style="--c:var(${grp.colorVar})">
          <h3><i></i>${grp.title}</h3>
          <ul>
            ${grp.items.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `
      )
      .join('');

    this.innerHTML = `
      <div class="marq rv">
        <div class="track">${renderMarqueePills(STACK_DATA.marqueeRow1)}</div>
      </div>
      <div class="marq rev rv">
        <div class="track">${renderMarqueePills(STACK_DATA.marqueeRow2)}</div>
      </div>
      <div class="groups">
        ${groupsHtml}
      </div>
    `;
  }
}

customElements.define('stack-section', StackSection);

