<template>
  <div class="todo-wrapper">
    <p>Todoリスト</p>
    <NewTodo></NewTodo>
    <ul>
      <li v-for="item in todos" v-bind:key="item.id">
        タイトル:{{ item.title }} コメント:{{ item.body }}
        <button v-on:click="showModal = true; editItems(item.id, item.title, item.body)" class="edit-button">編集</button>
        <Modal v-if="showModal" v-bind:edit-todo="editTodo" v-on:close="showModal = false"></Modal>
        <button v-on:click="deleteTodo(item.id)" class="delete-button">削除</button>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Modal from './parts/Modal'
import NewTodo from './parts/NewTodo'
export default {
  name: "Top",
  data() {
    return {
      showModal: false,
      editTodo: {
        editId: '',
        editTitle: '',
        editBody: ''
      }
    }
  },
  computed: mapGetters([
    "todos"
  ]),
  methods: {
    ...mapActions([
      "fetchTodos",
      "deleteTodo"
    ]),
    editItems(id, title, body) {
      this.editTodo.editId = id
      this.editTodo.editTitle = title
      this.editTodo.editBody = body
    }
  },
  created() {
    this.fetchTodos();
  },
  components: {
    NewTodo,
    Modal
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
