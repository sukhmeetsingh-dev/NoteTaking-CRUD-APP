/**
 * @copyright codewithsadee 2023
 */

'use strict';

/**
 * Import Module
 */
import { generateID, findNotebook, findNotebookIndex } from "./utils.js";

// DB object
let /** {Object} */ notekeeperDB = {};


/**
 * Initializes a local database. If the data exists in local storage, it is loaded;
 * otherwise, a new empty database structure is created and stored.
 */
const initDB = function () {
    const /** {JSON | undefined} */ db = localStorage.getItem('notekeeperDB');

    if (db) {
        notekeeperDB = JSON.parse(db);
    } else {
        notekeeperDB.notebooks = [];
        localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
    }
}

initDB();


/**
 * Reads and loads the localStorage data in to the global variable `notekeeperDB`.
 */
const readDB = function () {
    notekeeperDB = JSON.parse(localStorage.getItem('notekeeperDB'));
}


/**
 * Writes the current state of the global variable `notekeeperDB` to local storage  
 */
const writeDB = function () {
    localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
}

/**
 * Collection of functions for performing CRUD (Create, Read, Update, Delete) operations on database.
 * The database state is managed using global variables and local storage.
 * 
 * @namespace
 * @property {object} get - Functions for retrieving data from the database.
 * @property {object} post - Functions for adding data to the database.
 * @property {object} update - Functions for updating data in the database.
 * @property {object} delete - Functions for deleting data from the database.
 */
export const db = {


    post: {

        /**
         * Adds a new notebook to the database.
         * 
         * @function
         * @param {string} name - The name of the new notebook. 
         * @returns {Object} The newly created notebook object.
         */
        notebook(name) {
            readDB();

            const /** {Object} */ notebookData = {
                id: generateID(),
                name,
                notes: []
            }

            notekeeperDB.notebooks.push(notebookData);

            writeDB();

            return notebookData;
        }
    },

    get: {
        /**
         * Retrieves all notebooks from the database.
         * 
         * @function
         * @returns {Array<Object>} An array of notebook objects.
         */
        notebook() {
            readDB();

            return notekeeperDB.notebooks;
        }
    },

    update: {

        /**
         * Updates the name of a notebook in the database.
         * 
         * @param {string} notebookId - The ID of the notebook to update. 
         * @param {string} name - The new name of the notebook.
         * @returns {Object} - The updated notebook object.
         */
        notebook(notebookId, name) {
            readDB();

            const /** {Object} */ notebook = findNotebook(notekeeperDB, notebookId);
            notebook.name = name;

            writeDB();

            return notebook;
        }
    },

    delete: {

        /**
         * Deletes a notebook from the database
         * @function
         * @param {string} notebookId - The ID of the notebook to delete.
         */
        notebook(notebookId) {
            readDB();

            const /** {Number} */ notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
            notekeeperDB.notebooks.splice(notebookIndex, 1);

            writeDB();
        }
    }
}