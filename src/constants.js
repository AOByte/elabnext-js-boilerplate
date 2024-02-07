// eslint-disable-next-line import/prefer-default-export
export const DIALOG_CONFIGS = {
  DELETE: {
    title: 'Delete Task',
    width: '550',
    btnOk: false,
    btnCancelLabel: 'Close',
    content: '<p>Are you sure you want to delete this task?</p>',
    customButtonLabel: 'Delete Task',
    customButtonStyle: 'background:#fe810',
  },
  UPDATE: {
    title: 'Add New Task',
    width: '550',
    btnOk: false,
    btnCancelLabel: 'Close',
    content: `
      <section>
        <input id="title"  type="text" placeholder="Title" />
        <textarea id="description" placeholder="Description" style="padding-top: 8px;"/>
      </section>
    `,
    customButtonLabel: 'Add Task',
    customButtonStyle: 'background:#fe810',
  },
};
