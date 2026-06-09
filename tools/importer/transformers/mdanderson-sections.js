/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: mdanderson sections.
 * Inserts section breaks (<hr>) and Section Metadata blocks based on template sections.
 * Runs in afterTransform only. Processes sections in reverse order.
 * All selectors verified from captured DOM (cleaned.html).
 *
 * Template sections:
 *   section-1: .col-content (Main Article Content) - style: null
 *   section-2: .promo.promo-simple.promo-icon-red (Schedule Mammogram Promo) - style: null
 *   section-3: .cell-s.last .media-player.media-single-small (Video Embeds) - style: null
 *   section-4: .cell-s.last .blog-summary.small (Infographic and Related Articles) - style: null
 *   section-5: .podcast-component (Podcasts) - style: null
 *   section-6: .fis-articles (Featured Articles) - style: null
 *   section-7: section.appt-section (Appointment CTA Bar) - style: highlight
 *   section-8: section.highlight.apply (Help EndCancer) - style: highlight
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const document = element.ownerDocument;
    const sections = template.sections;

    // Process sections in reverse order to maintain DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const selector = Array.isArray(section.selector) ? section.selector[0] : section.selector;

      const sectionEl = element.querySelector(selector);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before section element (except for the first section)
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
