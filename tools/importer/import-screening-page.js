/* eslint-disable */
/* global WebImporter */

import cardsParser from './parsers/cards.js';
import embedParser from './parsers/embed.js';

import cleanupTransformer from './transformers/mdanderson-cleanup.js';
import sectionsTransformer from './transformers/mdanderson-sections.js';

const parsers = {
  'cards': cardsParser,
  'embed': embedParser,
};

const PAGE_TEMPLATE = {
  name: 'screening-page',
  description: 'Cancer screening information page with prevention guidelines and screening recommendations',
  urls: [
    'https://www.mdanderson.org/prevention-screening/get-screened/breast-cancer-screening.html'
  ],
  blocks: [
    {
      name: 'cards',
      instances: [
        '.promo.promo-simple.promo-icon-red',
        '.blog-summary.small',
        '.podcast-component',
        '.fis-articles',
        'section.highlight .table.table-3col'
      ]
    },
    {
      name: 'embed',
      instances: [
        '.media-player.media-single-small'
      ]
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Main Article Content',
      selector: '.col-content',
      style: null,
      blocks: [],
      defaultContent: ['.col-content h1', '.col-content h2', '.col-content h3', '.col-content p', '.col-content ul']
    },
    {
      id: 'section-2',
      name: 'Schedule Mammogram Promo',
      selector: '.promo.promo-simple.promo-icon-red',
      style: null,
      blocks: ['cards'],
      defaultContent: []
    },
    {
      id: 'section-3',
      name: 'Video Embeds',
      selector: '.cell-s.last .media-player.media-single-small',
      style: null,
      blocks: ['embed'],
      defaultContent: []
    },
    {
      id: 'section-4',
      name: 'Infographic and Related Articles',
      selector: '.cell-s.last .blog-summary.small',
      style: null,
      blocks: ['cards'],
      defaultContent: ['.cell-s.last .cq-dd-image']
    },
    {
      id: 'section-5',
      name: 'Podcasts',
      selector: '.podcast-component',
      style: null,
      blocks: ['cards'],
      defaultContent: []
    },
    {
      id: 'section-6',
      name: 'Featured Articles',
      selector: '.fis-articles',
      style: null,
      blocks: ['cards'],
      defaultContent: []
    },
    {
      id: 'section-7',
      name: 'Appointment CTA Bar',
      selector: 'section.appt-section',
      style: 'highlight',
      blocks: [],
      defaultContent: ['.appointment-bar .during-hours']
    },
    {
      id: 'section-8',
      name: 'Help EndCancer',
      selector: 'section.highlight.apply',
      style: 'highlight',
      blocks: ['cards'],
      defaultContent: ['.nested-section-title h2']
    }
  ]
};

const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach(blockDef => {
    blockDef.instances.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach(element => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    pageBlocks.forEach(block => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map(b => b.name),
      }
    }];
  }
};
