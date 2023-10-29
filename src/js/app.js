/**
 * @copyright sukhmeet 2023
 */

'use strict';


/**
  * Module Import
  */

import {
  addEventOnElements,
  getGreetingMsg,
  activeNotebook,
  makeElemEditable
} from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";


/**
  * Toggle sidebar in small screen
  */

const /** {HTML Element} */ $sidebar = document.querySelector('[ data-sidebar]');

const /** {Array<HTML Element>} */ $sidebarTogglers = document.querySelectorAll('[ data-sidebar-toggler]');

const /** {HTML Element} */ $overlay = document.querySelector('[ data-sidebar-overlay]');

addEventOnElements($sidebarTogglers, 'click', function (click) {
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
const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-slidebar-list]');
const /** {HTMLElement} */ $addNotebookBtn = document.querySelector('[data-add-notebook]');

/**
 * Shows a notebook creation field in the sidebar when the "add notebook buttoon is clicked."
 * The funciton dynamically adds a new notebook field element, makes it editable, and listens for
 * the 'Enter' hey to create a new notebook when pressed.
 */
const showNotebookField = function () {
  const /** {HTMLElement} */ $navItem = document.createElement('div');
  $navItem.classList.add('nav-item');

  $navItem.innerHTML = `
  <span class="text text-label-large" data-notebook-field></span>

  <div class="state-layer"></div>
  `;

  $sidebarList.appendChild($navItem);

  const /** {HTMLElement} */ $navItemField = $navItem.querySelector('[data-notebook-field]');

  //active new created notebook and deactive the last one.
  activeNotebook.call($navItem);

  // Make notebook field content editable and focus
  makeElemEditable($navItemField);

  // When user press 'Enter' then create notebook
  $navItemField.addEventListener('keydown', createNotebook);
}

$addNotebookBtn.addEventListener('click', showNotebookField);


/**
 * Create new notebook
 * Creates a new notebook when the 'Enter' key is pressed while editing a notebook name field.
 * The new notebook is stored in the database.
 * 
 * @param {KeyboardEvent} event - The keyboard event that triggered notebook creation. 
 */
const createNotebook = function (event) {
  if (event.key === 'Enter') {
    
    // Store new created notebook in database
    const /** {Object} */ notebookData = db.post.notebook(this.textContent || 'Untitled')
    this.parentElement.remove();

    // Render navItem
    client.notebook.create(notebookData);
  }
}