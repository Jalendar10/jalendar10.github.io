/* ─── PARTICLE NETWORK (light-bg friendly) ──────────────── */
(function () {
  var canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, pts;
  var COUNT = 50;
  var MAX_D = 130;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function mkPt() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r:  Math.random() * 1.5 + 0.5,
      a:  Math.random() * 0.2 + 0.08
    };
  }

  function init() {
    pts = [];
    for (var i = 0; i < COUNT; i++) pts.push(mkPt());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < COUNT; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79,70,229,' + p.a + ')';
      ctx.fill();

      for (var j = i + 1; j < COUNT; j++) {
        var q  = pts[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_D) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(79,70,229,' + ((1 - d / MAX_D) * 0.1) + ')';
          ctx.lineWidth = 0.7; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize(); init(); draw();
  window.addEventListener('resize', function () { resize(); init(); }, { passive: true });
}());

/* ─── NAVBAR ────────────────────────────────────────────── */
(function () {
  var navbar = document.getElementById('navbar');
  var burger = document.getElementById('navBurger');
  var links  = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 16);
  }, { passive: true });

  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('.nav-link').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}());

/* ─── SCROLL REVEAL ─────────────────────────────────────── */
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
}());

/* ─── ANIMATED COUNTERS ─────────────────────────────────── */
(function () {
  function easeOut(t) { return 1 - Math.pow(1 - t, 4); }
  function run(el) {
    el.dataset.counted = '1';
    var target = parseInt(el.dataset.count, 10);
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var dur = 1800, start = null;
    (function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = prefix + Math.round(easeOut(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }(performance.now()));
  }
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting && !e.target.dataset.counted) run(e.target); });
  }, { threshold: 0.5 });
  document.querySelectorAll('.hstat-num[data-count]').forEach(function (el) { cio.observe(el); });
}());

/* ─── CYCLING ROLE TEXT ─────────────────────────────────── */
(function () {
  var el = document.getElementById('roleCycle');
  if (!el) return;
  var texts = [
    'Fraud Model Developer',
    'AML Systems Engineer',
    'ML Platform Architect',
    'AWS ML Engineer',
    'AI / ML Innovator',
    'Risk Model Developer',
    'Production ML Expert'
  ];
  var i = 0;
  setInterval(function () {
    el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
    setTimeout(function () {
      i = (i + 1) % texts.length;
      el.textContent = texts[i];
      el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    }, 380);
  }, 3400);
}());

/* ─── ORBIT KEYWORDS ────────────────────────────────────── */
(function () {
  var zone = document.getElementById('orbitZone');
  if (!zone) return;

  var keywords = [
    'XGBoost', 'AML / KYC', 'Apache Kafka', 'LightGBM',
    'OFAC', 'AWS ECS', 'Snowflake', 'Graph Fraud',
    'Neural Net', 'LexisNexis', 'KYC/CDD', 'Docker',
    'Python', 'Random Forest', 'Fraud ML', 'Kubernetes',
    'IFM-X', 'AWS Bedrock', 'Risk Modeling', 'GRC',
    'Actimize', 'Splunk', 'Model Drift', 'AUC / KS',
    'SQL / ETL', 'Tableau', 'PostgreSQL', 'Real-Time ML'
  ];

  var COUNT  = 8;
  var RADIUS = 175; /* px from zone center (zone is 420x420, center at 210) */
  var CX = 210, CY = 210;

  var badges = [];
  var angles = [];
  var kwidx  = [];

  /* shuffle a copy of keywords for initial placement */
  var pool = keywords.slice().sort(function() { return Math.random() - 0.5; });

  for (var i = 0; i < COUNT; i++) {
    var b = document.createElement('span');
    b.className = 'orbit-badge';
    b.textContent = pool[i % pool.length];
    zone.appendChild(b);
    badges.push(b);
    angles.push((i / COUNT) * Math.PI * 2);
    kwidx.push(i % keywords.length);
  }

  /* slow rotation */
  var speed = 0.00025; /* radians per ms */

  function animateOrbit(ts) {
    for (var j = 0; j < COUNT; j++) {
      var angle = angles[j] + ts * speed;
      var x = CX + Math.cos(angle) * RADIUS;
      var y = CY + Math.sin(angle) * RADIUS;
      badges[j].style.left      = x + 'px';
      badges[j].style.top       = y + 'px';
      badges[j].style.transform = 'translate(-50%, -50%)';
    }
    requestAnimationFrame(animateOrbit);
  }
  requestAnimationFrame(animateOrbit);

  /* randomly swap a keyword every 1.5–3s */
  function swapKeyword() {
    var idx = Math.floor(Math.random() * COUNT);
    var badge = badges[idx];
    badge.style.opacity = '0';
    setTimeout(function () {
      kwidx[idx] = (kwidx[idx] + Math.floor(Math.random() * keywords.length)) % keywords.length;
      badge.textContent = keywords[kwidx[idx]];
      badge.style.opacity = '1';
    }, 500);
    setTimeout(swapKeyword, 1500 + Math.random() * 1500);
  }
  setTimeout(swapKeyword, 2000);
}());

