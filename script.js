/* ==========================================================================
   THISAIVA VENTURES — JAVASCRIPT INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initActivePageNav();
  initMobileMenu();
  initStatCounters();
  initGlobalMap();
  initMobileLocationStacking();
  initFormHandlers();
  initScrollReveal();
  initFaqAccordion();
  initTiltCards();
  initFilterPills();
  initSimulator();
  initCaptableToggle();
  initReadinessChecklist();
  initStepHighlights();
  initParallax();
  initDigestEditions();
  initMembershipForm();
  initWorldClocks();
  initMediaFilters();
  initContactParticles();
  initRoleFormMorph();
  initAddressCopy();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   5.8 CONTACT PAGE MAGNETIC PARTICLE CANVAS
   -------------------------------------------------------------------------- */
function initContactParticles() {
  const canvas = document.getElementById('contactParticlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.parentElement.offsetWidth;
  let height = canvas.height = canvas.parentElement.offsetHeight;

  window.addEventListener('resize', () => {
    if (canvas.parentElement) {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
  });

  const particles = [];
  const count = 35;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      color: 'rgba(212, 175, 55, ' + (Math.random() * 0.4 + 0.2) + ')'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < count; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - dist / 100)})`;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

function initRoleFormMorph() {
  const rolePills = document.querySelectorAll('.role-pill-btn');
  const detailsField = document.getElementById('contactDetailsMsg');
  const detailsLabel = document.getElementById('contactDetailsLabel');
  if (!rolePills.length || !detailsField) return;

  rolePills.forEach(pill => {
    pill.addEventListener('click', () => {
      rolePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const role = pill.getAttribute('data-role');
      if (role === 'founder') {
        if (detailsLabel) detailsLabel.textContent = 'Funding Round & Cap Table Target';
        detailsField.placeholder = 'Target raise ($500K - $10M), current round stage, angel checks...';
      } else if (role === 'vc') {
        if (detailsLabel) detailsLabel.textContent = 'Fund Size & Domicile Requirements';
        detailsField.placeholder = 'Fund AUM ($10M - $250M), preferred domicile (US / Luxembourg)...';
      } else if (role === 'angel') {
        if (detailsLabel) detailsLabel.textContent = 'Syndicate Deal Size & Thesis';
        detailsField.placeholder = 'Average deal allocation, co-investor network size...';
      } else {
        if (detailsLabel) detailsLabel.textContent = 'Allocation Scope & Asset Class';
        detailsField.placeholder = 'Target investment strategies, asset allocation parameters...';
      }
    });
  });
}

function initAddressCopy() {
  const copyBtns = document.querySelectorAll('.copy-addr-btn');
  if (!copyBtns.length) return;

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const address = btn.getAttribute('data-address');
      if (address) {
        navigator.clipboard.writeText(address).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check" style="color:var(--gold-primary);"></i> Copied!';
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2500);
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5.9 LIVE GLOBAL FINANCIAL CLOCKS
   -------------------------------------------------------------------------- */
function initWorldClocks() {
  const clockWilm = document.getElementById('clockWilmington');
  const clockLon = document.getElementById('clockLondon');
  const clockGuru = document.getElementById('clockGurugram');
  if (!clockWilm || !clockLon || !clockGuru) return;

  function updateClocks() {
    const now = new Date();
    
    const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    
    clockWilm.textContent = new Intl.DateTimeFormat('en-US', { ...opts, timeZone: 'America/New_York' }).format(now).toUpperCase();
    clockLon.textContent = new Intl.DateTimeFormat('en-GB', { ...opts, timeZone: 'Europe/London' }).format(now).toUpperCase();
    clockGuru.textContent = new Intl.DateTimeFormat('en-IN', { ...opts, timeZone: 'Asia/Kolkata' }).format(now).toUpperCase();
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

function initMediaFilters() {
  const filterBtns = document.querySelectorAll('.media-filter-btn');
  const articles = document.querySelectorAll('.press-article-item');
  if (!filterBtns.length || !articles.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');
      articles.forEach(article => {
        const articleCat = article.getAttribute('data-category');
        if (cat === 'all' || articleCat === cat) {
          article.style.display = 'flex';
          article.style.opacity = '1';
        } else {
          article.style.display = 'none';
          article.style.opacity = '0';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6.0 MULTI-LAYER PARALLAX EFFECT
   -------------------------------------------------------------------------- */
function initParallax() {
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  if (!parallaxLayers.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        parallaxLayers.forEach(layer => {
          const speed = parseFloat(layer.getAttribute('data-speed')) || 0.15;
          const yPos = -(scrolled * speed);
          layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initDigestEditions() {
  const editionBoxes = document.querySelectorAll('.digest-edition-box');
  if (!editionBoxes.length) return;

  editionBoxes.forEach(box => {
    box.addEventListener('click', () => {
      editionBoxes.forEach(b => b.classList.remove('active-edition'));
      box.classList.add('active-edition');
    });
  });
}

function initMembershipForm() {
  const memForm = document.getElementById('membershipJoinForm');
  if (!memForm) return;

  memForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Membership invitation requested! Our admissions committee will review your application.');
    memForm.reset();
  });
}

/* --------------------------------------------------------------------------
   6.1 INTERACTIVE CAP TABLE BEFORE/AFTER SWITCHER
   -------------------------------------------------------------------------- */
function initCaptableToggle() {
  const toggleBtns = document.querySelectorAll('.captable-toggle-btn');
  const viewTraditional = document.getElementById('viewTraditional');
  const viewThisaiva = document.getElementById('viewThisaiva');
  if (!toggleBtns.length || !viewTraditional || !viewThisaiva) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetView = btn.getAttribute('data-view');
      if (targetView === 'thisaiva') {
        viewTraditional.classList.add('hidden');
        viewThisaiva.classList.remove('hidden');
      } else {
        viewThisaiva.classList.add('hidden');
        viewTraditional.classList.remove('hidden');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6.2 INTERACTIVE MIGRATION READINESS SCORECARD
   -------------------------------------------------------------------------- */
function initReadinessChecklist() {
  const checkboxes = document.querySelectorAll('.readiness-checkbox-label input[type="checkbox"]');
  const scoreNumber = document.getElementById('readinessScoreNumber');
  const scoreStatus = document.getElementById('readinessScoreStatus');
  if (!checkboxes.length || !scoreNumber) return;

  function updateScore() {
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });

    const percent = Math.round((checkedCount / checkboxes.length) * 100);
    scoreNumber.textContent = `${percent}%`;

    if (scoreStatus) {
      if (percent === 100) {
        scoreStatus.textContent = '✓ Ready for Instant Seamless Migration!';
        scoreStatus.style.color = 'var(--gold-primary)';
      } else if (percent >= 50) {
        scoreStatus.textContent = 'Foundation in Place. Contact us for final steps.';
        scoreStatus.style.color = 'var(--gold-light)';
      } else {
        scoreStatus.textContent = 'Select items above to assess your migration readiness.';
        scoreStatus.style.color = 'var(--text-light-muted)';
      }
    }
  }

  checkboxes.forEach(cb => cb.addEventListener('change', updateScore));
}

function initStepHighlights() {
  const stepBoxes = document.querySelectorAll('.process-step-box');
  if (!stepBoxes.length) return;

  stepBoxes.forEach(box => {
    box.addEventListener('click', () => {
      stepBoxes.forEach(b => b.classList.remove('active-step'));
      box.classList.add('active-step');
    });
  });
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other open accordions
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });
}

/* --------------------------------------------------------------------------
   8. 3D TILT CARDS & CURSOR-FOLLOWING SPOTLIGHT EFFECT
   -------------------------------------------------------------------------- */
function initTiltCards() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (!tiltCards.length) return;

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7; // max 7 deg
      const rotateY = ((x - centerX) / centerX) * 7;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* --------------------------------------------------------------------------
   9. INTERACTIVE CAPABILITIES FILTER TABS
   -------------------------------------------------------------------------- */
function initFilterPills() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.vc-capability-card');
  if (!filterPills.length || !cards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterCategory = pill.getAttribute('data-filter');

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCat === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   10. INTERACTIVE VC FUND MODELING SIMULATOR
   -------------------------------------------------------------------------- */
function initSimulator() {
  const fundSizeSlider = document.getElementById('fundSizeSlider');
  const carrySlider = document.getElementById('carrySlider');
  if (!fundSizeSlider || !carrySlider) return;

  const fundSizeDisplay = document.getElementById('fundSizeDisplay');
  const carryDisplay = document.getElementById('carryDisplay');
  const resFundSize = document.getElementById('resFundSize');
  const resLPDeployed = document.getElementById('resLPDeployed');
  const resProjectedGross = document.getElementById('resProjectedGross');
  const resGPCarry = document.getElementById('resGPCarry');

  function calculateFund() {
    const fundSize = parseFloat(fundSizeSlider.value); // in Millions
    const carryPercent = parseFloat(carrySlider.value); // in %

    if (fundSizeDisplay) fundSizeDisplay.textContent = `$${fundSize}M`;
    if (carryDisplay) carryDisplay.textContent = `${carryPercent}%`;

    const lpInvested = (fundSize * 0.95).toFixed(1); // 95% deployable capital after 5% fees
    const projectedGross = (fundSize * 3.0).toFixed(1); // 3X fund MOIC
    const profit = projectedGross - fundSize;
    const gpCarry = (profit * (carryPercent / 100)).toFixed(1);

    if (resFundSize) resFundSize.textContent = `$${fundSize}M`;
    if (resLPDeployed) resLPDeployed.textContent = `$${lpInvested}M`;
    if (resProjectedGross) resProjectedGross.textContent = `$${projectedGross}M`;
    if (resGPCarry) resGPCarry.textContent = `$${gpCarry}M`;
  }

  fundSizeSlider.addEventListener('input', calculateFund);
  carrySlider.addEventListener('input', calculateFund);
}


/* --------------------------------------------------------------------------
   1. NAVBAR SCROLL & ACTIVE PAGE DETECTION
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initActivePageNav() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;

    const linkPath = linkHref.split('#')[0].split('/').pop();
    
    // If exact page match
    if (linkPath === currentPath || (currentPath === '' && (linkPath === 'index.html' || linkHref.startsWith('#')))) {
      link.classList.add('active');
    } else if (linkHref.startsWith('#') && (currentPath === 'index.html' || currentPath === '')) {
      // Keep on-page anchor detection for single-page scrolling on homepage
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   1.1 SCROLL REVEAL OBSERVER (SKILLFUNNEL-STYLE GPU TRANSITIONS)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  // Comprehensive selectors targeting headers, cards, grids and content blocks across all 9 pages
  const contentSelectors = [
    'section:not(.hero) .section-header',
    'section:not(.hero) .container > h2',
    'section:not(.hero) .section-eyebrow',
    'section:not(.hero) .section-description',
    '.metrics-card',
    '.metric-item',
    '.about-grid > div',
    '.about-dual-card-grid > div',
    '.mission-card',
    '.objective-card',
    '.why-card',
    '.why-choose-grid > div',
    '.testimonials-grid > div',
    '.testimonial-card',
    '.invest-card',
    '.investment-cards > div',
    '.vc-capability-card',
    '.vc-matrix-grid > div',
    '.faq-accordion-item',
    '.lux-feature-item',
    '.simulator-box',
    '.sim-result-card',
    '.founder-grid > div',
    '.captable-showcase-box',
    '.advantages-grid > div',
    '.advantage-card',
    '.angels-grid > div',
    '.syndicate-highlight-card',
    '.pillar-card',
    '.pillars-grid > div',
    '.journey-step-card',
    '.journey-grid > div',
    '.syndicate-cta-box',
    '.vip-metal-card-wrapper',
    '.community-top-grid > div',
    '.community-cards-grid > div',
    '.community-feature-card',
    '.digest-showcase-grid > div',
    '.digest-edition-box',
    '.c-pillars-grid > div',
    '.c-pillar-card',
    '.membership-form-card',
    '.migrate-top-grid > div',
    '.migrate-pipeline-card',
    '.migrate-pillars-grid > div',
    '.migrate-feature-card',
    '.process-interactive-grid > div',
    '.process-step-box',
    '.readiness-card',
    '.clock-card',
    '.locations-grid > div',
    '.location-card',
    '.media-bento-grid > div',
    '.media-spotlight-card',
    '.press-article-item',
    '.contact-suite-grid > div',
    '.contact-concierge-card',
    '.contact-interactive-form-box',
    '.exec-desk-card',
    '.office-hud-grid > div',
    '.office-hud-card',
    '.sla-trust-grid > div',
    '.sla-badge-box',
    '.blog-grid > div',
    '.blog-card',
    '.cta-banner-card',
    '.legal-section .container > *'
  ].join(', ');

  const contentBlocks = document.querySelectorAll(contentSelectors);

  contentBlocks.forEach((el) => {
    // Avoid double tagging or hero section tagging (hero uses CSS entrance animation)
    if (el.closest('.hero-content') || el.closest('.inner-hero-container')) return;

    if (!el.classList.contains('scroll-reveal') &&
        !el.classList.contains('scroll-reveal-left') &&
        !el.classList.contains('scroll-reveal-right') &&
        !el.classList.contains('scroll-reveal-scale')) {
      el.classList.add('scroll-reveal');
      
      // Auto-assign stagger delay to sibling items in grid/lists
      if (el.parentElement) {
        const siblings = Array.from(el.parentElement.children);
        const index = siblings.indexOf(el);
        if (index > 0 && index <= 5) {
          el.classList.add(`delay-${index}`);
        }
      }
    }
  });

  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
  
  if (!revealElements.length) return;

  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('navbar');

  if (!hamburgerBtn || !navLinks) return;

  // Create or get semi-transparent backdrop for mobile menu
  let navBackdrop = document.getElementById('navBackdrop');
  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.id = 'navBackdrop';
    navBackdrop.className = 'nav-backdrop';
    document.body.appendChild(navBackdrop);
  }

  // Track menu state
  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    navLinks.classList.add('active');
    navLinks.style.display = 'flex';
    if (navBackdrop) navBackdrop.classList.add('active');
    hamburgerBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    if (navbar) navbar.classList.add('menu-open');
  }

  function closeMenu() {
    menuOpen = false;
    navLinks.classList.remove('active');
    navLinks.style.display = 'none';
    if (navBackdrop) navBackdrop.classList.remove('active');
    hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (navbar) navbar.classList.remove('menu-open');
    // Close all dropdowns when menu closes
    navLinks.querySelectorAll('.nav-dropdown.mobile-open').forEach(dd => {
      dd.classList.remove('mobile-open');
    });
  }

  // Hamburger toggle
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Tapping the backdrop (the actual page visible behind) closes the menu
  navBackdrop.addEventListener('click', () => {
    if (menuOpen) closeMenu();
  });

  // Tapping anywhere outside the menu card closes it
  document.addEventListener('click', (e) => {
    if (menuOpen && !navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on navigation link click (except dropdown trigger)
  navLinks.querySelectorAll('a:not(.dropdown-trigger)').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Mobile dropdown accordion toggle (tap to open/close)
  navLinks.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const parentDropdown = trigger.closest('.nav-dropdown');
        if (parentDropdown) {
          // Close other open dropdowns
          navLinks.querySelectorAll('.nav-dropdown.mobile-open').forEach(dd => {
            if (dd !== parentDropdown) dd.classList.remove('mobile-open');
          });
          parentDropdown.classList.toggle('mobile-open');
        }
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
      closeMenu();
    }
  });

  // Close menu if window resized above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menuOpen) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   3. ANIMATED METRICS COUNTER
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const metricSection = document.querySelector('.metrics-section');
  const numbers = document.querySelectorAll('.metric-number');
  let animated = false;

  if (!metricSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        numbers.forEach(num => {
          const rawTarget = num.getAttribute('data-target');
          if (!rawTarget) return;

          const isFloat = rawTarget.includes('.');
          const targetVal = parseFloat(rawTarget);
          const originalText = num.textContent;
          const prefix = originalText.startsWith('$') ? '$' : '';
          const suffix = originalText.replace(/[\$\d\.,]/g, '');

          let start = 0;
          const duration = 2000; // ms
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = targetVal / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= targetVal) {
              start = targetVal;
              clearInterval(timer);
            }
            const displayVal = isFloat ? start.toFixed(1) : Math.floor(start).toLocaleString('en-US');
            num.textContent = `${prefix}${displayVal}${suffix}`;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(metricSection);
}

/* --------------------------------------------------------------------------
   4. LOCATION CARDS & REGIONAL TABS INTERACTIVITY
   -------------------------------------------------------------------------- */
function initGlobalMap() {
  const cards = document.querySelectorAll('.location-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // Region tabs bar (Desktop filter & Mobile compactness)
  const tabBtns = document.querySelectorAll('.region-tab-btn');
  const regionGroups = document.querySelectorAll('.region-group[data-region]');
  if (!tabBtns.length || !regionGroups.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-region-target');
      regionGroups.forEach(group => {
        const region = group.getAttribute('data-region');
        if (target === 'all' || region === target) {
          group.style.display = 'block';
          setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
          }, 30);
        } else {
          group.style.opacity = '0';
          group.style.transform = 'translateY(10px)';
          setTimeout(() => {
            group.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4.1 STICKY STACKING DECK PHYSICS FOR MOBILE SECTIONS (TND FORMULA)
   Applies to:
   1. Homepage & Media: Global Hubs / Office Locations Deck
   2. For Angels: Strategic Advantages Deck
   3. For VC: Comprehensive Capabilities Matrix Deck
   -------------------------------------------------------------------------- */
function initMobileLocationStacking() {
  const deckConfigs = [
    { containerSelector: '.global-section .region-group, .global-presence-section .region-group', cardSelector: '.location-card' },
    { containerSelector: '.pillars-section .pillars-grid', cardSelector: '.pillar-card' },
    { containerSelector: '.vc-capabilities-section .vc-matrix-grid', cardSelector: '.vc-capability-card' }
  ];

  // Helper to re-index visible cards
  const reindexCards = () => {
    deckConfigs.forEach(({ containerSelector, cardSelector }) => {
      document.querySelectorAll(containerSelector).forEach(container => {
        const visibleCards = Array.from(container.querySelectorAll(cardSelector)).filter(c => c.style.display !== 'none');
        visibleCards.forEach((card, idx) => {
          card.style.setProperty('--card-index', idx);
        });
      });
    });
  };

  reindexCards();

  const updateCardTransforms = () => {
    if (window.innerWidth > 768) {
      deckConfigs.forEach(({ containerSelector, cardSelector }) => {
        document.querySelectorAll(containerSelector).forEach(container => {
          container.querySelectorAll(cardSelector).forEach(card => {
            card.style.transform = '';
            card.style.opacity = '';
          });
        });
      });
      return;
    }

    deckConfigs.forEach(({ containerSelector, cardSelector }) => {
      document.querySelectorAll(containerSelector).forEach(container => {
        if (container.style.display === 'none') return;

        const cards = Array.from(container.querySelectorAll(cardSelector)).filter(c => c.style.display !== 'none');
        const totalCards = cards.length;

        cards.forEach((card, index) => {
          const nextCard = cards[index + 1];
          if (nextCard) {
            const rect = card.getBoundingClientRect();
            const nextRect = nextCard.getBoundingClientRect();
            const cardHeight = rect.height || 180;
            
            // Calculate overlap progress
            const overlap = Math.max(0, rect.bottom - nextRect.top);
            const progress = Math.min(1, Math.max(0, overlap / cardHeight));

            // Scale down cards below subsequent cards
            const maxScaleReduction = Math.min((totalCards - 1 - index) * 0.025, 0.08);
            const currentScale = 1 - (progress * maxScaleReduction);
            const currentOpacity = 1 - (progress * 0.08);

            card.style.transform = `scale(${currentScale})`;
            card.style.opacity = currentOpacity;
          } else {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
          }
        });
      });
    });
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateCardTransforms);
  }, { passive: true });

  window.addEventListener('resize', () => {
    reindexCards();
    requestAnimationFrame(updateCardTransforms);
  }, { passive: true });

  // Update when region tabs or capability filter pills change
  const filterTriggers = document.querySelectorAll('.region-tab-btn, .filter-pill');
  filterTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        reindexCards();
        updateCardTransforms();
      }, 250);
    });
  });

  updateCardTransforms();
}

/* --------------------------------------------------------------------------
   5. MODAL SYSTEM & FORM HANDLERS
   -------------------------------------------------------------------------- */
function openModal(contextTitle) {
  const modal = document.getElementById('contactModal');
  const modalTitle = document.getElementById('modalTitle');
  if (contextTitle && modalTitle) {
    modalTitle.textContent = contextTitle;
  }
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

/* --------------------------------------------------------------------------
   6. FORM SUBMISSIONS & TOAST NOTIFICATIONS
   -------------------------------------------------------------------------- */
function initFormHandlers() {
  const newsletterForm = document.getElementById('newsletterForm');
  const contactForm = document.getElementById('contactForm');

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Subscribed! You will now receive exclusive venture capital intel.');
    newsletterForm.reset();
  });

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thank you! Your executive inquiry has been transmitted to our structuring desk.');
    contactForm.reset();
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotification');
  let toastMsg = document.getElementById('toastMessage');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    toast.style.cssText = 'position:fixed; bottom:2rem; left:50%; transform:translateX(-50%) translateY(100px); background:rgba(6,26,21,0.98); border:1px solid var(--border-gold); padding:1rem 1.75rem; border-radius:50px; color:#ffffff; font-size:0.9rem; font-weight:600; box-shadow:0 15px 35px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.3); z-index:9999; opacity:0; transition:all 0.4s ease; display:flex; align-items:center; gap:0.75rem; pointer-events:none;';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--gold-primary); font-size:1.1rem;"></i> <span id="toastMessage"></span>`;
    document.body.appendChild(toast);
    toastMsg = document.getElementById('toastMessage');
  }

  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 4000);
  }
}

