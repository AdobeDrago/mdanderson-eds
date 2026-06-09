/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: mdanderson cleanup.
 * Removes non-authorable site chrome and widgets.
 * All selectors verified from captured DOM (cleaned.html).
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Video overlays that could affect block parsing
    // Found in DOM: <div id="video-overlay" class="media-overlay fade-out">
    // Found in DOM: <div id="yt-overlay" class="media-overlay fade-out">
    WebImporter.DOMUtils.remove(element, [
      '#video-overlay',
      '#yt-overlay',
    ]);

    // Social share modal with nested interactive elements
    // Found in DOM: <section class="social-share-modal bleed-top bleed-bottom">
    WebImporter.DOMUtils.remove(element, ['.social-share-modal']);

    // Scroll to top link
    // Found in DOM: <a href="#" class="scrollToTop">
    WebImporter.DOMUtils.remove(element, ['.scrollToTop']);

    // Hidden alert container
    // Found in DOM: <div id="alert-url-data" class="hidden">
    WebImporter.DOMUtils.remove(element, ['#alert-url-data']);
  }

  if (hookName === H.after) {
    // Site header
    // Found in DOM: <header class="mda-nav">
    WebImporter.DOMUtils.remove(element, ['header.mda-nav']);

    // Site navigation
    // Found in DOM: <nav class="mda-nav">
    WebImporter.DOMUtils.remove(element, ['nav.mda-nav']);

    // Breadcrumbs
    // Found in DOM: <div class="col-content-single breadcrumb-wrapper">
    WebImporter.DOMUtils.remove(element, ['.breadcrumb-wrapper']);

    // Left sidebar navigation
    // Found in DOM: <div class="col-sidebar">
    WebImporter.DOMUtils.remove(element, ['.col-sidebar']);

    // Empty medical reviewer component
    // Found in DOM: <section class="medical-reviewer-component bleed-top bleed-bottom">
    WebImporter.DOMUtils.remove(element, ['.medical-reviewer-component']);

    // Global footer (includes subscribe form, footer links, social links)
    // Found in DOM: <section class="global-footer bleed-full">
    WebImporter.DOMUtils.remove(element, ['.global-footer']);

    // Empty guide div
    // Found in DOM: <div id="guide">
    WebImporter.DOMUtils.remove(element, ['#guide']);

    // Adobe tracking iframe
    // Found in DOM: <iframe ... id="destination_publishing_iframe_mdanderson_0" class="aamIframeLoaded">
    WebImporter.DOMUtils.remove(element, ['iframe']);

    // Remove link and source elements (non-authorable)
    WebImporter.DOMUtils.remove(element, ['link', 'source', 'noscript']);

    // Remove tracking attributes from remaining elements
    element.querySelectorAll('[data-track]').forEach((el) => {
      el.removeAttribute('data-track');
    });
    element.querySelectorAll('[onclick]').forEach((el) => {
      el.removeAttribute('onclick');
    });
  }
}
