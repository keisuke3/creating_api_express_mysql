import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const API_URL = 'http://localhost:3000/api/todos'

const store = new Vuex.Store({
  state: {
    todos: [],
  },
  getters,
  mutations,
  actions

})

export default store