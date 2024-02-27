import { describe, expect, test } from '@jest/globals';
import { showDialog } from '../../src/modal';
import * as dom from '../../src/dom';
import { getTasks } from '../../src/api';
import { eLabSDK, Helper } from '../mocks/elab';
import { tableContainer, tasksMockResponse } from '../mocks/data';
import { appendToRoot, createHTMLDocument } from '../helpers/dom';

global.eLabSDK = eLabSDK;
global.Helper = Helper;

jest.mock('../../src/api', () => ({
  getTasks: jest.fn(),
}));

jest.mock('../../src/modal', () => ({
  showDialog: jest.fn(),
}));

getTasks.mockResolvedValue(tasksMockResponse);

describe('Sample Addon Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('1. renderTaskPage should should create an instance of eLabSDK.CustomPage.', () => {
    const page = dom.renderTaskPage();

    const expectedParams = {
      rootVar: '.nav-main-level',
      pageID: 'tasks',
      mainMenu: 'Tasks',
      subMenu: 'Task list',
    };

    expect(eLabSDK.CustomPage).toHaveBeenCalledWith(expectedParams);
    expect(eLabSDK.CustomPage).toHaveBeenCalledTimes(1);
    expect(page instanceof eLabSDK.CustomPage).toBeTruthy();
  });

  test('2. createAddTaskButton should create an instance of eLabSDK.GUI.Button.', () => {
    const expectedParams = {
      label: 'Add New Task',
      class: 'addNewTaskBtn',
      action: expect.any(Function),
    };

    const button = dom.createAddTaskButton();
    expect(eLabSDK.GUI.Button).toHaveBeenCalledWith(expectedParams);
    expect(eLabSDK.GUI.Button).toHaveBeenCalledTimes(1);
    expect(button).toBeDefined();
  });

  test('3. createTaskTable should call create method of Helper.Table.', () => {
    const expectedParams = tableContainer;

    dom.createTaskTable();

    expect(Helper.Table.create).toHaveBeenCalledTimes(1);
    expect(Helper.Table.create).toHaveBeenCalledWith(expectedParams);
  });

  test('4. renderTaskTable should create a table and call _renderHTML.', () => {
    createHTMLDocument();
    appendToRoot('<div id="main-content"></div>');

    const expectedParams = tableContainer;
    const data = tasksMockResponse.data;
    dom.renderTaskTable(data);
    expect($('#tableContainer').length).toBe(1);
    expect(Helper.Table.create).toHaveBeenCalledTimes(1);
    expect(Helper.Table.create).toHaveBeenCalledWith(expectedParams);
  });

  test('5. addDeleteBtnListener should add a listener to the .deleteBtn .', () => {
    // Create a button and to test event listener
    createHTMLDocument();
    appendToRoot('<button class="deleteBtn"> Delete </button>');
    dom.addDeleteBtnListener();

    const button = $('.deleteBtn');
    button.trigger('click');

    expect(showDialog).toHaveBeenCalledTimes(1);
  });
});
