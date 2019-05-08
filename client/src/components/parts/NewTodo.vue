<template>
  <div class="new-todo">
    <div class="error-msg-wrapper">
      <p v-if="errorFlag" class="error-msg">{{ errorMsg }}</p>
    </div>
    <div class="new-todo-wrapper">
      <input placeholder="タイトル" class="new-title" v-model="newTitle">
      <textarea placeholder="コメント" class="new-body" v-model="newBody" cols="30" rows="2"></textarea>
      <button v-on:click="postTodoButton" class="add-button">追加</button>
    </div>
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
.new-todo {
  margin: 0 auto;
  height: 80px;
  width: 600px;

  .error-msg-wrapper {
    height: 20px;
    margin-top: 10px;
    text-align: left;

    .error-msg {
      font-size: 1.2rem;
      margin-left: 30px;
      color: red;
    }
  }

  .new-todo-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 70px;

    .new-title {
      border: 1px solid rgba(0, 0, 0, 0.16);
      font-size: 1.2rem;
      padding: 0.4em 0.8em;
      height: 30px;
      width: 30%;
    }
    .new-title:focus,
    .new-body:focus {
      border: 1px solid #5588a3;
      box-shadow: 1px solid #5588a3;
      outline: none;
    }

    .new-body {
      border: 1px solid rgba(0, 0, 0, 0.16);
      font-size: 1.2rem;
      height: 30px;
      padding: 0.4em 0.8em;
      width: 50%;
      margin: 0 5px;
    }

    .add-button {
      padding: 5px 15px;
      background: #145374;
      color: #FFF;
      border-bottom: solid 4px #00334e;
      font-size: 1.2rem;
    }

    .add-button:active {
      -webkit-transform: translateY(4px);
      transform: translateY(4px);
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
      border-bottom: none;
    }
  }
}
</style>
