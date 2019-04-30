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
      fetchTodos: jest.fn(),
      deleteTodo: jest.fn()
    }
    getters = {
      todos: jest.fn().mockReturnValue([{
        id: 1,
        'title': 'testTitle',
        'body': 'testBody'
      }])
    }
    store = new Vuex.Store({
      actions,
      getters
    })
  })
  it('test of getters and actions', () => {
    const wrapper = shallowMount(Top, {store, localVue})
    expect(actions.fetchTodos).toHaveBeenCalled()
    expect(getters.todos).toHaveBeenCalled()
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.deleteTodo).toHaveBeenCalledWith(
      expect.anything(),
      1,
      undefined
    )
  })
})