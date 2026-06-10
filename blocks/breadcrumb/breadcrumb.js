export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.className = 'breadcrumb-nav';

  const ol = document.createElement('ol');
  ol.className = 'breadcrumb-list';
  ol.setAttribute('itemscope', '');
  ol.setAttribute('itemtype', 'https://schema.org/BreadcrumbList');

  rows.forEach((row, i) => {
    const cell = row.querySelector('div');
    if (!cell) return;

    const li = document.createElement('li');
    li.className = 'breadcrumb-item';
    li.setAttribute('itemprop', 'itemListElement');
    li.setAttribute('itemscope', '');
    li.setAttribute('itemtype', 'https://schema.org/ListItem');

    const link = cell.querySelector('a');
    const isLast = i === rows.length - 1;

    if (link && !isLast) {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'breadcrumb-link';
      a.setAttribute('itemprop', 'item');
      const span = document.createElement('span');
      span.setAttribute('itemprop', 'name');
      span.textContent = link.textContent.trim();
      a.appendChild(span);
      li.appendChild(a);
    } else {
      const span = document.createElement('span');
      span.className = 'breadcrumb-current';
      span.setAttribute('itemprop', 'name');
      span.setAttribute('aria-current', 'page');
      span.textContent = (link?.textContent || cell.textContent).trim();
      li.appendChild(span);
    }

    const meta = document.createElement('meta');
    meta.setAttribute('itemprop', 'position');
    meta.setAttribute('content', String(i + 1));
    li.appendChild(meta);

    ol.appendChild(li);
  });

  nav.appendChild(ol);
  block.appendChild(nav);
}
