<template>
    <div>
        <div class="room">
            <div class="chatArea" @scroll="handleScroll()">
                <div v-for="(item, index) in chatData" :key="index" class="message" :class="{ mySend : item[0] === account.startChatRoom }">
                    <!-- <div class="triangle"></div> -->
                    <div class="text">{{ item[1] }}</div>
                </div>
                <div class="scrollIndicator" v-if="showScrollIndicator" @click="scrollToBottom">
                    <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" class="xfx01vb x1lliihq x1tzjh5l" style="color: #ffffff; padding-top: 5px;">
                        <g fill-rule="evenodd" transform="translate(-90 -248)">
                            <path fill-rule="nonzero" d="M95.322 258.928a.75.75 0 0 0-1.06 1.06l5.208 5.209a.75.75 0 0 0 1.06 0l5.209-5.208a.75.75 0 0 0-1.06-1.06L100 263.605l-4.678-4.678z"></path>
                            <path fill-rule="nonzero" d="M99.25 251.333v12.813a.75.75 0 1 0 1.5 0v-12.813a.75.75 0 1 0-1.5 0z"></path>
                        </g>
                    </svg>
                </div>
            </div>
            <div class="logout" @click="logout" title="登出">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M13 12h7" 
                         stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="spacerLine"></div>
            <div class="inputArea">
                <input v-model="newMessage" placeholder="輸入你的留言..." @keyup.enter="sendMessage"/>
                <button @click="sendMessage">發送</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, defineProps, defineEmits, onMounted, watch } from 'vue';
    import axios from 'axios';

    // 注意用變數接 props 傳下來的資料時，.後面的名稱要與事件名稱相同（改為駝峰式命名）
    const account = defineProps(['start-chat-room'])
    // console.log(account.startChatRoom);
    const chatData = ref([])
    const newMessage = ref('')
    const showScrollIndicator = ref(false); // 是否顯示滾動箭頭，預設不顯示false
    const chatArea = ref(null) // 獲取聊天視窗

        // 確保完成渲染後才執行
    onMounted(async() => {
        chatArea.value = document.querySelector('.chatArea') //獲取聊天視窗
        // 使用await在fetchChatData()上
        // 確保fetchChatData()執行完畢才執行scrollToBottom()
        await fetchChatData()
        initWebSocket()
        // 一開始時直接滑到最下方
        scrollToBottom()
    })
    
    // 獲取聊天資料
    const fetchChatData = async () => {
        try {
            const response = await axios.get('https://chat-room-end.onrender.com/api/readChat');
            chatData.value = response.data.data;
            // console.log(chatData.value);
        } catch (error) {
            console.error('Failed to fetch chat data:', error);
        }
    };
    // 發送留言
    const sendMessage = async () => {
        if (newMessage.value.trim() === '') return; // 確保不發送空留言，trim()：去除字串開頭跟結尾的空白字元
        try { 
            await axios.post('https://chat-room-end.onrender.com/api/writeChat', {
                account: account.startChatRoom,
                message: newMessage.value ,
            })
            // 更新資料，已更新聊天室
            newMessage.value = ''
            initWebSocket()
        } catch (error) {
            console.log('留言失敗', error);
            
        }
    }
    // 保持訊息即時更新
    const initWebSocket = () => {
        let socket = new WebSocket('wss://chat-room-end.onrender.com'); // WebSocket 伺服器地址
        socket.onopen = () => {
            // console.log('open connection')
            // 對後端發送訊息
            socket.send('Hello, server!')
        }
        socket.onclose = () => {
            //  console.log('close connection')
        }
        socket.onmessage = () => {
            // console.log('收到來自伺服器的訊息：', e.data)
            // 收到後端回傳訊息，表示資料更新，執行fetchChatData()更新留言區
            fetchChatData()
        }
    };

    // 檢測滾動狀態
    const handleScroll = () => {
        const area = chatArea.value 
        if (area.scrollTop + area.clientHeight < area.scrollHeight) {
            showScrollIndicator.value = true; // 內容未滾到底部，顯示箭頭
        } else {
            showScrollIndicator.value = false; // 滾到底部時隱藏箭頭
        }
    };

    // 點擊捲動提示時自動滑到最下方
    const scrollToBottom = () => {
        const area = chatArea.value
        area.scrollTo(
        {
            top: area.scrollHeight,
            behavior: 'smooth',
        }
       )
    }

    const emit = defineEmits(['close-chat-room'])
    const logout = () => {
        emit('close-chat-room')
        alert('登出成功')
    }

    watch(chatData, () => {
        scrollToBottom()
    })


    
    
    //  toRef：能夠將 reactive 中的某個元素單獨拉出來變成 ref 響應式
    //  使用場景：當你只需要 reactive 物件中的某個屬性時，可以用 toRef 將該屬性單獨取出
    //  EX： const A = reactive({
    //          name: 'ayuan',
    //          age: 50
    //      })
    //  經由 toRef 解構後：const nameRef = toRef(A, 'name')
    //  可以直接 console.log(nameRef.value)  // 'ayuan'
    //  注意：nameRef 是與 A.name 綁定的，修改 nameRef.value 或 A.name 會相互影響

    //  toRefs：能夠把整個 recative 變成一個個 ref 響應式
    //  使用場景：當需要對 reactive 中的每個屬性進行單獨解構使用時，可以用 toRefs
    //  EX：const person = reactive({
    //          name: 'ayuan',
    //          age: 50
    //      })
    //  經由 toRefs 解構後：const personRefs = toRefs(person)
    //  可以 console.log(personRefs.name.value) //  'ayuan'
    //      console.log(personRefs.age.value) //    50
    //  注意：toRefs 的每個 ref 都與原來的 reactive 綁定
    //  修改 personRefs.name.value 或 person.name 都會影響


