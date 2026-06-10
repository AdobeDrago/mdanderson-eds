/**
 * Schedule CTA Block
 *
 * Expected document structure:
 *   Row 1: Icon keyword (e.g. "calendar") — optional, defaults to calendar
 *   Row 2: Heading text
 *   Row 3: Body text / description (can be multiple paragraphs)
 *   Row 4: Phone line (plain text, e.g. "To schedule by phone, call 1-844-240-7092.")
 *   Row 5: CTA link (a single <a> tag)
 *
 * All rows are wrapped in <div><div>...</div></div> per EDS block convention.
 */

export default function decorate(block) {
  const rows = [...block.children];

  // Extract content from rows
  const iconRow = rows[0]?.querySelector('div');
  const headingRow = rows[1]?.querySelector('div');
  const bodyRow = rows[2]?.querySelector('div');
  const phoneRow = rows[3]?.querySelector('div');
  const ctaRow = rows[4]?.querySelector('div');

  // Build the component
  block.innerHTML = '';

  // --- Icon ---
  const iconWrap = document.createElement('div');
  iconWrap.className = 'schedule-cta-icon';
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <rect x="4" y="8" width="32" height="28" rx="2" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <line x1="4" y1="16" x2="36" y2="16" stroke="currentColor" stroke-width="2.5"/>
    <line x1="13" y1="4" x2="13" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="27" y1="4" x2="27" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <text x="20" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">1</text>
  </svg>`;
  iconWrap.innerHTML = iconSvg;
  block.appendChild(iconWrap);

  // --- Heading ---
  if (headingRow) {
    const h = document.createElement('h3');
    h.className = 'schedule-cta-heading';
    h.textContent = headingRow.textContent.trim();
    block.appendChild(h);
  }

  // --- Body ---
  if (bodyRow) {
    const body = document.createElement('div');
    body.className = 'schedule-cta-body';
    body.innerHTML = bodyRow.innerHTML;
    block.appendChild(body);
  }

  // --- Phone ---
  if (phoneRow) {
    const phone = document.createElement('p');
    phone.className = 'schedule-cta-phone';
    phone.innerHTML = phoneRow.innerHTML;
    block.appendChild(phone);
  }

  // --- CTA Button ---
  if (ctaRow) {
    const link = ctaRow.querySelector('a');
    if (link) {
      const btn = document.createElement('a');
      btn.href = link.href;
      btn.className = 'schedule-cta-btn';
      btn.textContent = link.textContent.trim();
      if (link.target) btn.target = link.target;
      block.appendChild(btn);
    }
  }
}
