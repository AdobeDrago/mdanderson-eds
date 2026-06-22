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

  // Build the grid skeleton synchronously so the main article paints in the
  // correct 3-column layout immediately — without waiting on the side fragments.
  const grid = document.createElement('div');
  grid.className = 'threecol-grid';

  const navCol = document.createElement('div');
  navCol.className = 'threecol-nav';

  const mainCol = document.createElement('div');
  mainCol.className = 'threecol-main';
  centerSections.forEach((section) => mainCol.append(section));

  const asideCol = document.createElement('div');
  asideCol.className = 'threecol-aside';

  grid.append(navCol, mainCol, asideCol);

  // Insert the grid where the center content used to be.
  if (contactBar) {
    main.insertBefore(grid, contactBar);
  } else {
    main.append(grid);
  }

  // Load the left nav and right rail fragments WITHOUT blocking first paint.
  // The side columns are non-critical (not the LCP element) and the grid track
  // widths are fixed (240px / 358px), so populating them late causes no layout
  // shift. `page-nav` is the current metadata key; `pag-nav` is the legacy typo.
  loadColumn(getMetadata('page-nav') || getMetadata('pag-nav')).then((els) => navCol.append(...els));
  loadColumn(getMetadata('right-cols')).then((els) => asideCol.append(...els));
}
