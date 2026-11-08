/**
 * Módulo de Animações, Motor Espacial 3D (Z-Axis Dive-In) e Microinterações.
 * Gerencia a navegação por camadas de profundidade sem rolagem vertical,
 * o inspetor interativo de Pilares de Engenharia e o deck de projetos.
 */

import { TYPED_ROLES, NAV_SECTIONS, ENGINEERING_PILLARS } from '../data/portfolio-data.js';

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  window.matchMedia('(pointer: fine)').matches;

/**
 * Divide o título principal em letras individuais para a animação de subida.
 */
export function initHeroNameSplit(selector = '#name') {
  const el = document.querySelector(selector);
  if (!el) return;

  const txt = el.textContent.trim();
  let charIndex = 0;

  el.setAttribute('aria-label', txt);
  el.textContent = '';

  const words = txt.split(' ');
  words.forEach((word, wi) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'w';
    wordSpan.setAttribute('aria-hidden', 'true');

    word.split('').forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'ch';
      charSpan.style.setProperty('--i', charIndex++);
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    });

    el.appendChild(wordSpan);
    if (wi < words.length - 1) {
      el.appendChild(document.createTextNode(' '));
    }
  });
}

/**
 * Efeito de digitação alternando as frentes de Engenharia de Software no Hero.
 */
export function initTypedRole(selector = '#typed') {
  if (prefersReducedMotion()) return;
  const el = document.querySelector(selector);
  if (!el || !TYPED_ROLES.length) return;

  let roleIndex = 0;
  let charCount = TYPED_ROLES[0].length;
  let isDeleting = true;

  function tick() {
    const currentPhrase = TYPED_ROLES[roleIndex];
    if (isDeleting) {
      charCount--;
      el.textContent = currentPhrase.slice(0, charCount);
      if (charCount <= 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % TYPED_ROLES.length;
        setTimeout(tick, 260);
        return;
      }
      setTimeout(tick, 26);
    } else {
      charCount++;
      el.textContent = currentPhrase.slice(0, charCount);
      if (charCount >= currentPhrase.length) {
        isDeleting = true;
        setTimeout(tick, 1700);
        return;
      }
      setTimeout(tick, 58);
    }
  }

  setTimeout(tick, 2400);
}

/**
 * Anima contadores numéricos dentro de um container específico.
 */
export function runCountersInContainer(container) {
  if (!container) return;
  const counters = container.querySelectorAll('[data-count]');
  counters.forEach((el) => {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    const targetValue = Number(el.getAttribute('data-count'));
    if (prefersReducedMotion()) {
      el.textContent = String(targetValue);
      return;
    }

    const startTime = performance.now();
    function step(now) {
      const progress = Math.min(1, (now - startTime) / 950);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(targetValue * eased));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  });
}

/**
 * Inspetor Interativo dos 4 Pilares de Engenharia de Software (Camada 01 · #sobre).
 */
