import { addTask, deleteTask } from './api.js';

/**
 * Initiates the deletion of a task identified by its taskId asynchronously.
 * Upon successful deletion, closes any open dialogs, reloads the page to reflect the changes.
 * @param {string} taskId - The ID of the task to be deleted.
 * @returns {Promise<void>} - A Promise that resolves after the task deletion and page reload.
 */
export const deleteTaskAction = async (taskId) => {
  await deleteTask(taskId);
  Dialog.closeWait();
  window.location.reload();
};

/**
 * Adding a new task with the provided title and description,
 * closing the dialog window, and reloading the current page.
 * @returns {Promise<void>} A promise that resolves once the actions are updated.
 */
export const createTaskAction = async () => {
  const title = $('#title').val();
  const description = $('#description').val();

  await addTask({ title, description });
  Dialog.closeWait();
  window.location.reload();
};

/**
 * Displays a dialog window with specified configuration options and a custom button,
 * calling the provided callback function when the custom button is clicked.
 * @param {Object} config - The configuration object for the dialog window.
 * @param {string} config.title - The title of the dialog window.
 * @param {number} config.width - The width of the dialog window.
 * @param {string} config.btnOk - The label for the OK button.
 * @param {string} config.btnCancelLabel - The label for the Cancel button.
 * @param {string} config.content - The content to be displayed in the dialog window.
 * @param {string} config.customButtonLabel - The label for the custom button.
 * @param {string} config.customButtonStyle - The style for the custom button.
 * @param {Function} callback - The callback be called when the custom button is clicked.
 * @returns {void}
 */
export const showDialog = (config, callback) => {
  const {
    title,
    width,
    btnOk,
    btnCancelLabel,
    content,
    customButtonLabel,
    customButtonStyle,
  } = config;

  Dialog.show({
    title,
    width,
    btnOk,
    btnCancelLabel,
    content,
    customButtons: [
      {
        label: customButtonLabel,
        style: customButtonStyle,
        fn: callback,
      },
    ],
  });
};
