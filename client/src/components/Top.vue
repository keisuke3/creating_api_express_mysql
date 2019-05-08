<template>
  <div class="todo-wrapper">
    <h2>Todoリスト</h2>
    <NewTodo></NewTodo>
    <ul>
      <div class="todo-task">
       <li v-for="(item, index) in todos" v-bind:key="item.id">
          <div class="todo-task-wrapper">
            <div class="todo-task-title">{{ item.title }}</div>
            <button v-on:click="accordionToggle(index)" v-bind:class="{ 'state-open': item.completed }" class="accordion-button">▼</button>
            <button v-on:click="onClickEditButton(item)" class="edit-button">編集</button>
            <transition name="modal">
              <Modal v-if="showModal" v-bind:edit-todo="selectedTodo" v-on:close="onCloseModal()"></Modal>
            </transition>
            <button v-on:click="deleteTodo(item.id)" class="delete-button">削除</button>
          </div>
          <div v-show="item.completed" class="accordion-target">
            <div class="todo-task-body">
              コメント
              <p>{{ item.body }}</p>
            </div>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Modal from './parts/Modal'
import NewTodo from './parts/NewTodo'
export default {
  name: "Top",
  data() {
    return {
      showModal: false,
      selectedTodo: {}
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
    ...mapMutations([
      "completedChange"
    ]),
    onClickEditButton(todo) {
      this.showModal = true
      this.selectedTodo = {...todo}
    },
    onCloseModal() {
      this.showModal = false
    },
    accordionToggle(index) {
      this.completedChange(index)
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
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
  }
  .todo-task {
    margin-top: 50px;
    width: 400px;
    margin-left: 20px;

    li {
      margin-bottom: 10px;
      padding: 8px 0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      border-radius: 3px;

      .todo-task-wrapper {
        text-align: left;
        margin-left: 10px;
        font-size: 1.8rem;

        .todo-task-title {
          display: inline-block;
          width: 235px;
        }

        .accordion-button {
          font-size: 1.5rem;
          color: #DFE1E5;
        }
        .edit-button {
          padding: 3px 10px;
          background: #5588a3;
          color: #FFF;
          border-bottom: solid 2px #145374;
          font-size: 1.2rem;
        }
        .edit-button:active,
        .delete-button:active {
          -webkit-transform: translateY(2px);
          transform: translateY(2px);
          box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
          border-bottom: none;
        }
        .delete-button {
          padding: 3px 10px;
          background: #e8e8e8;
          color: #333;
          border-bottom: solid 2px #a9a9a9;
          font-size: 1.2rem;          
        }
      }

      .accordion-target {
        transition: 0.5s ease;
        margin-left: 10px;
        p {
          font-size: 1.2rem;
        }
      }

      .state-open {
        transform: scale(1, -1);
      }
    }
  }
  
  .modal-enter,
  .modal-leave-to {
    opacity: 0;
  }
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.4s;
  }
}
</style>