export function initEngineeringInspector() {
  const tabsContainer = document.querySelector('#pillarTabs');
  const detailContainer = document.querySelector('#pillarDetail');
  if (!tabsContainer || !detailContainer) return null;

  const getPillarIcon = (id) => {
    switch (id) {
      case 'desenvolvimento':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
      case 'arquitetura':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
      case 'qualidade':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;
      case 'gestao':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>`;
      default:
        return '';
    }
  };

  // Renderiza os botões de seleção dos 4 pilares
  tabsContainer.innerHTML = ENGINEERING_PILLARS.map(
    (p, idx) => `
      <button type="button" class="pillar-tab ${idx === 0 ? 'is-active' : ''}" data-pillar-id="${p.id}" style="--c:var(${p.colorVar})" role="tab" aria-selected="${idx === 0 ? 'true' : 'false'}">
        <span class="pillar-tab-ic" aria-hidden="true">${getPillarIcon(p.id)}</span>
        <span class="pillar-tab-txt">
          <small class="mono">ENG-0${idx + 1} · ${p.badge}</small>
          <strong>${p.title}</strong>
        </span>
      </button>
    `
  ).join('');

  const renderDetail = (pillarId) => {
    const idx = Math.max(0, ENGINEERING_PILLARS.findIndex((p) => p.id === pillarId));
    const pillar = ENGINEERING_PILLARS[idx] || ENGINEERING_PILLARS[0];
    if (!pillar) return;

    tabsContainer.querySelectorAll('.pillar-tab').forEach((btn) => {
      const active = btn.getAttribute('data-pillar-id') === pillar.id;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    const relatedList = Array.isArray(pillar.relatedProjects)
      ? pillar.relatedProjects
      : [pillar.relatedProject].filter(Boolean);

    detailContainer.style.setProperty('--c', `var(${pillar.colorVar})`);
    detailContainer.innerHTML = `
      <div class="pillar-card-inner">
        <div class="pillar-card-head">
          <span class="pillar-badge mono">ENG-0${idx + 1} · ${pillar.badge}</span>
          <span class="pillar-Short mono">${pillar.shortDesc}</span>
        </div>
        <h3>${pillar.title}</h3>
        <p class="pillar-desc">${pillar.fullDesc || pillar.description}</p>
        <div class="pillar-deliverables">
          <span class="pillar-sublabel mono">Entregas &amp; Práticas Aplicadas</span>
          <ul>
            ${pillar.deliverables.map((d) => `<li>${d}</li>`).join('')}
          </ul>
        </div>
        <div class="pillar-foot">
          <div class="pillar-related">
            <span class="mono">Aplicado em:</span>
            ${relatedList.map((rp) => `<span class="pillar-proj-chip">${rp}</span>`).join('')}
          </div>
          <button type="button" class="btn ghost sm-btn" data-layer-target="2">
            <span>Inspecionar Projetos</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  };

  renderDetail(ENGINEERING_PILLARS[0].id);

  tabsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-pillar-id]');
    if (!btn) return;
    renderDetail(btn.getAttribute('data-pillar-id'));
  });

  return { selectPillar: renderDetail };
}

/**
 * Deck Espacial de Projetos (Camada 02 · #projetos) para caber em 100vh sem scroll de página.
 */
export function initProjectDeck() {
  const deckBtns = Array.from(document.querySelectorAll('[data-proj-tab]'));
  const deckPanes = Array.from(document.querySelectorAll('[data-proj-pane]'));
  if (!deckBtns.length || !deckPanes.length) return;

  const activateTab = (tabKey) => {
    deckBtns.forEach((btn) => {
      const isMatch = btn.getAttribute('data-proj-tab') === tabKey;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    deckPanes.forEach((pane) => {
      const isMatch = pane.getAttribute('data-proj-pane') === tabKey;
      pane.classList.toggle('is-active', isMatch);
      pane.hidden = !isMatch;
      if (isMatch) {
        runCountersInContainer(pane);
      }
    });
  };

  deckBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activateTab(btn.getAttribute('data-proj-tab'));
    });
  });
}

/**
 * Motor Espacial 3D no Eixo Z (Dive-In Engine) + Sincronização com Liquid Glass Dock.
 */
