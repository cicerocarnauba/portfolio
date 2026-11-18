/**
 * Componente <git-graph>
 * Renderiza o grafo de commits reais em HTML5 Canvas com filtro por branch,
 * inspetor persistente de commit selecionado, navegação por botões/teclado e lista acessível.
 */

import { GIT_GRAPH_BRANCHES } from '../data/portfolio-data.js?v=13';

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function formatDate(isoDate) {
  const parts = isoDate.split('-');
  return `${Number(parts[2])} ${MONTHS[Number(parts[1]) - 1]} ${parts[0]}`;
}

function sampleCurve(x0, y0, x1, y1) {
  const out = [];
  for (let i = 0; i <= 28; i++) {
    const u = i / 28;
    const e = u * u * (3 - 2 * u);
    out.push([x0 + (x1 - x0) * u, y0 + (y1 - y0) * e]);
  }
  return out;
}

export class GitGraph extends HTMLElement {
  connectedCallback() {
    const filterButtons = GIT_GRAPH_BRANCHES.map(
      (b) =>
        `<button type="button" class="bf-btn" data-branch="${b.name}" style="--c:var(--${b.c})"><i aria-hidden="true"></i><span>${b.filterLabel}</span></button>`
    ).join('');

    this.innerHTML = `
      <div class="graph-wrap">
        <div class="graph-bar">
          <div class="graph-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--b1)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="18" cy="18" r="3"/>
              <circle cx="6" cy="6" r="3"/>
              <path d="M6 21V9a9 9 0 0 0 9 9"/>
            </svg>
            <span><strong>git log --graph</strong> · 20 marcos reais em 3 branches</span>
          </div>
          <div class="branch-filters" id="bfilters" role="group" aria-label="Filtrar ramos no grafo">
            <button type="button" class="bf-btn on" data-branch="all">todos</button>
            ${filterButtons}
          </div>
        </div>

        <figure class="graph" id="graph">
          <canvas id="cv" tabindex="0" role="img" aria-label="Grafo de commits: três ramos partindo da branch principal em ordem cronológica entre janeiro e outubro de 2026. Use as setas ou os botões abaixo para navegar entre commits."></canvas>
          <ol class="sr" id="srlist"></ol>
        </figure>

        <div class="commit-inspector" id="commitInspector" aria-live="polite">
          <div class="ci-body">
            <div class="ci-meta">
              <span class="ci-branch" id="ciBranch"></span>
              <span class="ci-hash" id="ciHash"></span>
            </div>
            <p class="ci-msg" id="ciMsg"></p>
          </div>
          <div class="ci-nav">
            <button type="button" class="ci-btn" id="ciPrev" aria-label="Commit anterior">Anterior</button>
            <button type="button" class="ci-btn" id="ciNext" aria-label="Próximo commit">Próximo</button>
          </div>
        </div>
      </div>
    `;

    this.initGraph();
  }

