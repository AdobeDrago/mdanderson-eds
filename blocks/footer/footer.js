/* MD Anderson Footer — matches .global-footer structure:
 * 1. Black subscribe band (newsletter form + social + podcast)
 * 2. White links band (logo + 4 columns)
 * 3. Light grey sub-links bar
 * 4. Black bottom bar (Making Cancer History logo + mission + copyright)
 */

/* SVG icons for social platforms */
const SOCIAL_ICONS = {
  facebook:    `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  'x (twitter)': `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16M4 20 20 4"/></svg>`,
  x:           `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16M4 20 20 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  youtube:     `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>`,
  instagram:   `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  linkedin:    `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  bluesky:     `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 10.8C10.8 8.4 7.8 4 5 4 2 4 2 7 2 8s1 3 4 3.5c-3 .5-4 2-4 3.5s1.5 3 4 3c3 0 5-2.5 6-4.5 1 2 3 4.5 6 4.5 2.5 0 4-1.5 4-3s-1-3-4-3.5C21 11 22 9 22 8s0-4-3-4c-2.8 0-5.8 4.4-7 6.8z"/></svg>`,
  threads:     `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a8 8 0 0 1 8 8c0 5-3.5 12-8 12S4 15 4 10a8 8 0 0 1 8-8z"/><path d="M12 8v4l3 3"/></svg>`,
  default:     `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
};

const PODCAST_ICONS = {
  'apple podcasts':  `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3a7 7 0 1 1 0 14A7 7 0 0 1 12 5zm0 2a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>`,
  spotify:           `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12.5s2-1.5 6 0M7 9.5s3.5-2 9 0M9 15.5s1.5-1 5 0"/></svg>`,
  youtube:           SOCIAL_ICONS.youtube,
  'amazon music':    `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18s3-2 9-2 9 2 9 2M12 4a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V8a4 4 0 0 1 4-4z"/></svg>`,
  'iheart radio':    `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  rss:               `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>`,
  default:           `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18s3-2 9-2 9 2 9 2"/><circle cx="12" cy="8" r="4"/></svg>`,
};

function getSocialIcon(label) {
  const key = (label || '').toLowerCase();
  return SOCIAL_ICONS[key] || SOCIAL_ICONS.default;
}

function getPodcastIcon(label) {
  const key = (label || '').toLowerCase();
  return PODCAST_ICONS[key] || PODCAST_ICONS.default;
}

