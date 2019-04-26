import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NewTodo from '../../../src/components/parts/NewTodo'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('NewTodo.vue', () => {
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
    wrapper.find('.new-title').setValue('testTitle')
    wrapper.find('.new-body').setValue('testBody')
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.postTodo).toHaveBeenCalledWith(
      expect.anything(),
      {'newTitle': 'testTitle', 'newBody': 'testBody'},
      undefined
    )
  })

  it('error if title and body are not input', () => {
    const wrapper = shallowMount(NewTodo, {store, localVue})
    expect(wrapper.find('.error-msg').exists()).toBeFalsy()
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.find('.error-msg').text()).toEqual('タイトル・コメントは入力必須です')
  })

  it('error if body is not entered', () => {
    const wrapper = shallowMount(NewTodo, {store, localVue})
    wrapper.find('.new-title').setValue('testTitle')
    expect(wrapper.find('.error-msg').exists()).toBeFalsy()
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.find('.error-msg').text()).toEqual('コメントは入力必須です')
  })

  it('error if title is not entered', () => {
    const wrapper = shallowMount(NewTodo, {store, localVue})
    wrapper.find('.new-body').setValue('testBody')
    expect(wrapper.find('.error-msg').exists()).toBeFalsy()
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.find('.error-msg').text()).toEqual('タイトルは入力必須です')
  })
})