  initGraph() {
    const box = this.querySelector('#graph');
    const cv = this.querySelector('#cv');
    const sr = this.querySelector('#srlist');
    const ciBranch = this.querySelector('#ciBranch');
    const ciHash = this.querySelector('#ciHash');
    const ciMsg = this.querySelector('#ciMsg');
    const ciPrev = this.querySelector('#ciPrev');
    const ciNext = this.querySelector('#ciNext');
    if (!box || !cv || !sr) return;

    const ctx = cv.getContext('2d');
    const root = document.documentElement;

    let W = 0;
    let H = 0;
    let pts = [];
    let paths = [];
    let selectedIdx = -1;
    let activeBranch = 'all';
    let cols = {};

    GIT_GRAPH_BRANCHES.forEach((branch) => {
      branch.nodes.forEach((node) => {
        const li = document.createElement('li');
        li.textContent = `${branch.name}, ${formatDate(node.d)}, ${node.h}: ${node.m}`;
        sr.appendChild(li);
      });
    });

    const readCols = () => {
      const cs = getComputedStyle(root);
      const getVar = (name) => cs.getPropertyValue(name).trim();
      cols = {
        bg: getVar('--surface') || '#FAFBF7',
        fg: getVar('--fg') || '#0F1E16',
        muted: getVar('--muted') || '#354A3E',
        line: getVar('--rule-soft') || '#BDC8BE',
        b1: getVar('--b1') || '#1C6E46',
        b2: getVar('--b2') || '#9A5812',
        b3: getVar('--b3') || '#146657',
        mono: getVar('--f-mono') || 'monospace'
      };
    };

    const syncInspector = () => {
      if (!pts.length) return;
      if (selectedIdx < 0 || selectedIdx >= pts.length) {
        // Default to unit-test commit 28d5729 or last commit
        const preferred = pts.findIndex((p) => p.n.h === '28d5729');
        selectedIdx = preferred >= 0 ? preferred : pts.length - 1;
      }
      const q = pts[selectedIdx];
      if (!q) return;
      if (ciBranch) {
        ciBranch.textContent = q.L.name;
        ciBranch.style.color = cols[q.L.c] || 'var(--b1)';
      }
      if (ciHash) ciHash.textContent = `${q.n.h} · ${formatDate(q.n.d)}`;
      if (ciMsg) ciMsg.textContent = q.n.m;
    };

    const draw = () => {
      if (!W || !H) return;
      readCols();
      syncInspector();
      ctx.clearRect(0, 0, W, H);

      const ty = H * 0.5;

      ctx.lineWidth = 1.8;
      ctx.strokeStyle = cols.line;
      ctx.beginPath();
      ctx.moveTo(0, ty);
      ctx.lineTo(W, ty);
      ctx.stroke();

      ctx.font = `600 11px ${cols.mono}`;
      ctx.fillStyle = cols.muted;
      ctx.textAlign = 'left';
      ctx.fillText('main', 12, ty - 10);

      paths.forEach((P) => {
        const dimmed = activeBranch !== 'all' && activeBranch !== P.L.name;
        ctx.globalAlpha = dimmed ? 0.2 : 1;
        const col = cols[P.L.c];

        ctx.strokeStyle = col;
        ctx.lineWidth = dimmed ? 1.6 : 2.4;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        P.poly.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
        ctx.stroke();

        ctx.fillStyle = col;
        [P.xs, P.xe].forEach((x) => {
          ctx.beginPath();
          ctx.arc(x, ty, 3.6, 0, Math.PI * 2);
          ctx.fill();
        });

        const above = P.L.off < 0;
        const lx = P.xs + P.bi * 0.5;
        ctx.textAlign = 'left';
        ctx.font = `600 ${P.compact ? 11 : 12}px ${cols.mono}`;
        ctx.fillStyle = cols.fg;
        ctx.fillText(
          P.compact ? P.L.short : P.L.name,
          lx,
          above ? P.ly - (P.compact ? 14 : 26) : P.ly + (P.compact ? 22 : 30)
        );

        if (!P.compact) {
          ctx.font = `400 11px ${cols.mono}`;
          ctx.fillStyle = cols.muted;
          ctx.fillText(P.L.range, lx, above ? P.ly - 11 : P.ly + 45);
        }
      });

      pts.forEach((q, idx) => {
        const dimmed = activeBranch !== 'all' && activeBranch !== q.L.name;
        ctx.globalAlpha = dimmed ? 0.2 : 1;
        const isSelected = idx === selectedIdx;
        const col = cols[q.L.c];

        if (isSelected) {
          ctx.beginPath();
          ctx.arc(q.x, q.y, 10, 0, Math.PI * 2);
          ctx.strokeStyle = col;
          ctx.lineWidth = 1.4;
          ctx.globalAlpha = 0.45;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        ctx.beginPath();
        ctx.arc(q.x, q.y, isSelected ? 6.2 : 4.6, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? col : cols.bg;
        ctx.fill();
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = col;
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
    };

    const layout = () => {
      W = box.offsetWidth || this.offsetWidth || 1100;
      H = box.offsetHeight || 280;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const compact = W < 680;
      // Start after 'main' label (50px left margin) so branch 0 never crosses 'main'
      const leftStart = compact ? 48 : 68;
      const rightPad = compact ? 14 : 28;
      const gap = compact ? 12 : W * 0.032;
      const fractions = [0.31, 0.33, 0.36];
      const usable = Math.max(180, W - leftStart - rightPad - gap * 2);
      const ty = H * 0.5;
      let x = leftStart;

      const prevHash = pts[selectedIdx]?.n?.h;
      pts = [];
      paths = [];

      GIT_GRAPH_BRANCHES.forEach((L, li) => {
        const sw = usable * fractions[li];
        const xs = x;
        const xe = x + sw;
        x = xe + gap;

        const bi = compact ? Math.min(18, sw * 0.16) : Math.min(54, sw * 0.19);
        const ly = ty + L.off * (compact ? H * 1.12 : H);
        const lo = xs + bi + (compact ? 6 : 10);
        const hi = Math.max(lo + 16, xe - bi - (compact ? 6 : 10));

        // Evenly spaced nodes on mobile so circles never touch or overlap
        const nodes = compact
          ? [L.nodes[0], L.nodes[Math.floor(L.nodes.length / 2)], L.nodes[L.nodes.length - 1]]
          : L.nodes;

        nodes.forEach((n, i) => {
          const k = nodes.length > 1 ? i / (nodes.length - 1) : 0.5;
          pts.push({ x: lo + k * (hi - lo), y: ly, L, n });
        });

        const poly = sampleCurve(xs, ty, xs + bi, ly).concat(sampleCurve(xe - bi, ly, xe, ty));
        paths.push({ L, poly, xs, xe, bi, ly, compact });
      });

      if (prevHash) {
        const found = pts.findIndex((p) => p.n.h === prevHash);
        selectedIdx = found >= 0 ? found : -1;
      }

      draw();
    };

    const stepSelection = (dir) => {
      const candidates = pts
        .map((p, idx) => ({ p, idx }))
        .filter((item) => activeBranch === 'all' || item.p.L.name === activeBranch);
      if (!candidates.length) return;

      const curPos = candidates.findIndex((c) => c.idx === selectedIdx);
      const nextPos =
        curPos < 0 ? 0 : (curPos + dir + candidates.length) % candidates.length;
      selectedIdx = candidates[nextPos].idx;
      draw();
    };

    const pickNode = (e) => {
      const r = cv.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      let bestIdx = -1;
      let bestDist = 24;
      pts.forEach((q, idx) => {
        if (activeBranch !== 'all' && q.L.name !== activeBranch) return;
        const d = Math.hypot(q.x - mx, q.y - my);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = idx;
        }
      });
      return bestIdx;
    };

    cv.addEventListener('pointermove', (e) => {
      const idx = pickNode(e);
      cv.style.cursor = idx >= 0 ? 'pointer' : 'default';
      if (idx >= 0 && idx !== selectedIdx) {
        selectedIdx = idx;
        draw();
      }
    });

    cv.addEventListener('pointerdown', (e) => {
      const idx = pickNode(e);
      if (idx >= 0) {
        selectedIdx = idx;
        draw();
      }
    });

    cv.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        stepSelection(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        stepSelection(-1);
      }
    });

    if (ciPrev) ciPrev.addEventListener('click', () => stepSelection(-1));
    if (ciNext) ciNext.addEventListener('click', () => stepSelection(1));

    const filterBtns = Array.from(this.querySelectorAll('#bfilters .bf-btn'));
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeBranch = btn.getAttribute('data-branch') || 'all';
        filterBtns.forEach((b) => b.classList.toggle('on', b === btn));
        if (activeBranch !== 'all' && pts[selectedIdx]?.L.name !== activeBranch) {
          selectedIdx = pts.findIndex((p) => p.L.name === activeBranch);
        }
        draw();
      });
    });

    if ('ResizeObserver' in window) {
      new ResizeObserver(layout).observe(box);
    } else {
      window.addEventListener('resize', layout);
    }

    new MutationObserver(draw).observe(root, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(draw);
    }

    layout();
  }
}

if (!customElements.get('git-graph')) {
  customElements.define('git-graph', GitGraph);
}
