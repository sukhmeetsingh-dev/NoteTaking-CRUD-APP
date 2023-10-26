/**
 * @copyright sukhmeet 2023
 */

'use strict';

/**
  * Module Import
  */

import { addEventOnElements } from "./utils.js";

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