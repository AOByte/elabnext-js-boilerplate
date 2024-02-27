import {
  renderTaskTable,
  addDeleteBtnListener,
  renderTaskPage,
} from './dom.js';
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
    const currentPage = Helper.History.get('pageID');

    const pageID = currentPage || new URLSearchParams(window.location.search).get('pageID');

    renderTaskPage();

    if (pageID === 'tasks') {
      getTasks().then(({ data }) => {
        renderTaskTable(data);

        addDeleteBtnListener();
      });
    }
  });
}
