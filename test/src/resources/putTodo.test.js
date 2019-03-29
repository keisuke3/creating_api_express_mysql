const assert = require('power-assert');
const requestHelper = require('../../helper/requestHelper');
const CreateTodo = require('../../helper/CreateTodo');
const index = require('../../../src/models/index');
const { sequelize } = require('../../../src/models');

const getTodos = async () => {
  const response = await requestHelper.request({
    method: 'get',
    endPoint: '/api/todos',
    statusCode: 200
  });
  return response;
};

const putData = {
  title: 'test title',
  body: 'test body',
  completed: false
};
const VALID_ID = 1;
const INVALID_ID = 9999;

describe('PUT /api/todo/:id', () => {
  before(async () => {
    const testDatas = [];
    for (let i = 0; i < 5; i++) {
      const testData = index.Todo.create(new CreateTodo());
      testDatas.push(testData);
    }
    await Promise.all(testDatas);
  });

  after(async () => {
    await sequelize.truncate();
  });

  it('更新したデータの確認', async () => {
    const oldTodos = await getTodos();

    const response = await requestHelper.request({
      method: 'put',
      endPoint: `/api/todos/${VALID_ID}`,
      statusCode: 200
    }).send(putData);
    const updatedTodo = response.body;
    assert.equal(typeof updatedTodo.id, 'number');
    assert.equal(updatedTodo.title, putData.title);
    assert.equal(updatedTodo.body, putData.body);
    assert.equal(updatedTodo.completed, putData.completed);
    assert.equal(typeof updatedTodo.createdAt, 'string');
    assert.equal(typeof updatedTodo.updatedAt, 'string');

    const currentTodos = await getTodos();
    assert.notDeepEqual(oldTodos, currentTodos, '更新前後でデータは一致しない');
  });
});

describe('PUT /api/todos', () => {
  it('存在しないidの場合エラーになる', async () => {
    const response = await requestHelper.request({
      method: 'put',
      endPoint: `/api/todos/${INVALID_ID}`,
      statusCode: 404
    }).send(putData);
    assert.equal(response.body.error, `There is no todo corresponding to id ${response.body.id}`);
  });
});