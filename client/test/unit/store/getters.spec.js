import getters from '../../../src/store/getters';

const state = {
  todos: [
    { data: 'value' }
  ]
};

describe('store getters.js', () => {
  it('returns todos', () => {
    const result = getters.todos(state);
    expect(result).toEqual([{ data: 'value' }]);
  });
});