import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router/index'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://localhost:3000/api/todos'

const store = new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    todos(state) {
      return state.todos
    }
  },
  mutations: {
    getTodos(state, todoData) {
      state.todos = todoData
    }
  },
  actions: {
    fetchTodos({ commit }) {
      axios.get(API_URL).then((res) => {
        const todoData = res.data;
        commit('getTodos', todoData)
      })
    }
  },
})

export default store