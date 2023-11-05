/**
 * @copyright codewithsadee 2023
 */

'use strict';

/**
 * Toggle the theme between 'light' and 'dark'.
 * Manages the theme setting in the DOM and Local storage.
 */
const toggleTheme = function () {
    const /** {string} */ currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const /** {string} */ newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme',newTheme);
}
/**
 * Initialize the theme
 */

const /**{String | null}*/ storedTheme = localStorage.getItem('theme');
const /** {Boolean} */ systemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const /** {string} */ initialTheme = storedTheme ?? (systemThemeIsDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', initialTheme);


/**
 * Attach toggleTheme to theme button click event
 */
window.addEventListener('DOMContentLoaded',function (){
    const /**{HTMLElement} */ $themeBtn = document.querySelector('[data-theme-btn]');
    if ($themeBtn) $themeBtn.addEventListener('click', toggleTheme);
});