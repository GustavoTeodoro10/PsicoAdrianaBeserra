/* Psicóloga Adriana Beserra: comportamento da página */
(() => {
  'use strict';

  // ---------- Configuração ----------
  const WHATSAPP = '5511968724819';
  // Preencha para ativar o rastreamento. Enquanto estiverem vazios, nada é carregado.
  const GA_ID = '';          // ex.: 'G-XXXXXXXXXX' (Google Analytics 4)
  const META_PIXEL_ID = '';  // ex.: '1234567890123456' (Meta Pixel)

  // ---------- Analytics / Pixel ----------
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  if (GA_ID) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  if (META_PIXEL_ID) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = 'https://connect.facebook.net/en_US/fbevents.js';
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function track(name, params) {
    if (GA_ID) gtag('event', name, params);
    if (META_PIXEL_ID && window.fbq) window.fbq('trackCustom', name, params);
  }

  // ---------- CTAs de WhatsApp com mensagem contextual ----------
  document.querySelectorAll('[data-wa]').forEach((el) => {
    const text = el.getAttribute('data-wa');
    const place = el.getAttribute('data-wa-place') || 'site';
    el.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);
    el.target = '_blank';
    el.rel = 'noopener';
    el.addEventListener('click', () => {
      track('whatsapp_click', { secao: place, mensagem: text });
      if (META_PIXEL_ID && window.fbq) window.fbq('track', 'Contact', { secao: place });
    });
  });

  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => track(el.getAttribute('data-track') + '_click'));
  });

  // ---------- Header ----------
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Menu móvel ----------
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu-mobile');
  const setMenu = (open) => {
    menu.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    btn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  };
  btn.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // ---------- Scroll reveal ----------
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // pequeno escalonamento entre irmãos
        const idx = [...el.parentElement.children].filter((c) => c.classList.contains('reveal')).indexOf(el);
        el.style.transitionDelay = Math.min(idx, 5) * 90 + 'ms';
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }
})();
