const CARD_COLORS = ['red', 'black', 'blue'];

export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'end-cancer-grid';

  rows.forEach((row, i) => {
    const cell = row.querySelector('div');
    if (!cell) return;

    const card = document.createElement('div');
    card.className = `end-cancer-card end-cancer-card--${CARD_COLORS[i] || 'red'}`;

    const title = cell.querySelector('h3');
    if (title) {
      const h3 = document.createElement('h3');
      h3.className = 'end-cancer-card-title';
      h3.textContent = title.textContent.trim();
      card.appendChild(h3);
    }

    const body = [...cell.querySelectorAll('p')].find((p) => !p.querySelector('a'));
    if (body) {
      const p = document.createElement('p');
      p.className = 'end-cancer-card-body';
      p.textContent = body.textContent.trim();
      card.appendChild(p);
    }

    const ctaP = [...cell.querySelectorAll('p')].find((p) => p.querySelector('a'));
    if (ctaP) {
      const link = ctaP.querySelector('a');
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'end-cancer-card-cta';
      a.textContent = `${link.textContent.trim()} `;
      if (link.target) a.target = link.target;

      // External link icon (replaces mda-icon-linkout from original site)
      const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      iconSvg.setAttribute('viewBox', '0 0 12 12');
      iconSvg.setAttribute('width', '12');
      iconSvg.setAttribute('height', '12');
      iconSvg.setAttribute('fill', 'none');
      iconSvg.setAttribute('stroke', 'currentColor');
      iconSvg.setAttribute('stroke-width', '1.5');
      iconSvg.setAttribute('aria-hidden', 'true');
      iconSvg.setAttribute('class', 'end-cancer-cta-icon');
      iconSvg.innerHTML = '<path d="M1 11L11 1M11 1H4M11 1V8"/>';
      a.appendChild(iconSvg);

      card.appendChild(a);
    }

    grid.appendChild(card);
  });

  block.appendChild(grid);
}
