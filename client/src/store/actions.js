import axios from 'axios'

const API_URL = 'http://localhost:3000/api/todos'

export default {

  async fetchTodos({ commit }) {
    try {
      const res = await axios.get(API_URL);
      const todoData = res.data;
      commit('setTodos', todoData)
    } catch (error) {
      throw Error('API Error occurred')
    }
  },
  async postTodo({ commit }, { newTitle, newBody }) {
    try {
      const res = await axios.post(API_URL, {
        title: newTitle,
        body: newBody
      });
      const todoData = res.data;
      commit('addTodo', todoData)
    } catch (error) {
      throw Error('API Error occurred')
    }
  }
}