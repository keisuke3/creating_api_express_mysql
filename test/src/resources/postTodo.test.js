const assert = require('power-assert');
const requestHelper = require('../../helper/requestHelper');
const { sequelize } = require('../../../src/models');

const getTodos = async () => {
  const response = await requestHelper.request({
    method: 'get',
    endPoint: '/api/todos',
    statusCode: 200
  });
  return response.body;
};

describe('POST /api/todos', () => {
  after(async () => {
    await sequelize.truncate();
  });
  it('Succeed if you send title, body, completed', async () => {
    const oldTodos = await getTodos();
    const postData = {
      title: 'test title',
      body: 'test body',
      completed: false
    };

    const response = await requestHelper.request({
      method: 'post',
      endPoint: '/api/todos',
      statusCode: 200
    }).send(postData);

    const createdTodo = response.body;
    assert.equal(typeof createdTodo.id, 'number');
    assert.equal(createdTodo.title, postData.title);
    assert.equal(createdTodo.body, postData.body);
    assert.equal(createdTodo.completed, postData.completed);
    assert.equal(typeof createdTodo.createdAt, 'string');
    assert.equal(typeof createdTodo.updatedAt, 'string');

    const currentTodos = await getTodos();
    assert.equal(oldTodos.length + 1, currentTodos.length);
  });
});

describe('POST /api/abc', () => {
  it('response 404, json', async () => {
    await requestHelper.request({
      method: 'post',
      endPoint: '/api/abc',
      statusCode: 404
    });
  });
});