/* ─── PROJECTS CAROUSEL ─────────────────────────────────── */
(function () {
  var carousel = document.getElementById('projCarousel');
  var prevBtn  = document.getElementById('projPrev');
  var nextBtn  = document.getElementById('projNext');
  var dots     = document.querySelectorAll('#projDots .proj-dot');
  if (!carousel || !prevBtn || !nextBtn) return;

  var cards = carousel.querySelectorAll('.proj-card');
  var total = cards.length;
  var current = 0;

  function getCardWidth() {
    if (!cards[0]) return 0;
    return cards[0].offsetWidth + 24; /* 24px gap */
  }

  function scrollTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    carousel.scrollTo({ left: current * getCardWidth(), behavior: 'smooth' });
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', String(i === current));
    });
  }

  prevBtn.addEventListener('click', function () { scrollTo(current - 1); });
  nextBtn.addEventListener('click', function () { scrollTo(current + 1); });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      scrollTo(parseInt(dot.dataset.idx, 10));
    });
  });

  /* sync dot when user manually scrolls */
  carousel.addEventListener('scroll', function () {
    var cw = getCardWidth();
    if (cw === 0) return;
    var idx = Math.round(carousel.scrollLeft / cw);
    if (idx !== current) {
      current = idx;
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
        d.setAttribute('aria-selected', String(i === current));
      });
    }
  }, { passive: true });
}());

/* ─── FLIP CARDS ────────────────────────────────────────── */
(function () {
  document.querySelectorAll('.fc-flip-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.flip-card');
      if (card) card.classList.toggle('flipped');
    });
  });
}());