/* --------------------------------------------------------------------------
   BACK TO TOP BUTTON WITH WATER FILL SCROLL ANIMATION (SHREE-INT-3 EXACT)
   -------------------------------------------------------------------------- */
function initBackToTop() {
  let btn = document.getElementById('scrollTop');

  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'scrollTop';
    btn.className = 'scroll-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = `
      <span class="scroll-top__arrow"><i class="fa-solid fa-arrow-up"></i></span>
    `;
    document.body.appendChild(btn);
  }

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        btn.classList.toggle('scroll-top--visible', scrollTop > 250);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  let isScrolling = false;
  const scrollToTopAction = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isScrolling) return;
    isScrolling = true;

    // Fast, buttery smooth scroll to top across all platforms
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setTimeout(() => { isScrolling = false; }, 600);
    } catch (err) {
      const duration = 600;
      const start = window.scrollY || document.documentElement.scrollTop;
      const startTime = performance.now();

      function scrollStep(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start * (1 - ease));
        if (progress < 1) {
          requestAnimationFrame(scrollStep);
        } else {
          isScrolling = false;
        }
      }
      requestAnimationFrame(scrollStep);
    }
  };

  btn.addEventListener('click', scrollToTopAction);
  btn.addEventListener('touchend', (e) => {
    scrollToTopAction(e);
  }, { passive: false });
}
