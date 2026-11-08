/**
 * Ponto de entrada principal (ES Module) do portfólio espacial de Cícero Higor.
 * Registra os Web Components, renderiza os links de contato e inicializa o Motor 3D Z-Axis.
 */

import { CONTACT } from './data/portfolio-data.js?v=5';

// Registro dos Web Components
import './components/app-header.js';
import './components/git-graph.js';
import './components/offline-diagram.js';
import './components/browser-preview.js';
import './components/poker-preview.js';
import './components/project-list.js';
import './components/stack-section.js';
import './components/timeline-section.js?v=8';

// Efeitos e Motor Espacial 3D
import {
  initHeroNameSplit,
  initTypedRole,
  initEngineeringInspector,
  initProjectDeck,
  initSpatialEngine,
  initPointerEffects
} from './effects/animations.js';

function initContactLinks() {
  const box = document.querySelector('#links');
  if (!box) return;

  const appendLink = (label, href, extraClass = '', iconSvg = '') => {
    const a = document.createElement('a');
    a.className = `btn ${extraClass} mag`.trim();
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    if (iconSvg) {
      a.innerHTML = `${iconSvg}<span>${label}</span>`;
    } else {
      a.textContent = label;
    }
    box.appendChild(a);
  };

  if (CONTACT.whatsapp) {
    appendLink(
      'WhatsApp',
      CONTACT.whatsapp,
      '',
      `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>`
    );
  }

  if (CONTACT.linkedin) {
    appendLink(
      'LinkedIn',
      CONTACT.linkedin,
      'ghost',
      `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
    );
  }

  if (CONTACT.github) {
    appendLink(
      'GitHub',
      CONTACT.github,
      'ghost',
      `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`
    );
  }

  if (CONTACT.email) {
    const row = document.createElement('span');
    row.className = 'copy-row';

    const emailSpan = document.createElement('span');
    emailSpan.textContent = CONTACT.email;

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.textContent = 'Copiar';

    copyBtn.addEventListener('click', () => {
      const done = () => {
        copyBtn.textContent = 'Copiado';
        setTimeout(() => {
          copyBtn.textContent = 'Copiar';
        }, 1600);
      };

      const fallback = () => {
        const range = document.createRange();
        range.selectNodeContents(emailSpan);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        copyBtn.textContent = 'Selecionado';
        setTimeout(() => {
          copyBtn.textContent = 'Copiar';
        }, 1600);
      };

      try {
        navigator.clipboard.writeText(CONTACT.email).then(done, fallback);
      } catch {
        fallback();
      }
    });

    row.appendChild(emailSpan);
    row.appendChild(copyBtn);
    box.appendChild(row);
  }
}

function bootstrap() {
  initContactLinks();
  initHeroNameSplit('#name');
  initTypedRole('#typed');
  const inspectorController = initEngineeringInspector();
  initProjectDeck();
  initSpatialEngine(inspectorController);
  initPointerEffects();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
