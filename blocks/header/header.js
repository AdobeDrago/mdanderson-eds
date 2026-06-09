const isDesktop = window.matchMedia('(min-width: 1025px)');

export default async function decorate(block) {
  let resp = await fetch('/content/nav.plain.html');
  if (!resp.ok) {
    const meta = document.querySelector('meta[name="nav"]');
    const navPath = meta ? meta.content : '/nav';
    resp = await fetch(`${navPath}.plain.html`);
  }
  if (!resp.ok) return;

  const html = await resp.text();
  const parser = new DOMParser();
  const navDoc = parser.parseFromString(html, 'text/html');
  const sections = navDoc.body.querySelectorAll(':scope > div');

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.className = 'nav-wrapper';
  nav.setAttribute('aria-expanded', 'false');

  // Section 0: Utility bar
  const utilSection = sections[0];
  if (utilSection) {
    const utilBar = document.createElement('div');
    utilBar.className = 'nav-utility-bar';
    utilSection.querySelectorAll('a').forEach((a) => {
      const link = a.cloneNode(true);
      link.className = 'nav-utility-link';
      utilBar.appendChild(link);
    });
    nav.appendChild(utilBar);
  }

  // Section 1: Brand bar
  const brandSection = sections[1];
  if (brandSection) {
    const brandBar = document.createElement('div');
    brandBar.className = 'nav-brand-bar';

    const logoLink = brandSection.querySelector('a');
    if (logoLink) {
      const logo = logoLink.cloneNode(true);
      logo.className = 'nav-logo';
      brandBar.appendChild(logo);
    }

    // Hamburger (mobile)
    const hamburger = document.createElement('button');
    hamburger.className = 'nav-hamburger';
    hamburger.setAttribute('aria-label', 'Open navigation');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span class="nav-hamburger-icon"></span>';
    brandBar.appendChild(hamburger);

    const lists = brandSection.querySelectorAll('ul');
    if (lists[0]) {
      const utilLinks = document.createElement('ul');
      utilLinks.className = 'nav-brand-links';
      lists[0].querySelectorAll('li').forEach((li) => {
        utilLinks.appendChild(li.cloneNode(true));
      });
      brandBar.appendChild(utilLinks);
    }

    if (lists[1]) {
      const langWrapper = document.createElement('div');
      langWrapper.className = 'nav-language-selector';
      const langBtn = document.createElement('button');
      langBtn.className = 'nav-language-trigger';
      langBtn.textContent = 'Languages';
      langBtn.setAttribute('aria-expanded', 'false');
      const langList = document.createElement('ul');
      langList.className = 'nav-language-list';
      lists[1].querySelectorAll('li').forEach((li) => {
        langList.appendChild(li.cloneNode(true));
      });
      langWrapper.appendChild(langBtn);
      langWrapper.appendChild(langList);
      brandBar.appendChild(langWrapper);
    }

    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'nav-search';
    const searchForm = document.createElement('form');
    searchForm.className = 'nav-search-form';
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Search';
    searchInput.className = 'nav-search-input';
    const searchBtn = document.createElement('button');
    searchBtn.className = 'nav-search-btn';
    searchBtn.type = 'submit';
    searchBtn.textContent = 'Go';
    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchBtn);
    searchWrapper.appendChild(searchForm);
    brandBar.appendChild(searchWrapper);

    nav.appendChild(brandBar);
  }

  // Section 2: Main navigation
  const navSection = sections[2];
  if (navSection) {
    const mainNav = document.createElement('div');
    mainNav.className = 'nav-main';

    const topList = navSection.querySelector(':scope > ul');
    if (topList) {
      const navList = document.createElement('ul');
      navList.className = 'nav-list';

      topList.querySelectorAll(':scope > li').forEach((li) => {
        const navItem = document.createElement('li');
        navItem.className = 'nav-item';

        const topLink = li.querySelector(':scope > a');
        if (topLink) {
          const link = topLink.cloneNode(true);
          link.className = 'nav-item-link';
          navItem.appendChild(link);
        }

        const subLists = li.querySelectorAll(':scope > ul');
        if (subLists.length > 0) {
          navItem.classList.add('has-dropdown');
          const chevron = document.createElement('button');
          chevron.className = 'nav-item-chevron';
          chevron.setAttribute('aria-expanded', 'false');
          chevron.setAttribute('aria-label', 'Expand submenu');
          navItem.appendChild(chevron);

          const panel = document.createElement('div');
          panel.className = 'nav-panel';

          const columnsWrapper = document.createElement('div');
          columnsWrapper.className = 'nav-panel-columns';

          const mainSubList = subLists[0];
          mainSubList.querySelectorAll(':scope > li').forEach((colLi) => {
            const column = document.createElement('div');
            column.className = 'nav-panel-column';

            const colLink = colLi.querySelector(':scope > a');
            if (colLink) {
              const heading = document.createElement('a');
              heading.href = colLink.href;
              heading.className = 'nav-panel-heading';
              heading.textContent = colLink.textContent;
              column.appendChild(heading);
            }

            const innerList = colLi.querySelector(':scope > ul');
            if (innerList) {
              const ul = document.createElement('ul');
              ul.className = 'nav-panel-links';
              innerList.querySelectorAll(':scope > li').forEach((innerLi) => {
                ul.appendChild(innerLi.cloneNode(true));
              });
              column.appendChild(ul);
            }

            columnsWrapper.appendChild(column);
          });

          panel.appendChild(columnsWrapper);

          if (subLists[1]) {
            const aside = document.createElement('div');
            aside.className = 'nav-panel-aside';
            subLists[1].querySelectorAll(':scope > li').forEach((ctaLi) => {
              const ctaItem = document.createElement('div');
              ctaItem.className = 'nav-panel-cta';
              const ctaLink = ctaLi.querySelector('a');
              if (ctaLink) {
                const a = ctaLink.cloneNode(true);
                a.className = 'nav-panel-cta-link';
                ctaItem.appendChild(a);
              }
              const desc = ctaLi.querySelector('p');
              if (desc) {
                const p = desc.cloneNode(true);
                p.className = 'nav-panel-cta-desc';
                ctaItem.appendChild(p);
              }
              aside.appendChild(ctaItem);
            });
            panel.appendChild(aside);
          }

          navItem.appendChild(panel);
        }

        navList.appendChild(navItem);
      });

      mainNav.appendChild(navList);
    }

    nav.appendChild(mainNav);
  }

  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  nav.appendChild(overlay);

  block.textContent = '';
  block.appendChild(nav);

  // Desktop hover handlers
  const navItems = block.querySelectorAll('.nav-item.has-dropdown');
  navItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      if (!isDesktop.matches) return;
      navItems.forEach((other) => other.classList.remove('is-open'));
      item.classList.add('is-open');
      item.querySelector('.nav-item-chevron').setAttribute('aria-expanded', 'true');
      overlay.classList.add('visible');
    });
    item.addEventListener('mouseleave', () => {
      if (!isDesktop.matches) return;
      item.classList.remove('is-open');
      item.querySelector('.nav-item-chevron').setAttribute('aria-expanded', 'false');
      overlay.classList.remove('visible');
    });
  });

  // Language dropdown
  const langTrigger = block.querySelector('.nav-language-trigger');
  if (langTrigger) {
    langTrigger.addEventListener('click', () => {
      const expanded = langTrigger.getAttribute('aria-expanded') === 'true';
      langTrigger.setAttribute('aria-expanded', String(!expanded));
      langTrigger.closest('.nav-language-selector').classList.toggle('is-open');
    });
  }

  // Hamburger toggle
  const hamburgerBtn = block.querySelector('.nav-hamburger');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const expanded = nav.getAttribute('aria-expanded') === 'true';
      nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      hamburgerBtn.setAttribute('aria-expanded', String(!expanded));
      hamburgerBtn.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      document.body.style.overflowY = expanded ? '' : 'hidden';
    });
  }

  // Mobile chevron accordion
  block.querySelectorAll('.nav-item-chevron').forEach((chevron) => {
    chevron.addEventListener('click', (e) => {
      if (isDesktop.matches) return;
      e.stopPropagation();
      const item = chevron.closest('.nav-item');
      const expanded = chevron.getAttribute('aria-expanded') === 'true';
      chevron.setAttribute('aria-expanded', String(!expanded));
      item.classList.toggle('is-open');
    });
  });

  // Close on overlay click
  overlay.addEventListener('click', () => {
    navItems.forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('.nav-item-chevron').setAttribute('aria-expanded', 'false');
    });
    overlay.classList.remove('visible');
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navItems.forEach((item) => {
        item.classList.remove('is-open');
        item.querySelector('.nav-item-chevron').setAttribute('aria-expanded', 'false');
      });
      overlay.classList.remove('visible');
      if (!isDesktop.matches) {
        nav.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflowY = '';
      }
    }
  });

  // Viewport resize handling
  isDesktop.addEventListener('change', (e) => {
    if (e.matches) {
      nav.setAttribute('aria-expanded', 'false');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflowY = '';
      navItems.forEach((item) => {
        item.classList.remove('is-open');
        item.querySelector('.nav-item-chevron').setAttribute('aria-expanded', 'false');
      });
      overlay.classList.remove('visible');
    } else {
      overlay.classList.remove('visible');
    }
  });
}
