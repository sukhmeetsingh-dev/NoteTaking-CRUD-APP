/**
 * @copyright sukhmeet 2023
 */

'use strict';

/**
 * 
 * @param {Array<HTMLElement>} $elements - An array of DOM elements to attach the event listener to.
 * @param {String} eventType - The type of event to listen for (e.g., 'click', 'mouseover').
 * @param {Function} callback - The function to be executed when the event occurs.
 */


const addEventOnElements = function ($elements, eventType ,callback) {
    $elements.forEach($elements => $elements.addEventListener(eventType,callback));
}

export {
    addEventOnElements
}