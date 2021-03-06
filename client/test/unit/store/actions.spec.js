import actions from '../../../src/store/actions';

let url = '';
let body = {};
let mockError = false;

jest.mock('axios', () => ({
  get: (_url) => {
    return new Promise((resolve) => {
      if (mockError)
        throw Error();

      url = _url;
      resolve({ data: 'value' });
    });
  },
  post: (_url, _body) => {
    return new Promise((resolve) => {
      if (mockError)
        throw Error();

      url = _url;
      body = _body;
      resolve(true);
    });
  },
  delete: (_url) => {
    return new Promise((resolve) => {
      if (mockError)
        throw Error();


      url = _url;
      resolve({ data: 1 });
    });
  },
  put: (_url, _body) => {
    return new Promise((resolve) => {
      if (mockError)
        throw Error();

      url = _url;
      body = _body;
      resolve(true);
    });
  }

}));

describe('store actions.js', () => {

  describe('The fetchTodos method', () => {
    it('success test', async () => {
      const commit = jest.fn();
      await actions.fetchTodos({ commit });

      expect(url).toBe('http://localhost:3000/api/todos');
      expect(commit).toHaveBeenCalledWith('setTodos', 'value');
    });

    it('catches an error', async () => {
      mockError = true;
      await expect(actions.fetchTodos({ commit: jest.fn() }, {}))
        .rejects.toThrow('API Error occurred');
    });
  });

  describe('The postTodo method', () => {
    it('success test', async () => {
      mockError = false;
      const commit = jest.fn();
      const newTitle = 'testTitle';
      const newBody = 'testBody';
      await actions.postTodo({ commit }, { newTitle, newBody });

      expect(url).toBe('http://localhost:3000/api/todos');
      expect(body).toEqual({ title: 'testTitle', body: 'testBody', completed: false });
      expect(commit).toHaveBeenCalledWith('addTodo', undefined);
    });

    it('catches an error', async () => {
      mockError = true;
      await expect(actions.postTodo({ commit: jest.fn() }, {}))
        .rejects.toThrow('API Error occurred');
    });
  });

  describe('The deleteTodo method', () => {
    it('success test', async () => {
      mockError = false;
      const commit = jest.fn();
      const id = 1;
      await actions.deleteTodo({ commit }, id);

      expect(url).toBe('http://localhost:3000/api/todos/1');
      expect(commit).toHaveBeenCalledWith('deleteTodo', 1);
    });

    it('catches an error', async () => {
      mockError = true;
      await expect(actions.deleteTodo({ commit: jest.fn() }, {}))
        .rejects.toThrow('API Error occurred');
    });
  });

  describe('The updateTodo method', () => {
    it('success test', async () => {
      mockError = false;
      const commit = jest.fn();
      const editTodo = {
        id: 1,
        title: 'testTitle',
        body: 'testBody'
      };
      await actions.updateTodo({ commit }, editTodo);
      expect(url).toBe('http://localhost:3000/api/todos/1');
      expect(body).toEqual({ title: 'testTitle', body: 'testBody' });
      expect(commit).toHaveBeenCalledWith('updateTodo', undefined);
    });

    it('catches an error', async () => {
      mockError = true;
      await expect(actions.updateTodo({ commit: jest.fn() }, {}))
        .rejects.toThrow('API Error occurred');
    });
  });
});