</script>
<style>
.room {
    background-color: rgba(255 , 255, 255, 0.8);
    backdrop-filter: blur(10px); /* 背景模糊 */
    border: 1px solid #b8b7b7; /* 深灰色邊框 */
    border-radius: 12px; /* 圓角 */
    width: 66.67%; /* 預設寬度為螢幕的2/3 */
    max-width: 1000px; /* 最大寬度限制，避免過寬 */
    min-width: 300px; /* 最小寬度限制，避免過窄 */
    height: 80vh; /* 高度為螢幕高度的80% */
    margin: 0 auto; /* 水平居中 */
    position: absolute; /* 絕對定位 */
    top: 50%; /* 垂直居中 */
    left: 50%; /* 垂直居中 */
    transform: translate(-50%, -50%);   /* 修正偏移，使其完全居中 */
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 輕微陰影效果 */
    display: flex;
    flex-direction: column; /* 內容垂直排列 */
    padding: 16px; /* 內邊距 */
}

/* RWD */
@media (max-width: 768px) {
    .room {
        width: 90%; /* 窄螢幕時寬度縮小到90% */
        top: 52%;
    }
}

.chatArea {
    flex-grow: 1; /* 讓聊天區域自動擴展 */
    overflow-y: scroll; /* 允許滾動 */
    margin-bottom: 16px; /* 增加底部邊距 */
}
.chatArea::-webkit-scrollbar {
    display: none; /* 隱藏滾動條 */
}

.scrollIndicator {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-color: #59b5e7;
    position: fixed; /* 絕對定位在區域內 */
    bottom: 8px; /* 距底部一點空隙 */
    left: 50%; /* 水平居中 */
    bottom: 11%; /* 調整垂直位置 */
    transform: translateX(-50%); /* 修正偏移 */
    font-size: 22px; /* 箭頭大小 */
    cursor: pointer; /* 鼠標變成手指 */
    animation: bounce 1.5s infinite; /* 輕微彈跳效果 */
}

/* 箭頭彈跳動畫 */
@keyframes bounce {
    0%, 100% {
        transform: translate(-50%, 0);
    }
    50% {
        transform: translate(-50%, -8px);
    }
}
.logout {
  position: absolute; /* 絕對定位 */
  top: -25px; /* 距離頂部 */
  right: -1px; /* 距離右側 */
  cursor: pointer; /* 鼠標變為點擊手勢 */
  width: 32px; /* 寬度 */
  height: 32px; /* 高度 */
  display: flex; /* 居中對齊 */
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1); /* 背景色 */
  border: 1px solid #ccc; /* 邊框 */
  border-radius: 50%; /* 圓形按鈕 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 陰影 */
}

.logout:hover {
  background-color: rgba(255, 255, 255, 1); /* 滑鼠懸停變化 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); /* 陰影變化 */
}

.logout svg {
  width: 24px; /* SVG 的寬度 */
  height: 24px; /* SVG 的高度 */
}

.chatArea .message {
    display: flex; /* 使用 flex 將三角形與訊息文字排列 */
    align-items: flex-start;
    max-width: 95%; /* 限制訊息區域寬度，不超過聊天區域的 70% */
    margin-top: 10px;
    margin-bottom: 18px; /* 增加每個灰框的間距 */
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}

.chatArea .text {
    background-color: rgba(200, 200, 200, 0.9); /* 灰色背景，帶透明度 */
    padding: 8px 12px; /* 內邊距，讓文字不緊貼邊框 */
    border-radius: 8px; /* 圓角邊框 */
    color: #333; /* 字體顏色偏深灰 */
    line-height: 1.5; /* 行高，增加可讀性 */
    word-wrap: break-word; /* 長文字自動換行 */
    max-width: 50%; /* 最大寬度 */
    text-align: left; /* 文字向左對齊 */
}

.chatArea .message.mySend {
    justify-content: flex-end;
}

.chatArea .message.mySend .text{
    background-color: #3bda78;
}

.spacerLine {
    border-top: 1px solid #b8b7b7;
    margin-bottom: 16px

}

.inputArea {
    display: flex; /* 使用flex布局 */
    gap: 8px; /* 增加間距 */
}

input {
    flex-grow: 1; /* 輸入框自動擴展 */
    padding: 8px; /* 增加內邊距 */
    border: 1px solid #ccc; /* 邊框 */
    border-radius: 4px; /* 圓角 */
    outline: none; /* 去除點擊時的外框 */
}

button {
    padding: 8px 16px; /* 增加內邊距 */
    border: none; /* 無邊框 */
    background-color: #007bff; /* 藍色背景 */
    color: white; /* 白色字體 */
    border-radius: 4px; /* 圓角 */
    cursor: pointer; /* 鼠標變為手指形狀 */
}

button:hover {
    background-color: #0056b3; /* 滑鼠懸停時變色 */
}
</style>