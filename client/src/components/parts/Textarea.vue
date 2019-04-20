<template>
  <div>
    <p v-if="errorFlag">入力は必須です</p>
    <input placeholder="タイトル" class="new-title" v-model="newTitle">
    <textarea placeholder="コメント" class="new-body" v-model="newBody" cols="30" rows="2"></textarea>
    <button v-on:click="postTodo" class="add-button">追加</button>
  </div>
</template>

<script>
export default {
  name: 'Textarea',
  data() {
    return {
      newTitle: '',
      newBody: '',
      errorFlag: false
    }
  },
  methods: {
    postTodo() {
      if (this.newTitle === '' || this.newBody === '') {
        this.errorFlag = true
      } else {
        this.$store.dispatch('postTodo', {newTitle: this.newTitle, newBody: this.newBody})
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
