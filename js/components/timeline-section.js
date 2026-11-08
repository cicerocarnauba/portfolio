/**
 * Componente <timeline-section>
 * Renderiza uma linha do tempo horizontal infográfica com círculos conectados
 * por uma linha fluida, alternando os nós em cima e embaixo, com animação
 * cinematográfica sequencial de surgimento ao entrar na camada Z: -480m.
 */

import { EDUCATION_TIMELINE } from '../data/portfolio-data.js';

export class TimelineSection extends HTMLElement {
  connectedCallback() {
    // Lista acessível para leitores de tela
    const srItems = EDUCATION_TIMELINE.map(
      (item) => `<li>${item.period}: ${item.title} na instituição ${item.institution}. ${item.description}</li>`
    ).join('');

    // Colunas visuais da linha do tempo horizontal
    const columnsHtml = EDUCATION_TIMELINE.map((item, idx) => {
      const repoBtn = item.repoUrl
        ? `
          <a class="m-repo-link" href="${item.repoUrl}" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/>
            </svg>
            <span>${item.repoLabel}</span>
          </a>
        `
        : '';

      const statusTag = item.isCurrent
        ? `<span class="m-status-pill"><span class="status-dot" aria-hidden="true"></span>${item.status}</span>`
        : '';

      const delay = idx * 0.4;

      if (item.position === 'top') {
        return `
          <div class="h-milestone pos-top" style="--c:var(${item.colorVar}); --delay:${delay}s; --ty:16px;">
            <div class="m-circle-wrap">
              <div class="m-circle ${item.isCurrent ? 'current' : ''}">
                <span class="m-year">${item.year}</span>
                <span class="m-sub">${item.period}</span>
              </div>
              <div class="m-stem down">
                <span class="m-pin"></span>
              </div>
            </div>
            <div class="m-content">
              <div class="m-header">
                ${statusTag}
                <h3 class="m-title">${item.title}</h3>
                <div class="m-accent-bar"></div>
              </div>
              <p class="m-inst">${item.institution}</p>
              <p class="m-desc">${item.description}</p>
              ${repoBtn}
            </div>
          </div>
        `;
      }

      // position === 'bottom'
      return `
        <div class="h-milestone pos-bottom" style="--c:var(${item.colorVar}); --delay:${delay}s; --ty:-16px;">
          <div class="m-content">
            <div class="m-header">
              <h3 class="m-title">${item.title}</h3>
              <div class="m-accent-bar"></div>
            </div>
            <p class="m-inst">${item.institution}</p>
            <p class="m-desc">${item.description}</p>
          </div>
          <div class="m-circle-wrap">
            <div class="m-stem up">
              <span class="m-pin"></span>
            </div>
            <div class="m-circle ${item.isCurrent ? 'current' : ''}">
              <span class="m-year">${item.year}</span>
              <span class="m-sub">${item.period}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.innerHTML = `
      <ol class="sr">${srItems}</ol>
      <div class="h-timeline-scroll">
        <div class="h-timeline-wrap" id="timelineWrap">
          <svg class="h-timeline-curve" viewBox="0 0 1000 390" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="timelineCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="var(--b3)" />
                <stop offset="50%" stop-color="var(--b2)" />
                <stop offset="100%" stop-color="var(--b1)" />
              </linearGradient>
            </defs>
            <path class="wave-path" d="M 0 195 C 80 195, 110 82, 190 82 C 290 82, 370 308, 500 308 C 630 308, 710 82, 810 82 C 890 82, 920 195, 1000 195" />
          </svg>
          <div class="h-timeline-track">
            ${columnsHtml}
          </div>
        </div>
      </div>
    `;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const wrap = this.querySelector('.h-timeline-wrap');
      if (wrap) wrap.classList.add('is-animated');
    }
  }

  playAnimation() {
    const wrap = this.querySelector('.h-timeline-wrap');
    if (!wrap) return;
    wrap.classList.remove('is-animated');
    // Força reflow para reiniciar a animação quando o usuário mergulha na camada Formação
    void wrap.offsetWidth;
    wrap.classList.add('is-animated');
  }
}

customElements.define('timeline-section', TimelineSection);
