import { describe, expect, test } from '@jest/globals';
import * as dom from '../../src/dom';
import { showDialog } from '../../src/modal';
import { appendToRoot, createHTMLDocument } from '../helpers/dom';
import { eLabSDK, Helper } from '../mocks/elab';
import { getTasks } from '../../src/api';
import { mockTable, tableContainer, tasksMockResponse } from '../mocks/data';

global.eLabSDK = eLabSDK;
global.Helper = Helper;

jest.mock('../../src/api', () => ({
  getTasks: jest.fn(),
}));

jest.mock('../../src/modal', () => ({
  showDialog: jest.fn(),
  deleteAction: jest.fn(),
  updateActions: jest.fn(),
}));

getTasks.mockResolvedValue(tasksMockResponse);

describe('Sample Addon Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('1. renderTasks should render tasks button', () => {
    createHTMLDocument();
    appendToRoot('<div id="btnJournal"><ul></ul></div>');
    expect($('#btnAddTask').length).toBe(0);

    dom.renderTasks();

    expect($('#btnAddTask').length).toBe(1);
    expect($('#btnAddTask').is('a')).toBeTruthy();
    expect($('#btnAddTask').parent().is('li')).toBeTruthy();
  });

  test('2. createButton should create a instance of eLabSDK.GUI.Button', () => {
    const expectedParams = {
      label: 'Add New Task',
      class: 'addNewTaskBtn',
      action: expect.any(Function),
    };

    const button = dom.createButton();

    expect(eLabSDK.GUI.Button).toHaveBeenCalledWith(expectedParams);
    expect(eLabSDK.GUI.Button).toHaveBeenCalledTimes(1);
    expect(button instanceof eLabSDK.GUI.Button).toBeTruthy();
  });

  test('3. createTable should call create method of Helper.Table', () => {
    const expectedParams = tableContainer;

    dom.createTable();

    expect(Helper.Table.create).toHaveBeenCalledTimes(1);
    expect(Helper.Table.create).toHaveBeenCalledWith(expectedParams);
  });

  test('4. fillTable should call _renderHTML and add listener to the .deleteBtn', async () => {
    // Create a button and to test event listener
    createHTMLDocument();
    appendToRoot('<button class="deleteBtn"> Delete </button>');

    await dom.fillTable(mockTable);

    expect(getTasks).toHaveBeenCalledTimes(1);
    expect(mockTable._renderHTML).toHaveBeenCalledTimes(1);
    expect(mockTable.data).toEqual(tasksMockResponse.data);

    const button = $('.deleteBtn');
    button.trigger('click');

    expect(showDialog).toHaveBeenCalledTimes(1);
  });
});
