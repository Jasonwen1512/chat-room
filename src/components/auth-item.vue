<template>
    <div class="auth">
        <div>
            <ul class="title">
              <div class="login" @click="changeLogin()">登入</div>
              <div class="signin" @click="changeSignin()">註冊</div>
              <div class="navBarHover"></div>
            </ul>
            <div class="loginAndSignin">
              <div class="loginDiv" :class="{'slide': !showLogin}">
                <form @submit.prevent="loadSheetData()">
                  <div>
                      <label for="email">帳號</label>
                      <input type="email" v-model="emailAndPassowrd.email" required />
                  </div>
                  <div>
                      <label for="password">密碼</label>
                      <input type="password" v-model="emailAndPassowrd.password" required />
                  </div>
                  <button type="submit">登入</button>
                  <div class="emailOrPasswordError" v-show="flag.error">帳號或密碼錯誤</div>
                </form>
              </div>
              <div class="signinDiv" :class="{'slide': !showLogin}">
                <form @submit.prevent="loadSheetData()">
                  <div>
                      <label for="email">帳號</label>
                      <input type="email" v-model="emailAndPassowrd.email" required />
                  </div>
                  <div>
                      <label for="password">密碼</label>
                      <input type="password" v-model="emailAndPassowrd.password" required />
                  </div>
                  <button type="submit">註冊</button>
                  <div class="signinSuccess" v-show="flag.success">註冊成功！</div>
                  <div class="duplicate" v-show="flag.duplicate">帳號已註冊</div>
                </form>
              </div>
            </div>
        </div>
      </div>
</template>
<script setup>
  import { reactive, ref ,defineEmits} from 'vue'
  import axios from 'axios';

  // 設置要發射給父元件App.vue的事件名稱
  const emit = defineEmits(['open-chat-room'])

  const flag = reactive(
    {
      error: false,
      success: false,
      duplicate: false,
    }
  )

  const showLogin = ref(true)
  const sheetData = ref([])

  let emailAndPassowrd = reactive(
    {
      email: '',
      password: '',
    }
  )

  const changeLogin = () => {
    showLogin.value = true
    document.querySelector('.navBarHover').style = 'left: 77px'
    emailAndPassowrd.email = emailAndPassowrd.password = ''
    flag.error = false
    flag.success = false
    flag.duplicate = false
  }
  const changeSignin = () => {
    showLogin.value = false
    document.querySelector('.navBarHover').style = 'left: 233px'
    emailAndPassowrd.email = emailAndPassowrd.password = ''
    flag.error = false
    flag.success = false
    flag.duplicate = false
  }
  // 檢查欲註冊的帳號是否重複
  // const checkDuplicate = async () => {
  //   const response = await axios.get('http://localhost:3000/api/read')
  //   console.log(response.data.data);
  //   return false;
    
  // }

  // 檢查帳號密碼
  const checkLogin = () => {
    let flagForCheckLogin = false
    sheetData.value.forEach((item) => {
      // console.log(item);
      if (item[0] === emailAndPassowrd.email && item[1] === emailAndPassowrd.password) {
        console.log('登入成功'); 
        flagForCheckLogin = true
        flag.error = false
        // 將事件open-chat-room以及帳號emailAndPassowrd.email都送到父元件App.vue
        emit('open-chat-room', emailAndPassowrd.email)
      }
    })
    if (!flagForCheckLogin) {
      console.log('帳號或密碼錯誤');
      flag.error = true
      triggerGlowEffect()
    }
  }

  // 註冊帳號密碼
  const writeToSheet = async () => {
    // 檢查欲註冊的帳號是否重複
    let checkDuplicate = true
    const response = await axios.get('https://chat-room-end.onrender.com/api/readLoginAndSignin')
    // console.log(response.data.data);
    response.data.data.forEach((item) => {
      if (item[0] === emailAndPassowrd.email) {
        console.log('帳號重複');
        checkDuplicate = false
        flag.duplicate = true
        flag.success = false
        triggerGlowEffect()
        return
      } 
    })
    if (checkDuplicate) {
      try {
        const response = await axios.post('https://chat-room-end.onrender.com/api/writeLoginAndSignin', {
          email: emailAndPassowrd.email,
          password: emailAndPassowrd.password,
        });
        console.log('註冊成功：', response.data);
        flag.success = true
        flag.duplicate = false
        triggerGlowEffect()
      } catch (error) {
      console.error('註冊失敗：', error);
      flag.success = false
      }
    }
    
  }

  const loadSheetData = async () => {
    try {
      if(showLogin.value === true) {
        // 讀取帳號密碼
        const response = await axios.get('https://chat-room-end.onrender.com/api/readLoginAndSignin')
        console.log('讀取成功')
        sheetData.value = response.data.data
        checkLogin()
      } else {
        writeToSheet()
      }
      
    } catch (error) {
      console.error('讀取數據失敗', error);
    }
  };

  // 亮光效果
  const triggerGlowEffect = () => {
    if (flag.error) { 
      document.querySelector('.emailOrPasswordError').classList.remove('remakeGlow')
      setTimeout(() =>{
        document.querySelector('.emailOrPasswordError').classList.add('remakeGlow')
      }, 200)
    }
    if (flag.success) {
      document.querySelector('.signinSuccess').classList.remove('remakeGlow')
      setTimeout(() =>{
        document.querySelector('.signinSuccess').classList.add('remakeGlow')
      }, 200)
    }
    if (flag.duplicate) {
      document.querySelector('.duplicate').classList.remove('remakeGlow')
      setTimeout(() =>{
        document.querySelector('.duplicate').classList.add('remakeGlow')
      }, 200)
    }
  }
  


