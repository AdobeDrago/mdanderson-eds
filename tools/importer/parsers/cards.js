/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards
 * Base block: cards
 * Source: https://www.mdanderson.org/prevention-screening/get-screened/breast-cancer-screening.html
 * Generated: 2026-06-08
 * Validated: selectors confirmed against live DOM
 *
 * Handles multiple card patterns found on MD Anderson pages:
 * 1. .promo.promo-simple.promo-icon-red - promotional callout (icon, heading, text, CTA)
 * 2. .blog-summary.small - individual article teaser card (image, title, text, read more)
 * 3. .podcast-component - podcast section with header image + episode cards
 * 4. .fis-articles - featured articles container with linked image+title cards
 * 5. section.highlight .table.table-3col - 3-column promotional cards (each .cell-t has a .promo)
 *
 * Target structure per library example (per card):
 *   Row 1: image (optional)
 *   Row 2: title
 *   Row 3: description text + CTA links
 */
export default function parse(element, { document }) {
  const cells = [];

  // Determine which pattern based on validated DOM selectors
  const isPromoSimple = element.matches('.promo.promo-simple, .promo[class*="promo-simple"]');
  const isBlogSummary = element.matches('.blog-summary.small');
  const isPodcast = element.matches('.podcast-component, section.podcast-component');
  const isFisArticles = element.matches('.fis-articles, div.fis-articles');
  const isTable3col = element.matches('.table.table-3col, .table-3col');
  // Also check if element contains a .table-3col (for section.highlight wrapper)
  const hasTable3col = !isTable3col && element.querySelector('.table.table-3col, .table-3col');

  if (isPromoSimple) {
    // Pattern 1: Promo callout card
    // Structure: .promo-icon-header-wrapper > .promo-header > h3.title
    //            .promo-text > .body.promo-text-normal > p (multiple)
    //            .promo-text > .cta-wrapper > a.cta
    const heading = element.querySelector('.promo-header h3.title, .promo-header h3, .promo-header h2');
    const bodyDiv = element.querySelector('.body.promo-text-normal, .promo-text .body');
    const ctaLink = element.querySelector('.cta-wrapper a.cta, .cta-wrapper a.cta-block, a.cta');

    // Row 1: heading
    if (heading) {
      cells.push([heading]);
    }

    // Row 2: description paragraphs + CTA as a single content block
    const wrapper = document.createElement('div');
    if (bodyDiv) {
      const paragraphs = Array.from(bodyDiv.querySelectorAll('p'));
      if (paragraphs.length > 0) {
        paragraphs.forEach((p) => wrapper.appendChild(p.cloneNode(true)));
      } else {
        // Body may be plain text without <p> tags
        const textP = document.createElement('p');
        textP.textContent = bodyDiv.textContent.trim();
        wrapper.appendChild(textP);
      }
    }
    if (ctaLink) {
      wrapper.appendChild(ctaLink.cloneNode(true));
    }
    if (wrapper.childNodes.length > 0) {
      cells.push([wrapper]);
    }

  } else if (isBlogSummary) {
    // Pattern 2: Individual blog summary card
    // Structure: <a> wrapping img + h3.blog-title
    //            sibling <div.blog-summary-wrapper.text> with .summary-text + a.cta "Read more"
    const linkWrapper = element.querySelector(':scope > a[href]');
    const image = element.querySelector('.blog-summary-img-wrapper img, img');
    const heading = element.querySelector('h3.blog-title, h3, .blog-title');
    const summaryText = element.querySelector('.summary-text');
    const readMoreLink = element.querySelector('.summary-cta-info a.cta, .summary-cta-info a');

    // Row 1: image
    if (image) {
      cells.push([image]);
    }

    // Row 2: heading
    if (heading) {
      cells.push([heading]);
    }

    // Row 3: description + read more link
    const contentWrapper = document.createElement('div');
    if (summaryText) {
      const p = document.createElement('p');
      p.textContent = summaryText.textContent.trim();
      contentWrapper.appendChild(p);
    }
    if (readMoreLink) {
      contentWrapper.appendChild(readMoreLink.cloneNode(true));
    } else if (linkWrapper) {
      // Use the main link as fallback
      const link = document.createElement('a');
      link.href = linkWrapper.href;
      link.textContent = 'Read more';
      contentWrapper.appendChild(link);
    }
    if (contentWrapper.childNodes.length > 0) {
      cells.push([contentWrapper]);
    }

  } else if (isPodcast) {
    // Pattern 3: Podcast section with multiple episodes
    // Structure: .podcast-container > .top-side-multiple > img (header)
    //            .podcast-items > .podcast-display-item > .podcastOne/.podcastTwo/.podcastThree
    //            Each podcast: h2.podcast-title + .podcast-cta a + .podcast-transcript-cta a
    const headerImage = element.querySelector('.top-side-multiple img, .podcast-container > div > img');
    const sectionHeader = element.querySelector('h2.podcast-header');

    // Row 1: header image
    if (headerImage) {
      cells.push([headerImage]);
    }

    // Row for section heading if present
    if (sectionHeader) {
      cells.push([sectionHeader]);
    }

    // One card row per episode: title + links grouped
    const episodes = Array.from(element.querySelectorAll('.podcastOne, .podcastTwo, .podcastThree, [class^="podcast"][class$="One"], [class^="podcast"][class$="Two"], [class^="podcast"][class$="Three"]'));

    episodes.forEach((episode) => {
      const title = episode.querySelector('h2.podcast-title, h2:not(.podcast-header)');
      const episodeLink = episode.querySelector('.podcast-cta a');
      const transcriptLink = episode.querySelector('.podcast-transcript-cta a');

      // Each episode gets a title row and a links row
      if (title) {
        cells.push([title]);
      }
      const linksWrapper = document.createElement('div');
      if (episodeLink) {
        linksWrapper.appendChild(episodeLink.cloneNode(true));
      }
      if (transcriptLink) {
        linksWrapper.appendChild(transcriptLink.cloneNode(true));
      }
      if (linksWrapper.childNodes.length > 0) {
        cells.push([linksWrapper]);
      }
    });

  } else if (isFisArticles) {
    // Pattern 4: Featured articles container
    // Structure: h2.fis-articles-title + .article-container > a.blog-summary.small.fis
    //            Each <a>: .blog-summary-img-wrapper > img + .blog-summary-wrapper > h3.blog-title
    const sectionTitle = element.querySelector('h2.fis-articles-title, h2');
    const articles = Array.from(element.querySelectorAll('.article-container > a, a.blog-summary.fis, a.fis'));

    // Optional section heading row
    if (sectionTitle) {
      cells.push([sectionTitle]);
    }

    // One card per article: image row + title row
    articles.forEach((article) => {
      const image = article.querySelector('.blog-summary-img-wrapper img, img');
      const heading = article.querySelector('h3.blog-title, h3');

      if (image) {
        cells.push([image]);
      }
      if (heading) {
        // Wrap heading with the article link for navigation
        const link = document.createElement('a');
        link.href = article.href;
        link.textContent = heading.textContent.trim();
        cells.push([link]);
      }
    });

  } else if (isTable3col || hasTable3col) {
    // Pattern 5: 3-column table of promotional cards
    // Structure: .table-3col > .cell-t (x3) > .module > .promo
    //            Each .promo: .promo-header > h3.title + .promo-text > .body + .cta-wrapper > a.cta
    const tableEl = hasTable3col || element;
    const cardCells = Array.from(tableEl.querySelectorAll(':scope > .cell-t, :scope > div.cell-t'));

    cardCells.forEach((cell) => {
      const promo = cell.querySelector('.promo');
      if (!promo) return;

      const heading = promo.querySelector('.promo-header h3.title, .promo-header h3, .promo-header h2');
      const bodyDiv = promo.querySelector('.body.promo-text-normal, .promo-text .body');
      const ctaLink = promo.querySelector('.cta-wrapper a.cta, .cta-wrapper a.cta-block');

      // Each promo card: heading row + content row
      if (heading) {
        cells.push([heading]);
      }

      const wrapper = document.createElement('div');
      if (bodyDiv) {
        const paragraphs = Array.from(bodyDiv.querySelectorAll('p'));
        if (paragraphs.length > 0) {
          paragraphs.forEach((p) => wrapper.appendChild(p.cloneNode(true)));
        } else {
          const textP = document.createElement('p');
          textP.textContent = bodyDiv.textContent.trim();
          wrapper.appendChild(textP);
        }
      }
      if (ctaLink) {
        wrapper.appendChild(ctaLink.cloneNode(true));
      }
      if (wrapper.childNodes.length > 0) {
        cells.push([wrapper]);
      }
    });

  } else {
    // Generic fallback: extract any card-like content
    const image = element.querySelector('img');
    const heading = element.querySelector('h1, h2, h3, h4, .title');
    const description = element.querySelector('p, .description');
    const links = Array.from(element.querySelectorAll('a[href]'));

    if (image) cells.push([image]);
    if (heading) cells.push([heading]);
    const wrapper = document.createElement('div');
    if (description) wrapper.appendChild(description.cloneNode(true));
    links.forEach((link) => wrapper.appendChild(link.cloneNode(true)));
    if (wrapper.childNodes.length > 0) cells.push([wrapper]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