export default async function decorate(block) {
  let resp = await fetch('/content/footer.plain.html');
  if (!resp.ok) {
    const meta = document.querySelector('meta[name="footer"]');
    const footerPath = meta ? meta.content : '/footer';
    resp = await fetch(`${footerPath}.plain.html`);
  }
  if (!resp.ok) return;

  const html = await resp.text();
  const parser = new DOMParser();
  const footerDoc = parser.parseFromString(html, 'text/html');
  const sections = [...footerDoc.body.querySelectorAll(':scope > div')];

  const wrapper = document.createElement('div');
  wrapper.className = 'footer-wrapper';

  /* ============================================================
     SECTION 0 — Black newsletter + social + podcast band
     ============================================================ */
  const sec0 = sections[0];
  if (sec0) {
    const band = document.createElement('div');
    band.className = 'footer-subscribe-band';

    // Newsletter row
    const subRow = document.createElement('div');
    subRow.className = 'footer-subscribe-row';

    // Email icon
    const iconWrap = document.createElement('div');
    iconWrap.className = 'footer-subscribe-icon';
    iconWrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
    subRow.appendChild(iconWrap);

    // Title
    const titleP = sec0.querySelector('p');
    const titleWrap = document.createElement('div');
    titleWrap.className = 'footer-subscribe-title';
    titleWrap.textContent = titleP?.textContent?.trim() || 'Subscribe to our Cancerwise newsletter';
    subRow.appendChild(titleWrap);

    // Form
    const form = document.createElement('form');
    form.action = 'https://www.mdanderson.org/publications.html';
    form.method = 'post';
    form.className = 'footer-subscribe-form';
    const fieldsWrap = document.createElement('div');
    fieldsWrap.className = 'footer-subscribe-fields';
    [
      { name: 'tfa_23', ph: 'First Name *', type: 'text', ac: 'given-name' },
      { name: 'tfa_38', ph: 'Last Name *', type: 'text', ac: 'family-name' },
      { name: 'tfa_20', ph: 'Email Address *', type: 'email', ac: 'email' },
    ].forEach(({ name, ph, type, ac }) => {
      const inp = document.createElement('input');
      inp.type = type;
      inp.name = name;
      inp.placeholder = ph;
      inp.autocomplete = ac;
      inp.required = true;
      fieldsWrap.appendChild(inp);
    });
    form.appendChild(fieldsWrap);
    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = 'Get started';
    form.appendChild(btn);
    subRow.appendChild(form);
    band.appendChild(subRow);

    // Social + podcast icons row
    const lists = sec0.querySelectorAll('ul');
    if (lists[0]) {
      const socialRow = document.createElement('div');
      socialRow.className = 'footer-social-row';

      const socialWrap = document.createElement('div');
      socialWrap.className = 'footer-social-group';
      const socialLabel = document.createElement('span');
      socialLabel.className = 'footer-social-label';
      socialLabel.textContent = 'Stay Connected';
      socialWrap.appendChild(socialLabel);
      const socialLinks = document.createElement('div');
      socialLinks.className = 'footer-social-icons';
      [...lists[0].querySelectorAll('a')].forEach((a) => {
        const link = document.createElement('a');
        link.href = a.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', a.getAttribute('aria-label') || a.textContent.trim());
        link.className = 'footer-social-icon';
        link.innerHTML = getSocialIcon(a.getAttribute('aria-label') || a.textContent.trim());
        socialLinks.appendChild(link);
      });
      socialWrap.appendChild(socialLinks);
      socialRow.appendChild(socialWrap);

      if (lists[1]) {
        const podcastWrap = document.createElement('div');
        podcastWrap.className = 'footer-social-group';
        const podcastLabel = document.createElement('span');
        podcastLabel.className = 'footer-social-label';
        podcastLabel.textContent = 'Cancerwise Podcast';
        podcastWrap.appendChild(podcastLabel);
        const podcastLinks = document.createElement('div');
        podcastLinks.className = 'footer-podcast-icons';
        [...lists[1].querySelectorAll('a')].forEach((a) => {
          const link = document.createElement('a');
          link.href = a.href;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.setAttribute('aria-label', a.getAttribute('aria-label') || a.textContent.trim());
          link.className = 'footer-podcast-icon';
          link.innerHTML = getPodcastIcon(a.getAttribute('aria-label') || a.textContent.trim());
          podcastLinks.appendChild(link);
        });
        podcastWrap.appendChild(podcastLinks);
        socialRow.appendChild(podcastWrap);
      }

      band.appendChild(socialRow);
    }

    wrapper.appendChild(band);
  }

  /* ============================================================
     SECTION 1 — White links band (logo + columns)
     ============================================================ */
  const sec1 = sections[1];
  if (sec1) {
    const band = document.createElement('div');
    band.className = 'footer-links-band';

    // Logo
    const logoP = sec1.querySelector('p');
    const logoLink = logoP?.querySelector('a');
    if (logoLink) {
      const logoWrap = document.createElement('div');
      logoWrap.className = 'footer-logo-wrap';
      const logo = logoLink.cloneNode(true);
      logo.className = 'footer-logo';
      logoWrap.appendChild(logo);
      band.appendChild(logoWrap);
    }

    // Columns
    const colsWrap = document.createElement('div');
    colsWrap.className = 'footer-columns';

    const uls = [...sec1.querySelectorAll('ul')];
    uls.forEach((ul, colIdx) => {
      const col = document.createElement('div');
      const isContactCol = colIdx === uls.length - 1; // last col = GET IN TOUCH
      col.className = isContactCol ? 'footer-column footer-column--contact' : 'footer-column';

      const items = [...ul.querySelectorAll('li')];
      let currentSection = null;

      items.forEach((li) => {
        const link = li.querySelector('a');
        const text = li.textContent.trim();
        if (!link) {
          // Section heading
          const h4 = document.createElement('h4');
          h4.className = 'footer-column-heading';
          h4.textContent = text;
          col.appendChild(h4);
          currentSection = text.toLowerCase();
        } else if (isContactCol && (currentSection === 'stay connected' || currentSection === 'cancerwise podcast')) {
          // Render as icon link in social/podcast rows
          const label = link.getAttribute('aria-label') || text;
          const iconLink = document.createElement('a');
          iconLink.href = link.href;
          iconLink.target = '_blank';
          iconLink.rel = 'noopener noreferrer';
          iconLink.setAttribute('aria-label', label);
          iconLink.className = currentSection === 'cancerwise podcast' ? 'footer-podcast-icon' : 'footer-social-icon';
          iconLink.innerHTML = currentSection === 'cancerwise podcast'
            ? getPodcastIcon(label)
            : getSocialIcon(label);

          // Find or create icon container
          let iconRow = col.querySelector(`.footer-contact-icons--${currentSection.replace(/\s/g, '-')}`);
          if (!iconRow) {
            iconRow = document.createElement('div');
            iconRow.className = `footer-contact-icons footer-contact-icons--${currentSection.replace(/\s/g, '-')}`;
            col.appendChild(iconRow);
          }
          iconRow.appendChild(iconLink);
        } else if (isContactCol && currentSection === 'get in touch') {
          // Phone/contact items with red circle icon
          const item = document.createElement('div');
          item.className = 'footer-contact-item';
          const isPhone = link.href.startsWith('tel:');
          item.innerHTML = `<div class="footer-contact-icon-circle">${isPhone
            ? `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
            : `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
          }</div>`;
          const a = link.cloneNode(true);
          a.className = 'footer-contact-link';
          item.appendChild(a);
          col.appendChild(item);
        } else {
          const p = document.createElement('p');
          const a = link.cloneNode(true);
          p.appendChild(a);
          col.appendChild(p);
        }
      });

      colsWrap.appendChild(col);
    });

    band.appendChild(colsWrap);
    wrapper.appendChild(band);
  }

  /* ============================================================
     SECTION 2 — Light grey sub-links / legal bar
     ============================================================ */
  const sec2 = sections[2];
  if (sec2) {
    const band = document.createElement('div');
    band.className = 'footer-sublinks-band';
    const ul = sec2.querySelector('ul');
    if (ul) {
      const list = document.createElement('ul');
      list.className = 'footer-sublinks-list';
      [...ul.querySelectorAll('li a')].forEach((a, idx, arr) => {
        const li = document.createElement('li');
        const link = a.cloneNode(true);
        li.appendChild(link);
        if (idx < arr.length - 1) {
          const sep = document.createElement('span');
          sep.className = 'footer-sublinks-sep';
          sep.setAttribute('aria-hidden', 'true');
          sep.textContent = '|';
          li.appendChild(sep);
        }
        list.appendChild(li);
      });
      band.appendChild(list);
    }
    wrapper.appendChild(band);
  }

  /* ============================================================
     SECTION 3 — Black bottom bar (Making Cancer History + mission + copyright)
     ============================================================ */
  const sec3 = sections[3];
  if (sec3) {
    const band = document.createElement('div');
    band.className = 'footer-bottom-band';

    const logoP = sec3.querySelector('p');
    const logoLink = logoP?.querySelector('a');
    if (logoLink) {
      const logoWrap = document.createElement('div');
      logoWrap.className = 'footer-bottom-logo';
      logoWrap.appendChild(logoLink.cloneNode(true));
      band.appendChild(logoWrap);
    }

    const textWrap = document.createElement('div');
    textWrap.className = 'footer-bottom-text';
    const paragraphs = [...sec3.querySelectorAll('p')].slice(1); // skip logo p
    paragraphs.forEach((p) => {
      const el = document.createElement('p');
      el.className = p.textContent.includes('©') ? 'footer-copyright' : 'footer-mission';
      el.innerHTML = p.innerHTML;
      textWrap.appendChild(el);
    });
    band.appendChild(textWrap);
    wrapper.appendChild(band);
  }

  block.textContent = '';
  block.appendChild(wrapper);
}
