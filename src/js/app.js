/**
 * @copyright sukhmeet 2023
 */

'use strict';


/**
  * Module Import
  */

import { addEventOnElements, getGreetingMsg } from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";

/**
  * Toggle sidebar in small screen
  */

const /** {HTML Element} */ $sidebar = document.querySelector('[ data-sidebar]');

const /** {Array<HTML Element>} */ $sidebarTogglers = document.querySelectorAll('[ data-sidebar-toggler]');

const /** {HTML Element} */ $overlay = document.querySelector('[ data-sidebar-overlay]');

addEventOnElements($sidebarTogglers, 'click', function(click) {
    $sidebar.classList.toggle('active');
    $overlay.classList.toggle('active');
});


/**
 * Initialize tooltip behavior for all DOM elements with 'data-tooltip' attribute.
 */
const /** {Array<HTMLElement>} */ $tooltipElems = document.querySelectorAll('[data-tooltip]');
$tooltipElems.forEach($elem => Tooltip($elem));
/**
 * Show greeting message or homepage
 */

const /** {HTMLElement} */ $greetElem = document.querySelector('[data-greeting]');
const /** {number} */ currentHour = new Date().getHours();
$greetElem.textContent = getGreetingMsg(currentHour);

/**
 * Show current date on homepage
 */

const /** {HTMLElement} */ $currentDateElem = document.querySelector('[data-current-date]');
$currentDateElem.textContent = new Date().toDateString().replace(' ', ', ');


/**
 * Notebook Create field
 */