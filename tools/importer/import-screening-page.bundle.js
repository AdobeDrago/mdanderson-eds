/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-screening-page.js
  var import_screening_page_exports = {};
  __export(import_screening_page_exports, {
    default: () => import_screening_page_default
  });

  // tools/importer/parsers/cards.js
  function parse(element, { document }) {
    const cells = [];
    const isPromoSimple = element.matches('.promo.promo-simple, .promo[class*="promo-simple"]');
    const isBlogSummary = element.matches(".blog-summary.small");
    const isPodcast = element.matches(".podcast-component, section.podcast-component");
    const isFisArticles = element.matches(".fis-articles, div.fis-articles");
    const isTable3col = element.matches(".table.table-3col, .table-3col");
    const hasTable3col = !isTable3col && element.querySelector(".table.table-3col, .table-3col");
    if (isPromoSimple) {
      const heading = element.querySelector(".promo-header h3.title, .promo-header h3, .promo-header h2");
      const bodyDiv = element.querySelector(".body.promo-text-normal, .promo-text .body");
      const ctaLink = element.querySelector(".cta-wrapper a.cta, .cta-wrapper a.cta-block, a.cta");
      if (heading) {
        cells.push([heading]);
      }
      const wrapper = document.createElement("div");
      if (bodyDiv) {
        const paragraphs = Array.from(bodyDiv.querySelectorAll("p"));
        if (paragraphs.length > 0) {
          paragraphs.forEach((p) => wrapper.appendChild(p.cloneNode(true)));
        } else {
          const textP = document.createElement("p");
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
      const linkWrapper = element.querySelector(":scope > a[href]");
      const image = element.querySelector(".blog-summary-img-wrapper img, img");
      const heading = element.querySelector("h3.blog-title, h3, .blog-title");
      const summaryText = element.querySelector(".summary-text");
      const readMoreLink = element.querySelector(".summary-cta-info a.cta, .summary-cta-info a");
      if (image) {
        cells.push([image]);
      }
      if (heading) {
        cells.push([heading]);
      }
      const contentWrapper = document.createElement("div");
      if (summaryText) {
        const p = document.createElement("p");
        p.textContent = summaryText.textContent.trim();
        contentWrapper.appendChild(p);
      }
      if (readMoreLink) {
        contentWrapper.appendChild(readMoreLink.cloneNode(true));
      } else if (linkWrapper) {
        const link = document.createElement("a");
        link.href = linkWrapper.href;
        link.textContent = "Read more";
        contentWrapper.appendChild(link);
      }
      if (contentWrapper.childNodes.length > 0) {
        cells.push([contentWrapper]);
      }
    } else if (isPodcast) {
      const headerImage = element.querySelector(".top-side-multiple img, .podcast-container > div > img");
      const sectionHeader = element.querySelector("h2.podcast-header");
      if (headerImage) {
        cells.push([headerImage]);
      }
      if (sectionHeader) {
        cells.push([sectionHeader]);
      }
      const episodes = Array.from(element.querySelectorAll('.podcastOne, .podcastTwo, .podcastThree, [class^="podcast"][class$="One"], [class^="podcast"][class$="Two"], [class^="podcast"][class$="Three"]'));
      episodes.forEach((episode) => {
        const title = episode.querySelector("h2.podcast-title, h2:not(.podcast-header)");
        const episodeLink = episode.querySelector(".podcast-cta a");
        const transcriptLink = episode.querySelector(".podcast-transcript-cta a");
        if (title) {
          cells.push([title]);
        }
        const linksWrapper = document.createElement("div");
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
      const sectionTitle = element.querySelector("h2.fis-articles-title, h2");
      const articles = Array.from(element.querySelectorAll(".article-container > a, a.blog-summary.fis, a.fis"));
      if (sectionTitle) {
        cells.push([sectionTitle]);
      }
      articles.forEach((article) => {
        const image = article.querySelector(".blog-summary-img-wrapper img, img");
        const heading = article.querySelector("h3.blog-title, h3");
        if (image) {
          cells.push([image]);
        }
        if (heading) {
          const link = document.createElement("a");
          link.href = article.href;
          link.textContent = heading.textContent.trim();
          cells.push([link]);
        }
      });
    } else if (isTable3col || hasTable3col) {
      const tableEl = hasTable3col || element;
      const cardCells = Array.from(tableEl.querySelectorAll(":scope > .cell-t, :scope > div.cell-t"));
      cardCells.forEach((cell) => {
        const promo = cell.querySelector(".promo");
        if (!promo) return;
        const heading = promo.querySelector(".promo-header h3.title, .promo-header h3, .promo-header h2");
        const bodyDiv = promo.querySelector(".body.promo-text-normal, .promo-text .body");
        const ctaLink = promo.querySelector(".cta-wrapper a.cta, .cta-wrapper a.cta-block");
        if (heading) {
          cells.push([heading]);
        }
        const wrapper = document.createElement("div");
        if (bodyDiv) {
          const paragraphs = Array.from(bodyDiv.querySelectorAll("p"));
          if (paragraphs.length > 0) {
            paragraphs.forEach((p) => wrapper.appendChild(p.cloneNode(true)));
          } else {
            const textP = document.createElement("p");
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
      const image = element.querySelector("img");
      const heading = element.querySelector("h1, h2, h3, h4, .title");
      const description = element.querySelector("p, .description");
      const links = Array.from(element.querySelectorAll("a[href]"));
      if (image) cells.push([image]);
      if (heading) cells.push([heading]);
      const wrapper = document.createElement("div");
      if (description) wrapper.appendChild(description.cloneNode(true));
      links.forEach((link) => wrapper.appendChild(link.cloneNode(true)));
      if (wrapper.childNodes.length > 0) cells.push([wrapper]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/embed.js
  function parse2(element, { document }) {
    const videoContainer = element.querySelector(".display-video-content[id]");
    let videoId = videoContainer ? videoContainer.id : null;
    if (!videoId) {
      const dataEl = element.querySelector("[data-video-id]");
      if (dataEl) {
        videoId = dataEl.getAttribute("data-video-id");
      }
    }
    if (!videoId) {
      const iframe = element.querySelector('iframe[src*="youtube"]');
      if (iframe) {
        const src = iframe.getAttribute("src");
        const match = src.match(/(?:embed\/|v=)([a-zA-Z0-9_-]+)/);
        if (match) {
          videoId = match[1];
        }
      }
    }
    const youtubeUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : "";
    const link = document.createElement("a");
    link.href = youtubeUrl;
    link.textContent = youtubeUrl;
    const cells = [
      [link]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "embed", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/mdanderson-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#video-overlay",
        "#yt-overlay"
      ]);
      WebImporter.DOMUtils.remove(element, [".social-share-modal"]);
      WebImporter.DOMUtils.remove(element, [".scrollToTop"]);
      WebImporter.DOMUtils.remove(element, ["#alert-url-data"]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, ["header.mda-nav"]);
      WebImporter.DOMUtils.remove(element, ["nav.mda-nav"]);
      WebImporter.DOMUtils.remove(element, [".breadcrumb-wrapper"]);
      WebImporter.DOMUtils.remove(element, [".col-sidebar"]);
      WebImporter.DOMUtils.remove(element, [".medical-reviewer-component"]);
      WebImporter.DOMUtils.remove(element, [".global-footer"]);
      WebImporter.DOMUtils.remove(element, ["#guide"]);
      WebImporter.DOMUtils.remove(element, ["iframe"]);
      WebImporter.DOMUtils.remove(element, ["link", "source", "noscript"]);
      element.querySelectorAll("[data-track]").forEach((el) => {
        el.removeAttribute("data-track");
      });
      element.querySelectorAll("[onclick]").forEach((el) => {
        el.removeAttribute("onclick");
      });
    }
  }

  // tools/importer/transformers/mdanderson-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const document = element.ownerDocument;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selector = Array.isArray(section.selector) ? section.selector[0] : section.selector;
        const sectionEl = element.querySelector(selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-screening-page.js
  var parsers = {
    "cards": parse,
    "embed": parse2
  };
  var PAGE_TEMPLATE = {
    name: "screening-page",
    description: "Cancer screening information page with prevention guidelines and screening recommendations",
    urls: [
      "https://www.mdanderson.org/prevention-screening/get-screened/breast-cancer-screening.html"
    ],
    blocks: [
      {
        name: "cards",
        instances: [
          ".promo.promo-simple.promo-icon-red",
          ".blog-summary.small",
          ".podcast-component",
          ".fis-articles",
          "section.highlight .table.table-3col"
        ]
      },
      {
        name: "embed",
        instances: [
          ".media-player.media-single-small"
        ]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Main Article Content",
        selector: ".col-content",
        style: null,
        blocks: [],
        defaultContent: [".col-content h1", ".col-content h2", ".col-content h3", ".col-content p", ".col-content ul"]
      },
      {
        id: "section-2",
        name: "Schedule Mammogram Promo",
        selector: ".promo.promo-simple.promo-icon-red",
        style: null,
        blocks: ["cards"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Video Embeds",
        selector: ".cell-s.last .media-player.media-single-small",
        style: null,
        blocks: ["embed"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Infographic and Related Articles",
        selector: ".cell-s.last .blog-summary.small",
        style: null,
        blocks: ["cards"],
        defaultContent: [".cell-s.last .cq-dd-image"]
      },
      {
        id: "section-5",
        name: "Podcasts",
        selector: ".podcast-component",
        style: null,
        blocks: ["cards"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Featured Articles",
        selector: ".fis-articles",
        style: null,
        blocks: ["cards"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Appointment CTA Bar",
        selector: "section.appt-section",
        style: "highlight",
        blocks: [],
        defaultContent: [".appointment-bar .during-hours"]
      },
      {
        id: "section-8",
        name: "Help EndCancer",
        selector: "section.highlight.apply",
        style: "highlight",
        blocks: ["cards"],
        defaultContent: [".nested-section-title h2"]
      }
    ]
  };
  var transformers = [
    transform,
    transform2
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
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
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
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
  var import_screening_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_screening_page_exports);
})();
