import { renderTaskButton, renderTaskList, addDeleteBtnListener } from './dom.js';
import { getTasks } from './api.js';

/**
 * Initializes the application with the provided configuration and
 * renders tasks based on the current page.
 * @param {Object} config - The configuration object containing settings for the application.
 * @returns {void}
 */
export default function (config) {
  // Store a reference to the function's context
  const self = this;
  // Set the options for the application using the provided configuration
  self.setOptions(config);

  $(document).ready(() => {
    // Extract query parameters from the current URL
    const params = new URLSearchParams(window.location.search);
    // Retrieve the value of the 'page' parameter from the query string
    const page = params.get('page');

    if (page === 'tasks') {
      getTasks().then(({ data }) => {
        renderTaskList(data);

        addDeleteBtnListener();
      });
    }

    // Render tasks regardless of the current page
    renderTaskButton();
  });
}
