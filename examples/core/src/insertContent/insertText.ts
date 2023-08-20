/**
 * 
 */
export function insertText(element: HTMLElement, text: string) {

  element.innerText = escapeHtml(replaceControlCharacters(text));
}

function replaceControlCharacters(str: string, replacementStr = '') {
  return str //.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,replacementStr)
}

function escapeHtml(htmlStr: string) {
  return htmlStr.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
}