</script>
<style>
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
}
body {
  /* 背景 */
  background: url('data:image/svg+xml,<svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23003366" /><stop offset="100%" stop-color="%230066cc" /></linearGradient></defs><rect x="0" y="0" width="100%" height="100%" fill="url(%23gradient)" /><g transform="translate(960, 540)"><circle cx="0" cy="0" r="200" fill="%23ffffff" opacity="0.1" /><circle cx="0" cy="0" r="150" fill="%23ffffff" opacity="0.2" /><circle cx="0" cy="0" r="100" fill="%23ffffff" opacity="0.3" /><circle cx="0" cy="0" r="50" fill="%23ffffff" opacity="0.4" /></g><g transform="translate(1500, 300)"><circle cx="0" cy="0" r="160" fill="%23ffffff" opacity="0.1" /><circle cx="0" cy="0" r="120" fill="%23ffffff" opacity="0.2" /><circle cx="0" cy="0" r="80" fill="%23ffffff" opacity="0.3" /><circle cx="0" cy="0" r="40" fill="%23ffffff" opacity="0.4" /></g><g transform="translate(480, 270)"><circle cx="0" cy="0" r="150" fill="%23ffffff" opacity="0.1" /><circle cx="0" cy="0" r="100" fill="%23ffffff" opacity="0.2" /><circle cx="0" cy="0" r="50" fill="%23ffffff" opacity="0.3" /></g><g transform="translate(1440, 810)"><circle cx="0" cy="0" r="150" fill="%23ffffff" opacity="0.1" /><circle cx="0" cy="0" r="100" fill="%23ffffff" opacity="0.2" /><circle cx="0" cy="0" r="50" fill="%23ffffff" opacity="0.3" /></g><g transform="translate(380, 710)"><circle cx="0" cy="0" r="90" fill="%23ffffff" opacity="0.1" /><circle cx="0" cy="0" r="60" fill="%23ffffff" opacity="0.2" /><circle cx="0" cy="0" r="30" fill="%23ffffff" opacity="0.3" /></g><g transform="translate(1000, 200)"><circle cx="0" cy="0" r="90" fill="%23ffffff" opacity="0.1" /><circle cx="0" cy="0" r="60" fill="%23ffffff" opacity="0.2" /><circle cx="0" cy="0" r="30" fill="%23ffffff" opacity="0.3" /></g><g transform="translate(900, 900)"><circle cx="0" cy="0" r="120" fill="%23ffffff" opacity="0.1" /><circle cx="0" cy="0" r="80" fill="%23ffffff" opacity="0.2" /><circle cx="0" cy="0" r="40" fill="%23ffffff" opacity="0.3" /></g></svg>');
  background-size: cover;
  background-repeat: repeat;
  background-position: center;
}
.auth {
  background-color:  rgba(240, 248, 255, 0.9);
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem 1rem 2rem 1rem;
  border: 1px solid #ccc;
  border-radius: 14px;
  overflow: hidden;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
}
.auth > div > button {
    margin-top: 15px;
}
.auth .title {
  margin-bottom: 1rem;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;
  padding: 0;
  position: relative;
}
/* .auth .title .login:hover ~ .navBarHover{
  left: 77px;
  /* transition: all .2s ease-out; */
