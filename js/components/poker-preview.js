/**
 * Componente <poker-preview>
 * Mesa interativa do sistema Planning Poker Scrum com votação Fibonacci e cálculo de consenso.
 */

const CHECK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
const DIFF_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
const COFFEE_SVG = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/></svg>`;

export class PokerPreview extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="poker-board" role="region" aria-label="Mesa interativa do Planning Poker Scrum">
        <div class="p-bar">
          <span class="p-room-tag mono">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>
            <span>SALA #SPRINT-28 · SOCKET.IO</span>
          </span>
          <span class="p-timer-pill mono">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>01:45</span>
          </span>
        </div>

        <div class="p-screen">
          <div class="p-story">
            <h4>Sincronização de Votação via WebSockets</h4>
            <span class="p-story-meta">Fibonacci · Tempo Real</span>
          </div>

          <div class="p-consensus-bar" id="pConsensus" aria-live="polite">
            ${CHECK_SVG}
            <span>Consenso da equipe: 8 Story Points</span>
          </div>

          <div class="p-players" role="group" aria-label="Votos revelados na rodada">
            <div class="p-player-slot">
              <span class="p-card-val mono">8</span>
              <span class="p-player-name">P.O Emilly</span>
            </div>
            <div class="p-player-slot">
              <span class="p-card-val mono">8</span>
              <span class="p-player-name">QA Kawan</span>
            </div>
            <div class="p-player-slot">
              <span class="p-card-val mono">8</span>
              <span class="p-player-name">Dev Layssa</span>
            </div>
            <div class="p-player-slot is-you">
              <span class="p-card-val mono" id="yourCard">8</span>
              <span class="p-player-name"><strong>Você (Higor)</strong></span>
            </div>
          </div>

          <div class="p-deck-wrap">
            <span class="p-deck-label">Escolha uma carta Fibonacci para testar o cálculo de consenso:</span>
            <div class="p-deck" id="pDeck" role="radiogroup" aria-label="Baralho Fibonacci">
              <button type="button" class="p-deck-card" data-val="1" role="radio" aria-checked="false">1</button>
              <button type="button" class="p-deck-card" data-val="2" role="radio" aria-checked="false">2</button>
              <button type="button" class="p-deck-card" data-val="3" role="radio" aria-checked="false">3</button>
              <button type="button" class="p-deck-card" data-val="5" role="radio" aria-checked="false">5</button>
              <button type="button" class="p-deck-card is-selected" data-val="8" role="radio" aria-checked="true">8</button>
              <button type="button" class="p-deck-card" data-val="13" role="radio" aria-checked="false">13</button>
              <button type="button" class="p-deck-card" data-val="21" role="radio" aria-checked="false">21</button>
              <button type="button" class="p-deck-card" data-val="pausa" role="radio" aria-checked="false" aria-label="Sugerir pausa">
                ${COFFEE_SVG}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initInteractiveDeck();
  }

  initInteractiveDeck() {
    const deck = this.querySelector('#pDeck');
    const yourCard = this.querySelector('#yourCard');
    const consensusBar = this.querySelector('#pConsensus');
    if (!deck || !yourCard || !consensusBar) return;

    deck.querySelectorAll('.p-deck-card').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val') || '8';
        deck.querySelectorAll('.p-deck-card').forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-selected', active);
          b.setAttribute('aria-checked', String(active));
        });

        if (val === 'pausa') {
          yourCard.innerHTML = COFFEE_SVG;
          consensusBar.classList.add('is-diff');
          consensusBar.innerHTML = `${COFFEE_SVG}<span>Pausa técnica solicitada na rodada</span>`;
        } else if (val === '8') {
          yourCard.textContent = '8';
          consensusBar.classList.remove('is-diff');
          consensusBar.innerHTML = `${CHECK_SVG}<span>Consenso da equipe: 8 Story Points</span>`;
        } else {
          const avg = ((8 + 8 + 8 + Number(val)) / 4).toFixed(1);
          yourCard.textContent = val;
          consensusBar.classList.add('is-diff');
          consensusBar.innerHTML = `${DIFF_SVG}<span>Divergência: seu voto ${val} SP · média ${avg} SP</span>`;
        }
      });
    });
  }
}

if (!customElements.get('poker-preview')) {
  customElements.define('poker-preview', PokerPreview);
}
