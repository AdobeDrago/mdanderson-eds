import { decorateBlock, loadBlock } from '../../scripts/aem.js';

function blockNameToClasses(text) {
  const variantMatch = text.match(/^([^(]+?)\s*\(([^)]+)\)\s*$/);
  if (variantMatch) {
    const mainName = variantMatch[1].trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const variants = variantMatch[2].split(',').map((v) => v.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    return [mainName, ...variants];
  }
  return [text.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')];
}

function convertTableToBlock(table) {
  const tbody = table.querySelector('tbody') || table;
  const rows = [...tbody.querySelectorAll(':scope > tr')];
  if (!rows.length) return null;
  const firstRowCells = [...rows[0].querySelectorAll('td, th')];
  // EDS block tables have exactly one header cell (possibly with colspan)
  if (firstRowCells.length !== 1) return null;
  const classes = blockNameToClasses(firstRowCells[0].textContent.trim());
  if (!classes.length) return null;
  const blockDiv = document.createElement('div');
  blockDiv.className = classes.join(' ');
  rows.slice(1).forEach((row) => {
    const rowDiv = document.createElement('div');
    [...row.querySelectorAll(':scope > td')].forEach((td) => {
      const cellDiv = document.createElement('div');
      while (td.firstChild) cellDiv.appendChild(td.firstChild);
      rowDiv.appendChild(cellDiv);
    });
    blockDiv.appendChild(rowDiv);
  });
  table.replaceWith(blockDiv);
  return blockDiv;
}

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // Convert EDS-format nested tables (single-cell header row) to block divs.
  // EDS pipeline leaves nested tables as raw <table> inside block cells.
  block.querySelectorAll('table').forEach((table) => convertTableToBlock(table));

  // Unwrap any block divs that got wrapped in <p> tags by the HTML parser.
  // Move all children of the <p> before the <p>, then remove the empty <p>.
  block.querySelectorAll('p > div[class]').forEach((blockDiv) => {
    const p = blockDiv.parentElement;
    if (p.tagName !== 'P') return;
    const parent = p.parentElement;
    // Move every child of <p> out before the <p>
    while (p.firstChild) {
      parent.insertBefore(p.firstChild, p);
    }
    p.remove();
  });

  // Decorate and load any nested blocks inside column cells
  // (EDS auto-decoration only covers div.section > div > div)
  const nestedBlocks = [...block.querySelectorAll('div[class]')]
    .filter((el) => !el.classList.contains('columns-img-col')
      && !el.dataset.blockStatus);
  await Promise.all(nestedBlocks.map(async (nestedBlock) => {
    decorateBlock(nestedBlock);
    await loadBlock(nestedBlock);
  }));
}
