/**
 * Componente <offline-diagram>
 * Diagrama interativo da arquitetura Offline-First (App Expo + SQLite <-> API Express + PostgreSQL).
 */

import { prefersReducedMotion } from '../effects/animations.js';

export class OfflineDiagram extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="feat-vis tilt">
        <div class="vis-bar">
          <span>fluxo de sincronização</span>
          <button type="button" class="sim-btn" id="simBtn" aria-label="Alternar simulação de rede online ou offline">
            <span class="sim-dot"></span>
            <span id="simLbl">Online · Sincronizando</span>
          </button>
        </div>
        <svg class="dia" id="dia" viewBox="0 0 440 260" role="img" aria-label="Diagrama: o aplicativo grava no SQLite do aparelho e sincroniza com a API Express e o PostgreSQL quando há conexão.">
          <rect class="fl" x="20" y="34" width="108" height="170" rx="18"/>
          <rect class="bar" x="36" y="60" width="74" height="10" rx="4"/>
          <rect class="bar" x="36" y="82" width="54" height="10" rx="4" opacity=".6"/>
          <rect class="bar" x="36" y="104" width="66" height="10" rx="4" opacity=".6"/>
          <rect class="st" x="36" y="134" width="76" height="46" rx="8"/>
          <text class="t" x="74" y="161" text-anchor="middle">SQLite</text>
          <text class="t" x="74" y="228" text-anchor="middle">App Expo</text>
          <text x="74" y="246" text-anchor="middle">armazenamento local</text>
          <circle class="led" cx="110" cy="48" r="4.5"/>
          <path class="link" d="M134 119 C 190 119, 210 119, 290 119"/>
          <text id="netTxt" x="212" y="98" text-anchor="middle">com rede: sincroniza</text>
          <rect class="fl" x="296" y="52" width="124" height="54" rx="10"/>
          <text class="t" x="358" y="75" text-anchor="middle">API Express</text>
          <text x="358" y="93" text-anchor="middle">Auth JWT + REST</text>
          <path class="fl" d="M300 146 v48 a58 14 0 0 0 116 0 v-48"/>
          <ellipse class="fl" cx="358" cy="146" rx="58" ry="14"/>
          <text class="t" x="358" y="176" text-anchor="middle">PostgreSQL</text>
        </svg>
      </div>
    `;

    this.initSimulation();
  }

  initSimulation() {
    const dia = this.querySelector('#dia');
    const txt = this.querySelector('#netTxt');
    const btn = this.querySelector('#simBtn');
    const lbl = this.querySelector('#simLbl');
    if (!dia || !txt) return;

    let isOffline = false;
    let holdUntil = 0;

    const renderState = () => {
      dia.classList.toggle('off', isOffline);
      txt.textContent = isOffline ? 'sem rede: grava no SQLite' : 'com rede: sincroniza';
      if (btn) btn.classList.toggle('off', isOffline);
      if (lbl) lbl.textContent = isOffline ? 'Offline · Fila local' : 'Online · Sincronizando';
    };

    if (btn) {
      btn.addEventListener('click', () => {
        isOffline = !isOffline;
        holdUntil = Date.now() + 8000;
        renderState();
      });
    }

    if (!prefersReducedMotion()) {
      setInterval(() => {
        if (Date.now() < holdUntil) return;
        isOffline = !isOffline;
        renderState();
      }, 3400);
    }
  }
}

customElements.define('offline-diagram', OfflineDiagram);

