// ===== NAV =====
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', scrollY > 60);
  toTop.classList.toggle('show', scrollY > 500);
});
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

// ===== MOBILE NAV =====
const burger = document.querySelector('.n__burger');
const mob = document.getElementById('mob');
const mobX = document.querySelector('.mob__x');
burger.addEventListener('click', () => { mob.classList.add('open'); document.body.style.overflow = 'hidden'; });
function closeMob() { mob.classList.remove('open'); document.body.style.overflow = ''; }
mobX.addEventListener('click', closeMob);
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    const t = document.querySelector(href);
    if (t) scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
  });
});

// ===== REVEAL =====
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); rvObs.unobserve(e.target); } });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
function observeReveals() {
  document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));
}
observeReveals();

// ===== SKILL BARS =====
const skObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.style.width = e.target.dataset.w; skObs.unobserve(e.target); } });
}, { threshold: 0.3 });
document.querySelectorAll('.sk__fill').forEach(b => skObs.observe(b));

// ===== COUNTERS =====
function countUp(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const dur = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.floor(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); cObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(c => cObs.observe(c));

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.n__a:not(.n__a--cta)');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 200) cur = s.id; });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
  });
});

// ===== FORM =====
const form = document.getElementById('cf');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.cf__btn');
    const orig = btn.innerHTML;

    // Web3Forms Integration
    if (!SITE || !SITE.contact || !SITE.contact.web3formsKey || SITE.contact.web3formsKey === 'YOUR_ACCESS_KEY_HERE') {
      alert('Please add your Web3Forms Access Key to content.js to enable the contact form.');
      return;
    }

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    try {
      const formData = new FormData(form);
      formData.append('access_key', SITE.contact.web3formsKey);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        btn.style.background = '#22c55e';
        setTimeout(() => { 
          btn.innerHTML = orig; 
          btn.style.background = ''; 
          btn.disabled = false;
          form.reset(); 
        }, 3000);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Form Submission Error:', error);
      btn.innerHTML = '<i class="fas fa-xmark"></i> Error';
      btn.style.background = '#ef4444';
      setTimeout(() => { 
        btn.innerHTML = orig; 
        btn.style.background = ''; 
        btn.disabled = false;
      }, 3000);
    }
  });
}


// ╔══════════════════════════════════════════════════════════════╗
// ║  DYNAMIC RENDERING FROM content.js (SITE object)            ║
// ╚══════════════════════════════════════════════════════════════╝

