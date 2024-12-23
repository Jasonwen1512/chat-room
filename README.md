# 匿名聊天室 ChatRoom
一個即時的匿名聊天室，使用 WebSocket 技術實現即時通訊，整合 Google Sheets 作為儲存數據的資料庫，前端使用Vue，後端是Node.js <br>
使用者可以註冊、登入，並在聊天室中即時交流。 <br>
https://jasonwen1512.github.io/chat-room/

### ※注意事項
由於使用Render來架設後端，每15分鐘沒訪問便會休眠，啟動需要50~60秒 <br>

## 🛠️使用技術
- **前端：** Vue.js
- **後端：** Node.js（Express.js 和 WebSocket）
- **數據儲存：** Google Sheets API
- **部署：**
  - 前端：GitHub Pages
  - 後端：Node.js，架設在Render

## 功能特色
- ✨ **註冊與登入：** 支持帳號註冊與登入。
- 💬 **即時聊天：** 使用 WebSocket 實現即時通訊。
- 📊 **數據儲存：** 通過 Google Sheets 管理使用者資料與聊天記錄。
- 📱 **響應式設計：** 適配手機移動端以及桌面瀏覽器
  

### 登入頁面、註冊頁面
![登入頁面](https://github.com/Jasonwen1512/chat-room/blob/main/chatroom%E5%9C%96%E7%89%87/%E7%99%BB%E5%85%A5%E7%95%AB%E9%9D%A2.png)
![註冊畫面](https://github.com/Jasonwen1512/chat-room/blob/main/chatroom%E5%9C%96%E7%89%87/%E8%A8%BB%E5%86%8A%E7%95%AB%E9%9D%A2.png)

### 聊天室頁面
![聊天視窗](https://github.com/Jasonwen1512/chat-room/blob/main/chatroom%E5%9C%96%E7%89%87/%E8%81%8A%E5%A4%A9%E8%A6%96%E7%AA%97.png)

### 提醒畫面
![登入失敗](https://github.com/Jasonwen1512/chat-room/blob/main/chatroom%E5%9C%96%E7%89%87/%E7%99%BB%E5%85%A5%E5%A4%B1%E6%95%97.png)
![註冊成功](https://github.com/Jasonwen1512/chat-room/blob/main/chatroom%E5%9C%96%E7%89%87/%E8%A8%BB%E5%86%8A%E6%88%90%E5%8A%9F.png)
![重複註冊](https://github.com/Jasonwen1512/chat-room/blob/main/chatroom%E5%9C%96%E7%89%87/%E9%87%8D%E8%A4%87%E8%A8%BB%E5%86%8A.png)

▲ 若遇到帳號密碼不對、重複註冊等問題會出現提醒

### 登出畫面
![登出訊息](https://github.com/Jasonwen1512/chat-room/blob/main/chatroom%E5%9C%96%E7%89%87/%E7%99%BB%E5%87%BA%E8%A8%8A%E6%81%AF.png)

### 響應式設計-手機畫面（Safari）
<div style="display: flex; justify-content: space-around;">
  <img src="https://github.com/Jasonwen1512/chat-room/blob/main/chatroom%E5%9C%96%E7%89%87/%E7%99%BB%E5%85%A5%E8%A6%96%E7%AA%97%EF%BC%88%E6%89%8B%E6%A9%9F%EF%BC%89.jpg" alt="手機登入視窗" width="45%">
  <img src="https://github.com/Jasonwen1512/chat-room/blob/main/chatroom%E5%9C%96%E7%89%87/%E8%81%8A%E5%A4%A9%E8%A6%96%E7%AA%97%EF%BC%88%E6%89%8B%E6%A9%9F%EF%BC%89.jpg" alt="手機聊天視窗" width="45%">
</div>



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
