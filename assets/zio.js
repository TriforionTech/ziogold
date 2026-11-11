/**
 * ZIOGOLD — SHARED ZERO-REFLOW RUNTIME ENGINE (BAHASA INDONESIA)
 * Mengelola navigasi, hidrasi ZIO_REGISTRY, filter edukasi & kamus istilah,
 * tab spesifikasi merchandise, formulir kontak resmi, animasi offscreen, dan single-rAF scroll.
 */
document.addEventListener('DOMContentLoaded', () => {
  const REG = window.ZIO_REGISTRY || { brand: {}, links: {}, metrics: {} };
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* 1. Hidrasi field teks dinamis dari ZIO_REGISTRY */
  document.querySelectorAll('[data-zio-field]').forEach((el) => {
    const path = el.getAttribute('data-zio-field').split('.');
    let cur = REG;
    for (let i = 0; i < path.length; i++) {
      cur = cur != null ? cur[path[i]] : undefined;
    }
    if (typeof cur === 'string' && cur.length > 0) {
      el.textContent = cur;
    }
  });

  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = (REG.brand && REG.brand.copyrightYear) || '2026';

  const marketInfo = document.querySelector('.hero-market-info');
  if (marketInfo) {
    let marketInfoTimer = 0;
    const showMarketInfo = () => {
      marketInfo.classList.add('is-open');
      marketInfo.setAttribute('aria-expanded', 'true');
      clearTimeout(marketInfoTimer);
      marketInfoTimer = setTimeout(() => {
        marketInfo.classList.remove('is-open');
        marketInfo.setAttribute('aria-expanded', 'false');
      }, 2800);
    };
    marketInfo.addEventListener('pointerenter', showMarketInfo, { passive: true });
    marketInfo.addEventListener('focus', showMarketInfo);
    marketInfo.addEventListener('click', showMarketInfo);
    marketInfo.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        clearTimeout(marketInfoTimer);
        marketInfo.classList.remove('is-open');
        marketInfo.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* 2. Notifikasi sopan untuk kanal opsional yang URL-nya sedang dikonfirmasi di ZIO_REGISTRY */
  let noticeTimer = 0;
  function showPendingChannelNotice(channelLabel) {
    let toast = document.getElementById('zio-channel-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'zio-channel-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.className = 'zio-toast panel px-4 py-3.5 sm:px-5 sm:py-4 text-xs sm:text-sm';
      toast.innerHTML =
        '<div class="flex items-start justify-between gap-3">' +
          '<div class="space-y-1">' +
            '<p id="zio-toast-title" class="font-semibold text-[color:var(--gold-light)]"></p>' +
            '<p class="text-[color:var(--muted)] leading-relaxed">Tautan langsung kanal ini sedang dalam pembaruan pada data resmi ZIOGOLD. Anda dapat langsung terhubung melalui Telegram Global.</p>' +
          '</div>' +
          '<button type="button" id="zio-toast-close" class="text-[color:var(--muted)] hover:text-white px-1.5 py-0.5 text-xs font-semibold shrink-0" aria-label="Tutup pemberitahuan">Tutup</button>' +
        '</div>' +
        '<div class="mt-3 pt-2.5 border-t border-[color:var(--border)] flex items-center justify-between gap-3">' +
          '<span class="text-[11px] uppercase tracking-wider text-[color:var(--muted)]">Kanal Utama Resmi</span>' +
          '<a href="' + ((REG.links && REG.links.telegramGlobal) || 'https://t.me/ziogoldmaker') + '" target="_blank" rel="noopener noreferrer" class="text-[color:var(--gold-light)] hover:text-white font-semibold underline underline-offset-4">Buka Telegram Global ↗</a>' +
        '</div>';
      document.body.appendChild(toast);
      document.getElementById('zio-toast-close').addEventListener('click', () => {
        toast.classList.remove('is-open');
      });
    }
    const titleEl = document.getElementById('zio-toast-title');
    if (titleEl) titleEl.textContent = 'Tautan ' + channelLabel + ' segera diperbarui';
    toast.classList.add('is-open');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => toast.classList.remove('is-open'), 5500);
  }

  /* 3. Hidrasi tautan [data-cta-link] dari ZIO_REGISTRY */
  const linkMap = {
    telegram: { key: 'telegramGlobal', label: 'Telegram Global' },
    'telegram-source': { key: 'telegramGlobal', label: 'Telegram Global' },
    tiktok: { key: 'tiktok', label: 'TikTok ZIOGOLD' },
    instagram: { key: 'instagram', label: 'Instagram ZIOGOLD' },
    facebook: { key: 'facebook', label: 'Facebook ZIOGOLD' },
    threads: { key: 'threads', label: 'Threads ZIOGOLD' },
    youtube: { key: 'youtube', label: 'YouTube ZIOGOLD' },
    whatsapp: { key: 'whatsapp', label: 'Kontak Resmi WhatsApp' },
    'store-cap': { key: 'marketplaceCap', label: 'Marketplace Crest Cap' },
    'store-tee': { key: 'marketplaceTee', label: 'Marketplace Signature Tee' },
    'store-hoodie': { key: 'marketplaceHoodie', label: 'Marketplace Pullover Hoodie' }
  };

  document.querySelectorAll('[data-cta-link]').forEach((el) => {
    const type = el.getAttribute('data-cta-link');
    const cfg = linkMap[type];
    if (!cfg) return;
    const url = REG.links && REG.links[cfg.key] ? REG.links[cfg.key].trim() : '';
    if (url) {
      el.setAttribute('href', url);
    } else {
      el.setAttribute('href', '#kanal-resmi');
      el.removeAttribute('target');
      el.setAttribute('data-pending-channel', cfg.label);
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showPendingChannelNotice(cfg.label);
      });
    }
  });

  /* 4. Navigasi mobile */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuPanel = document.getElementById('mobile-menu-panel');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  const header = document.getElementById('site-header');

  if (menuBtn && menuPanel && iconOpen && iconClose) {
    const setMenu = (open) => {
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
      menuPanel.classList.toggle('hidden', !open);
      iconOpen.classList.toggle('hidden', open);
      iconClose.classList.toggle('hidden', !open);
      if (header) header.classList.toggle('is-menu-open', open);
    };
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    menuPanel.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => setMenu(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* 5. Tombol pemicu prapilih kategori kontak (misal dari tombol VIP atau Kolaborasi di halaman yang sama) */
  document.querySelectorAll('[data-select-inquiry]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const cat = trigger.getAttribute('data-select-inquiry');
      const formSel = document.querySelector('[data-zio-contact-form] select[name="category"]');
      if (formSel && cat) {
        Array.from(formSel.options).forEach((opt) => {
          if (opt.value.toLowerCase() === cat.toLowerCase()) formSel.value = opt.value;
        });
      }
    });
  });

  /* 6. Akordeon FAQ */
  document.querySelectorAll('.faq-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.setAttribute('aria-hidden', String(expanded));
    });
  });

  /* 7. Filter kategori Edukasi & Pencarian Kamus Istilah */
  const catBtns = document.querySelectorAll('[data-edu-filter]');
  const eduCards = document.querySelectorAll('[data-edu-cat]');
  if (catBtns.length && eduCards.length) {
    catBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-edu-filter');
        catBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        eduCards.forEach((card) => {
          const match = cat === 'all' || card.getAttribute('data-edu-cat') === cat;
          card.classList.toggle('hidden', !match);
        });
      });
    });
  }

  const glossaryInput = document.getElementById('glossary-search');
  const glossaryItems = document.querySelectorAll('[data-glossary-term]');
  const glossaryEmpty = document.getElementById('glossary-empty');
  if (glossaryInput && glossaryItems.length) {
    glossaryInput.addEventListener('input', () => {
      const q = glossaryInput.value.trim().toLowerCase();
      let visibleCount = 0;
      glossaryItems.forEach((item) => {
        const hay = (item.getAttribute('data-glossary-term') + ' ' + item.textContent).toLowerCase();
        const show = !q || hay.includes(q);
        item.classList.toggle('hidden', !show);
        if (show) visibleCount++;
      });
      if (glossaryEmpty) glossaryEmpty.classList.toggle('hidden', visibleCount > 0);
    });
  }

  /* 8. Pemilih produk Merchandise */
  const merchSelectBtns = document.querySelectorAll('[data-merch-select]');
  const merchDetailPanels = document.querySelectorAll('[data-merch-detail]');
  if (merchSelectBtns.length && merchDetailPanels.length) {
    merchSelectBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-merch-select');
        merchSelectBtns.forEach((b) => {
          const active = b.getAttribute('data-merch-select') === targetId;
          if (b.hasAttribute('aria-selected')) b.setAttribute('aria-selected', String(active));
        });
        merchDetailPanels.forEach((panel) => {
          panel.classList.toggle('hidden', panel.getAttribute('data-merch-detail') !== targetId);
        });
        const detailSection = document.getElementById('product-details');
        if (detailSection && btn.hasAttribute('data-scroll-detail')) {
          detailSection.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        }
      });
    });
  }

  /* 9. Formulir Kontak Resmi ZIOGOLD */
  const contactForms = document.querySelectorAll('[data-zio-contact-form]');
  if (contactForms.length) {
    const params = new URLSearchParams(window.location.search);
    const preCat = params.get('kategori') || params.get('category');
    contactForms.forEach((form) => {
      const catSelect = form.querySelector('select[name="category"]');
      if (catSelect && preCat) {
        Array.from(catSelect.options).forEach((opt) => {
          if (opt.value.toLowerCase() === preCat.toLowerCase()) catSelect.value = opt.value;
        });
      }
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (form.querySelector('[name="name"]').value || '').trim();
        const contact = (form.querySelector('[name="contact"]').value || '').trim();
        const category = (form.querySelector('[name="category"]').value || 'Pertanyaan Umum').trim();
        const message = (form.querySelector('[name="message"]').value || '').trim();
        const consent = form.querySelector('[name="consent"]');
        const statusEl = form.querySelector('[data-form-status]');
        if (!name || !contact || !message || (consent && !consent.checked)) {
          if (statusEl) {
            statusEl.className = 'mt-4 rounded-lg border border-[color:var(--border-gold)] bg-[rgba(212,175,55,0.08)] px-4 py-3 text-xs sm:text-sm text-[color:var(--gold-light)]';
            statusEl.textContent = 'Mohon lengkapi seluruh kolom wajib dan centang persetujuan privasi sebelum melanjutkan.';
          }
          return;
        }
        const tgUrl = (REG.links && REG.links.telegramGlobal) || 'https://t.me/ziogoldmaker';
        const waUrl = REG.links && REG.links.whatsapp ? REG.links.whatsapp.trim() : '';
        if (statusEl) {
          statusEl.className = 'mt-4 rounded-xl border border-[color:var(--border-gold)] bg-[rgba(16,19,15,0.92)] p-4 text-xs sm:text-sm space-y-2.5';
          const summaryText = 'Kategori: ' + category + ' · Nama: ' + name + ' (' + contact + ')';
          statusEl.innerHTML =
            '<p class="font-semibold text-[color:var(--gold-light)]">Ringkasan pesan berhasil disiapkan</p>' +
            '<p class="text-[color:var(--muted)]"></p>' +
            '<p class="text-[color:var(--muted)] leading-relaxed">Demi menjaga keamanan komunikasi, lanjutkan pengiriman pesan Anda langsung melalui kanal resmi ZIOGOLD di bawah ini.</p>' +
            '<div class="pt-1 flex flex-wrap items-center gap-3">' +
              '<a href="' + tgUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-sm">Hubungi via Telegram Global ↗</a>' +
              (waUrl ? '<a href="' + waUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">Hubungi via WhatsApp ↗</a>' : '') +
            '</div>';
          statusEl.querySelectorAll('p')[1].textContent = summaryText;
        }
      });
    });
  }

  /* 10. Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal, .reveal-x, .focus-item, [data-hairline]');
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('is-visible');
          io.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    revealEls.forEach((el) => {
      if (!el.classList.contains('is-visible')) io.observe(el);
    });
  }

  /* 11. Zero-reflow pointer spotlight */
  if (window.matchMedia('(hover: hover)').matches && !reduce) {
    document.querySelectorAll('[data-spot]').forEach((el) => {
      let rect = null;
      let spotRaf = 0;
      let cx = 0, cy = 0;
      el.addEventListener('pointerenter', () => { rect = el.getBoundingClientRect(); }, { passive: true });
      el.addEventListener('pointerleave', () => { rect = null; }, { passive: true });
      el.addEventListener('pointermove', (e) => {
        cx = e.clientX;
        cy = e.clientY;
        if (!spotRaf) {
          spotRaf = requestAnimationFrame(() => {
            if (!rect) rect = el.getBoundingClientRect();
            el.style.setProperty('--mx', (cx - rect.left).toFixed(1) + 'px');
            el.style.setProperty('--my', (cy - rect.top).toFixed(1) + 'px');
            spotRaf = 0;
          });
        }
      }, { passive: true });
      window.addEventListener('scroll', () => { rect = null; }, { passive: true });
    });
  }

  /* 12. Offscreen & background-tab animation gating */
  if (!reduce && 'IntersectionObserver' in window) {
    const animIo = new IntersectionObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        entries[i].target.classList.toggle('anim-paused', !entries[i].isIntersecting);
      }
    }, { rootMargin: '160px 0px' });
    document.querySelectorAll('.glow-border, .ph, .hero-halo, .btn-gold, .gold-text:not(.hw), .hero-typo').forEach((el) => animIo.observe(el));

    const bgAnimated = document.querySelectorAll('.aurora span, .sweep');
    document.addEventListener('visibilitychange', () => {
      const paused = document.hidden;
      for (let i = 0; i < bgAnimated.length; i++) bgAnimated[i].classList.toggle('anim-paused', paused);
    });
  }

  /* 13. Unified zero-reflow rAF scroll, parallax & mobile sticky CTA */
  const bar = document.getElementById('scroll-progress');
  const aurora = document.querySelector('.aurora');
  const sticky = document.getElementById('sticky-cta');
  const heroCta = document.getElementById('hero-cta');
  const bottomCta = document.getElementById('final-cta');
  const footer = document.getElementById('site-footer');
  const parallaxItems = reduce ? [] : Array.from(document.querySelectorAll('[data-parallax]')).map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallax) || 0,
    centerY: 0
  }));

  let vh = window.innerHeight;
  let maxScroll = 1;
  let heroCtaBottom = 360;
  let hideZoneTop = Infinity;
  let ticking = false;
  let prevScrolled = null;
  let prevStickyShow = null;

  function measureLayout() {
    const y = window.scrollY || window.pageYOffset;
    vh = window.innerHeight;
    maxScroll = Math.max(0, root.scrollHeight - vh);
    for (let i = 0; i < parallaxItems.length; i++) {
      const item = parallaxItems[i];
      item.el.style.setProperty('--py', '0px');
      const r = item.el.getBoundingClientRect();
      item.centerY = r.top + y + r.height / 2;
    }
    if (sticky && footer) {
      heroCtaBottom = heroCta ? (heroCta.getBoundingClientRect().bottom + y) : 340;
      hideZoneTop = (bottomCta || footer).getBoundingClientRect().top + y;
    }
  }

  function renderScrollFrame() {
    const y = window.scrollY || window.pageYOffset;

    if (!reduce) {
      if (aurora) aurora.style.transform = 'translate3d(0,' + (y * -0.05).toFixed(2) + 'px,0)';
      if (bar) bar.style.transform = 'scaleX(' + (maxScroll > 0 ? clamp(y / maxScroll, 0, 1).toFixed(4) : 0) + ')';
      const viewCenter = y + vh / 2;
      for (let i = 0; i < parallaxItems.length; i++) {
        const item = parallaxItems[i];
        const offset = (item.centerY - viewCenter) * item.speed;
        item.el.style.setProperty('--py', offset.toFixed(1) + 'px');
      }
    }

    if (header) {
      const isScrolled = y > 8;
      if (isScrolled !== prevScrolled) {
        header.classList.toggle('is-scrolled', isScrolled);
        prevScrolled = isScrolled;
      }
    }

    if (sticky && footer) {
      const show = y > heroCtaBottom && (y + vh) < (hideZoneTop + 40);
      if (show !== prevStickyShow) {
        sticky.classList.toggle('show', show);
        sticky.tabIndex = show ? 0 : -1;
        prevStickyShow = show;
      }
    }

    ticking = false;
  }

  function requestScrollFrame() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(renderScrollFrame);
    }
  }

  function refreshAll() {
    measureLayout();
    renderScrollFrame();
  }

  window.addEventListener('scroll', requestScrollFrame, { passive: true });
  window.addEventListener('resize', refreshAll, { passive: true });
  if ('ResizeObserver' in window) {
    let roRaf = 0;
    new ResizeObserver(() => {
      if (!roRaf) roRaf = requestAnimationFrame(() => { roRaf = 0; refreshAll(); });
    }).observe(document.body);
  } else {
    window.addEventListener('load', refreshAll, { once: true });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refreshAll);
  }
  refreshAll();

  /* 14. Bagan Garis Waktu Interaktif & Motion (Beranda #tentang) */
  document.querySelectorAll('[data-zio-timeline]').forEach((tlRoot) => {
    const nodes = Array.from(tlRoot.querySelectorAll('[data-tl-node]'));
    const panels = Array.from(tlRoot.querySelectorAll('[data-tl-panel]')).slice(0, nodes.length);
    const fillEl = tlRoot.querySelector('[data-tl-fill]');
    const scrollEl = tlRoot.querySelector('[data-tl-scroll]');
    if (!nodes.length || !panels.length) return;

    let activeIdx = 0;

    function setActive(nextIdx, opts) {
      const options = opts || {};
      const total = nodes.length;
      activeIdx = ((nextIdx % total) + total) % total;

      const progress = total > 1 ? activeIdx / (total - 1) : 0;
      if (fillEl) {
        fillEl.style.setProperty('--tl-progress', progress.toFixed(4));
      }

      nodes.forEach((btn, i) => {
        const isAct = i === activeIdx;
        const isPassed = i <= activeIdx;
        btn.classList.toggle('is-active', isAct);
        btn.classList.toggle('is-passed', isPassed);
        btn.setAttribute('aria-selected', String(isAct));
        btn.tabIndex = isAct ? 0 : -1;
        if (isAct && options.focusNode) btn.focus({ preventScroll: true });
      });

      panels.forEach((panel, i) => {
        const isAct = i === activeIdx;
        panel.classList.toggle('is-active', isAct);
        if (isAct) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });

      if (scrollEl && scrollEl.scrollWidth > scrollEl.clientWidth + 4) {
        const activeBtn = nodes[activeIdx];
        const targetLeft = activeBtn.offsetLeft - (scrollEl.clientWidth - activeBtn.offsetWidth) / 2;
        scrollEl.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: reduce ? 'auto' : 'smooth'
        });
      }
    }

    nodes.forEach((btn, idx) => {
      btn.tabIndex = idx === 0 ? 0 : -1;
      btn.addEventListener('click', () => {
        setActive(idx);
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setActive(activeIdx + 1, { focusNode: true });
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setActive(activeIdx - 1, { focusNode: true });
        } else if (e.key === 'Home') {
          e.preventDefault();
          setActive(0, { focusNode: true });
        } else if (e.key === 'End') {
          e.preventDefault();
          setActive(nodes.length - 1, { focusNode: true });
        }
      });
    });

    setActive(0);
  });
});

/* 14. Hero spotlight: glow mengikuti kursor (desktop pointer halus saja).
   rAF + lerp, transform-only, berhenti total saat kursor keluar hero. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;
  var hero = document.querySelector('.hero-typo');
  if (!hero) return;
  var spot = hero.querySelector('.hero-spot');
  if (!spot) return;
  var tx = 0, ty = 0, cx = 0, cy = 0, raf = null, inside = false;
  function tick() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    spot.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
    if (inside || Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  }
  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    tx = e.clientX - r.left;
    ty = e.clientY - r.top;
    if (!inside) {
      inside = true;
      hero.classList.add('spot-on');
      cx = tx; cy = ty;
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
  hero.addEventListener('pointerleave', function () {
    inside = false;
    hero.classList.remove('spot-on');
  }, { passive: true });
})();
