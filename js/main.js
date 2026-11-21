/**
 * Ponto de entrada principal (ES Module) do portfólio de Cícero Higor.
 */

import { CONTACT } from './data/portfolio-data.js?v=13';

import './components/app-header.js?v=15';
import './components/offline-diagram.js?v=13';
import './components/browser-preview.js?v=13';
import './components/poker-preview.js?v=14';
import './components/project-list.js?v=13';
import './components/git-graph.js?v=13';
import './components/timeline-section.js?v=13';
import './components/stack-section.js?v=13';

import { initEngineeringLedger } from './effects/animations.js?v=13';

function initContactLinks() {
  const box = document.querySelector('#links');
  if (!box) return;
  box.innerHTML = '';

  const appendLink = (label, href, extraClass, iconSvg) => {
    const a = document.createElement('a');
    a.className = `btn ${extraClass}`.trim();
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = `${iconSvg}<span>${label}</span>`;
    box.appendChild(a);
  };

  if (CONTACT.whatsapp) {
    appendLink(
      'Conversar no WhatsApp',
      CONTACT.whatsapp,
      '',
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>`
    );
  }

  if (CONTACT.linkedin) {
    appendLink(
      'Conectar no LinkedIn',
      CONTACT.linkedin,
      'btn-outline',
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
    );
  }

  if (CONTACT.github) {
    appendLink(
      'Explorar GitHub',
      CONTACT.github,
      'btn-outline',
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`
    );
  }
}

function bootstrap() {
  initContactLinks();
  initEngineeringLedger();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
