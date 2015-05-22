/**
 * The gulp-cmd plugin for embedding style text in JavaScript code
 */

'use strict';

var styleNode;
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
 * Get style node
 * @returns {*}
 */

function getNode(){
  var element;

  // Don't share styleNode when id is spectied
  if (!styleNode) {
    element = doc.createElement('style');

    // Adds to DOM first to avoid the css hack invalid
    head.appendChild(element);

    // IE
    if (element.styleSheet !== undefined) {
      // http://support.microsoft.com/kb/262161
      if (doc.getElementsByTagName('style').length > 31) {
        throw new Error('Exceed the maximal count of style tags in IE');
      }
    }

    // Cache style node
    styleNode = element;
  } else {
    element = styleNode;
  }

  return element;
}

/**
 * Insert import
 * @param imports
 */

function imports(imports){
  var element = getNode();

  imports = isString(imports) ? imports : '';

  // IE
  if (element.styleSheet !== undefined) {
    element.styleSheet.cssText = imports + element.styleSheet.cssText;
  }
  // W3C
  else {
    element.insertBefore(doc.createTextNode(imports), element.firstChild);
  }
}

/**
 * Insert css text
 * @param cssText
 */

function cssText(cssText){
  var element = getNode();

  cssText = isString(cssText) ? cssText : '';

  // IE
  if (element.styleSheet !== undefined) {
    element.styleSheet.cssText += cssText;
  }
  // W3C
  else {
    element.appendChild(doc.createTextNode(cssText));
  }
}

// Exports
module.exports.imports = imports;
module.exports.cssText = cssText;
