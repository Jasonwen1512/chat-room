# 匿名聊天室 chat-room
一個即時的匿名聊天室，使用 WebSocket 技術實現即時通訊，整合 Google Sheets 作為數據存儲的資料庫，前端使用Vue，後端是Node.js <br>
使用者可以註冊、登入，並在聊天室中即時交流。

※由於使用render來架設後端，每15分鐘沒訪問便會休眠，啟動需要50~60秒 <br>

## 使用技術
- **前端：** Vue.js
- **後端：** Node.js（Express.js 和 WebSocket）
- **數據儲存：** Google Sheets API
- **部署：**
  - 前端：GitHub Pages
  - 後端：Render

## 功能特色
- **註冊與登入：** 支持用戶帳號註冊與登入。
- **即時聊天：** 使用 WebSocket 實現即時通訊。
- **數據存儲：** 通過 Google Sheets 管理用戶信息與聊天記錄。
- **響應式設計：** 適配手機移動端以及桌面瀏覽器
  

### 登入頁面、註冊頁面


### 聊天室頁面

### 提醒畫面

▲ 若遇到帳號密碼不對、重複註冊等問題會出現提醒

### 登出畫面

### 手機畫面（Safari）



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
