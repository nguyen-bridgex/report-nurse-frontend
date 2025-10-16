/**
 * Helper utilities for working with rich text content from Tiptap editor
 */

/**
 * Extract plain text from HTML content
 * @param html - HTML string from the rich text editor
 * @returns Plain text without HTML tags
 */
export function extractPlainText(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: simple regex-based extraction
    return html.replace(/<[^>]*>/g, '');
  }
  // Client-side: use DOM API
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

/**
 * Check if text contains bold formatting
 * @param html - HTML string from the rich text editor
 * @returns true if the content has bold text
 */
export function hasBoldText(html: string): boolean {
  return /<strong>|<b>/.test(html);
}

/**
 * Check if text contains italic formatting
 * @param html - HTML string from the rich text editor
 * @returns true if the content has italic text
 */
export function hasItalicText(html: string): boolean {
  return /<em>|<i>/.test(html);
}

/**
 * Extract all bold text portions
 * @param html - HTML string from the rich text editor
 * @returns Array of bold text strings
 */
export function extractBoldText(html: string): string[] {
  const boldRegex = /<strong>(.*?)<\/strong>/g;
  const matches: string[] = [];
  let match;
  
  while ((match = boldRegex.exec(html)) !== null) {
    matches.push(match[1]);
  }
  
  return matches;
}

/**
 * Get structured information about the rich text content
 * @param html - HTML string from the rich text editor
 * @returns Object containing text analysis
 */
export function analyzeRichText(html: string) {
  return {
    html,
    plainText: extractPlainText(html),
    hasBold: hasBoldText(html),
    hasItalic: hasItalicText(html),
    boldTexts: extractBoldText(html),
    hasLists: /<ul>|<ol>/.test(html),
    isEmpty: !html || html === '<p></p>' || extractPlainText(html).trim() === '',
  };
}

/**
 * Example usage in console logs:
 * 
 * const content = editor.getHTML();
 * console.log('Rich text analysis:', analyzeRichText(content));
 * 
 * Output example:
 * {
 *   html: "<p>This is <strong>bold text</strong> and <em>italic text</em></p>",
 *   plainText: "This is bold text and italic text",
 *   hasBold: true,
 *   hasItalic: true,
 *   boldTexts: ["bold text"],
 *   hasLists: false,
 *   isEmpty: false
 * }
 */

