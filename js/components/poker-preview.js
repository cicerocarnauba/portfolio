/**
 * Componente <poker-preview>
 * Simula a interface em tempo real do Planning Poker Scrum com votação interativa.
 */

export class PokerPreview extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="feat-vis tilt">
        <div class="poker-board" role="region" aria-label="Prévia interativa do Planning Poker Scrum">
          <div class="p-bar" aria-hidden="true">
            <span class="p-room-tag mono">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              SALA #SPRINT-28 · SOCKET.IO
            </span>
            <span class="p-timer-pill mono" id="pTimer">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              01:45
            </span>
          </div>

          <div class="p-screen">
            <div class="p-story">
              <span class="p-story-label mono">História em Estimativa · Prioridade Must</span>
              <h4>Sincronização de Votação em Tempo Real via WebSockets</h4>
            </div>

            <div class="p-consensus-bar" id="pConsensus" aria-live="polite">
              <span class="p-consensus-pill mono">✓ Consenso da equipe: 8 Story Points</span>
            </div>

            <div class="p-players" role="group" aria-label="Cartas dos votantes na sala">
              <div class="p-player-card">
                <span class="p-card-val mono">8</span>
                <span class="p-player-name">PO (Júlio)</span>
              </div>
              <div class="p-player-card">
                <span class="p-card-val mono">8</span>
                <span class="p-player-name">QA (Pablo)</span>
              </div>
              <div class="p-player-card">
                <span class="p-card-val mono">8</span>
                <span class="p-player-name">Dev (Rodrigo)</span>
              </div>
              <div class="p-player-card is-you">
                <span class="p-card-val mono" id="yourCard">8</span>
                <span class="p-player-name"><strong>Você (Higor)</strong></span>
              </div>
            </div>

            <div class="p-deck-wrap">
              <span class="p-deck-label mono">Seu baralho Fibonacci (clique para votar):</span>
              <div class="p-deck" id="pDeck" role="radiogroup" aria-label="Cartas de Fibonacci">
                <button type="button" class="p-deck-card" data-val="1" role="radio" aria-checked="false">1</button>
                <button type="button" class="p-deck-card" data-val="2" role="radio" aria-checked="false">2</button>
                <button type="button" class="p-deck-card" data-val="3" role="radio" aria-checked="false">3</button>
                <button type="button" class="p-deck-card" data-val="5" role="radio" aria-checked="false">5</button>
                <button type="button" class="p-deck-card is-selected" data-val="8" role="radio" aria-checked="true">8</button>
                <button type="button" class="p-deck-card" data-val="13" role="radio" aria-checked="false">13</button>
                <button type="button" class="p-deck-card" data-val="21" role="radio" aria-checked="false">21</button>
                <button type="button" class="p-deck-card" data-val="☕" role="radio" aria-checked="false">☕</button>
              </div>
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
    const consensusPill = this.querySelector('#pConsensus');
    if (!deck || !yourCard || !consensusPill) return;

    deck.querySelectorAll('.p-deck-card').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        deck.querySelectorAll('.p-deck-card').forEach((b) => {
          b.classList.toggle('is-selected', b === btn);
          b.setAttribute('aria-checked', b === btn ? 'true' : 'false');
        });

        yourCard.textContent = val;
        yourCard.style.animation = 'none';
        void yourCard.offsetWidth;
        yourCard.style.animation = 'card-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';

        if (val === '8') {
          consensusPill.innerHTML = `
            <span class="p-consensus-pill is-consensus mono">✓ Consenso da equipe: 8 Story Points (Fibonacci)</span>
          `;
        } else if (val === '☕') {
          consensusPill.innerHTML = `
            <span class="p-consensus-pill is-coffee mono">☕ Pausa para café sugerida pelo time</span>
          `;
        } else {
          consensusPill.innerHTML = `
            <span class="p-consensus-pill is-diff mono">⚡ Divergência: Seu voto foi ${val} SP (Restante da equipe: 8 SP)</span>
          `;
        }
      });
    });
  }
}

if (!customElements.get('poker-preview')) {
  customElements.define('poker-preview', PokerPreview);
}
