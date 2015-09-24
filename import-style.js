/**
 * The gulp-cmd plugin for embedding style text in JavaScript code
 */

'use strict';

// doc and head
var doc = document;
var head = doc.getElementsByTagName('head')[0] || doc.documentElement;

/**
 * Is string
 * @param value
 * @returns {boolean}
 */
function isString(value){
  return {}.toString.call(value) === "[object String]";
}

/**
 * Create a style node
 * @returns {HTMLStyleElement}
 */
function createStyle(){
  var node = doc.createElement('style');

  // Set type
  node.type = 'text/css';

  // IE
  if (node.styleSheet !== undefined) {
    // http://support.microsoft.com/kb/262161
    if (doc.getElementsByTagName('style').length > 31) {
      throw new Error('Exceed the maximal count of style tags in IE');
    }
  }

  // Adds to DOM first to avoid the css hack invalid
  head.appendChild(node);

  return node;
}

// Declare variable
var textNode;
var importNode;
var textCahce = '';
var importCahce = '';

/**
 * Insert style
 * @param node
 * @param css
 */
function insertStyle(node, css){
  // IE
  if (node.styleSheet !== undefined) {
    node.styleSheet.cssText = css;
  }
  // W3C
  else {
    css = doc.createTextNode(css);

    // Insert text node
    if (node.firstChild) {
      node.replaceChild(css, node.firstChild);
    } else {
      node.appendChild(css);
    }
  }
}

/**
 * Insert import
 * @param css
 */
function imports(css){
  if (css && isString(css)) {
    // Cache css
    importCahce += css;

    // Create style node
    if (!importNode) {
      importNode = createStyle();
    }

    // Insert css
    insertStyle(importNode, importCahce);
  }
}

/**
 * Insert css text
 * @param css
 */
function cssText(css){
  if (css && isString(css)) {
    // Cache css
    textCahce += css;

    // Create style node
    if (!textNode) {
      textNode = createStyle();
    }

    // Insert css
    insertStyle(textNode, textCahce);
  }
}

// Exports
module.exports.imports = imports;
module.exports.cssText = cssText;
