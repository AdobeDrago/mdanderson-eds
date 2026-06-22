const MICROPHONE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
const TRANSCRIPT_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>';

export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  // Row 0: logo image
  const logoCell = rows[0]?.querySelector('div');
  if (logoCell) {
    const logoWrap = document.createElement('div');
    logoWrap.className = 'featured-podcasts-logo';
    const img = logoCell.querySelector('img, picture');
    if (img) logoWrap.appendChild(img.closest('picture') || img);
    block.appendChild(logoWrap);
  }

  // Row 1: section label
  const labelCell = rows[1]?.querySelector('div');
  if (labelCell) {
    const h3 = document.createElement('h3');
    h3.className = 'featured-podcasts-heading';
    h3.textContent = labelCell.textContent.trim();
    block.appendChild(h3);
  }

  // Rows 2+: podcast episodes
  const episodeList = document.createElement('ul');
  episodeList.className = 'featured-podcasts-list';

  rows.slice(2).forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    if (!cells.length) return;

    const li = document.createElement('li');
    li.className = 'featured-podcasts-episode';

    // Cell 0: episode title
    const title = document.createElement('p');
    title.className = 'featured-podcasts-title';
    title.textContent = cells[0]?.textContent?.trim() || '';
    li.appendChild(title);

    // Cell 1: listen link
    const listenLink = cells[1]?.querySelector('a');
    if (listenLink) {
      const linksWrap = document.createElement('div');
      linksWrap.className = 'featured-podcasts-links';
      const a = document.createElement('a');
      a.href = listenLink.href;
      a.target = '_self';
      a.className = 'featured-podcasts-link';
      a.innerHTML = `${MICROPHONE_ICON}<span>${listenLink.textContent.trim()}</span>`;
      linksWrap.appendChild(a);

      // Cell 2: transcript link
      const transcriptLink = cells[2]?.querySelector('a');
      if (transcriptLink) {
        const b = document.createElement('a');
        b.href = transcriptLink.href;
        b.target = '_self';
        b.className = 'featured-podcasts-link';
        b.innerHTML = `${TRANSCRIPT_ICON}<span>${transcriptLink.textContent.trim()}</span>`;
        linksWrap.appendChild(b);
      }
      li.appendChild(linksWrap);
    }

    episodeList.appendChild(li);
  });

  block.appendChild(episodeList);
}
