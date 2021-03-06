const assert = require('power-assert');
const requestHelper = require('../../helper/requestHelper');

describe('GET /api/todos', () => {
  it('returns todos in response body', async () => {
    const response = await requestHelper.request({
      method: 'get',
      endPoint: '/api/todos',
      statusCode: 200
    });

    //DBの各データ型の確認
    const todos = response.body;
    assert.equal(Array.isArray(todos), true);
    todos.forEach((todo) => {
      assert.equal(typeof todo.id === 'number', true);
      assert.equal(typeof todo.title === 'string', true);
      assert.equal(typeof todo.body === 'string', true);
      assert.equal(typeof todo.completed === 'boolean', true);
      assert.equal(typeof todo.createdAt === 'string', true);
      assert.equal(typeof todo.updatedAt === 'string', true);
    });
  });
});

describe('GET /api/todos', () => {
  it('response 404', async () => {
    await requestHelper.request({
      method: 'get',
      endPoint: '/api/abc',
      statusCode: 404
    });
  });
});