/* } */
/* .auth .title .signin:hover ~ .navBarHover{ */
  /* left: 233px; */
  /* transition: all .2s ease-out; */
  /* 將 transition 屬性加在 :hover 中
  當游標離開時會直接跳回原始的樣式(沒有轉場的效果) */
/* }  */
.auth .navBarHover {
  width: 90px;
  height: 4px;
  background-color: #0288d1;
  position: absolute;
  top: 42px;
  left: 77px;
  transition: all .2s ease-out;
}
@media (max-width: 500px) {
  .navBarHover {
    display: none;
  }
}
.auth form {
  display: flex;
  flex-direction: column;
}
.auth form div {
  margin-bottom: 1.1rem;
}
.auth form label {
  display: block;
  margin-bottom: 0.5rem;
}
.auth form input {
  width: 260px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.auth .loginDiv button {
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #0288d1;
  color: #fff;
  cursor: pointer;
  margin: 10px 60px 0 60px;
  font-size: medium;
}
.auth .signinDiv button {
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #f28500;
  color: #fff;
  cursor: pointer;
  margin: 10px 60px 0 60px;
  font-size: medium;
}
.auth .signinDiv button:hover {
  background-color: #ca6602;
}
.auth .loginAndSignin {
  display: flex;
  width: 200%;
  transition: all .2s ease-out;
}
.auth .loginAndSignin .loginDiv , .auth .loginAndSignin .signinDiv {
  width: 50%;
  transition: all .2s ease-out;
}
.auth .loginAndSignin .loginDiv.slide , .auth .loginAndSignin .signinDiv.slide{
  transform: translateX(-100%);
}
.auth button:hover {
  background-color: #0277bd;
}
.auth .emailOrPasswordError {
  border: 1px solid #e05d5d ;
  background-color: #fbdcdc;
  color: #7a1f1f;
  margin: 20px 50px 0 50px;
  border-radius: 4px;
  padding: 0.75rem;
  text-align: left;
  font-weight: bold;
  animation: glowForError 0.3s ease-in-out;
}

.auth .signinSuccess {
  border: 1px solid #4bc742; /* 綠色邊框 */
  background-color: #c3f3c3; /* 淺綠色背景 */
  color: #026802; /* 深綠色文字 */
  margin: 20px 50px 0 50px;
  border-radius: 4px;
  padding: 0.75rem;
  text-align: left;
  font-weight: bold;
  animation: glowForSuccess 0.3s ease-in-out
}
.auth .duplicate {
  border: 1px solid #00796b; /* 藍綠色邊框 */
  background-color: #b2dfdb; /* 淺綠色背景 */
  color: #004d40; /* 深綠色文字 */
  margin: 20px 50px 0 50px;
  border-radius: 4px;
  padding: 0.75rem;
  text-align: left;
  font-weight: bold;
  animation: glowForDuplicate 0.3s ease-in-out
}
@keyframes glowForError {
  0% {
    box-shadow: 0 0 8px rgba(255, 0, 0, 0.8);
  }
  50% {
    box-shadow: 0 0 16px rgba(255, 0, 0, 0.4);
  }
  100% {
    box-shadow: 0 0 8px rgba(255, 0, 0, 0);
  }
}
@keyframes glowForSuccess {
  0% {
    box-shadow: 0 0 8px rgba(75, 199, 66, 0.8);
  }
  50% {
    box-shadow: 0 0 16px rgba(75, 199, 66, 0.4);
  }
  100% {
    box-shadow: 0 0 8px rgba(75, 199, 66, 0);
  }
}
@keyframes glowForDuplicate {
  0% {
    box-shadow: 0 0 8px rgba(0, 121, 107, 0.8);
  }
  50% {
    box-shadow: 0 0 16px rgba(0, 121, 107, 0.4);
  }
  100% {
    box-shadow: 0 0 8px rgba(0, 121, 107, 0);
  }
}
.remakeGlow {
  animation: 0 !important;
}

</style>