/**
 * @copyright codewithsadee 2023
 */

'use strict';


/**
 * Import module
 */
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";


const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-slidebar-list]')
const /** {HTMLElement} */ $notePanelTitle = document.querySelector('[data-note-panel-title]');


/**
 * The client object manages interfaces (UI) to create, read, update and delete notebooks and notes.
 * It provides functions for performing these operating and updating the UI accordingly.
 * @property {Object} notebook - Functions for managing notebooks in the UI.
 * @property {Object} note - Functions for managing notes in the UI. 
 */

export const client = {

    notebook : {

        /**
         * Creates a new notebook in the UI, based on provided notebook data.
         * 
         * @param {Object} notebookData - Data representing the new notebook.
         */
        create(notebookData) {
            const /** {HTMLElements} */ $navItem = NavItem(notebookData.id, notebookData.name);
            $sidebarList.appendChild($navItem);
            activeNotebook.call($navItem);
            $notePanelTitle.textContent = notebookData.name;
        },
        
        /**
         * Reads and displays a list  of notebooks in the UI.
         * 
         * @param {Array<Object>} notebookList - List of notebook data to display.
         */
        read(notebookList) {
            notebookList.forEach((notebookData, index) => {
                const /** {HTMLElements} */ $navItem =(notebookData.id, notebookData.name);

                if(index === 0) {
                    activeNotebook.call($navItem);
                    $notePanelTitle.textContent = notebookData.name;
                }

                $sidebarList.appendChild($navItem);
            });
        }

    }
}