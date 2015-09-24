/**
 * The gulp-cmd plugin for embedding style text in JavaScript code
 */

'use strict';

// doc and head
var doc = document;
var head = doc.getElementsByTagName('head')[0] || doc.documentElement;

/**
 * is string
 * @param value
 * @returns {boolean}
 */
function isString(value){
  return {}.toString.call(value) === "[object String]";
}

/**
 * create a style node
 * @returns {HTMLStyleElement}
 */
function createStyle(){
  var node = doc.createElement('style');

  // set type
  node.type = 'text/css';

  // ie
  if (node.styleSheet !== undefined) {
    // http://support.microsoft.com/kb/262161
    if (doc.getElementsByTagName('style').length > 31) {
      throw new Error('Exceed the maximal count of style tags in IE');
    }
  }

  // adds to dom first to avoid the css hack invalid
  head.appendChild(node);

  return node;
}

// declare variable
var textNode;
var importNode;
var textCahce = '';
var importCahce = '';

/**
 * insert style
 * @param node
 * @param css
 */
function insertStyle(node, css){
  // ie
  if (node.styleSheet !== undefined) {
    node.styleSheet.cssText = css;
  }
  // w3c
  else {
    css = doc.createTextNode(css);

    // insert text node
    if (node.firstChild) {
      node.replaceChild(css, node.firstChild);
    } else {
      node.appendChild(css);
    }
  }
}

/**
 * insert import
 * @param css
 */
function imports(css){
  if (css && isString(css)) {
    // cache css
    importCahce += css;

    // create style node
    if (!importNode) {
      importNode = createStyle();
    }

    // insert css
    insertStyle(importNode, importCahce);
  }
}

/**
 * insert css text
 * @param css
 */
function cssText(css){
  if (css && isString(css)) {
    // cache css
    textCahce += css;

    // create style node
    if (!textNode) {
      textNode = createStyle();
    }

    // insert css
    insertStyle(textNode, textCahce);
  }
}

// exports
module.exports.imports = imports;
module.exports.cssText = cssText;