export function initSpatialEngine(inspectorController = null) {
  const viewport = document.querySelector('#spatialViewport');
  const layers = Array.from(document.querySelectorAll('.spatial-layer'));
  const dock = document.querySelector('#rail');
  const dockPill = document.querySelector('#dockPill');
  const dockFill = document.querySelector('#dockFill');
  const dockCoord = document.querySelector('#dockCoord');
  const hudLayerName = document.querySelector('#hudLayerName');
  const prevBtn = document.querySelector('#prevLayerBtn');
  const nextBtn = document.querySelector('#nextLayerBtn');

  if (!layers.length) return;

  let currentLayer = 0;
  let isTransitioning = false;
  let diveTimer = null;

  const updateDockUI = (index) => {
    const sectionMeta = NAV_SECTIONS[index] || NAV_SECTIONS[0];

    if (dock) {
      const items = Array.from(dock.querySelectorAll('.lg-dock-btn'));
      items.forEach((item, idx) => {
        const active = idx === index;
        item.classList.toggle('on', active);
        item.setAttribute('aria-current', active ? 'step' : 'false');
        if (active && dockPill) {
          dockPill.style.transform = `translate3d(${item.offsetLeft}px, ${item.offsetTop}px, 0)`;
        }
      });
    }

    if (dockFill) {
      const progress = layers.length > 1 ? (index / (layers.length - 1)) * 100 : 0;
      dockFill.style.height = `${progress}%`;
    }

    if (hudLayerName && sectionMeta) {
      const num = String(index).padStart(2, '0');
      hudLayerName.textContent = `${num} · ${sectionMeta.label.toUpperCase()}`;
    }

    if (prevBtn) prevBtn.disabled = index <= 0;
    if (nextBtn) nextBtn.disabled = index >= layers.length - 1;
  };

  const goToLayer = (targetIndex, options = {}) => {
    const clamped = Math.max(0, Math.min(layers.length - 1, targetIndex));
    if (clamped === currentLayer && !options.force && !options.pillarId) return;

    const direction = clamped > currentLayer ? 'dive' : 'surface';
    currentLayer = clamped;

    if (!prefersReducedMotion()) {
      isTransitioning = true;
      setTimeout(() => {
        isTransitioning = false;
      }, 720);
    }

    if (viewport && !options.force) {
      viewport.classList.remove('is-diving', 'is-surfacing');
      void viewport.offsetWidth;
      viewport.classList.add(direction === 'dive' ? 'is-diving' : 'is-surfacing');
      clearTimeout(diveTimer);
      diveTimer = setTimeout(() => {
        viewport.classList.remove('is-diving', 'is-surfacing');
      }, 820);
    }

    layers.forEach((layer, idx) => {
      layer.classList.remove('is-active', 'is-past', 'is-next', 'is-deep');

      if (idx === currentLayer) {
        layer.classList.add('is-active');
        layer.setAttribute('aria-hidden', 'false');
        layer.removeAttribute('inert');
      } else if (idx < currentLayer) {
        layer.classList.add('is-past');
        layer.setAttribute('aria-hidden', 'true');
        layer.setAttribute('inert', '');
      } else if (idx === currentLayer + 1) {
        layer.classList.add('is-next');
        layer.setAttribute('aria-hidden', 'true');
        layer.setAttribute('inert', '');
      } else {
        layer.classList.add('is-deep');
        layer.setAttribute('aria-hidden', 'true');
        layer.setAttribute('inert', '');
      }
    });

    updateDockUI(currentLayer);

    // Gatilhos específicos de cada camada ao entrar em foco
    const activeLayerEl = layers[currentLayer];
    if (activeLayerEl) {
      activeLayerEl.scrollTop = 0;
    }
    runCountersInContainer(activeLayerEl);

    if (options.pillarId && inspectorController) {
      inspectorController.selectPillar(options.pillarId);
    }

    if (activeLayerEl && activeLayerEl.id === 'commits') {
      const graphComp = activeLayerEl.querySelector('git-graph');
      if (graphComp && typeof graphComp.replayGraph === 'function') {
        graphComp.replayGraph();
      }
    }

    if (activeLayerEl && activeLayerEl.id === 'formacao') {
      const timelineComp = activeLayerEl.querySelector('timeline-section');
      if (timelineComp && typeof timelineComp.playAnimation === 'function') {
        timelineComp.playAnimation();
      }
    }

    // Atualiza hash na URL de forma silenciosa
    if (activeLayerEl && activeLayerEl.id && history.replaceState) {
      history.replaceState(null, '', `#${activeLayerEl.id}`);
    }
  };

  // Clique em qualquer elemento com [data-layer-target]
  document.addEventListener('click', (e) => {
    const pillarTrigger = e.target.closest('[data-pillar-dive]');
    if (pillarTrigger) {
      e.preventDefault();
      const pillarId = pillarTrigger.getAttribute('data-pillar-dive');
      goToLayer(1, { pillarId });
      return;
    }

    const layerTrigger = e.target.closest('[data-layer-target]');
    if (layerTrigger) {
      e.preventDefault();
      const targetIdx = Number(layerTrigger.getAttribute('data-layer-target'));
      if (!Number.isNaN(targetIdx)) {
        goToLayer(targetIdx);
      }
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToLayer(currentLayer - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToLayer(currentLayer + 1));
  }

  // Navegação por Roda do Mouse (Wheel) -> Mergulho no eixo Z
  let wheelAccumulator = 0;
  let wheelResetTimer = null;

  window.addEventListener(
    'wheel',
    (e) => {
      // Permite scroll interno caso o usuário esteja dentro de uma caixa com overflow-y/x ativo
      const scrollable = e.target.closest('.inner-scroll, .h-timeline-scroll, .spatial-layer.is-active');
      if (scrollable) {
        const canScrollDown =
          e.deltaY > 0 && scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 4;
        const canScrollUp = e.deltaY < 0 && scrollable.scrollTop > 4;
        if (canScrollDown || canScrollUp) return;
      }

      e.preventDefault();
      if (isTransitioning) return;

      wheelAccumulator += e.deltaY;
      clearTimeout(wheelResetTimer);
      wheelResetTimer = setTimeout(() => {
        wheelAccumulator = 0;
      }, 180);

      if (Math.abs(wheelAccumulator) >= 42) {
        const dir = wheelAccumulator > 0 ? 1 : -1;
        wheelAccumulator = 0;
        goToLayer(currentLayer + dir);
      }
    },
    { passive: false }
  );

  // Gestos de Toque (Swipe direto entre camadas no Mobile, sem scroll vertical)
  let touchStartY = 0;
  let touchStartX = 0;

  window.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  window.addEventListener(
    'touchend',
    (e) => {
      if (isTransitioning || !e.changedTouches.length) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      const dx = touchStartX - e.changedTouches[0].clientX;

      // Ignora gestos predominantemente horizontais (ex: abas)
      if (Math.abs(dx) > Math.abs(dy)) return;

      if (dy > 42) {
        goToLayer(currentLayer + 1);
      } else if (dy < -42) {
        goToLayer(currentLayer - 1);
      }
    },
    { passive: true }
  );

  // Navegação por Teclado (Setas, PageDown/PageUp, Home/End)
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (isTransitioning) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      goToLayer(currentLayer + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goToLayer(currentLayer - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToLayer(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToLayer(layers.length - 1);
    }
  });

  window.addEventListener('resize', () => updateDockUI(currentLayer));

  // Inicializa na camada correspondente ao hash atual (ou camada 0)
  const initialHash = window.location.hash.replace('#', '');
  const initialIndex = Math.max(
    0,
    NAV_SECTIONS.findIndex((s) => s.id === initialHash)
  );
  goToLayer(initialIndex, { force: true });
}

/**
 * Ativa efeitos de ponteiro fino: Tilt 3D com reflexo, Botões Magnéticos e Spotlight.
 */
export function initPointerEffects() {
  if (!hasFinePointer() || prefersReducedMotion()) return;

  document.querySelectorAll('.tilt').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--ry', `${x * 6}deg`);
      el.style.setProperty('--rx', `${-y * 6}deg`);
      el.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
      el.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
    });

    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });

  document.querySelectorAll('.mag').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) * 0.14;
      const dy = (e.clientY - rect.top - rect.height / 2) * 0.2;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });

  const spot = document.querySelector('#spot');
  if (spot) {
    window.addEventListener(
      'pointermove',
      (e) => {
        spot.style.setProperty('--sx', `${e.clientX}px`);
        spot.style.setProperty('--sy', `${e.clientY}px`);
        spot.classList.add('on');
      },
      { passive: true }
    );
  }
}
