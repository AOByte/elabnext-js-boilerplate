export const tasksMockResponse = {
  data: [
    {
      taskID: '1',
      title: 'Task 1',
      contents: 'Task 1 description',
      created: '2021-01-01T00:00:00',
      creator: {
        fullName: 'John Doe',
      },
    },
    {
      taskID: '2',
      title: 'Task 2',
      contents: 'Task 2 description',
      created: '2021-01-02T00:00:00',
      creator: {
        fullName: 'Jane Doe',
      },
    },
  ],

  isMocked: true,
};

export const tableContainer = {
  target: 'tableContainer',
  caption: null,
  data: {},
  columns: [
    {
      name: 'Full Name',
      key: 'fullName',
      width: '20%',
      cellRender: expect.any(Function),
    },
    {
      name: 'Title',
      key: 'title',
      width: '20%',
      cellRender: expect.any(Function),
    },
    {
      name: 'Description',
      key: 'contents',
      width: '45%',
      cellRender: expect.any(Function),
    },
    {
      name: 'Created',
      key: 'created',
      width: '10%',
      cellRender: expect.any(Function),
    },
    {
      name: 'Action',
      key: 'actions',
      width: '5%',
      cellRender: expect.any(Function),
    },
  ],
};
