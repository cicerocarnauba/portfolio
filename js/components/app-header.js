/**
 * Componente <app-header>
 * Cabeçalho fixo editorial com navegação por âncoras, alternância de tema e menu mobile acessível.
 */

import { CONTACT, NAV_SECTIONS } from '../data/portfolio-data.js?v=13';

export class AppHeader extends HTMLElement {
  connectedCallback() {
    const navLinks = NAV_SECTIONS.filter((s) => s.id !== 'inicio')
      .map((sec) => `<a href="#${sec.id}" data-nav-link="${sec.id}">${sec.label}</a>`)
      .join('');

    this.innerHTML = `
      <header class="site-header" id="top">
        <a class="brand-mark" href="#inicio">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5 4h2v2H5zM17 4h2v2h-2zM7 6h2v2H7zM15 6h2v2h-2zM5 8h14v2h2v2h2v6h-2v-4h-2v4h-2v-2H7v2H5v-4H3v4H1v-6h2v-2h2V8zm2 2v2h2v-2H7zm8 0v2h2v-2h-2zM7 18h4v2H7zM13 18h4v2h-4z"/>
          </svg>
          <span>Cícero Higor</span>
          <span class="brand-loc">· Quixadá, CE</span>
        </a>

        <nav class="site-nav" aria-label="Navegação principal">
          ${navLinks}
        </nav>

        <div class="header-actions">
          <button class="theme-btn" id="themeToggle" type="button" aria-label="Alternar entre tema claro e escuro" title="Alternar tema">
            <svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"></svg>
          </button>
          <a class="btn btn-header-cta" href="${CONTACT.whatsapp}" target="_blank" rel="noopener noreferrer">
            <span class="cta-full">Falar no WhatsApp</span>
            <span class="cta-short">WhatsApp</span>
          </a>
          <button
            class="menu-toggle"
            id="menuToggle"
            type="button"
            aria-expanded="false"
            aria-controls="mobileDrawer"
            aria-label="Abrir menu de navegação"
          >
            <svg id="menuIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="17" x2="20" y2="17"/>
            </svg>
          </button>
        </div>
      </header>
      <nav class="mobile-drawer" id="mobileDrawer" aria-label="Menu móvel" hidden>
        ${navLinks}
      </nav>
    `;

    this.initTheme();
    this.initMobileMenu();
    this.initScrollSpy();
  }

  effectiveTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  syncThemeIcon() {
    const btn = this.querySelector('#themeToggle');
    const icon = this.querySelector('#themeIcon');
    if (!btn || !icon) return;

    const isDark = this.effectiveTheme() === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    icon.innerHTML = isDark
      ? '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'
      : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  }

  initTheme() {
    const saved = localStorage.getItem('ch-portfolio-theme');
    if (saved === 'dark' || saved === 'light') {
      document.documentElement.setAttribute('data-theme', saved);
    }

    const btn = this.querySelector('#themeToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const next = this.effectiveTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ch-portfolio-theme', next);
        this.syncThemeIcon();
      });
    }

    this.syncThemeIcon();
  }

  initMobileMenu() {
    const toggle = this.querySelector('#menuToggle');
    const drawer = this.querySelector('#mobileDrawer');
    const icon = this.querySelector('#menuIcon');
    if (!toggle || !drawer || !icon) return;

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
      drawer.hidden = !open;
      drawer.classList.toggle('is-open', open);
      icon.innerHTML = open
        ? '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
        : '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>';
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });
  }

  initScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    const links = Array.from(this.querySelectorAll('[data-nav-link]'));
    const sections = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((link) => {
            const match = link.getAttribute('data-nav-link') === id;
            if (match) {
              link.setAttribute('aria-current', 'true');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        });
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }
}

if (!customElements.get('app-header')) {
  customElements.define('app-header', AppHeader);
}
