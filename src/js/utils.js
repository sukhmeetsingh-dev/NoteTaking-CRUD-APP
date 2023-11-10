/**
 * @copyright sukhmeet 2023
 */

'use strict';


/**
 * Attaches an event listner to a collection of DOM elements.
 * 
 * @param {Array<HTMLElement>} $elements - An array of DOM elements to attach the event listener to.
 * @param {String} eventType - The type of event to listen for (e.g., 'click', 'mouseover').
 * @param {Function} callback - The function to be executed when the event occurs.
 */

const addEventOnElements = function ($elements, eventType ,callback) 
{
    $elements.forEach($elements => $elements.addEventListener(eventType,callback));
}


/**
 * Generates a greeting message based on the current hour of the day
 * @param {number} currentHour - The current hour (0-23) to determine the appropriate greeting.
 * @returns {string} A greeting message with a saluation corresponding to the time of day.
 */
const getGreetingMsg = function (currentHour) {
    const /** {string} */ greeting = 
    currentHour < 5 ? 'Night' :
    currentHour < 12 ? 'Morning' :
    currentHour < 15 ? 'Noon' :
    currentHour < 17 ? 'Afternoon' :
    currentHour < 20 ? 'Evening' :
    'Night';

    return `Good ${greeting}`;
}


let /** {HTMLElement | undefined} */ $lastActiveNavItem; 

/**
 * Activates a navigation item by adding the 'active' class and deactivates the previously active item.
 */
const activeNotebook = function () {
    $lastActiveNavItem?.classList.remove('active');
    this.classList.add('active');
    $lastActiveNavItem = this;
}


/**
 * Makes a DOM element editable by setting the 'contenteditable' attribute to true and focusing on it.
 * 
 * @param {HTMLElement} $element - The DOM element to make editable.
 */
const makeElemEditable = function ($element) {
    $element.setAttribute('contenteditable', true);
    $element.focus();
}


/**
 * Generates a unique ID based on the current timestamp.
 * 
 * @returns {string} A string representation of the current timestamp.
 */
const generateID = function ()  {
    return new Date().getTime().toString();
}


/**
 * Finds a notebook in database by its ID.
 * 
 * @param {Object} db - The database containing the notebooks.
 * @param {String} notebookId - The ID of the notebook to find.
 * @returns {Object | undefined} The found notebook object, or undefined if not found. 
 */
const findNotebook = function (db, notebookId) {
    return db.notebooks.find(notebook => notebook.id === notebookId);
}


/**
 * Finds the index of a notebook in an array of notebooks based on its ID.
 * 
 * @param {Object} db - The object containing an array of notebooks. 
 * @param {*} notebookId - The ID of the notebook to find.
 * @returns {number} The index of the found notebook, or -1 if not found.
 */
const findNotebookIndex = function (db, notebookId) {
    return db.notebooks.findIndex(item => item.id === notebookId);
}


/**
 * Converts a timestamp in milliseconds to a human-readable relativetime string.
 * 
 * @param {number} milliseconds - The timestamp in milliseconds to convert.
 * @returns {string} A string representing the relative time (e.g., "Just now," "% min ago", "2 days ago"). 
 */
const getRelativeTime = function (milliseconds) {
    const /** {Number} */ currentTime = new Date().getTime();

    const /**{Number} */ minute = Math.floor((currentTime - milliseconds) / 1000 / 60);

    const /** {Number} */ hour = Math.floor(minute / 60);
    const /** {Number} */ day = Math.floor(hour / 24);

    return minute < 1 ? 'Just now' : minute < 60 ? `${minute} min ago` : hour < 24 ? `${hour} hour ago` : `${day} day ago`;
}

/**
 * Finds a specific note by its ID within a database of notebooks and their notes.
 * 
 * @param {Object} db - The database containing notebooks and notes.
 * @param {String} noteId - The ID of the note to find.
 * @returns {Object | undefined} - The found note object , or undefined if not found.
 */
const findNote = (db, noteId) => {
    let note;
    for (const notebook of db.notebooks) {
        note = notebook.notes.find(note => note.id === noteId);
        if (note) break;
    }
    return note;
}


export {
    addEventOnElements,
    getGreetingMsg,
    activeNotebook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex,
    getRelativeTime,
    findNote
}