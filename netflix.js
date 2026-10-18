(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ── 1. Header: transparent → solid on scroll ── */
  var header = $('#nf-header');
  function onScroll() {
    if (header) header.classList.toggle('nf-solid', window.scrollY > 60);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 2. Billboard rotation + Ken Burns + dot indicators ── */
  var hero = $('#nf-hero');
  if (hero) {
    var imgs = $$(':scope > img', hero);
    var dots = $$('button[aria-label^="Show artwork"]', hero);
    var cur = 0, timer;

    function show(i) {
      cur = i;
      imgs.forEach(function (im, k) {
        im.classList.toggle('opacity-100', k === i);
        im.classList.toggle('opacity-0',  k !== i);
        if (k === i) {
          // restart kenburns by force-reflow
          im.classList.remove('kenburns');
          void im.offsetWidth;
          im.classList.add('kenburns');
        } else {
          im.classList.remove('kenburns');
        }
      });
      dots.forEach(function (d, k) {
        var on = k === i;
        d.classList.toggle('w-6',        on);
        d.classList.toggle('bg-white',   on);
        d.classList.toggle('w-3',        !on);
        d.classList.toggle('bg-white/35', !on);
      });
    }

    function start() {
      clearInterval(timer);
      timer = setInterval(function () { show((cur + 1) % imgs.length); }, 7000);
    }

    dots.forEach(function (d, k) {
      d.addEventListener('click', function () { show(k); start(); });
    });

    show(0); // init
    if (imgs.length > 1) start();
  }

  /* ── 3. Tile titles from aria-label ("Watch X" → "X") ── */
  $$('.rail .tile').forEach(function (t) {
    var slot = $('.min-w-0', t);
    var label = (t.getAttribute('aria-label') || '').replace(/^Watch\s+/i, '');
    if (slot && label && !slot.textContent.trim()) {
      var p = document.createElement('p');
      p.className = 'nf-title';
      p.textContent = label;
      slot.appendChild(p);
    }
  });

  /* ── 4. Rail arrows: scroll + visibility control ── */
  $$('.rail').forEach(function (rail) {
    var section = rail.closest('section.group\\/rail') || rail.closest('section');
    if (!section) return;

    var prev = section.querySelector('button[aria-label="Scroll left"]');
    var next = section.querySelector('button[aria-label="Scroll right"]');

    // Remove Tailwind classes that hide arrows
    [prev, next].forEach(function (btn) {
      if (!btn) return;
      btn.classList.remove('hidden', 'md:flex', 'pointer-events-none', 'opacity-0');
      btn.removeAttribute('hidden');
      btn.style.display = '';
    });

    function updateArrows() {
      var atStart = rail.scrollLeft < 8;
      var atEnd   = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
      if (prev) { prev.style.opacity = atStart ? '0' : ''; prev.style.pointerEvents = atStart ? 'none' : ''; }
      if (next) { next.style.opacity = atEnd   ? '0' : ''; next.style.pointerEvents = atEnd   ? 'none' : ''; }
    }

    rail.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();

    if (prev) prev.addEventListener('click', function () {
      rail.scrollBy({ left: -(rail.clientWidth * 0.82), behavior: 'smooth' });
    });
    if (next) next.addEventListener('click', function () {
      rail.scrollBy({ left:  rail.clientWidth * 0.82, behavior: 'smooth' });
    });
  });

  /* ── 5. Touch-swipe hint: subtle shimmer on first load ── */
  if (window.matchMedia('(hover: none)').matches) {
    setTimeout(function () {
      var firstRail = $('.rail');
      if (firstRail) {
        firstRail.scrollBy({ left: 40, behavior: 'smooth' });
        setTimeout(function () {
          firstRail.scrollBy({ left: -40, behavior: 'smooth' });
        }, 600);
      }
    }, 1200);
  }

  /* ── 6. Netflix-style Footer Layout ── */
  function initFooter() {
    var footer = $('footer');
    if (!footer || footer.classList.contains('nf-footer-ready')) return;
    footer.classList.add('nf-footer-ready');

    var appStoreBtn = footer.querySelector('button[aria-label*="App Store"]');
    var gPlayBtn    = footer.querySelector('button[aria-label*="Google Play"]');
    var statusDiv   = footer.querySelector('[role="status"]');
    var xLink       = footer.querySelector('a[href*="x.com"]');
    var logoImg     = footer.querySelector('img[src*="live-wordmark"]');
    var legalP      = footer.querySelector('p');

    var nfFooterHTML = 
      '<div class="nf-footer-inner">' +
        '<div class="nf-footer-top">' +
          '<div class="nf-footer-top-left">' +
            (logoImg ? '<a href="/" class="nf-footer-brand"><img src="' + logoImg.src + '" alt="LIVE" height="22" width="48" /></a>' : '') +
            '<p class="nf-footer-contact">Questions? Call <a href="tel:1-800-873-2646">1-800-USE-LIVE</a> or <a href="https://usestream.tv/docs" target="_blank">Contact Us</a></p>' +
          '</div>' +
          (xLink ? 
            '<div class="nf-footer-socials">' +
              '<a href="' + xLink.href + '" target="_blank" rel="noreferrer" aria-label="LIVE on X" class="nf-social-icon">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">' +
                  '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"></path>' +
                '</svg>' +
              '</a>' +
            '</div>' : '') +
        '</div>' +

        '<ul class="nf-footer-grid">' +
          '<li><a href="javascript:void(0)" class="nf-scroll-faq">FAQ</a></li>' +
          '<li><a href="https://usestream.tv/docs" target="_blank">Help Centre</a></li>' +
          '<li><a href="javascript:void(0)">Account</a></li>' +
          '<li><a href="https://usestream.tv/docs" target="_blank">Media Centre</a></li>' +
          '<li><a href="https://usestream.tv/wishlist">Investor Relations</a></li>' +
          '<li><a href="https://usestream.tv/docs" target="_blank">Jobs</a></li>' +
          '<li><a href="https://usestream.tv/watch">Ways to Watch</a></li>' +
          '<li><a href="https://usestream.tv/docs" target="_blank">Terms of Use</a></li>' +
          '<li><a href="https://usestream.tv/docs" target="_blank">Privacy</a></li>' +
          '<li><a href="javascript:void(0)">Cookie Preferences</a></li>' +
          '<li><a href="https://usestream.tv/docs" target="_blank">Corporate Information</a></li>' +
          '<li><a href="https://usestream.tv/docs" target="_blank">Contact Us</a></li>' +
          '<li><a href="https://fast.com" target="_blank" rel="noreferrer">Speed Test</a></li>' +
          '<li><a href="https://usestream.tv/docs" target="_blank">Legal Notices</a></li>' +
          '<li><a href="https://usestream.tv/watch">Only on $LIVE</a></li>' +
          '<li><a href="https://usestream.tv/docs" target="_blank">Docs</a></li>' +
        '</ul>' +

        '<div class="nf-footer-apps" id="nf-footer-apps-slot"></div>' +

        '<div class="nf-footer-lang">' +
          '<button type="button" class="nf-lang-btn" aria-label="Select Language">' +
            '<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">' +
              '<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm5.93 7h-2.57a14.3 14.3 0 0 0-1.07-4.14A6.02 6.02 0 0 1 13.93 7zM8 1.95c.78 1.41 1.39 3.19 1.57 5.05H6.43c.18-1.86.79-3.64 1.57-5.05zM2.07 7a6.02 6.02 0 0 1 3.64-4.14C5.2 4.14 4.79 5.53 4.64 7H2.07zm0 2h2.57c.15 1.47.56 2.86 1.07 4.14A6.02 6.02 0 0 1 2.07 9zm5.93 5.05c-.78-1.41-1.39-3.19-1.57-5.05h3.14c-.18 1.86-.79 3.64-1.57 5.05zm2.29-1.91c.51-1.28.92-2.67 1.07-4.14h2.57a6.02 6.02 0 0 1-3.64 4.14z"/>' +
            '</svg>' +
            '<span>English</span>' +
            '<svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor">' +
              '<path d="M0 0l5 5 5-5z"/>' +
            '</svg>' +
          '</button>' +
        '</div>' +

        '<div class="nf-footer-country">$LIVE Global</div>' +

        '<div class="nf-footer-disclaimer">' +
          (legalP ? legalP.innerHTML : 'Media for the people, by the people: streams are made for the $LIVE community. Not available to U.S. persons. $LIVE is a utility token: it unlocks the player and nothing else. Read the <a href="https://usestream.tv/docs" target="_blank">docs</a> for the full risk disclosure.') +
        '</div>' +
      '</div>';

    footer.innerHTML = nfFooterHTML;

    var appsSlot = footer.querySelector('#nf-footer-apps-slot');
    if (appsSlot) {
      if (appStoreBtn) appsSlot.appendChild(appStoreBtn);
      if (gPlayBtn)    appsSlot.appendChild(gPlayBtn);
    }
    if (statusDiv) footer.appendChild(statusDiv);

    function showToast() {
      if (!statusDiv) return;
      statusDiv.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
      statusDiv.classList.add('opacity-100', 'translate-y-0');
      setTimeout(function () {
        statusDiv.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
        statusDiv.classList.remove('opacity-100', 'translate-y-0');
      }, 2500);
    }
    if (appStoreBtn) appStoreBtn.addEventListener('click', showToast);
    if (gPlayBtn)    gPlayBtn.addEventListener('click', showToast);

    var faqLink = footer.querySelector('.nf-scroll-faq');
    if (faqLink) {
      faqLink.addEventListener('click', function (e) {
        e.preventDefault();
        var faqHeading = $('h2');
        var details = $('details');
        var target = (faqHeading && faqHeading.textContent.toLowerCase().indexOf('frequently') !== -1) ? faqHeading : details;
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  /* ── 7. Remove Token Banner Section ("One token. One key to every stream") ── */
  function removeTokenBanner() {
    var tokenImg = $('img[src*="token-lights"]');
    if (tokenImg) {
      var sec = tokenImg.closest('section');
      if (sec) sec.remove();
    }
  }

  /* ── 8. Netflix-style Accordion (exclusive open) ── */
  function initFAQ() {
    var detailsList = $$('details');
    detailsList.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (d.open) {
          detailsList.forEach(function (other) {
            if (other !== d && other.open) other.open = false;
          });
        }
      });
    });
  }

  function init() {
    removeTokenBanner();
    initFAQ();
    initFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();