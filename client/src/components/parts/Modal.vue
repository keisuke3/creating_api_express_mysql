<template>
  <transition name="modal">
    <div class="overlay" v-on:click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <h3>Modal</h3>
          <p v-if="errorFlag" class="error-msg">{{ errorMsg }}</p>
          <input v-model="editTodo.title" class="edit-title">
          <textarea v-model="editTodo.body" class="edit-body" cols="30" rows="2"></textarea>
          <button v-on:click="$emit('close')" class="cancel-button">キャンセル</button>
          <button v-on:click="editComplete()" class="finish-button">完了</button>
        </div>
      </div>
    </div>
  </transition>
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
    width: 500px;
    height: 120px;
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

    p {
      color: red;
    }
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
