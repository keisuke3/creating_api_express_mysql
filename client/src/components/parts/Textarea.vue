<template>
  <div>
    <p>{{ errorMsg }}</p>
    <input placeholder="タイトル" v-bind:value="newTitle" v-on:input="changeNewTitle($event.target.value)">
    <textarea placeholder="コメント" v-bind:value="newBody" v-on:input="changeNewBody($event.target.value)" cols="30" rows="2"></textarea>
    <button v-on:click="postTodo">追加</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'Textarea',
  computed: {
    ...mapState([ 
      'newTitle',
      'newBody'
    ]),
    ...mapGetters([
      'errorMsg'
    ])
  },
  methods: {
    ...mapMutations([
      'changeNewTitle',
      'changeNewBody'
    ]),
    ...mapActions('Textarea', [
      'postTodo'
    ])
  }
}
</script>

<style lang="scss" scoped>
p {
  color: red;
}
</style>
