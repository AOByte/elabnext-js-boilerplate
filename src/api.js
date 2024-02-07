/**
 * Retrieves tasks by making a GET request to eLabSDK.
 *
 * @returns {Promise<Array>} A promise that resolves with an array of tasks
 * upon successful retrieval or rejects with an error response.
 */
export const getTasks = () => new Promise((resolve, reject) => {
  new eLabSDK.API.Call({
    method: 'GET',
    path: 'tasks',
    onSuccess: (xhr, status, response) => {
      resolve(response);
    },
    onError: (xhr, status, response) => {
      reject(response);
    },
  }).execute();
});

/**
 * Adds a new task with the provided title and description by making a POST request to eLabSDK.
 *
 * @param {Object} tasks - An object containing the title and description of the task.
 * @param {string} tasks.title - The title of the task.
 * @param {string} tasks.description - The description of the task.
 * @returns {Promise<Object>} A promise that resolves with an array of tasks
 * upon successful retrieval, or rejects with an error response.
 */
export const addTask = ({ title, description }) => new Promise((resolve, reject) => {
  const data = {
    assigneeID: 0,
    title,
    contents: description,
  };

  new eLabSDK.API.Call({
    method: 'POST',
    path: 'tasks',
    pathParams: {},
    onSuccess: (xhr, status, response) => {
      resolve(response);
    },
    onError: (xhr, status, response) => {
      reject(response);
    },
  }).execute(data);
});

/**
 * Deletes a task with the specified ID by making a DELETE request to eLabSDK.
 *
 * @param {string} id - The ID of the task to be deleted.
 * @returns {Promise<Object>} A promise that resolves with an array of tasks
 * upon successful retrieval, or rejects with an error response.
 */
export const deleteTask = (id) => new Promise((resolve, reject) => {
  new eLabSDK.API.Call({
    method: 'DELETE',
    path: `tasks/${id}`,
    onSuccess: (xhr, status, response) => {
      resolve(response);
    },
    onError: (xhr, status, response) => {
      reject(response);
    },
  }).execute();
});
