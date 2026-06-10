export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  const ul = document.createElement('ul');
  ul.className = 'featured-articles-list';

  rows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    if (cells.length < 2) return;

    const li = document.createElement('li');
    li.className = 'featured-articles-item';

    // Get link href from the title cell
    const titleLink = cells[1].querySelector('a');
    const href = titleLink?.href || '#';

    // Wrap everything in an <a>
    const card = document.createElement('a');
    card.href = href;
    card.className = 'featured-articles-card';

    // Image section
    const imgDiv = document.createElement('div');
    imgDiv.className = 'featured-articles-img';
    const pic = cells[0].querySelector('picture') || cells[0].querySelector('img');
    if (pic) imgDiv.appendChild(pic.closest ? (pic.closest('picture') || pic) : pic);
    card.appendChild(imgDiv);

    // Title section
    const titleDiv = document.createElement('div');
    titleDiv.className = 'featured-articles-title-wrapper';
    const h3 = document.createElement('h3');
    h3.className = 'featured-articles-title';
    h3.textContent = titleLink?.textContent?.trim() || cells[1].textContent.trim();
    titleDiv.appendChild(h3);
    card.appendChild(titleDiv);

    li.appendChild(card);
    ul.appendChild(li);
  });

  block.appendChild(ul);
}
