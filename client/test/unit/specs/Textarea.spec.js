import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Textarea from '../../../src/components/parts/Textarea'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Textarea.vue', () => {
  let actions
  let store
  beforeEach(() => {
    actions = {
      postTodo: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })
  it('actions test', () => {
    const wrapper = shallowMount(Textarea, localVue)
    wrapper.find('.new-title').setValue('testTitle')
    wrapper.find('new-body').setValue('testBody')
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.postTodo).toHaveBeenCalledWith('testTitle', 'testBody')
  })
})