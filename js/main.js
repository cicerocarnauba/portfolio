/**
 * Ponto de entrada principal (ES Module) do portfólio de Cícero Higor.
 * Registra os Web Components, renderiza os links de contato e inicializa as animações.
 */

import { CONTACT } from './data/portfolio-data.js';

// Registro dos Web Components
import './components/app-header.js';
import './components/git-graph.js';
import './components/offline-diagram.js';
import './components/browser-preview.js';
import './components/project-list.js';
import './components/stack-section.js';
import './components/timeline-section.js';

// Efeitos e animações
import {
  initHeroNameSplit,
  initTypedRole,
  initScrollReveal,
  initStatCounters,
  initPointerEffects,
  initScrollProgressSync
} from './effects/animations.js';

function initContactLinks() {
  const box = document.querySelector('#links');
  if (!box) return;

  const appendLink = (label, href, extraClass = '') => {
    const a = document.createElement('a');
    a.className = `btn ${extraClass} mag`.trim();
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = label;
    box.appendChild(a);
  };

  if (CONTACT.linkedin) {
    appendLink('LinkedIn', CONTACT.linkedin, '');
  }

  if (CONTACT.github) {
    appendLink('Ver perfil no GitHub', CONTACT.github, CONTACT.linkedin ? 'ghost' : '');
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
  initScrollReveal();
  initStatCounters();
  initPointerEffects();
  initScrollProgressSync();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

