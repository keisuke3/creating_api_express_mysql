<template>
  <div>
    <p v-if="errorFlag" class="error-msg">{{ errorMsg }}</p>
    <input placeholder="タイトル" class="new-title" v-model="newTitle" new-title>
    <textarea placeholder="コメント" class="new-body" v-model="newBody" cols="30" rows="2" new-body></textarea>
    <button v-on:click="postTodoButton" class="add-button">追加</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'NewTodo',
  data() {
    return {
      newTitle: '',
      newBody: '',
      errorFlag: false,
      errorMsg: '入力は必須です'
    }
  },
  methods: {
    ...mapActions([
      'postTodo'
    ]),
    postTodoButton() {
      if (this.newTitle === '' || this.newBody === '') {
        this.errorFlag = true
      } else {
        this.postTodo({newTitle: this.newTitle, newBody: this.newBody})
        this.newTitle = ''
        this.newBody = ''
        this.errorFlag = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  color: red;
}
</style>
