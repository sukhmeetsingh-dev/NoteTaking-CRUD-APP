/**
 * @copyright codewithsadee 2023
 */

'use strict';


const /** {HTMLElement} */ $overlay = document.createElement('div');
$overlay.classList.add('overlay', 'modal-overlay');


/**
 * Creates and manages a modal for confirming the deletion of an item.
 * 
 * @param {string} title - The title of the item to be deleted.
 * @returns {Object} - An objejct containing functions to open the modal, close the modal, and handle confirmation. 
 */
const DeleteConfirmModal = function (title) {

    const /** {HTMlElements} */ $modal = document.createElement('div');
    $modal.classList.add('modal');

    $modal.innerHTML = `
      <h3 class="mdoal-title text-title-medium">
        Are you sure you want to delete <strong>"${title}"</strong>?
      </h3>

      <div class="modal-footer">
        <button class="btn text" data-action-btn="false">
            <span className="text-label-large">Cancel</span>

            <div className="state-layer"></div>
        </button>

        <button class="btn fill" data-action-btn="true">
            <span className="text-label-large">Delete</span>

            <div class="state-layer"></div>
        </button>
      </div>
    `;

    
    /**
     * Opens the delete confirmation modal by appending it to the document body
     */
    const open = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
    }


    /**
     * Closes the delete confirmation modal by removing it from the document body
     */
    const close = function () {
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }


    const /** {Array<HTMlElements>} */ $actionBtns = $modal.querySelectorAll('[data-action-btn]');
    /**
     * Handles the submission of the delete confirmation.
     * 
     * @param {Function} callback - The callback function to execute with the confirmation result (true for confirmation, false for cancel). 
     */
    const onSubmit = function (callback) {
        $actionBtns.forEach($btn => $btn.addEventListener('click', function() {

            const /** {Boolean} */ isConfirm = this.dataset.$actionBtn === 'true' ? true : false;

            callback(isConfirm);
        }));
    } 

    return { open, close, onSubmit }
}

export { DeleteConfirmModal }