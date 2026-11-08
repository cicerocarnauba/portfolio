/**
 * Componente <git-graph>
 * Renderiza o grafo de commits reais em HTML5 Canvas com suporte a filtro de branches,
 * partículas de fluxo, tooltip interativa e lista acessível para leitores de tela.
 */

import { GIT_GRAPH_BRANCHES } from '../data/portfolio-data.js';
import { prefersReducedMotion } from '../effects/animations.js';

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function formatDate(isoDate) {
  const parts = isoDate.split('-');
  return `${Number(parts[2])} ${MONTHS[Number(parts[1]) - 1]} ${parts[0]}`;
}

function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
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
        `<button type="button" class="bf-btn" data-branch="${b.name}" style="--c:var(--${b.c})"><i></i>${b.filterLabel}</button>`
    ).join('');

    this.innerHTML = `
      <div class="graph-wrap">
        <div class="graph-bar">
          <div class="graph-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--b1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="18" cy="18" r="3"/>
              <circle cx="6" cy="6" r="3"/>
              <path d="M6 21V9a9 9 0 0 0 9 9"/>
            </svg>
            <span><strong>git log --graph</strong> · histórico real de commits</span>
          </div>
          <div class="branch-filters" id="bfilters" role="group" aria-label="Filtrar ramos no grafo">
            <button type="button" class="bf-btn on" data-branch="all">todos</button>
            ${filterButtons}
          </div>
        </div>
        <figure class="graph" id="graph">
          <canvas id="cv" role="img" aria-label="Grafo de commits: três ramos, um por projeto, partindo da linha principal em ordem cronológica, de dezembro de 2025 a outubro de 2026."></canvas>
          <div class="tip" id="tip" hidden>
            <div class="tip-head"><b></b><small></small></div>
            <p></p>
          </div>
          <ol class="sr" id="srlist"></ol>
        </figure>
        <div class="graph-foot">
          <span>Cada ponto é um commit meu de verdade. Passe o mouse ou toque para inspecionar o hash e a mensagem.</span>
          <span class="mono">3 branches · 20 marcos selecionados</span>
        </div>
      </div>
    `;

    this.initGraph();
  }

  initGraph() {
    const box = this.querySelector('#graph');
    const cv = this.querySelector('#cv');
    const tip = this.querySelector('#tip');
    const sr = this.querySelector('#srlist');
    if (!box || !cv || !tip || !sr) return;

    const ctx = cv.getContext('2d');
    const reduce = prefersReducedMotion();
    const root = document.documentElement;

    let W = 0;
    let H = 0;
    let pts = [];
    let paths = [];
    let hover = null;
    let activeBranch = 'all';
    let frameN = 0;
    let cols = {};
    let visible = true;
    let running = false;
    let T0 = performance.now();

    this.replayGraph = () => {
      T0 = performance.now();
      layout();
      start();
    };

    // Popula lista acessível para leitores de tela
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
        bg: getVar('--bg'),
        fg: getVar('--fg'),
        muted: getVar('--muted'),
        line: getVar('--line-strong'),
        b1: getVar('--b1'),
        b2: getVar('--b2'),
        b3: getVar('--b3'),
        mono: getVar('--f-mono')
      };
    };

    const pointAtPath = (P, u) => {
      const d = u * P.total;
      let i = 1;
      while (i < P.cum.length - 1 && P.cum[i] < d) i++;
      const k = (d - P.cum[i - 1]) / Math.max(0.0001, P.cum[i] - P.cum[i - 1]);
      return [
        P.poly[i - 1][0] + (P.poly[i][0] - P.poly[i - 1][0]) * k,
        P.poly[i - 1][1] + (P.poly[i][1] - P.poly[i - 1][1]) * k
      ];
    };

    const drawGlow = (x, y, col, r) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      g.addColorStop(0, col);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, 7);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 7);
      ctx.fill();
    };

    const draw = (t) => {
      frameN++;
      if (frameN % 40 === 1 || !cols.bg) readCols();

      ctx.clearRect(0, 0, W, H);
      const p = reduce ? 1 : easeOutCubic(clamp((t - 0.1) / 1.35, 0, 1));
      const ty = H * 0.5;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, Math.max(0, p * W), H);
      ctx.clip();

      ctx.lineWidth = 2;
      ctx.strokeStyle = cols.line;
      ctx.beginPath();
      ctx.moveTo(0, ty);
      ctx.lineTo(W, ty);
      ctx.stroke();

      ctx.font = `500 11px ${cols.mono}`;
      ctx.fillStyle = cols.muted;
      ctx.textAlign = 'left';
      ctx.fillText('main', paths.length ? paths[0].pad : 10, ty - 10);

      paths.forEach((P) => {
        const dimmed = activeBranch !== 'all' && activeBranch !== P.L.name;
        ctx.globalAlpha = dimmed ? 0.22 : 1;
        const col = cols[P.L.c];

        ctx.strokeStyle = col;
        ctx.lineWidth = dimmed ? 1.8 : 2.5;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        P.poly.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
        ctx.stroke();

        ctx.fillStyle = col;
        [P.xs, P.xe].forEach((x) => {
          ctx.beginPath();
          ctx.arc(x, ty, 4, 0, 7);
          ctx.fill();
        });

        const above = P.L.off < 0;
        const lx = P.xs + P.bi;
        ctx.textAlign = 'left';
        ctx.font = `600 12px ${cols.mono}`;
        ctx.fillStyle = cols.fg;
        ctx.fillText(
          P.compact ? P.L.short : P.L.name,
          lx,
          above ? P.ly - (P.compact ? 14 : 28) : P.ly + (P.compact ? 24 : 32)
        );

        if (!P.compact) {
          ctx.font = `400 11px ${cols.mono}`;
          ctx.fillStyle = cols.muted;
          ctx.fillText(P.L.range, lx, above ? P.ly - 13 : P.ly + 47);
        }
      });

      pts.forEach((q) => {
        const dimmed = activeBranch !== 'all' && activeBranch !== q.L.name;
        ctx.globalAlpha = dimmed ? 0.22 : 1;
        const isHovered = hover === q;
        const col = cols[q.L.c];

        ctx.beginPath();
        ctx.arc(q.x, q.y, isHovered ? 7.2 : 5, 0, 7);
        ctx.fillStyle = cols.bg;
        ctx.fill();
        ctx.lineWidth = isHovered ? 3 : 2.2;
        ctx.strokeStyle = col;
        ctx.stroke();

        if (isHovered) {
          ctx.beginPath();
          ctx.arc(q.x, q.y, 14, 0, 7);
          ctx.globalAlpha = 0.32;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
      ctx.restore();

      if (p < 1) {
        drawGlow(p * W, ty, cols.fg, 3);
      }

      if (!reduce && p >= 1) {
        paths.forEach((P) => {
          if (activeBranch !== 'all' && activeBranch !== P.L.name) return;
          [0, 0.5].forEach((offset) => {
            const q = pointAtPath(P, (t * 0.07 + offset + P.seed) % 1);
            drawGlow(q[0], q[1], cols[P.L.c], 2.4);
          });
        });
        drawGlow(((t * 0.045) % 1) * W, ty, cols.muted, 2);
      }
    };

    const layout = () => {
      const W_raw = box.offsetWidth || this.offsetWidth || 1100;
      const H_raw = box.offsetHeight || 290;
      W = W_raw;
      H = H_raw;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const compact = W < 620;
      const pad = compact ? 12 : 26;
      const gap = W * 0.035;
      const fractions = [0.3, 0.3, 0.4];
      const usable = W - 2 * pad - gap * 2;
      const ty = H * 0.5;
      let x = pad;

      pts = [];
      paths = [];

      GIT_GRAPH_BRANCHES.forEach((L, li) => {
        const sw = usable * fractions[li];
        const xs = x;
        const xe = x + sw;
        x = xe + gap;

        const bi = Math.min(64, sw * 0.2);
        const ly = ty + L.off * H;
        const lo = xs + bi + 10;
        const hi = xe - bi - 10;
        const nodes = compact
          ? L.nodes.filter((_, idx) => idx % 2 === 0 || idx === L.nodes.length - 1)
          : L.nodes;
        const timestamps = nodes.map((n) => Date.parse(n.d));
        const a = timestamps[0];
        const b = timestamps[timestamps.length - 1];

        nodes.forEach((n, i) => {
          const lin = b > a ? (timestamps[i] - a) / (b - a) : i / Math.max(1, nodes.length - 1);
          const idx = nodes.length > 1 ? i / (nodes.length - 1) : 0.5;
          const k = 0.5 * lin + 0.5 * idx;
          pts.push({ x: lo + k * (hi - lo), y: ly, L, n });
        });

        const poly = sampleCurve(xs, ty, xs + bi, ly).concat(sampleCurve(xe - bi, ly, xe, ty));
        const cum = [0];
        let tot = 0;
        for (let i = 1; i < poly.length; i++) {
          tot += Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]);
          cum.push(tot);
        }

        paths.push({
          L,
          poly,
          cum,
          total: tot,
          xs,
          xe,
          bi,
          ly,
          seed: li * 0.31,
          compact,
          pad
        });
      });

      if (!running) {
        draw(reduce ? 10 : (performance.now() - T0) / 1000);
      }
    };

    const loop = (now) => {
      draw((now - T0) / 1000);
      if (visible && !reduce) {
        requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      requestAnimationFrame(loop);
    };

    const pickNode = (e) => {
      const r = cv.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      let best = null;
      let bestDist = 22;
      pts.forEach((q) => {
        const d = Math.hypot(q.x - mx, q.y - my);
        if (d < bestDist) {
          bestDist = d;
          best = q;
        }
      });
      return best;
    };

    const setHover = (q) => {
      if (q === hover) return;
      hover = q;
      cv.style.cursor = q ? 'pointer' : 'default';

      if (q) {
        tip.style.setProperty('--c', cols[q.L.c]);
        tip.querySelector('b').textContent = q.L.name;
        tip.querySelector('small').textContent = `${q.n.h} · ${formatDate(q.n.d)}`;
        tip.querySelector('p').textContent = q.n.m;
        tip.hidden = false;

        const tw = tip.offsetWidth;
        const th = tip.offsetHeight;
        const left = clamp(q.x + 14, 8, W - tw - 8);
        let topPos = q.y - th - 18;
        if (topPos < 4) topPos = q.y + 18;

        tip.style.left = `${left}px`;
        tip.style.top = `${topPos}px`;
      } else {
        tip.hidden = true;
      }

      if (!running) {
        draw(reduce ? 10 : (performance.now() - T0) / 1000);
      }
    };

    // Botões de filtro por branch
    const filterBtns = Array.from(this.querySelectorAll('#bfilters .bf-btn'));
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeBranch = btn.getAttribute('data-branch') || 'all';
        filterBtns.forEach((b) => b.classList.toggle('on', b === btn));
        if (!running) {
          draw(reduce ? 10 : (performance.now() - T0) / 1000);
        }
      });
    });

    cv.addEventListener('pointermove', (e) => setHover(pickNode(e)));
    cv.addEventListener('pointerdown', (e) => setHover(pickNode(e)));
    cv.addEventListener('pointerleave', () => setHover(null));

    if ('ResizeObserver' in window) {
      new ResizeObserver(layout).observe(box);
    } else {
      window.addEventListener('resize', layout);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible) start();
        },
        { threshold: 0 }
      ).observe(box);
    }

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
      readCols();
      if (!running) draw(reduce ? 10 : (performance.now() - T0) / 1000);
    });

    new MutationObserver(() => {
      readCols();
      if (!running) draw(reduce ? 10 : (performance.now() - T0) / 1000);
    }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!running) draw(reduce ? 10 : (performance.now() - T0) / 1000);
      });
    }

    readCols();
    layout();
    start();
  }
}

customElements.define('git-graph', GitGraph);

