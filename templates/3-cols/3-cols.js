import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../../blocks/fragment/fragment.js';

/**
 * Loads a fragment from a metadata path and returns all of its content
 * (every section/block the fragment contains), so nothing authored in the
 * fragment is dropped.
 * @param {string} path Fragment path (e.g. /fragments/right-col)
 * @returns {Promise<Element[]>} the fragment's child elements (sections)
 */
async function loadColumn(path) {
  if (!path) return [];
  try {
    const fragment = await loadFragment(path);
    return fragment ? [...fragment.children] : [];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`3-cols: failed to load fragment ${path}`, e);
    return [];
  }
}

/**
 * Arranges a flat page into a 3-column layout:
 *   [ page-nav | default content + featured-articles | schedule-cta ]
 * The breadcrumb stays full-width above; contact-bar and end-cancer-cards
 * stay full-width below. Left nav and right rail are pulled from fragments
 * referenced by the `pag-nav` and `right-cols` metadata.
 * @param {Document} doc
 */
export default async function decorate(doc) {
  const main = doc.querySelector('main');
  if (!main) return;

  const sections = [...main.querySelectorAll(':scope > .section')];
  const breadcrumb = sections.find((s) => s.querySelector('.breadcrumb'));
  const contactBar = sections.find((s) => s.querySelector('.contact-bar'));

  // Center column = every section between the breadcrumb and the contact-bar:
  // the default-content (article body) section(s) plus featured-articles.
  const startIdx = breadcrumb ? sections.indexOf(breadcrumb) + 1 : 0;
  const endIdx = contactBar ? sections.indexOf(contactBar) : sections.length;
  const centerSections = sections.slice(startIdx, endIdx);
  if (!centerSections.length) return;

  // Load the left nav and right rail fragments in parallel.
  // `page-nav` is the current key; `pag-nav` is the legacy (typo) key kept for back-compat.
  const [nav, aside] = await Promise.all([
    loadColumn(getMetadata('page-nav') || getMetadata('pag-nav')),
    loadColumn(getMetadata('right-cols')),
  ]);

  const grid = document.createElement('div');
  grid.className = 'threecol-grid';

  const navCol = document.createElement('div');
  navCol.className = 'threecol-nav';
  navCol.append(...nav);

  const mainCol = document.createElement('div');
  mainCol.className = 'threecol-main';
  centerSections.forEach((section) => mainCol.append(section));

  const asideCol = document.createElement('div');
  asideCol.className = 'threecol-aside';
  asideCol.append(...aside);

  grid.append(navCol, mainCol, asideCol);

  // Insert the grid where the center content used to be.
  if (contactBar) {
    main.insertBefore(grid, contactBar);
  } else {
    main.append(grid);
  }
}
