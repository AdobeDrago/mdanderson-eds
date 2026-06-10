export default function decorate(block) {
  // Row 0: label text (e.g. "Jump To:")
  // Row 1+: each row is a nav item — either a link or plain text
  // Build:
  //   <div class="page-nav-label">Jump To:</div>
  //   <ul class="page-nav-list">
  //     <li class="page-nav-item [active]"><a href="...">Text</a></li>
  //   </ul>

  const rows = [...block.children];
  block.innerHTML = '';

  // Label row
  const labelRow = rows[0]?.querySelector('div');
  if (labelRow) {
    const label = document.createElement('div');
    label.className = 'page-nav-label';
    label.textContent = labelRow.textContent.trim();
    block.appendChild(label);
  }

  // Nav items
  const ul = document.createElement('ul');
  ul.className = 'page-nav-list';

  rows.slice(1).forEach((row) => {
    const cell = row.querySelector('div');
    if (!cell) return;
    const link = cell.querySelector('a');
    const li = document.createElement('li');
    li.className = 'page-nav-item';

    // Mark active if href matches current page
    if (link) {
      const href = link.getAttribute('href');
      const isActive = window.location.pathname === href
        || window.location.pathname === href.replace(/\.html$/, '');
      if (isActive) li.classList.add('active');
      li.appendChild(link.cloneNode(true));
    } else {
      const span = document.createElement('span');
      span.textContent = cell.textContent.trim();
      li.appendChild(span);
    }
    ul.appendChild(li);
  });

  block.appendChild(ul);
}
