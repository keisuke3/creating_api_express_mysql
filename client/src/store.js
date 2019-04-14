import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router/index'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
})

export default store