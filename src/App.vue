<template>
  <div>
    <auth_item v-if="flag" @open-chat-room="openChatRoom"/>
    <!-- 父層定義事件start-chat-room，並取得email資料 -->
    <room_item v-else @close-chat-room="closeChatRoom" :start-chat-room="email"/>
  </div>
  
</template>

<script setup>
  // import { getDatabase, set, ref, update, push, onValue } from 'firebase/database';
  
  import { ref } from 'vue';
  import auth_item from './components/auth-item.vue'
  import room_item from './components/room-item.vue'
  const flag = ref(true) //一開始顯示的介面，預設是true
  const email = ref(null)
  //收到事件open-chat-room代表登入成功，替換頁面並保存帳號資料
  const openChatRoom = (value) => { 
    email.value = value
    flag.value = false
  }
  //收到事件clost-chat-room代表登出，將頁面替換回去
  const closeChatRoom = () => {
    flag.value = true
  }

  
</script>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input, textarea {
  font-size: initial;
}
/* body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
} */
</style>
