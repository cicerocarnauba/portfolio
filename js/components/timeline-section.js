/**
 * Componente <timeline-section>
 * Trajetória acadêmica aberta do ensino técnico à graduação em Engenharia de Software na UFC.
 */

import { EDUCATION_TIMELINE } from '../data/portfolio-data.js?v=13';

const GITHUB_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;

export class TimelineSection extends HTMLElement {
  connectedCallback() {
    const nodesHtml = EDUCATION_TIMELINE.map((item) => {
      const repoBtn = item.repoUrl
        ? `
          <a class="edu-repo-link" href="${item.repoUrl}" target="_blank" rel="noopener noreferrer">
            ${GITHUB_SVG}
            <span>${item.repoLabel}</span>
          </a>
        `
        : '';

      return `
        <article class="edu-node ${item.isCurrent ? 'is-current' : ''}" style="--c:var(${item.colorVar})">
          <div class="edu-marker-row">
            <span class="edu-year-badge">${item.year}</span>
            <span class="edu-period">${item.period}</span>
          </div>
          <div class="edu-body">
            <h3>${item.title}</h3>
            <p class="edu-inst">${item.institution}<span class="edu-period-inline"> · ${item.period}</span>${item.isCurrent ? ' · Em andamento' : ''}</p>
            <p class="edu-desc">${item.description}</p>
            ${repoBtn}
          </div>
        </article>
      `;
    }).join('');

    this.innerHTML = `
      <div class="edu-timeline">
        ${nodesHtml}
      </div>
    `;
  }
}

if (!customElements.get('timeline-section')) {
  customElements.define('timeline-section', TimelineSection);
}
