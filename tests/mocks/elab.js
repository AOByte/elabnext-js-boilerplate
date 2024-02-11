import { jest } from '@jest/globals';

export const ButtonConstructor = jest.fn();

export const eLabSDK = {
  GUI: {
    Button: ButtonConstructor,
  },
};

export const Helper = {
  Table: {
    create: jest.fn(),
  },
};
