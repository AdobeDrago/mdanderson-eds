import { decorateBlock, loadBlock } from '../../scripts/aem.js';

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
    .filter((el) => !el.classList.contains('columns')
      && !el.classList.contains('columns-img-col')
      && !el.dataset.blockStatus);
  await Promise.all(nestedBlocks.map(async (nestedBlock) => {
    decorateBlock(nestedBlock);
    await loadBlock(nestedBlock);
  }));
}
