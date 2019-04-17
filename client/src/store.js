import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://localhost:3000/api/todos'

const Textarea = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    postTodo({ state, commit, rootState }) {
      if (rootState.newTitle === '' || rootState.newBody === '') {
        commit('inputRequired', null, { root: true })
      } else {
        axios.post(API_URL, {
          title: rootState.newTitle,
          body: rootState.newBody
        }).then((res) => {
          const todoData = res.data;
          commit('addTodo', todoData, { root: true })
        })
      }
    }
  }
}

const store = new Vuex.Store({
  state: {
    todos: [],
    newTitle: '',
    newBody: '',
    errorMsg: ''
  },
  getters: {
    todos(state) {
      return state.todos
    },
    errorMsg(state) {
      return state.errorMsg
    }
  },
  mutations: {
    getTodos(state, todoData) {
      state.todos = todoData
    },
    //Todoの新規作成
    addTodo(state, todoData) {
      state.newTitle = ''
      state.newBody = ''
      state.errorMsg = ''
      state.todos.push(todoData)
    },
    inputRequired(state) {
      state.errorMsg = '入力は必須です'
    },
    changeNewTitle(state, newTitle) {
      state.newTitle = newTitle
      console.log(state.newTitle)
    },
    changeNewBody(state, newBody) {
      state.newBody = newBody
      console.log(state.newBody)
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
  modules: {
    Textarea
  }
})

export default store