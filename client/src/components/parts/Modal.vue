<template>
  <div class="overlay" v-on:click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <h2>タスク編集</h2>
        <div class="error-msg-wrapper">
          <p v-if="errorFlag" class="error-msg">{{ errorMsg }}</p>
        </div>
        <div class="modal-text">
          <input v-model="editTodo.title" class="edit-title">
          <textarea v-model="editTodo.body" class="edit-body" cols="30" rows="2"></textarea>
        </div>
        <div class="modal-button">
          <button v-on:click="$emit('close')" class="cancel-button">キャンセル</button>
          <button v-on:click="editComplete()" class="finish-button">完了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Modal',
  props: ['editTodo'],
  data() {
    return {
      errorFlag: false,
      errorMsg: ''
    }
  },
  methods: {
    ...mapActions([
      'updateTodo'
    ]),
    async editComplete() {
      try {
        if (!this.editTodo.title && !this.editTodo.body) {
          this.errorFlag = true
          this.errorMsg = 'タイトル・コメントは入力必須です'
        } else if (!this.editTodo.title) {
          this.errorFlag = true
          this.errorMsg = 'タイトルは入力必須です'
        } else if (!this.editTodo.body) {
          this.errorFlag = true
          this.errorMsg = 'コメントは入力必須です'
        } else {
          await this.updateTodo(this.editTodo)
          this.$emit('close')
          this.errorFlag = false
        }
      } catch (error) {
        this.errorFlag = true
        this.errorMsg = '通信エラーが発生しました'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  background: rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  transition: all 0.5s ease;

  .modal-window {
    overflow: hidden;
  }

  .modal-content {
    width: 600px;
    height: 160px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transition: all 0.3s ease;

    h2 {
      font-size: 2.0rem;
    }

    .error-msg-wrapper {
      height: 20px;
  
      .error-msg {
        font-size: 1.2rem;
      }
    }

    .modal-text {
      display: flex;
      justify-content: left;
      align-items: flex-start;
      margin-bottom: 20px;

      .edit-title {
        border: 1px solid rgba(0, 0, 0, 0.16);
        font-size: 1.2rem;
        padding: 0.4em 0.8em;
        height: 30px;
        width: 40%;
      }

      .edit-body{
        border: 1px solid rgba(0, 0, 0, 0.16);
        font-size: 1.2rem;
        height: 30px;
        padding: 0.4em 0.8em;
        width: 60%;
        margin: 0 5px;
      }

      .edit-title:focus,
      .edit-body:focus {
        border: 1px solid #5588a3;
        box-shadow: 1px solid #5588a3;
        outline: none;     
      }
    }

    .modal-button {
      display: inline-block;
      text-align: right;
      width: 554px;
    
      .cancel-button {
        padding: 3px 10px;
        background: #e8e8e8;
        color: #333;
        border-bottom: solid 2px #a9a9a9;
        font-size: 1.2rem;
      }

      .finish-button {
        padding: 3px 10px;
        background: #145374;
        color: #FFF;
        border-bottom: solid 2px #00334e;
        font-size: 1.2rem;
      }

      .cancel-button:active,
      .finish-button:active {
        -webkit-transform: translateY(2px);
        transform: translateY(2px);
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
        border-bottom: none;        
      }
    }
    p {
      color: red;
    }
  }
}

</style>
