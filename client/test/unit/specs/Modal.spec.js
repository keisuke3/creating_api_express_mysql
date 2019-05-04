import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Modal from '../../../src/components/parts/Modal'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Modal.vue', () => {
  let actions
  let store
  const editTodo = {
    editId: 1,
    editTitle: 'testTitle',
    editBody: 'testBody'
  };
  beforeEach(() => {
    actions = {
      updateTodo: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  describe('The editComplete method', () => {
    it('success test', () => {
      const wrapper = shallowMount(Modal, {
        store,
        localVue,
        propsData: {
          editTodo
        }
      })
      const button = wrapper.find('.finish-button')
      button.trigger('click')
      expect(actions.updateTodo).toHaveBeenCalledWith(
        expect.anything(),
        { editId: 1, editTitle: 'testTitle', editBody: 'testBody' },
        undefined
      )
      expect(wrapper.emitted().close).toBeTruthy()
    })

    it('error if title and body are not input, cancel button test', () => {
      const wrapper = shallowMount(Modal, {
        store,
        localVue,
        propsData: {
          editTodo
        }
      })
      expect(wrapper.find('.error-msg').exists()).toBeFalsy()
      wrapper.find('.edit-title').setValue('')
      wrapper.find('.edit-body').setValue('')
      const button = wrapper.find('.finish-button')
      button.trigger('click')
      expect(wrapper.find('.error-msg').text()).toEqual('タイトル・コメントは入力必須です')
      const cancelButton = wrapper.find('.cancel-button')
      cancelButton.trigger('click')
      expect(wrapper.emitted().close).toBeTruthy()
    })

    it('error if title is not entered', () => {
      const wrapper = shallowMount(Modal, {
        store,
        localVue,
        propsData: {
          editTodo
        }
      })
      expect(wrapper.find('.error-msg').exists()).toBeFalsy()
      wrapper.find('.edit-body').setValue('testBody')
      const button = wrapper.find('.finish-button')
      button.trigger('click')
      expect(wrapper.find('.error-msg').text()).toEqual('タイトルは入力必須です')
    })

    it('error if body is not entered', () => {
      const wrapper = shallowMount(Modal, {
        store,
        localVue,
        propsData: {
          editTodo
        }
      })
      expect(wrapper.find('.error-msg').exists()).toBeFalsy()
      wrapper.find('.edit-title').setValue('testTitle')
      wrapper.find('.edit-body').setValue('')
      const button = wrapper.find('.finish-button')
      button.trigger('click')
      expect(wrapper.find('.error-msg').text()).toEqual('コメントは入力必須です')
    })
  })
})