import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://localhost:3000/api/todos'

const store = new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {
    todos(state) {
      return state.todos
    }
  },
  mutations: {
    getTodos(state, todoData) {
      state.todos = todoData
    },
    //Todoの新規作成
    addTodo(state, todoData) {
      state.todos.push(todoData)
    }
  },
  actions: {
    fetchTodos({ commit }) {
      axios.get(API_URL).then((res) => {
        const todoData = res.data;
        commit('getTodos', todoData)
      })
    },
    postTodo({ commit }, newTitle, newBody) {
        axios.post(API_URL, {
          title: newTitle,
          body: newBody
        }).then((res) => {
          const todoData = res.data;
          commit('addTodo', todoData)
        })
      }
  }
})

export default store