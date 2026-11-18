/**
 * Componente <offline-diagram>
 * Bancada viva da arquitetura Offline-First (App Expo + SQLite <-> API Express + PostgreSQL).
 */

const INITIAL_RECORDS = [
  { id: 1, name: 'Fundação Bloco B2 · 84%', queued: false },
  { id: 2, name: 'Foto GPS · -4.970, -39.015', queued: false },
  { id: 3, name: 'Alvenaria 2º Pav. · R$ 42,8k', queued: false }
];

const EXTRA_SAMPLES = [
  'Concretagem Laje L3 · 100%',
  'Instalação Hidráulica · 65%',
  'Revestimento Externo · R$ 19,4k',
  'Vistoria Estrutural · Foto GPS'
];

export class OfflineDiagram extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="apparatus-frame">
        <div class="apparatus-bar">
          <span class="apparatus-title">Sincronização Canteiro (SQLite) e Servidor</span>
          <div class="apparatus-actions">
            <button type="button" class="sim-btn" id="addRecBtn">
              <span>+ Registrar medição</span>
            </button>
            <button type="button" class="sim-btn" id="simBtn" aria-pressed="false">
              <span class="sim-dot" aria-hidden="true"></span>
              <span id="simLbl">Simular queda de rede</span>
            </button>
          </div>
        </div>

        <div class="offline-bench" id="offlineBench" aria-live="polite">
          <div class="device-ledger">
            <div class="device-head">
              <strong>App Canteiro · SQLite</strong>
              <span class="device-led" id="deviceLed">ONLINE</span>
            </div>
            <ul class="field-records" id="fieldRecords"></ul>
          </div>

          <div class="sync-bridge">
            <span class="sync-label" id="syncTopLbl">SYNC REST</span>
            <div class="sync-wire" aria-hidden="true"></div>
            <span class="sync-label" id="syncBotLbl">JWT + ZOD</span>
          </div>

          <div class="server-stack">
            <div class="server-node">
              <strong>API Express</strong>
              <p id="apiStateTxt">Recebendo lotes autenticados</p>
            </div>
            <div class="server-node">
              <strong>PostgreSQL</strong>
              <p id="pgStateTxt">3 medições consolidadas</p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initSimulation();
  }

  initSimulation() {
    const bench = this.querySelector('#offlineBench');
    const recordsList = this.querySelector('#fieldRecords');
    const simBtn = this.querySelector('#simBtn');
    const simLbl = this.querySelector('#simLbl');
    const addBtn = this.querySelector('#addRecBtn');
    const deviceLed = this.querySelector('#deviceLed');
    const syncTop = this.querySelector('#syncTopLbl');
    const syncBot = this.querySelector('#syncBotLbl');
    const apiTxt = this.querySelector('#apiStateTxt');
    const pgTxt = this.querySelector('#pgStateTxt');
    if (!bench || !recordsList || !simBtn) return;

    let isOffline = false;
    let sampleIdx = 0;
    let totalSynced = 3;
    let records = INITIAL_RECORDS.map((r) => ({ ...r }));

    const render = () => {
      const queuedCount = records.filter((r) => r.queued).length;
      bench.classList.toggle('is-offline', isOffline);
      simBtn.classList.toggle('off', isOffline);
      simBtn.setAttribute('aria-pressed', String(isOffline));

      if (simLbl) {
        simLbl.textContent = isOffline ? 'Restaurar conexão' : 'Simular queda de rede';
      }
      if (deviceLed) {
        deviceLed.textContent = isOffline ? `OFFLINE · ${queuedCount} NA FILA` : 'ONLINE · SYNC';
      }
      if (syncTop) {
        syncTop.textContent = isOffline ? 'REDE INDISPONÍVEL' : 'SYNC REST';
      }
      if (syncBot) {
        syncBot.textContent = isOffline ? 'GRAVANDO LOCAL' : 'JWT + ZOD';
      }
      if (apiTxt) {
        apiTxt.textContent = isOffline
          ? 'Aguardando reconexão do aparelho'
          : 'Reconciliação automática ativa';
      }
      if (pgTxt) {
        pgTxt.textContent = `${totalSynced} medições consolidadas`;
      }

      recordsList.innerHTML = records
        .slice(-3)
        .map(
          (rec) => `
          <li class="field-rec-row">
            <span>${rec.name}</span>
            <span class="rec-state ${rec.queued ? 'is-queued' : ''}">${
              rec.queued ? 'FILA SQLITE' : 'SINCRONIZADO'
            }</span>
          </li>
        `
        )
        .join('');
    };

    simBtn.addEventListener('click', () => {
      isOffline = !isOffline;
      if (isOffline) {
        const nextName = EXTRA_SAMPLES[sampleIdx % EXTRA_SAMPLES.length];
        sampleIdx++;
        records.push({ id: Date.now(), name: nextName, queued: true });
      } else {
        const flushed = records.filter((r) => r.queued).length;
        records = records.map((r) => ({ ...r, queued: false }));
        totalSynced += flushed;
      }
      render();
    });

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const nextName = EXTRA_SAMPLES[sampleIdx % EXTRA_SAMPLES.length];
        sampleIdx++;
        if (isOffline) {
          records.push({ id: Date.now(), name: nextName, queued: true });
        } else {
          records.push({ id: Date.now(), name: nextName, queued: false });
          totalSynced += 1;
        }
        render();
      });
    }

    render();
  }
}

if (!customElements.get('offline-diagram')) {
  customElements.define('offline-diagram', OfflineDiagram);
}
