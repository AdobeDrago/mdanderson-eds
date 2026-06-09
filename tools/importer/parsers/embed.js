/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed variant.
 * Base block: embed
 * Source: https://www.mdanderson.org/prevention-screening/get-screened/breast-cancer-screening.html
 * Selector: .media-player.media-single-small
 * Generated: 2026-06-08
 *
 * Extracts YouTube video ID from the source media player component and
 * constructs the full YouTube embed URL for the Embed block.
 */
export default function parse(element, { document }) {
  // Extract YouTube video ID from the display-video-content div's ID attribute
  const videoContainer = element.querySelector('.display-video-content[id]');
  let videoId = videoContainer ? videoContainer.id : null;

  // Fallback: try to find video ID from other patterns in the element
  if (!videoId) {
    // Check for data attributes that might contain video ID
    const dataEl = element.querySelector('[data-video-id]');
    if (dataEl) {
      videoId = dataEl.getAttribute('data-video-id');
    }
  }

  if (!videoId) {
    // Fallback: look for any iframe with youtube URL
    const iframe = element.querySelector('iframe[src*="youtube"]');
    if (iframe) {
      const src = iframe.getAttribute('src');
      const match = src.match(/(?:embed\/|v=)([a-zA-Z0-9_-]+)/);
      if (match) {
        videoId = match[1];
      }
    }
  }

  // Build the YouTube URL
  const youtubeUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : '';

  // Create a link element for the embed URL (preserves it as a clickable link in the block)
  const link = document.createElement('a');
  link.href = youtubeUrl;
  link.textContent = youtubeUrl;

  // Build cells array - single row with the YouTube URL
  // Structure matches library example: one row containing the video URL
  const cells = [
    [link],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'embed', cells });
  element.replaceWith(block);
}