function renderSiteContent() {
  if (typeof SITE === 'undefined') return;

  // 1. HERO
  const heroAvail = document.querySelector('.hero__avail');
  if (heroAvail) {
    if (SITE.hero.available) {
      heroAvail.innerHTML = `<span class="hero__avail-dot"></span> ${SITE.hero.availableText}`;
      heroAvail.style.display = 'flex';
    } else {
      heroAvail.style.display = 'none';
    }
  }

  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    heroTitle.innerHTML = `
      <span class="hero__line"><span class="hw">${SITE.hero.greeting}</span> <span class="hw">I'm</span></span>
      <span class="hero__line"><span class="hw hw--name accent-word">${SITE.hero.nameFirst}</span></span>
      <span class="hero__line"><span class="hw hw--name stroke">${SITE.hero.nameLast}</span></span>
    `;
  }

  const heroSub = document.querySelector('.hero__sub');
  if (heroSub) {
    heroSub.innerHTML = SITE.hero.roles.map(r => `<span class="hero__sub-role">${r}</span>`).join('<span class="hero__sub-sep">·</span>');
  }

  const heroDesc = document.querySelector('.hero__desc');
  if (heroDesc) heroDesc.innerHTML = SITE.hero.description;

  const heroPhoto = document.querySelector('.hero__photo');
  if (heroPhoto) heroPhoto.src = SITE.hero.photo;

  const heroStats = document.querySelector('.hero__stats');
  if (heroStats && SITE.hero.stats) {
    heroStats.innerHTML = SITE.hero.stats.map(s => `
      <div>
        <div class="hero__stat-val">
          ${s.prefix ? `<span class="green">${s.prefix}</span>` : ''}<span data-target="${s.value}">0</span>${s.suffix ? `<span class="green">${s.suffix}</span>` : ''}
        </div>
        <div class="hero__stat-lbl">${s.label}</div>
      </div>
    `).join('');
    // Re-bind intersection observer for new counters
    cObs.disconnect();
    document.querySelectorAll('[data-target]').forEach(c => cObs.observe(c));
  }

  // 2. ABOUT
  const aboutHeading = document.querySelector('.about__heading');
  const aboutTextContainers = document.querySelectorAll('.about__text');
  
  // Marquee
  const marqTrack = document.querySelector('.marq__track');
  if (marqTrack && SITE.techWall) {
    const marqItems = SITE.techWall.map(t => `<span class="marq__item"><i class="${t.icon}"></i> ${t.name}</span>`).join('');
    marqTrack.innerHTML = marqItems + marqItems; // Duplicate for smooth looping
  }

  if (aboutHeading) aboutHeading.innerHTML = SITE.about.heading;
  
  // Replace the paragraphs (assuming 2 paragraphs in HTML)
  if (aboutTextContainers.length >= 2 && SITE.about.paragraphs) {
    aboutTextContainers[0].innerHTML = SITE.about.paragraphs[0] || '';
    aboutTextContainers[1].innerHTML = SITE.about.paragraphs[1] || '';
  }

  const aboutCards = document.querySelector('.about__cards');
  if (aboutCards && SITE.about.cards) {
    aboutCards.innerHTML = SITE.about.cards.map((c, i) => `
      <div class="about__card rv d${i+1}">
        <div class="about__card-top">
          <div class="about__card-icon"><i class="${c.icon}"></i></div>
          <div class="about__card-title">${c.title}</div>
        </div>
        <div class="about__card-text">${c.text}</div>
      </div>
    `).join('');
  }

  // 3. SERVICES (WHAT I BUILD)
  const servicesGrid = document.querySelector('.builds__grid');
  if (servicesGrid && SITE.services) {
    servicesGrid.innerHTML = SITE.services.map((s, i) => `
      <div class="build rv d${(i % 6) + 1}">
        <span class="build__num">0${i + 1}</span>
        <i class="${s.icon} build__icon"></i>
        <h3 class="build__name">${s.name}</h3>
        <p class="build__desc">${s.desc}</p>
        <div class="build__tags">
          ${s.tags.map(t => `<span class="build__tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // 4. SKILLS
  // The first direct child rv div inside skills .w contains the bars
  const skillBarsContainer = document.querySelector('.skills .rv.d1');
  if (skillBarsContainer && SITE.skills) {
    skillBarsContainer.innerHTML = SITE.skills.map(sk => `
      <div class="sk">
        <div class="sk__top"><span class="sk__name">${sk.name}</span><span class="sk__pct">${sk.percent}%</span></div>
        <div class="sk__track">
          <div class="sk__fill" data-w="${sk.percent}%"></div>
        </div>
      </div>
    `).join('');
    // Re-bind skill observer
    skObs.disconnect();
    document.querySelectorAll('.sk__fill').forEach(b => skObs.observe(b));
  }

  const techWall = document.querySelector('.tech-wall');
  if (techWall && SITE.techWall) {
    techWall.innerHTML = SITE.techWall.map(t => `
      <div class="tw"><i class="${t.icon}"></i> ${t.name}</div>
    `).join('');
  }

  // 5. EXPERIENCE
  const expList = document.querySelector('.exp__list');
  if (expList && SITE.experience) {
    expList.innerHTML = SITE.experience.map((xp, i) => `
      <div class="xp rv d${i+1}">
        <div class="xp__when">${xp.when}</div>
        <div>
          <div class="xp__role">${xp.role}</div>
          <div class="xp__place">${xp.place}</div>
          <div class="xp__text">${xp.text}</div>
        </div>
      </div>
    `).join('');
  }

  // 6. CONTACT
  const contactHeading = document.querySelector('.contact__title');
  const contactDesc = document.querySelector('.contact__desc');
  if (contactHeading) contactHeading.innerHTML = SITE.contact.heading;
  if (contactDesc) contactDesc.innerHTML = SITE.contact.description;

  const contactLinks = document.querySelector('.contact__links');
  if (contactLinks && SITE.contact) {
    contactLinks.innerHTML = `
      <div class="cl">
        <div class="cl__icon"><i class="fas fa-envelope"></i></div>
        <div><div class="cl__lbl">Email</div><div class="cl__val">${SITE.contact.email}</div></div>
      </div>
      <div class="cl">
        <div class="cl__icon"><i class="fas fa-location-dot"></i></div>
        <div><div class="cl__lbl">Location</div><div class="cl__val">${SITE.contact.location}</div></div>
      </div>
      <div class="cl">
        <div class="cl__icon"><i class="fas fa-circle-check"></i></div>
        <div><div class="cl__lbl">Status</div><div class="cl__val">${SITE.contact.status}</div></div>
      </div>
    `;
  }

  // 7. FOOTER
  const footerSoc = document.querySelector('.ft__soc');
  if (footerSoc && SITE.socials) {
    footerSoc.innerHTML = SITE.socials.map(s => `
      <a href="${s.url}" class="ft__s" aria-label="${s.label}"><i class="${s.icon}"></i></a>
    `).join('');
  }
}

// ===== RENDER PROJECT CARDS =====
function renderProjectCards() {
  const grid = document.getElementById('workGrid');
  if (!grid || !SITE || !SITE.projects) return;

  grid.innerHTML = SITE.projects.map((p, i) => {
    const delay = `d${(i % 6) + 1}`;
    const hasSpline = !!p.spline;

    // Build Spline iframe + overlay if this project has a spline URL
    let splineHtml = '';
    if (hasSpline) {
      splineHtml = `
        <iframe src="${p.spline}" frameborder="0" width="100%" height="100%"
          style="position:absolute;top:0;left:0;z-index:1;pointer-events:auto;opacity:0.8;width:calc(100% + 150px);max-width:none;transform:scale(1.2);transform-origin:left center;"></iframe>
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 0%,rgba(13,13,13,0.8) 100%);z-index:1;pointer-events:none;"></div>
      `;
    }

    const extraStyle = hasSpline ? ' style="position:relative;overflow:hidden;background:var(--black);"' : '';

    return `
      <a href="#" class="pj rv ${delay}" data-project="${p.id}"${extraStyle}>
        ${splineHtml}
        <div class="pj__top">
          <div class="pj__num">${p.num}</div>
          <div class="pj__tags">
            ${p.tags.map(t => `<span class="pj__tag">${t}</span>`).join('')}
          </div>
        </div>
        <h3 class="pj__name">${p.title}</h3>
        <p class="pj__desc">${p.cardDesc}</p>
        <div class="pj__bottom">
          <div class="pj__role">${p.role}</div>
          <div class="pj__link"><i class="fas fa-arrow-right"></i></div>
        </div>
      </a>
    `;
  }).join('');

  // Attach click handlers for modals
  grid.querySelectorAll('.pj[data-project]').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      openProjectModal(card.dataset.project);
    });
  });
}

