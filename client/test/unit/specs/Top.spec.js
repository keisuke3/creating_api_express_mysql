import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Top from '../../../src/components/Top'

const localVue = createLocalVue();

localVue.use(Vuex)

describe('Top.vue', () => {
  let actions
  let getters
  let mutations
  let store
  beforeEach(() => {
    actions = {
      fetchTodos: jest.fn(),
      deleteTodo: jest.fn()
    }
    mutations = {
      switchCompleted: jest.fn()
    }
    getters = {
      todos: jest.fn().mockReturnValue([{
        'id': 1,
        'title': 'testTitle',
        'body': 'testBody'
      }])
    }
    store = new Vuex.Store({
      actions,
      mutations,
      getters
    })
  })
  describe('The getters test', () => {
    it('The todos', () => {
      shallowMount(Top, { store, localVue })
      expect(getters.todos).toHaveBeenCalled()
    })
  })
  describe('The dispatch test', () => {
    it('fetchTodos and deleteTodo', () => {
      const wrapper = shallowMount(Top, { store, localVue })
      expect(actions.fetchTodos).toHaveBeenCalled()
      const button = wrapper.find('.delete-button')
      button.trigger('click')
      expect(actions.deleteTodo).toHaveBeenCalledWith(
        expect.anything(),
        1,
        undefined
      )
    })
  })

  describe('The commit test', () => {
    it('The switchCompleted', () => {
      const wrapper = shallowMount(Top, { store, localVue })
      const button = wrapper.find('.accordion-button')
      button.trigger('click')
      expect(mutations.switchCompleted).toHaveBeenCalledWith(
        expect.anything(),
        0
      )
    })
  })
  describe('The methods test', () => {
    it('The onClickEditButton', () => {
      const wrapper = shallowMount(Top, { store, localVue })
      const button = wrapper.find('.edit-button')
      button.trigger('click')
      expect(wrapper.vm.selectedTodo).toEqual({ id: 1, title: 'testTitle', body: 'testBody' })
    })
  })
})