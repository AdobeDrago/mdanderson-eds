export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  // Row 0: image (with link)
  const imgCell = rows[0]?.querySelector('div');
  if (imgCell) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'sidebar-article-img';
    imgWrap.innerHTML = imgCell.innerHTML;
    block.appendChild(imgWrap);
  }

  // Row 1: title
  const titleCell = rows[1]?.querySelector('div');
  if (titleCell) {
    const titleWrap = document.createElement('div');
    titleWrap.className = 'sidebar-article-title';
    titleWrap.innerHTML = titleCell.innerHTML;
    block.appendChild(titleWrap);
  }

  // Row 2: summary
  const summaryCell = rows[2]?.querySelector('div');
  if (summaryCell) {
    const summaryWrap = document.createElement('div');
    summaryWrap.className = 'sidebar-article-summary';
    summaryWrap.innerHTML = summaryCell.innerHTML;
    block.appendChild(summaryWrap);
  }

  // Row 3: CTA (Read more link)
  const ctaCell = rows[3]?.querySelector('div');
  if (ctaCell) {
    const ctaWrap = document.createElement('div');
    ctaWrap.className = 'sidebar-article-cta';
    const link = ctaCell.querySelector('a');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'sidebar-article-read-more';
      a.textContent = link.textContent.trim() || 'Read more';
      ctaWrap.appendChild(a);
    }
    block.appendChild(ctaWrap);
  }
}
