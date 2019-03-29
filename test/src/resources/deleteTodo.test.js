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
  return response.body;
};

const VALID_ID = 1;
const INVALID_ID = 9999;

describe('DELETE /api/todos/:id', () => {
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

  it('削除したデータの確認', async () => {
    const oldTodos = await getTodos();
    const response = await requestHelper.request({
      method: 'delete',
      endPoint: `/api/todos/${VALID_ID}`,
      statusCode: 200
    });
    const deletedTodo = response.body;
    assert.equal(deletedTodo.id, VALID_ID);
    assert.equal(typeof deletedTodo.title, 'string');
    assert.equal(typeof deletedTodo.body, 'string');
    assert.equal(typeof deletedTodo.completed, 'boolean');
    assert.equal(typeof deletedTodo.createdAt, 'string');
    assert.equal(typeof deletedTodo.updatedAt, 'string');

    const currentTodos = await getTodos();
    assert.equal(oldTodos.length, currentTodos.length + 1, '削除後はデータが1件減っているはず');
    assert.deepEqual(oldTodos[0], deletedTodo, '削除前の1件目のデータは削除したデータと同じはず');
    assert.notDeepEqual(currentTodos[0], deletedTodo, '削除後は1件目のデータが変わっているはず');
  });
});

describe('DELETE /api/todos/:id', () => {
  it('存在しないidの場合はエラーになる', async () => {
    const response = await requestHelper.request({
      method: 'delete',
      endPoint: `/api/todos/${INVALID_ID}`,
      statusCode: 404
    });
    assert.equal(response.body.error, `There is no todo corresponding to id ${response.body.id}`);
  });
});