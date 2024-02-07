import { describe, expect, test } from '@jest/globals';
import { appendToRoot, createHTMLDocument } from '../helpers/dom';

describe('Sample Addon Tests', () => {
  test('renderTasksBtn should render tasks button', () => {
    createHTMLDocument();

    // make sure the button is not present
    expect($('#btnAddTask').length).toBe(0);

    appendToRoot('<div id="btnJournal"><ul><li><a href="#" id="btnAddTask"></a></li></ul></div>');

    expect($('#btnAddTask').length).toBe(1);
    expect($('#btnAddTask').is('a')).toBeTruthy();
    expect($('#btnAddTask').parent().is('li')).toBeTruthy();
  });
});
