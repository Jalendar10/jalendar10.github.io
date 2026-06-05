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

/* ─── FOOTER YEAR ───────────────────────────────────────── */
var yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
