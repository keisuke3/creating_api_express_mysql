import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NewTodo from '../../../src/components/parts/NewTodo'

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
    const wrapper = shallowMount(NewTodo, {store, localVue})
    wrapper.find('[new-title]').setValue('testTitle')
    wrapper.find('[new-body]').setValue('testBody')
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.postTodo).toHaveBeenCalledWith(
      expect.anything(),
      {'newTitle': 'testTitle', 'newBody': 'testBody'},
      undefined
    )
  })

  it('error message test', () => {
    const wrapper = shallowMount(NewTodo, {store, localVue})
    expect(wrapper.find('.error-msg').exists()).toBeFalsy()
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.find('.error-msg').exists()).toBeTruthy()
    expect(wrapper.find('.error-msg').text()).toEqual('入力は必須です')
  })
})