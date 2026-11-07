/**
 * Módulo de Animações e Microinterações.
 * Reúne animações de entrada, máquina de escrever, scroll reveal,
 * contadores numéricos, inclinação 3D (tilt), botões magnéticos e spotlight.
 */

import { TYPED_ROLES, NAV_SECTIONS } from '../data/portfolio-data.js';

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
 * Efeito de digitação alternando os papéis do desenvolvedor no Hero.
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
 * Revela suavemente os elementos `.rv` conforme entram na viewport.
 */
export function initScrollReveal() {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('pre');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.rv').forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
      el.classList.add('pre');
      observer.observe(el);
    }
  });
}

/**
 * Anima os contadores numéricos (`[data-count]`) quando ficam visíveis.
 */
export function initStatCounters() {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        const el = entry.target;
        const targetValue = Number(el.getAttribute('data-count'));
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min(1, (now - startTime) / 1100);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = String(Math.round(targetValue * eased));
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        }

        requestAnimationFrame(step);
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll('[data-count]').forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.textContent = '0';
      observer.observe(el);
    }
  });
}

/**
 * Ativa efeitos de ponteiro fino: Tilt 3D com reflexo, Botões Magnéticos e Spotlight.
 */
export function initPointerEffects() {
  if (!hasFinePointer() || prefersReducedMotion()) return;

  // Tilt 3D nos cards visuais dos projetos principais
  document.querySelectorAll('.tilt').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--ry', `${x * 7}deg`);
      el.style.setProperty('--rx', `${-y * 7}deg`);
      el.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
      el.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
    });

    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });

  // Botões com atração magnética sutil
  document.querySelectorAll('.mag').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) * 0.16;
      const dy = (e.clientY - rect.top - rect.height / 2) * 0.24;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });

  // Spotlight radial verde-musgo que acompanha o cursor
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

/**
 * Sincroniza a barra de progresso de leitura no Header, no Side Rail e destaca a seção ativa.
 */
export function initScrollProgressSync() {
  const rail = document.querySelector('#rail');
  const top = document.querySelector('#top');
  if (!rail || !top) return;

  const dots = Array.from(rail.querySelectorAll('a'));
  const navLinks = Array.from(top.querySelectorAll('.nav a'));
  const sections = NAV_SECTIONS.map((s) => document.getElementById(s.id));

  function onScrollOrResize() {
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, doc.scrollTop / maxScroll));

    rail.style.setProperty('--p', progress);
    top.style.setProperty('--p', progress);

    let currentIdx = 0;
    sections.forEach((sec, idx) => {
      if (sec && sec.getBoundingClientRect().top < window.innerHeight * 0.42) {
        currentIdx = idx;
      }
    });

    dots.forEach((dot, idx) => dot.classList.toggle('on', idx === currentIdx));

    const activeId = sections[currentIdx] ? sections[currentIdx].id : '';
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  }

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);
  onScrollOrResize();
}

