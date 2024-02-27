import { jest } from '@jest/globals';

export const eLabSDK = {
  GUI: {
    Button: jest.fn().mockReturnValue({
      render: () => '<button class="addNewTaskBtn">Add New Task </button>',
    }),
  },
  CustomPage: jest.fn(),
};

export const Helper = {
  Table: {
    create: jest.fn().mockReturnValue({
      data: null,
      _renderHTML: jest.fn(),
    }),
  },
};
