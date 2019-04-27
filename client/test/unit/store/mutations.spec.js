import mutations from '../../../src/store/mutations'

const state = {
  todos: []
};

describe('store mutations.js', () => {
  it('The getTodos method', () => {
    const todoData = [
      {
        'title': 'testTitle1',
        'body': 'testBody1'
      }
    ];
    mutations.getTodos(state, todoData)
    expect(state.todos).toEqual([{ 'title': 'testTitle1', 'body': 'testBody1' }])
  });

  it('The addTodo method', () => {
    const todoData = {
      'title': 'testTitle2',
      'body': 'testBody2'
    };
    mutations.addTodo(state, todoData)
    expect(state.todos[1]).toEqual({ 'title': 'testTitle2', 'body': 'testBody2' })
  })
})