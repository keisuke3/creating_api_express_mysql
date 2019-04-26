<template>
  <div>
    <p v-if="errorFlag" class="error-msg">{{ errorMsg }}</p>
    <input placeholder="タイトル" class="new-title" v-model="newTitle">
    <textarea placeholder="コメント" class="new-body" v-model="newBody" cols="30" rows="2"></textarea>
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
      errorMsg: ''
    }
  },
  methods: {
    ...mapActions([
      'postTodo'
    ]),
    postTodoButton() {
      if (!this.newTitle && !this.newBody) {
        this.errorFlag = true
        this.errorMsg = 'タイトル・コメントは入力必須です'
      } else if (!this.newTitle) {
        this.errorFlag = true
        this.errorMsg = 'タイトルは入力必須です'
      } else if (!this.newBody) {
        this.errorFlag = true
        this.errorMsg = 'コメントは入力必須です'
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
