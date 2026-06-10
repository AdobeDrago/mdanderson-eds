/**
 * Contact Bar Block
 *
 * Full-width blue appointment/contact banner.
 * Matches MD Anderson's `.appointment-bar` component.
 *
 * Document structure (single row):
 *   Row 0: the full banner text with inline bold, tel link and appointment link.
 *          Written as a plain paragraph in the doc, e.g.:
 *          "We're here for you. Call us at [tel link] or [appt link]."
 *
 * The block renders the paragraph content as-is inside the styled bar.
 */

export default function decorate(block) {
  const cell = block.querySelector('div > div');
  if (!cell) return;

  block.innerHTML = '';

  const inner = document.createElement('div');
  inner.className = 'contact-bar-inner';
  inner.innerHTML = cell.innerHTML;

  // Ensure the strong/bold tag inside gets the right class
  const bold = inner.querySelector('strong');
  if (bold) bold.className = 'contact-bar-bold';

  block.appendChild(inner);
}
