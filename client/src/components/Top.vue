<template>
  <div class="todo-wrapper">
    <p>Todoリスト</p>
    <ul>
      <li v-for="item in todos" v-bind:key="item.id">タイトル:{{ item.title }} コメント:{{ item.body }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Top",
  computed: mapGetters({
    todos: "addTodos"
  }),
  methods: {
    ...mapActions({
      getTodo: "fetchTodos"
    })
  },
  created() {
    this.getTodo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.todo-wrapper {
  p {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  ul {
    li {
      font-size: 1.5rem;
    }
  }
}
</style>