/* ─── SITE SEARCH ───────────────────────────────────────── */
(function () {
  var overlay  = document.getElementById('searchOverlay');
  var inputEl  = document.getElementById('searchInput');
  var resultEl = document.getElementById('searchResults');
  var navBtn   = document.getElementById('navSearch');
  var closeBtn = document.getElementById('searchClose');
  if (!overlay || !inputEl || !resultEl) return;

  /* ─ Index ─────────────────────────────────────────────── */
  var idx = [];

  function add(text, label, section, scrollEl, flipCardEl) {
    text = (text || '').replace(/\s+/g, ' ').trim();
    if (text.length < 2) return;
    idx.push({ text: text, label: label, section: section, scrollEl: scrollEl, flipCardEl: flipCardEl || null });
  }

  function buildIndex() {
    /* Skills — all chip categories including Actimize */
    document.querySelectorAll('#skills [class*="skill-cat"]').forEach(function (cat) {
      var name = (cat.querySelector('h3') || {}).textContent || 'Skills';
      cat.querySelectorAll('.skill-chips span, .actimize-versions span').forEach(function (chip) {
        add(chip.textContent, name.trim(), 'skills', cat, null);
      });
      cat.querySelectorAll('.actimize-sub').forEach(function (sub) {
        var subName = ((sub.querySelector('h5') || {}).textContent || '').trim();
        sub.querySelectorAll('.skill-chips span').forEach(function (chip) {
          add(chip.textContent, 'Actimize — ' + subName, 'skills', cat, null);
        });
      });
    });

    /* Experience — front summary bullets + back detail bullets */
    document.querySelectorAll('.flip-card').forEach(function (card) {
      var company = ((card.querySelector('.flip-front h3') || {}).textContent || '').trim();
      /* Front */
      card.querySelectorAll('.flip-front .fc-brief li, .flip-front .fc-tags span').forEach(function (el) {
        add(el.textContent, company, 'exp', card, null);
      });
      /* Back — detail lines; clicking these flips the card */
      card.querySelectorAll('.flip-back .fb-group h4').forEach(function (el) {
        add(el.textContent, company + ' — ' + el.textContent.trim(), 'exp', card, card);
      });
      card.querySelectorAll('.flip-back .fb-group li').forEach(function (el) {
        add(el.textContent, company + ' — Details', 'exp', card, card);
      });
    });

    /* Projects */
    document.querySelectorAll('.proj-card').forEach(function (card) {
      var title = ((card.querySelector('h3') || {}).textContent || '').trim();
      add((card.querySelector('.proj-desc') || {}).textContent || '', title, 'proj', card, null);
      card.querySelectorAll('.proj-tags span').forEach(function (tag) {
        add(tag.textContent, title, 'proj', card, null);
      });
    });

    /* Education & Certifications */
    var eduSec = document.getElementById('education');
    document.querySelectorAll('.edu-card h3, .edu-card p, .cert-card h4').forEach(function (el) {
      add(el.textContent, 'Education & Certifications', 'edu', eduSec, null);
    });

    /* About */
    var aboutSec = document.getElementById('about');
    document.querySelectorAll('.about-pills span, .expertise-grid h3, .expertise-grid p').forEach(function (el) {
      add(el.textContent, 'About', 'about', aboutSec, null);
    });
  }

  /* ─ Search ────────────────────────────────────────────── */
  var currentHits = [];
  var activeI = -1;

  function runSearch(q) {
    currentHits = [];
    activeI = -1;
    if (!q || q.length < 2) {
      resultEl.innerHTML = '<li class="search-empty">Start typing to search across the entire portfolio…</li>';
      return;
    }
    var ql = q.toLowerCase();
    var seen = new Set();
    idx.forEach(function (item) {
      if (item.text.toLowerCase().indexOf(ql) !== -1) {
        var key = item.section + '|' + item.label + '|' + item.text.slice(0, 60);
        if (!seen.has(key)) { seen.add(key); currentHits.push(item); }
      }
    });

    if (!currentHits.length) {
      resultEl.innerHTML = '<li class="search-empty">No results for "<strong>' + esc(q) + '</strong>" — try another keyword.</li>';
      return;
    }

    var badgeLabel = { skills: 'Skills', exp: 'Experience', proj: 'Projects', edu: 'Education', about: 'About' };
    var badgeCls   = { skills: 'sr-badge-skills', exp: 'sr-badge-exp', proj: 'sr-badge-proj', edu: 'sr-badge-edu', about: 'sr-badge-about' };

    resultEl.innerHTML = currentHits.slice(0, 12).map(function (item, i) {
      var snippet = hilite(clip(item.text, 80), q);
      var flipTag = item.flipCardEl ? '<span class="sr-flip-tag" aria-label="opens flip card">⟳ flip card</span>' : '';
      return '<li class="search-result-item" role="option" data-i="' + i + '">' +
        '<span class="sr-badge ' + (badgeCls[item.section] || '') + '">' + (badgeLabel[item.section] || item.section) + '</span>' +
        '<div class="sr-body">' +
          '<div class="sr-label">' + esc(item.label) + '</div>' +
          '<div class="sr-snippet">' + snippet + '</div>' +
        '</div>' +
        flipTag +
        '<svg class="sr-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</li>';
    }).join('');

    resultEl.querySelectorAll('.search-result-item').forEach(function (el) {
      el.addEventListener('mousedown', function (e) {
        e.preventDefault();
        navigate(currentHits[+el.dataset.i]);
      });
    });
  }

  /* ─ Navigate + highlight ──────────────────────────────── */
  var hlTimer = null;

  function navigate(item) {
    if (!item) return;
    var q = inputEl.value.trim(); /* capture query before closing */
    closeSearch();
    clearHighlights();            /* remove any previous highlights */

    if (item.flipCardEl) {
      item.flipCardEl.classList.add('flipped');
      setTimeout(function () {
        smoothScroll(item.scrollEl);
        setTimeout(function () { paintHighlights(item.scrollEl, q); }, 450);
      }, 140);
    } else {
      if (item.scrollEl && item.scrollEl.classList &&
          item.scrollEl.classList.contains('flip-card')) {
        item.scrollEl.classList.remove('flipped');
      }
      smoothScroll(item.scrollEl);
      setTimeout(function () { paintHighlights(item.scrollEl, q); }, 420);
    }
  }

  function smoothScroll(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ─ Text highlight in the page ───────────────────────── */
  function paintHighlights(root, q) {
    if (!root || !q || q.length < 2) return;
    var re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var tag = (node.parentNode || {}).tagName || '';
        if (/^(SCRIPT|STYLE|MARK)$/i.test(tag)) return NodeFilter.FILTER_REJECT;
        return re.test(node.nodeValue) ? (re.lastIndex = 0, NodeFilter.FILTER_ACCEPT)
                                       : (re.lastIndex = 0, NodeFilter.FILTER_SKIP);
      }
    }, false);

    var textNodes = [];
    var n;
    while ((n = walker.nextNode())) textNodes.push(n);

    var firstMark = null;
    textNodes.forEach(function (tn) {
      re.lastIndex = 0;
      var val = tn.nodeValue, frag = document.createDocumentFragment(), last = 0, m;
      while ((m = re.exec(val)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(val.slice(last, m.index)));
        var mk = document.createElement('mark');
        mk.className = 'search-hl';
        mk.textContent = m[0];
        frag.appendChild(mk);
        if (!firstMark) firstMark = mk;
        last = m.index + m[0].length;
      }
      if (last < val.length) frag.appendChild(document.createTextNode(val.slice(last)));
      tn.parentNode.replaceChild(frag, tn);
    });

    /* scroll precisely to first highlighted word */
    if (firstMark) {
      setTimeout(function () {
        firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 80);
    }

    /* auto-fade after 3.5 s */
    if (hlTimer) clearTimeout(hlTimer);
    hlTimer = setTimeout(clearHighlights, 3500);
  }

  function clearHighlights() {
    /* fade out first, then unwrap */
    document.querySelectorAll('mark.search-hl').forEach(function (mk) {
      mk.classList.add('search-hl-out');
    });
    setTimeout(function () {
      document.querySelectorAll('mark.search-hl').forEach(function (mk) {
        var p = mk.parentNode;
        if (p) { p.replaceChild(document.createTextNode(mk.textContent), mk); p.normalize(); }
      });
    }, 500);
  }

  /* ─ Keyboard active item ──────────────────────────────── */
  function setActive(i) {
    var items = resultEl.querySelectorAll('.search-result-item');
    if (!items.length) return;
    if (activeI >= 0 && items[activeI]) items[activeI].classList.remove('sr-active');
    activeI = Math.max(0, Math.min(i, items.length - 1));
    if (items[activeI]) { items[activeI].classList.add('sr-active'); items[activeI].scrollIntoView({ block: 'nearest' }); }
  }

  /* ─ Open / Close ──────────────────────────────────────── */
  function openSearch() {
    overlay.classList.add('open');
    setTimeout(function () { inputEl.focus(); inputEl.select(); }, 40);
  }
  function closeSearch() {
    overlay.classList.remove('open');
    inputEl.value = '';
    resultEl.innerHTML = '<li class="search-empty">Start typing to search across the entire portfolio…</li>';
    activeI = -1; currentHits = [];
  }

  /* ─ Helpers ───────────────────────────────────────────── */
  function clip(str, len) { return str.length > len ? str.slice(0, len) + '…' : str; }
  function esc(s)  { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function hilite(text, q) {
    var safe = esc(text);
    return safe.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')', 'gi'), '<mark>$1</mark>');
  }

  /* ─ Events ────────────────────────────────────────────── */
  inputEl.addEventListener('input', function () { runSearch(inputEl.value.trim()); });

  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeI + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeI - 1); }
    else if (e.key === 'Enter') { navigate(activeI >= 0 ? currentHits[activeI] : currentHits[0]); }
    else if (e.key === 'Escape') { closeSearch(); }
  });

  if (navBtn)   navBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) closeSearch(); });

  /* Ctrl+K / Cmd+K shortcut */
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); overlay.classList.contains('open') ? closeSearch() : openSearch(); }
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch();
  });

  /* Build index after full DOM is parsed */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildIndex);
  else buildIndex();
}());

/* ─── FOOTER YEAR ───────────────────────────────────────── */
var yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
