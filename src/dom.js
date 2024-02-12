import { showDialog, deleteTaskAction, createTaskAction } from './modal.js';
import { getTasks } from './api.js';
import { DIALOG_CONFIGS } from './constants.js';

/**
 * Creates a button element using the eLabSDK.GUI.Button constructor.
 * The button is configured with a label, CSS class,
 * and an action to show a dialog for updating tasks.
 * @returns {eLabSDK.GUI.Button} - A button element configured to add a new task when clicked.
 */
export const createAddTaskButton = () => {
  return new eLabSDK.GUI.Button({
    label: 'Add New Task',
    class: 'addNewTaskBtn',
    action: () => showDialog(DIALOG_CONFIGS.CREATE, createTaskAction),
  });
};

/**
 * Creates a table element using the Helper.Table.create method.
 * The table is configured with specified target container, data
 * and columns for displaying task information.
 * @returns {HTMLElement} - A table element configured to display task information.
 */
export const createTaskTable = () => {
  return Helper.Table.create({
    target: 'tableContainer',
    caption: null,
    data: {},
    columns: [
      {
        name: 'Full Name',
        key: 'fullName',
        width: '20%',
        cellRender: ({ creator }) => `<b>${creator.fullName}</b>`,
      },
      {
        name: 'Title',
        key: 'title',
        width: '20%',
        cellRender: ({ title }) => `<span>${title || '-'}</span>`,
      },
      {
        name: 'Description',
        key: 'contents',
        width: '45%',
        cellRender: ({ contents }) => `<span>${contents || '-'}</span>`,
      },
      {
        name: 'Created',
        key: 'created',
        width: '10%',
        cellRender: ({ created }) => `<span>${created.split('T')[0]}</span>`,
      },
      {
        name: 'Action',
        key: 'actions',
        width: '5%',
        cellRender: ({ taskID }) => `
          <p class='deleteTranslationIcon deleteBtn' _dataId="${taskID}">
            <i class='fa fa-trash-alt _actionIcon' title='Delete translation'></i>
          </p>
        `,
      },
    ],
  });
};

/**
 * Attaches a click event listener to elements with the 'deleteBtn' class
 * @returns {void}
 */
export const addDeleteBtnListener = () => {
  $('.deleteBtn').on('click', (e) => {
    const id = e.currentTarget.getAttribute('_dataId');

    showDialog(DIALOG_CONFIGS.DELETE, () => deleteTaskAction(id));
  });
};

/**
 * Renders the task list UI by updating the browser history, creating a button and table,
 * filling the table with task data, and updating the main content section with the table container.
 * @param {Event} e - Optional event object. If provided, prevents the default action.
 */
export const renderTaskList = (data) => {
  const button = createAddTaskButton();
  $('#main-content')
    .html('<section id="tableContainer"></section>')
    .prepend(button.render());

  const table = createTaskTable();
  table.data = data;
  table._renderHTML();
};

export const onTaskButtonClick = async (e) => {
  e.preventDefault();
  window.history.pushState('', '', '?page=tasks');
  const { data } = await getTasks();
  renderTaskList(data);
  addDeleteBtnListener();
};

/**
 * Renders the tasks UI by appending a button to the journal section and
 * attaching a click event handler.
 * When the button is clicked, it triggers the rendering of the task list.
 */
export const renderTaskButton = () => {
  $('#btnJournal ul').append('<li><a href="#" id="btnAddTask">Tasks</a></li>');

  $('#btnAddTask').on('click', onTaskButtonClick);
};