// ===== PROJECT DETAIL MODAL =====
const pmOverlay = document.getElementById('pmOverlay');
const pmClose = document.getElementById('pmClose');
const pmNum = document.getElementById('pmNum');
const pmTags = document.getElementById('pmTags');
const pmTitle = document.getElementById('pmTitle');
const pmDesc = document.getElementById('pmDesc');
const pmRole = document.getElementById('pmRole');
const pmYear = document.getElementById('pmYear');
const pmStatus = document.getElementById('pmStatus');
const pmFeatures = document.getElementById('pmFeatures');
const pmGallery = document.getElementById('pmGallery');

function openProjectModal(projectId) {
  const data = SITE.projects.find(p => p.id === projectId);
  if (!data) return;

  // Populate content
  pmNum.textContent = data.num;
  pmTitle.textContent = data.title;
  pmDesc.textContent = data.modalDesc;
  pmRole.textContent = data.role;
  pmYear.textContent = data.year;
  pmStatus.textContent = data.status;

  // Tags
  pmTags.innerHTML = data.tags.map(t => `<span class="pj__tag">${t}</span>`).join('');

  // Features
  pmFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

  // Gallery — supports image, video, and placeholder types
  pmGallery.innerHTML = data.media.map(m => {
    if (m.type === 'image') {
      return `<div class="pm__media-slot"><img src="${m.src}" alt="${m.label}" loading="lazy" /></div>`;
    } else if (m.type === 'video') {
      return `<div class="pm__media-slot"><video src="${m.src}" muted loop playsinline autoplay></video></div>`;
    } else {
      return `<div class="pm__media-slot"><div class="pm__media-placeholder"><i class="fas fa-image"></i><span>${m.label}</span></div></div>`;
    }
  }).join('');

  // Scroll inner to top
  const inner = document.querySelector('.pm__inner');
  if (inner) inner.scrollTop = 0;

  // Open
  pmOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  pmOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close handlers
if (pmClose) pmClose.addEventListener('click', closeProjectModal);
if (pmOverlay) pmOverlay.addEventListener('click', e => {
  if (e.target === pmOverlay) closeProjectModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && pmOverlay && pmOverlay.classList.contains('open')) closeProjectModal();
});

// ===== INIT =====
renderSiteContent();
renderProjectCards();
observeReveals();
