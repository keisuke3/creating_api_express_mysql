import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Top from '../../../src/components/Top'

const localVue = createLocalVue();

localVue.use(Vuex)

describe('Top.vue', () => {
  let actions
  let getters
  let store
  beforeEach(() => {
    actions = {
      fetchTodos: jest.fn()
    }
    getters = {
      todos: jest.fn()
    }
    store = new Vuex.Store({
      actions,
      getters
    })
  })
  it('actions test', () => {
    shallowMount(Top, {store, localVue})
    expect(actions.fetchTodos).toHaveBeenCalled()
    expect(getters.todos).toHaveBeenCalled()
  })
})