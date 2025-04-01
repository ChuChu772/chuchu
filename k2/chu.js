const slider = document.querySelector(".navhome");
const images = document.querySelectorAll(".php img");
const infoDisplay = document.querySelector(".disc h3"); 
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const scrollAmount = 100; // 每次滾動的距離，可自行調整

nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

function scaleCenterImage() {
    let sliderRect = slider.getBoundingClientRect(); // `.navhome` 的範圍
    let sliderCenter = sliderRect.left + sliderRect.width / 2; // 中心點

    let closestImg = null; // 用來儲存最接近中心的圖片
    let closestDistance = Infinity; // 儲存最小距離

    images.forEach((img) => {
        let imgRect = img.getBoundingClientRect(); // 取得圖片位置
        let imgCenter = imgRect.left + imgRect.width / 2; // 計算圖片中心點
        let distance = Math.abs(sliderCenter - imgCenter); // 與中間的距離
        let maxDistance = sliderRect.width / 2; // 最大距離（螢幕寬度的一半）

        // 根據距離計算 scale（1 ~ 1.5）
        let scale = 1 + (2 - 1) * (1 - Math.min(distance / maxDistance, 1));

        // 根據距離計算 opacity（0.3 ~ 1）
        let opacity = 0.3 + (1 - 0.3) * (1 - Math.min(distance / maxDistance, 1));

        img.style.transformOrigin = "top center";
        img.style.transform = `scale(${scale})`;
        img.style.opacity = opacity;

        // 找出最接近中心的圖片
        if (distance < closestDistance) {
            closestDistance = distance;
            closestImg = img;
        }

        // 清除所有圖片的active類別
        img.classList.remove("active");
    });

    // 當最接近中心的圖片存在時，為它添加active類別並顯示相應的資訊
    if (closestImg) {
        closestImg.classList.add("active"); // 為中心圖片添加 active 類別
        let imgId = closestImg.getAttribute("data-id"); 
        let conId = closestImg.getAttribute("data-i"); 
        
        addGoodClassToText(imgId);
        
        // 確保 conId 存在才執行
        if (conId) {
            crying(conId);
        }
    }}

// 為對應的文字添加 `good` 類別
function addGoodClassToText(imgId) {
    const allTextElements = document.querySelectorAll(".dd"); // 取得所有 p.dd 元素
    const textElement = document.getElementById(`d${imgId}`); // 取得對應的 p.dd 元素

    // 先清除所有 "good" 和 "bad" 類別
    allTextElements.forEach((el) => {
        el.classList.remove("goood", "bad");
    });

    // 為當前的元素添加 "good"
    if (textElement) {
        textElement.classList.add("goood");
    }

    // 為其他非當前的元素添加 "bad"
    allTextElements.forEach((el) => {
        if (el !== textElement) {
            el.classList.add("bad");
        }
    });
}
let timeoutId;
let lastConId = null;  // 記錄最後一個有效的 conId

// 這個函數確保只有停留超過 1 秒的 conId 才會被處理
function delayedCrying(conId) {
    // 如果 conId 和最後一個有效的 conId 一樣，則不需要重新設置延遲
    if (lastConId === conId) return;

    // 清除之前的 setTimeout
    clearTimeout(timeoutId);

    // 設置延遲 1 秒後執行 crying 函式
    timeoutId = setTimeout(() => {
        // 確保 conId 在 1 秒後仍然是 lastConId，這樣才執行更新
        if (lastConId === conId) {
            crying(conId);  // 停留 1 秒後執行，這時確保 conId 沒有改變
        }
    }, 1000);  // 延遲 1 秒才執行

    // 更新 lastConId 為當前的 conId
    lastConId = conId;
}

function crying(conId) {
    const elements = {
        phw1: document.getElementById('phw1'),
        phw2: document.getElementById('phw2'),
        phw3: document.getElementById('phw3')
    };

    // 清除所有的動畫類別
    Object.values(elements).forEach(el => el.classList.remove('z', 'zz', 'zzz'));

    // 立即更新文字內容
    const textContentMap = {
        a: ["鹿", "祿、仕途順遂", "荷治時期"],
        b: ["壽字", "生命的敬畏、健康的祝願、生活的期盼", "始於宋代，官祿、福祿，代表長壽和福氣"],
        c: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        d: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        e: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        f: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        g: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        h: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        i: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        j: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        k: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        l: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        m: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        n: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        o: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        p: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        q: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        r: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        s: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"],
        t: ["璃龍", "美好、吉祥、招財", "始於宋代，官祿、福祿，代表長壽和福氣"]
    };

    // 更新文字
    if (textContentMap[conId]) {
        Object.keys(elements).forEach((key, index) => {
            elements[key].textContent = textContentMap[conId][index];
        });
    }

    // 延遲 0.7 秒後執行動畫
    // setTimeout(() => {
    //     const classChanges = [
    //         { className: 'z', delay: 300 },
    //         { className: 'zz', delay: 700 },
    //         { className: 'zzz', delay: 1000 },
    //     ];
    //     classChanges.forEach(item => {
    //         setTimeout(() => {
    //             Object.values(elements).forEach(el => el.classList.add(item.className));
    //         }, item.delay);
    //     });
    // }, 700); 
}




// document.querySelector('.navhome').addEventListener('scroll', () => {
//     let closestImg = findClosestImage(); // 假設這是找出中心圖片的函數
//     if (closestImg) {
//         let conId = closestImg.getAttribute("data-i");
//         delayedCrying(conId); // 觸發延遲判斷
//     }
// });



// 呼叫scaleCenterImage()來更新圖片的縮放和顯示的資訊
slider.addEventListener("scroll", scaleCenterImage);

// 初始化
scaleCenterImage();

// 禁止滑動10秒
// x
// let idleTime = 0;  // 閒置時間
// const maxIdleTime = 500;  // 設定閒置時間為 10 秒（測試時設為短時間，實際可以設為更長）

// // 監聽滑鼠和鍵盤事件來重置閒置時間
// window.addEventListener('mousemove', resetIdleTime);
// window.addEventListener('keydown', resetIdleTime);
// window.addEventListener('scroll', resetIdleTime);

// // 重置閒置時間的函數
// function resetIdleTime() {
//   idleTime = 0;  // 每當用戶有操作時，重置閒置時間
// }

// // 每秒檢查閒置時間
// setInterval(() => {
//   idleTime++;  // 每秒閒置時間加一
//   if (idleTime >= maxIdleTime) {  // 如果閒置時間超過 10 秒
//     console.log("閒置超過 10 秒，跳轉到 pppp1 並重整頁面");
//     scrollToPppp1();  // 滾動到 pppp1
//     setTimeout(() => {  // 延遲 10 秒後再進行重整
//       reloadPage();  // 重整頁面
//     }, 300000);  // 延遲 10 秒（10000 毫秒）
//   }
// }, 1000);  // 每秒檢查一次

// // 滾動到 pppp1 的函數
// function scrollToPppp1() {
//   const pppp1 = document.getElementById('pppp1');
//   if (pppp1) {
//     pppp1.scrollIntoView({ behavior: 'smooth' });  // 滾動到 pppp1
//   } else {
//     console.warn('未找到 pppp1 元素');
//   }
// }

// // 重載頁面的函數
// function reloadPage() {
//   location.reload();  // 重新加載頁面
// }



// let port;
// let reader;
// let currentLetter = "";
// let isScrolling = false; // 滾動狀態
// let scrollDirection = null; // 滾動方向：'up' 或 'down'

// // 連接串口
// async function autoConnect() {
//     try {
//         const ports = await navigator.serial.getPorts();
//         if (ports.length > 0) {
//             port = ports[0];
//             console.log("找到可用串口，嘗試連接...");
//             await port.open({ baudRate: 9600 });
//             reader = port.readable.getReader();
//             console.log("串口連接成功！");
//             listenToSerial();  // 當串口連接成功後，開始監聽串口數據
//         } else {
//             console.warn("未找到可用串口，請手動連接。");
//         }
//     } catch (err) {
//         console.error("自動連接串口失敗: ", err);
//     }
// }

// // 監聽串口數據
// async function listenToSerial() {
//     const decoder = new TextDecoder();
//     try {
//         while (true) {
//             const { value, done } = await reader.read();
//             if (done) break;

//             // 解碼數據並去除多餘的換行符或空格
//             const input = decoder.decode(value).trim();
//             console.log(`從 Arduino 接收到的數據：${input}`); // 這裡檢查接收到的數據

//             // 呼叫 handleArduinoInput 函數來處理指令
//             handleArduinoInput(input);
//         }
//     } catch (error) {
//         console.error("讀取數據時出錯：", error);
//     } finally {
//         reader.releaseLock();
//     }
// }

// // 處理接收到的指令並執行對應動作
// function handleArduinoInput(input) {
//     console.log(`進入 handleArduinoInput，接收到指令：${input}`);
    
//     // 避免正在滾動時再次觸發滾動
//     if (isScrolling) {
//         console.log("滾動中，請稍等...");
//         return;
//     }

//     if (input === 'U') {
//         console.log("正在向上滾動");
//         scrollDirection = 'up'; // 設置滾動方向為上
//         smoothScroll(); // 開始平滑滾動
//     } else if (input === 'D') {
//         console.log("正在向下滾動");
//         scrollDirection = 'down'; // 設置滾動方向為下
//         smoothScroll(); // 開始平滑滾動
//     } else {
//         console.warn(`未知指令：${input}`);
//     }
// }

// // 平滑滾動邏輯
// function smoothScroll() {
//     if (isScrolling) return; // 如果正在滾動，則不進行新的滾動
//     isScrolling = true; // 設置滾動狀態為正在滾動

//     let distance = scrollDirection === 'up' ? -100 : 100; // 根據滾動方向設置滾動距離
//     let stepTime = 50; // 增加時間間隔，減少計算頻率，減少卡頓
//     let totalSteps = 10; // 減少總步數，保持平滑但不會過度計算
//     let stepSize = distance / totalSteps; // 每一步的滾動距離

//     let currentStep = 0;

//     // 使用 requestAnimationFrame 進行平滑滾動
//     function scrollStep() {
//         if (currentStep < totalSteps) {
//             window.scrollBy(0, stepSize); // 滾動指定的距離
//             currentStep++; // 更新步數
//             requestAnimationFrame(scrollStep); // 再次調用 requestAnimationFrame 進行下一步滾動
//         } else {
//             isScrolling = false; // 滾動完成後，重設滾動狀態
//         }
//     }

//     // 開始進行滾動
//     requestAnimationFrame(scrollStep);
// }
// let port;
// let reader;
// let currentLetter = "";
// let isInteractionAllowed = false;

// async function autoConnect() {
//     try {
//         const ports = await navigator.serial.getPorts();
//         if (ports.length > 0) {
//             port = ports[0];
//             console.log("找到可用串口，嘗試連接...");
//             await port.open({ baudRate: 9600 });
//             reader = port.readable.getReader();
//             console.log("串口連接成功！");
//             listenToSerial();
//         } else {
//             console.warn("未找到可用串口，請手動連接。");
//         }
//     } catch (err) {
//         console.error("自動連接串口失敗: ", err);
//     }
// }


// async function listenToSerial() {
//     try {
//         while (true) {
//             const { value, done } = await reader.read();
//             if (done) break;

//             const text = new TextDecoder().decode(value).trim();
//             if (text === "") continue;

//             console.log(`接收到的有效數據: ${text}`);
//             displayImage(text);
//         }
//     } catch (err) {
//         console.error("讀取數據時發生錯誤: ", err);
//     } finally {
//         reader.releaseLock();
//     }
// }
let port;
let reader;
let currentLetter = "";
let isInteractionAllowed = false;
let lastScrollTime = 0;

async function autoConnect() {
  try {
    // 自動尋找可用的串口
    const ports = await navigator.serial.getPorts();
    if (ports.length > 0) {
      // 選擇第一個可用的串口
      port = ports[0];
      console.log("找到可用串口，嘗試連接...");

      // 開啟串口並設定波特率
      await port.open({ baudRate: 9600 });
      reader = port.readable.getReader();
      console.log("串口連接成功！");

      // 開始監聽串口數據
      await listenToSerial();
    } else {
      console.warn("未找到可用串口，請手動連接。");
    }
  } catch (err) {
    console.error("自動連接串口失敗: ", err);
  }
}

async function listenToSerial() {
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break; // 串口關閉時跳出迴圈

      const text = new TextDecoder().decode(value).trim();
      if (!text) continue; // 如果沒有數據則繼續讀取

      console.log(`接收到的有效數據: ${text}`);

      // 處理滾動數值
      let scrollValue = parseInt(text, 10);
      if (!isNaN(scrollValue)) {
        const now = Date.now();
        if (now - lastScrollTime > 50) { // 限制滾動頻率
          window.scrollBy({ top: scrollValue, behavior: "smooth" });
          console.log("滾動：", scrollValue);
          lastScrollTime = now;
        }
      }

      // 顯示圖片（假設 displayImage 是一個已定義的函數）
      displayImage(text);

      // 設定滾動到 .mmtt 區塊的條件
      const scrollToMmtt = ["j", "n", "a", "b", "c", "d", "e", "f", "g", "h", "i", "k", "l", "m", "o", "p", "q", "r", "s", "t"];
      if (scrollToMmtt.includes(text)) {
        const pa = document.querySelector('.mmtt');
        if (pa) {
          pa.scrollIntoView({ behavior: 'smooth', block: 'start' });
          console.log("滾動到 .mmtt 區塊");
        }
      }

      // 設定滾動到 .firstpage 區塊的條件
      if (text === "z") {
        const fa = document.querySelector('.firstpage');
        if (fa) {
          fa.scrollIntoView({ behavior: 'smooth', block: 'start' });
          console.log("滾動到 .firstpage 區塊");
        }
      }
    }
  } catch (err) {
    console.error("讀取數據時發生錯誤: ", err);
  } finally {
    // 釋放串口讀取器資源
    if (reader) {
      reader.releaseLock();
    }
    if (port) {
      await port.close();
      console.log("串口已關閉");
    }
  }
}

let currentScroll = 0;

function smoothScroll(targetScroll) {
  let step = (targetScroll - currentScroll) * 0.2; // 設定步進
  currentScroll += step;
  window.scrollBy(0, step);
  if (Math.abs(step) > 1) requestAnimationFrame(() => smoothScroll(targetScroll));
}


function displayImage(letter) {

    const word = document.getElementById('word');

    // const dwords = Array.from(document.getElementsByClassName('dword'));
    const word1 = document.getElementById('word1');
    const word2 = document.getElementById('word2');
    const word3 = document.getElementById('word3');
    const word4 = document.getElementById('word4');

    const eraa1 = document.getElementById('eraa1');
    const eraa2 = document.getElementById('eraa2');

    const g1 = document.getElementById('g1');
    const g2 = document.getElementById('g2');
    const g3 = document.getElementById('g3');
    const g4 = document.getElementById('g4');
    const g5 = document.getElementById('g5');
    const g6 = document.getElementById('g6');

    // 清除所有圖片的 `visible` 類
    document.querySelectorAll("#image-container img").forEach(img => {
        img.classList.remove('visible');
    });

    // 重置所有相關類名
    function resetClasses() {
        [word, word1, word2, word3, word4].forEach(element => element.classList.remove('do','uu'));
        eraa1.classList.remove('doww', 'upp');
        eraa2.classList.remove('doww', 'upp');
        [g1, g2, g3, g4, g5, g6].forEach(element => element.classList.remove('good', 'bad'));
        // dwords.forEach(dword => {
        //     dword.classList.remove('dow','up');
        // });
    }

    resetClasses();

    if (letter === "a") {
        document.getElementById('photo1').classList.add('visible');
        document.getElementById('result').textContent = "鹿";
        // document.getElementById('eresult').textContent = "( LU )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "荷治時期";
            document.getElementById('eraa2').textContent = "1624 - 1662";
            document.getElementById('word').textContent = "祿、仕途順遂";
            document.getElementById('word1').textContent = "始於宋代，官祿、福祿，代表長壽和福氣，";
            document.getElementById('word2').textContent = "常與動植物如鶴、松、竹、梅搭配，表達富裕和幸福。";
            document.getElementById('word3').textContent = "此時期的鹿紋陶器常使用鮮明的顏色，如藍、紅、金。";
            document.getElementById('word4').textContent = "使用雕刻、凹雕技術，使鹿紋顯得更加生動。";
        }, 700);
        if (currentLetter !== "a") {
            currentLetter = "a";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            // dwords.forEach(dword => {
            //     dword.classList.add('do');
            // });
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
                // dwords.forEach(dword => {
                //     dword.classList.add('uu');
                // });
            }, 700);
        }
        
        [g1, g3, g4, g5, g6].forEach(element => element.classList.add('bad'));
        g2.classList.add('good');
    } else if (letter === "b") {
        document.getElementById('photo2').classList.add('visible');
        document.getElementById('result').textContent = "壽 字";
        // document.getElementById('eresult').textContent = "( SHOU )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "荷治時期";
            document.getElementById('eraa2').textContent = "1624 - 1662";
            document.getElementById('word').textContent = "生命的敬畏、健康的祝願、生活的期盼";
            document.getElementById('word1').textContent = "可追溯至漢代，在清代達到工藝高峰。";
            document.getElementById('word2').textContent = "與和諧的生活息息相關，日常生活中追求的重要美德。";
            document.getElementById('word3').textContent = "樣式和裝飾方式的表現形式多樣。";
            document.getElementById('word4').textContent = "使用雕刻、凹雕技術，光線變化使紋路更加清晰。";
        }, 700);
        if (currentLetter !== "b") {
            currentLetter = "b";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            // dwords.forEach(dword => {
            //     dword.classList.add('dow');
            // });
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
                // dwords.forEach(dword => {
                //     dword.classList.add('up');
                // });
            }, 700);
        }
        
        [g1, g2, g4, g5, g6].forEach(element => element.classList.add('bad'));
        g3.classList.add('good');
    } else if (letter === "c") {
        document.getElementById('photo3').classList.add('visible');
        document.getElementById('result').textContent = "璃 龍";
        // document.getElementById('eresult').textContent = "( LILONG )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "荷治時期";
            document.getElementById('eraa2').textContent = "1624 - 1662";
            document.getElementById('word').textContent = "美好、吉祥、招財";
            document.getElementById('word1').textContent = "始於唐宋，經過多次演變。";
            document.getElementById('word2').textContent = "中國神話中一種沒有角的龍，龍與虎的後代。";
            document.getElementById('word3').textContent = "使用雕刻、浮雕技術，使得龍形圖案更加立體，";
            document.getElementById('word4').textContent = "表現出龍身的曲線和細節，甚至是龍鱗的質感。";
        }, 700);
        if (currentLetter !== "c") {
            currentLetter = "c";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }
        

        [g1, g2, g3, g4, g6].forEach(element => element.classList.add('bad'));
        g5.classList.add('good');
    } else if (letter === "d") {
        document.getElementById('photo4').classList.add('visible');
        document.getElementById('result').textContent = "鬱 金 香";
        // document.getElementById('eresult').textContent = "( YUJINSHIAN )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "荷治時期";
            document.getElementById('eraa2').textContent = "1624 - 1662";
            document.getElementById('word').textContent = "荷蘭上層社會的代表";
            document.getElementById('word1').textContent = "透過荷蘭東印度公司貿易網絡進入台灣。";
            document.getElementById('word2').textContent = "寓意著繁榮和美麗，也代表荷蘭人對異國情調的熱愛。";
            document.getElementById('word3').textContent = "台灣的陶瓷工匠在荷蘭的影響下，開始模仿這種風格。";
            document.getElementById('word4').textContent = "體現了荷蘭對植物的偏好、貿易影響及文化的交融。";
        }, 700);
    if (currentLetter !== "d") {
            currentLetter = "d";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }
    
        [g5, g2, g3, g4, g6].forEach(element => element.classList.add('bad'));
        g1.classList.add('good'); 

    } else if (letter === "e") {
        document.getElementById('photo5').classList.add('visible');
        document.getElementById('result').textContent = "阿 拉 伯 銘 文";
        // document.getElementById('eresult').textContent = "( ARABIC )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "荷治時期";
            document.getElementById('eraa2').textContent = "1624 - 1662";
            document.getElementById('word').textContent = "來自伊斯蘭教，阿拉伯文的宗教祈禱";
            document.getElementById('word1').textContent = "透過荷蘭東印度公司貿易網絡進入台灣。";
            document.getElementById('word2').textContent = "被認為具有祝福功能，能保護擁有者免受邪惡或不幸，";
            document.getElementById('word3').textContent = "如「奉仁慈的真主之名」或「真主至大」等祈語。";
            document.getElementById('word4').textContent = "是當時國際貿易和文化交流的體現。";
        }, 700);
    if (currentLetter !== "e") {
            currentLetter = "e";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g1, g2, g4, g5, g6].forEach(element => element.classList.add('bad'));
        g3.classList.add('good');   

    } else if (letter === "f") {
        document.getElementById('photo6').classList.add('visible');
        document.getElementById('result').textContent = "鳥";
        // document.getElementById('eresult').textContent = "( NIAO )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "明鄭時期";
            document.getElementById('eraa2').textContent = "1662 - 1683";
            document.getElementById('word').textContent = "吉祥、長壽，還是表達自然的自由精神";
            document.getElementById('word1').textContent = "發展悠久，始於漢代之前。";
            document.getElementById('word2').textContent = "有吉祥和幸福的寓意，與自由、季節變化相關，";
            document.getElementById('word3').textContent = "常與其他元素如花卉、雲紋等搭配。";
            document.getElementById('word4').textContent = "常以浮雕或刻花技法表現，展現鳥羽的細節。";
        }, 700);
    if (currentLetter !== "f") {
            currentLetter = "f";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g1, g5, g3, g4, g6].forEach(element => element.classList.add('bad'));
        g2.classList.add('good');  

    } else if (letter === "g") {
        document.getElementById('photo7').classList.add('visible');
        document.getElementById('result').textContent = "秋 葉";
        // document.getElementById('eresult').textContent = "( CHIUYA )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "明鄭時期";
            document.getElementById('eraa2').textContent = "1662 - 1683";
            document.getElementById('word').textContent = "「梧桐一落葉，天下盡知秋」";
            document.getElementById('word1').textContent = "始於唐代，此時葉片紋樣逐漸成為一種常見的紋樣。";
            document.getElementById('word2').textContent = "秋季是收穫的季節，代表豐收、成熟和安定。";
            document.getElementById('word3').textContent = "清順治時期流行的一種搭配為石頭、落葉與警語。";
            document.getElementById('word4').textContent = "常以浮雕或刻花技法表現，凸顯葉片的立體感。";
        }, 700);
    if (currentLetter !== "g") {
            currentLetter = "g";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g5, g2, g3, g4, g6].forEach(element => element.classList.add('bad'));
        g1.classList.add('good'); 

    } else if (letter === "h") {
        document.getElementById('photo8').classList.add('visible');
        document.getElementById('result').textContent = "山 水 樹 石";
        // document.getElementById('eresult').textContent = "( SANSUISUSHI )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "明鄭時期";
            document.getElementById('eraa2').textContent = "1662 - 1683";
            document.getElementById('word').textContent = "山川、溪流、樹木、奇石";
            document.getElementById('word1').textContent = "起源於宋代的山水畫藝術，在元明清逐漸成熟。";
            document.getElementById('word2').textContent = "以山水景致為主題，突出自然山水的廣闊與深遠，";
            document.getElementById('word3').textContent = "常見於具觀賞性的器物，體現文人對寄情山水的理想，";
            document.getElementById('word4').textContent = "技法偏向寫意，以勾勒、皴法為主，常見於青花瓷、釉里紅。";
        }, 700);
    if (currentLetter !== "h") {
            currentLetter = "h";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g1, g2, g3, g5, g6].forEach(element => element.classList.add('bad'));
        g4.classList.add('good'); 

    } else if (letter === "i") {
        document.getElementById('photo9').classList.add('visible');
        document.getElementById('result').textContent = "鳳 鳥";
        // document.getElementById('eresult').textContent = "( FONNIAO )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領前期";
            document.getElementById('eraa2').textContent = "1683 - 1750";
            document.getElementById('word').textContent = "吉祥與高貴";
            document.getElementById('word1').textContent = "發展悠久，始於新石器時代。";
            document.getElementById('word2').textContent = "與祥雲、山水結合，常用於宮廷瓷器上。";
            document.getElementById('word3').textContent = "是生活器具如盤、碗、瓶與祭祀、禮儀中的重要體現。";
            document.getElementById('word4').textContent = "常以浮雕或刻花雕刻鳳鳥，突出線條的流暢與紋理。";
        }, 700);
    if (currentLetter !== "i") {
            currentLetter = "i";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g1, g2, g3, g4, g6].forEach(element => element.classList.add('bad'));
        g5.classList.add('good'); 

    } else if (letter === "j") {
        document.getElementById('photo10').classList.add('visible');
        document.getElementById('result').textContent = "八 卦 太 極";
        // document.getElementById('eresult').textContent = "( BAGUATAIJI )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領前期";
            document.getElementById('eraa2').textContent = "1683 - 1750";
            document.getElementById('word').textContent = "起源於道家思想，陰陽相生、萬物變化。";
            document.getElementById('word1').textContent = "始於魏晉南北朝，在隋唐至宋代逐漸成熟。";
            document.getElementById('word2').textContent = "八卦紋以短線組成八組不同的符號，搭配太極紋。";
            document.getElementById('word3').textContent = "常作為宗教供奉、風水器物，是道教宇宙觀的體現。";
            document.getElementById('word4').textContent = "以青花、釉里紅或彩繪技法表現。";
        }, 700);
    if (currentLetter !== "j") {
            currentLetter = "j";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g1, g2, g4, g5, g6].forEach(element => element.classList.add('bad'));
        g3.classList.add('good');  

    } else if (letter === "k") {
        document.getElementById('photo11').classList.add('visible');
        document.getElementById('result').textContent = "冰 梅";
        // document.getElementById('eresult').textContent = "( BINMEI )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領前期";
            document.getElementById('eraa2').textContent = "1683 - 1750";
            document.getElementById('word').textContent = "寒冬時誕生、象徵堅強意志與生命的復甦。";
            document.getElementById('word1').textContent = "始於清康熙，又稱「冰裂梅花紋」，";
            document.getElementById('word2').textContent = "描述冬季冰面裂紋與梅花盛開的景象。";
            document.getElementById('word3').textContent = "釉面在高溫燒製後形成自然的裂紋，稱為「開片」，";
            document.getElementById('word4').textContent = "再在其釉面繪上梅花或枝梅。";
        }, 700);
    if (currentLetter !== "k") {
            currentLetter = "k";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g5, g2, g3, g4, g6].forEach(element => element.classList.add('bad'));
        g1.classList.add('good');  

    } else if (letter === "l") {
        document.getElementById('photo12').classList.add('visible');
        document.getElementById('result').textContent = "團 菊";
        // document.getElementById('eresult').textContent = "( TUANJU )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領前期";
            document.getElementById('eraa2').textContent = "1683 - 1750";
            document.getElementById('word').textContent = "長壽之花，正直不屈、高雅純潔。";
            document.getElementById('word1').textContent = "始於宋代，常被用於婚嫁或吉慶場合的器物裝飾。";
            document.getElementById('word2').textContent = "團菊紋的主體多數以對稱的形式呈現，花瓣層層疊疊，";
            document.getElementById('word3').textContent = "細線勾勒菊花輪廓，用填色或施釉技術增加立體感，";
            document.getElementById('word4').textContent = "以青花藍、釉裏紅、黃色為主，色彩鮮明而典雅。";
        }, 700);
    if (currentLetter !== "l") {
            currentLetter = "l";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g5, g2, g3, g4, g6].forEach(element => element.classList.add('bad'));
        g1.classList.add('good');  

    } else if (letter === "m") {
        document.getElementById('photo13').classList.add('visible');
        document.getElementById('result').textContent = "靈 芝";
        // document.getElementById('eresult').textContent = "( LINGI )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領後期";
            document.getElementById('eraa2').textContent = "1750 - 1895";
            document.getElementById('word').textContent = "被視為仙草，象徵長壽、健康與祥瑞。";
            document.getElementById('word1').textContent = "可追溯至漢代，在明清兩代達到工藝高峰。";
            document.getElementById('word2').textContent = "珍貴的藥材，形似不規則的波浪，似雲或花。";
            document.getElementById('word3').textContent = "常以曲線勾勒，與其他圖案如雲紋、如意紋等結合。";
            document.getElementById('word4').textContent = "在青花瓷中，多以青花料勾畫。";
        }, 700);
    if (currentLetter !== "m") {
            currentLetter = "m";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g5, g2, g3, g4, g6].forEach(element => element.classList.add('bad'));
        g1.classList.add('good');  

    } else if (letter === "n") {
        document.getElementById('photo14').classList.add('visible');
        document.getElementById('result').textContent = "石 榴";
        // document.getElementById('eresult').textContent = "( SHILIU )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領後期";
            document.getElementById('eraa2').textContent = "1750 - 1895";
            document.getElementById('word').textContent = "多子多福、繁榮昌盛。";
            document.getElementById('word1').textContent = "始於明代，常見於清代的婚慶用瓷及壽器上，";
            document.getElementById('word2').textContent = "豐滿的外形和許多果實顆粒，代表繁榮和生生不息。";
            document.getElementById('word3').textContent = "常見於青花瓷中，工匠以藍色釉料繪製石榴外形。";
            document.getElementById('word4').textContent = "";
        }, 700);
    if (currentLetter !== "n") {
            currentLetter = "n";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g5, g2, g3, g4, g6].forEach(element => element.classList.add('bad'));
        g1.classList.add('good');  

    } else if (letter === "o") {
        document.getElementById('photo15').classList.add('visible');
        document.getElementById('result').textContent = "雲 龍";
        // document.getElementById('eresult').textContent = "( YUNLONG )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領後期";
            document.getElementById('eraa2').textContent = "1750 - 1895";
            document.getElementById('word').textContent = "權威、力量、保護和祥瑞。";
            document.getElementById('word1').textContent = "始於唐宋，在宮廷瓷器中得到廣泛應用。";
            document.getElementById('word2').textContent = "龍多呈現蜿蜒或盤旋，";
            document.getElementById('word3').textContent = "雲則外形多變，作為輔紋，常與龍的動態形成對比。";
            document.getElementById('word4').textContent = "在青花瓷中最為常見，青花龍搭配白色的雲。";
        }, 700);
    if (currentLetter !== "o") {
            currentLetter = "o";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g1, g2, g3, g4, g6].forEach(element => element.classList.add('bad'));
        g5.classList.add('good');  

    } else if (letter === "p") {
        document.getElementById('photo16').classList.add('visible');
        document.getElementById('result').textContent = "牡 丹";
        // document.getElementById('eresult').textContent = "( MUDAN )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領後期";
            document.getElementById('eraa2').textContent = "1750 - 1895";
            document.getElementById('word').textContent = "花王，富貴與繁榮、吉祥與美好。";
            document.getElementById('word1').textContent = "始於宋代，常見於壽器、婚慶以及其他吉祥禮品中。";
            document.getElementById('word2').textContent = "花中之王，長久以來被視為富貴、繁榮和幸福。";
            document.getElementById('word3').textContent = "牡丹的顏色多變，常見的有紅色、粉色、紫色。";
            document.getElementById('word4').textContent = "常與其他圖案如蝙蝠、鳳凰等結合，強化其祝福意涵。";
        }, 700);
    if (currentLetter !== "p") {
            currentLetter = "p";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g5, g2, g3, g4, g6].forEach(element => element.classList.add('bad'));
        g1.classList.add('good');  

    } else if (letter === "q") {
        document.getElementById('photo17').classList.add('visible');
        document.getElementById('result').textContent = "梵 文";
        // document.getElementById('eresult').textContent = "( SANSKRIT )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領後期";
            document.getElementById('eraa2').textContent = "1750 - 1895";
            document.getElementById('word').textContent = "來自佛教經典，寓意祥和、安寧與幸福。";
            document.getElementById('word1').textContent = "始於唐代，在明清兩代達到工藝高峰。";
            document.getElementById('word2').textContent = "起源於宗教藝術，古印度的文字，常見於佛經中。";
            document.getElementById('word3').textContent = "多以篆書字母，以圓形、方形整齊排列構成規律圖案。";
            document.getElementById('word4').textContent = "融合了宗教信仰、藝術表現和文化交流的紋樣。";
        }, 700);
    if (currentLetter !== "q") {
            currentLetter = "q";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g1, g2, g4, g5, g6].forEach(element => element.classList.add('bad'));
        g3.classList.add('good');  

    } else if (letter === "r") {
        document.getElementById('photo18').classList.add('visible');
        document.getElementById('result').textContent = "湖 石 花 草" ;
        // document.getElementById('eresult').textContent = "( HUSHIHUATSAO )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領後期";
            document.getElementById('eraa2').textContent = "1750 - 1895";
            document.getElementById('word').textContent = "湖石、花卉、草木";
            document.getElementById('word1').textContent = "始於宋代，在明清兩代達到工藝高峰。";
            document.getElementById('word2').textContent = "刻畫庭園中湖石與花草如牡丹、菊花、梅花的搭配。";
            document.getElementById('word3').textContent = "構圖集中，注重花草與湖石的局部組合。";
            document.getElementById('word4').textContent = "技法偏向工筆，細膩描繪、色彩豐富常見於粉彩、五彩。";
        }, 700);
    if (currentLetter !== "r") {
            currentLetter = "r";  // 更新當前的 letter
            // 執行相關的動作
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
            eraa1.classList.add('doww');
            eraa2.classList.add('doww');
            
            setTimeout(() => {
              [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
                eraa1.classList.add('upp');
                eraa2.classList.add('upp');
            }, 700);
        }

        [g1, g2, g3, g5, g6].forEach(element => element.classList.add('bad'));
        g4.classList.add('good');  

    } else if (letter === "s") {
        document.getElementById('photo19').classList.add('visible');
        document.getElementById('result').textContent = "富 士 山";
        // document.getElementById('eresult').textContent = "( FUJISAN )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "日治時期";
            document.getElementById('eraa2').textContent = "1895 - 1945";
            document.getElementById('word').textContent = "安穩、神聖與吉祥";
            document.getElementById('word1').textContent = "這一紋樣反映了日治時期中日文化交融的特點，";
            document.getElementById('word2').textContent = "常以簡練的線條呈現，搭配太陽、櫻花、波浪或雲朵。";
            document.getElementById('word3').textContent = "此時期陶瓷工藝在台灣迅速發展，多以日本引進技法，";
            document.getElementById('word4').textContent = "如釉下彩、印花轉印等，結合台灣本地資源與傳統技藝。";
        }, 700);
        if (currentLetter !== "s") {
          currentLetter = "s";  // 更新當前的 letter
          // 執行相關的動作
          [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
          eraa1.classList.add('doww');
          eraa2.classList.add('doww');
          
          setTimeout(() => {
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
              eraa1.classList.add('upp');
              eraa2.classList.add('upp');
          }, 700);
      }

        [g1, g2, g3, g4, g5].forEach(element => element.classList.add('bad'));
        g6.classList.add('good');  

    } else if (letter === "t") {
        document.getElementById('photo20').classList.add('visible');
        document.getElementById('result').textContent = "鶴";
        // document.getElementById('eresult').textContent = "( HE )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "日治時期";
            document.getElementById('eraa2').textContent = "1895 - 1945";
            document.getElementById('word').textContent = "長壽、吉祥與和平";
            document.getElementById('word1').textContent = "這一紋樣反映了日治時期中日文化交融的特點，";
            document.getElementById('word2').textContent = "常與松樹、富士山、櫻花等搭配，體現日本物哀美學。";
            document.getElementById('word3').textContent = "此時期陶瓷工藝在台灣迅速發展，多以日本引進技法，";
            document.getElementById('word4').textContent = "如釉下彩、印花轉印等，結合台灣本地資源與傳統技藝。";
        }, 700);
        if (currentLetter !== "t") {
          currentLetter = "t";  // 更新當前的 letter
          // 執行相關的動作
          [word, word1, word2, word3, word4].forEach(element => element.classList.add('do'));
          eraa1.classList.add('doww');
          eraa2.classList.add('doww');
          
          setTimeout(() => {
            [word, word1, word2, word3, word4].forEach(element => element.classList.add('uu'));
              eraa1.classList.add('upp');
              eraa2.classList.add('upp');
          }, 700);
      }

        [g1, g2, g3, g4, g5].forEach(element => element.classList.add('bad'));
        g6.classList.add('good');  
    } else {
        document.getElementById('result').textContent = "紋 樣 寓 意";
        // document.getElementById('eresult').textContent = "(JOURNAL)";
        document.getElementById('eraa1').textContent = "陶瓷與臺灣";
        document.getElementById('eraa2').textContent = "17世紀";
        document.getElementById('word').textContent = "回看過去四百年";
        document.getElementById('word1').textContent = "台灣經過四個殖民時期，各時期的文化體現在陶瓷上。";
        document.getElementById('word2').textContent = "不同時期的紋樣，反映了當時社會生活與審美風格，";
        document.getElementById('word3').textContent = "這些紋樣寓意深刻，承載當時人們對生活的寄託與願望，";
        document.getElementById('word4').textContent = "展現當時的思想與價值觀，記錄下了時代變遷與文化融合。";
        
    }
}

document.addEventListener("DOMContentLoaded", autoConnect);

// function setupObserver() {
//     const sadSection = document.querySelector('.firstpage');
//     if (!sadSection) return;
  
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 console.log("進入 .mmtt 區域，將在 5 秒後啟用與 Arduino 的互動！");
                
//                 // 延遲 5 秒啟用互動
//                 // setTimeout(() => {
//                 //     isInteractionAllowed = true; // 啟用互動
//                 //     autoConnect(); // 僅需執行一次
//                 //     console.log("與 Arduino 的互動已啟用！");
//                 // }, 3000);
  
//                 observer.unobserve(sadSection); // 停止觀察，避免重複觸發
//             }
//         });
//     });
  
//     observer.observe(sadSection);
//   }
  
//   // 初始化滾動監聽
//   setupObserver();

let lastScrollY = window.scrollY;
let positionY = 0;
const logo = document.querySelector('.logo');
const th5 = document.querySelector('.t2w1 h5');
const th6 = document.querySelector('.t2w2 h6');
const tp1 = document.querySelector('.t1w1 p');
const tp2 = document.querySelector('.t1w2 p');
const tp6 = document.querySelector('.t1w3 p');

window.addEventListener("scroll", () => {
    let currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        positionY -= 20; // 滑鼠往下，logo 向下
    } else {
        positionY += 20; // 滑鼠往上，logo 向上
    }

    // 限制 LOGO 位置，避免跑太遠
    positionY = Math.max(-100, Math.min(0, positionY));

    // 用 GSAP 平滑動畫
    gsap.to(logo, { y: positionY, duration: 1.5, ease: "power2.out" });
    gsap.to(th5, { y: positionY, duration: 1.5, ease: "power2.inOut" });
    gsap.to(th6, { y: positionY, duration: 1.5, ease: "power2.inOut" });
    gsap.to(tp1, { y: positionY, duration: 1.5, ease: "power2.inOut" });
    gsap.to(tp2, { y: positionY, duration: 1.5, ease: "power2.inOut" });
    gsap.to(tp6, { y: positionY, duration: 1.5, ease: "power2.inOut" });
    
    
    lastScrollY = currentScrollY;
});



gsap.registerPlugin(ScrollTrigger);
gsap.timeline({
    scrollTrigger: {
      trigger: '.psoo',
      start: 'top top',
      end: 'bottom top',
      pin: true,
      toggleActions: "play none none none", // 只執行一次
    }
  })
  .to('.psoo', { opacity: 1, duration: 1 })
  .to('.psoo', { opacity: 0, duration: 1 });
  
// gsap.timeline({
//     scrollTrigger: {
//       // markers: true,
//       trigger: '.psoo',
//       start: 'top top',
//       end: 'bottom top',
//       scrub: true,
//       pin:true,
//       toggleActions: "restart reverse none none",
//     }
//   })
//   .to('.psoo', { opacity: 1, duration: 1 })
//   .to('.psoo', { opacity: 0, duration: 1 });
// gsap.to('.psoo', { 
//     scrollTrigger:{
//       //  markers:true,
//       trigger:'.psoo',
//       start: 'top top',
//       end: 'bottom top',
//       pin:true,
//       scrub:true,
//       toggleActions: "restart none none reverse",
//      },
//      opacity:1,
//   })
gsap.to('.door', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.haha',
      start: 'top top',
      end: 'bottom bottom',
      pin:true,
      scrub:true,
      toggleActions: "restart none none reverse",
     },
     clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
  })
  
  gsap.to('.ce1', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.ce1',
      start: 'top top',
      end: 'bottom top',
      scrub:true,
      toggleActions: "restart none none reverse",
     },   
     y:-100,
  })
  gsap.to('.story1', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p151',
      start: 'top top',
      end: 'bottom top',
      pin:true,
      toggleActions: "restart none none reverse",
     }, 
  })
  gsap.to('.story2', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p152',
      start: 'top top',
      end: 'bottom top',
      pin:true,
      toggleActions: "restart none none reverse",
     },   
  })
  gsap.to('.story3', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p153',
      start: 'top top',
      end: 'bottom top',
      pin:true,
      toggleActions: "restart none none reverse",
     },   
  })
  gsap.to('.story4', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p154',
      start: 'top top',
      end: 'bottom top',
      pin:true,
      toggleActions: "restart none none reverse",
     },   
  })
  gsap.to('.story5', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p155',
      start: 'top top',
      end: 'bottom top',
      pin:true,
      toggleActions: "restart none none reverse",
     },   
  })
  gsap.to('.p151w1 p', {
    scrollTrigger: {
        // markers: true,
        trigger: '.p151',
        start: 'top top', // 當 trigger 進入視窗頂部時開始
        end: 'bottom top', // 當 trigger 離開視窗頂部時結束
        toggleActions: "play none none reverse", // 讓動畫在進入和離開範圍時播放
        onEnter: () => gsap.to('.p151w1 p', { y: 0,opacity:1 }), // 進入範圍時設定 y 為 0
        onLeave: () => gsap.to('.p151w1 p', { y: '100%',opacity:0 }), // 離開範圍時設定 y 為 -100%
        onEnterBack: () => gsap.to('.p151w1 p', { y: 0 ,opacity:1}), // 回到範圍內時設定 y 為 0
        onLeaveBack: () => gsap.to('.p151w1 p', { y: '100%',opacity:0 }) // 再次離開範圍時設定 y 為 -100%
    },
    duration: 1,
    ease: "power2.inOut"
});
gsap.to('.p152w1 p', {
    scrollTrigger: {
        // markers: true,
        trigger: '.p152',
        start: 'top top', // 當 trigger 進入視窗頂部時開始
        end: 'bottom top', // 當 trigger 離開視窗頂部時結束
        toggleActions: "play none none reverse", // 讓動畫在進入和離開範圍時播放
        onEnter: () => gsap.to('.p152w1 p', { y: 0 }), // 進入範圍時設定 y 為 0
        onLeave: () => gsap.to('.p152w1 p', { y: '100%' }), // 離開範圍時設定 y 為 -100%
        onEnterBack: () => gsap.to('.p152w1 p', { y: 0 }), // 回到範圍內時設定 y 為 0
        onLeaveBack: () => gsap.to('.p152w1 p', { y: '100%' }) // 再次離開範圍時設定 y 為 -100%
    },
    duration: 1,
    ease: "power2.out"
});
gsap.to('.p151pic', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p151pic',
      start: 'top 90%',
      end: 'bottom top',
      toggleActions: "restart none none reverse",
     },
     duration:1,
     ease:"power2.out",
     opacity:1,
     y:"0%", 
})
gsap.to('.p151pic2', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p151pic2',
      start: 'top 70%',
      end: 'bottom top',
      toggleActions: "restart none none reverse",
     },
     duration:1,
     ease:"power2.out",
     opacity:1,
     y:"0%", 
})
gsap.to('.p151pic3', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p151pic3',
      start: 'top 60%',
      end: 'bottom -60%',
      scrub:2,
      toggleActions: "restart none none reverse",
     },
     ease:"power2.out",
     opacity:.7,
     x:"0%", 
})
gsap.to('.p151pic4', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p151pic4',
      start: 'top -60%',
      end: 'bottom -100%',
      scrub:2,
      toggleActions: "restart none none reverse",
     },
     ease:"power2.out",
     opacity:0,
     x:"0%", 
})
gsap.to(".p151pic4", {
    y: -20,  // 向下移動 100px
    duration: 1.5, // 每次動畫 1 秒
    repeat: -1, 
    rotation:-.5,
    yoyo: true,  // 來回運動
    ease: "power2.inOut" // 平滑的移動效果
  });
  
  gsap.to('.p153w1 p', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p153',
      start: 'top top',
      end: 'bottom top',
      toggleActions: "restart none none reverse",
      onEnter: () => gsap.to('.p153w1 p', { y: 0 }), // 進入範圍時設定 y 為 0
      onLeave: () => gsap.to('.p153w1 p', { y: '100%' }), // 離開範圍時設定 y 為 -100%
      onEnterBack: () => gsap.to('.p153w1 p', { y: 0 }), // 回到範圍內時設定 y 為 0
      onLeaveBack: () => gsap.to('.p153w1 p', { y: '100%' }) // 再次離開範圍時設定 y 為 -100%
  },
  duration: 1,
  ease: "power2.out"
  })
   gsap.to('.p154w1 p', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p154',
      start: 'top top',
      end: 'bottom top',
      toggleActions: "restart none none reverse",
      onEnter: () => gsap.to('.p154w1 p', { y: 0 }), // 進入範圍時設定 y 為 0
      onLeave: () => gsap.to('.p154w1 p', { y: '100%' }), // 離開範圍時設定 y 為 -100%
      onEnterBack: () => gsap.to('.p154w1 p', { y: 0 }), // 回到範圍內時設定 y 為 0
      onLeaveBack: () => gsap.to('.p154w1 p', { y: '100%' }) // 再次離開範圍時設定 y 為 -100%
  },
  duration: 1,
  ease: "power2.out"
  })
  gsap.to('.p155w1 p', { 
    scrollTrigger:{
        // markers:true,
        trigger: '.p155',
        start: 'top top',
        end: 'bottom top',
        toggleActions: "restart none none reverse",
        onEnter: () => gsap.to('.p155w1 p', { y: 0, zIndex: 10 }), 
        onLeave: () => gsap.to('.p155w1 p', { y: '100%', zIndex: 10 }), 
        onEnterBack: () => gsap.to('.p155w1 p', { y: 0, zIndex: 10 }), 
        onLeaveBack: () => gsap.to('.p155w1 p', { y: '100%', zIndex: 10 }) 
    },
    duration: 1,
    ease: "power2.out"
});

  gsap.to('.p151w2', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p151',
      start: 'top top',
      end: 'bottom top',
      toggleActions: "restart none none reverse",
      onEnter: () => gsap.to('.p151w2', { y: 0,opacity:1 }), // 進入範圍時設定 y 為 0
      onLeave: () => gsap.to('.p151w2', { y: '20%',opacity:0 }), // 離開範圍時設定 y 為 -100%
      onEnterBack: () => gsap.to('.p151w2', { y: 0,opacity:1 }), // 回到範圍內時設定 y 為 0
      onLeaveBack: () => gsap.to('.p151w2', { y: '20%',opacity:0 }) // 再次離開範圍時設定 y 為 -100%
  },
  duration: 1,
  ease: "power2.out"
  })
  gsap.to('.p152w2', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p152',
      start: 'top top',
      end: 'bottom top',
      toggleActions: "restart none none reverse",
      onEnter: () => gsap.to('.p152w2', { y: 0,opacity:1 }), // 進入範圍時設定 y 為 0
      onLeave: () => gsap.to('.p152w2', { y: '20%',opacity:0 }), // 離開範圍時設定 y 為 -100%
      onEnterBack: () => gsap.to('.p152w2', { y: 0,opacity:1 }), // 回到範圍內時設定 y 為 0
      onLeaveBack: () => gsap.to('.p152w2', { y: '20%',opacity:0 }) // 再次離開範圍時設定 y 為 -100%
  },
  duration: 1,
  ease: "power2.out"
  })
  gsap.to('.p153w2', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p153',
      start: 'top top',
      end: 'bottom top',
      toggleActions: "restart none none reverse",
      onEnter: () => gsap.to('.p153w2', { y: 0,opacity:1 }), // 進入範圍時設定 y 為 0
      onLeave: () => gsap.to('.p153w2', { y: '20%',opacity:0 }), // 離開範圍時設定 y 為 -100%
      onEnterBack: () => gsap.to('.p153w2', { y: 0,opacity:1 }), // 回到範圍內時設定 y 為 0
      onLeaveBack: () => gsap.to('.p153w2', { y: '20%',opacity:0 }) // 再次離開範圍時設定 y 為 -100%
  },
  duration: 1,
  ease: "power2.out"
  })
  gsap.to('.p154w2', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p154',
      start: 'top top',
      end: 'bottom top',
      toggleActions: "restart none none reverse",
      onEnter: () => gsap.to('.p154w2', { y: 0,opacity:1 }), // 進入範圍時設定 y 為 0
      onLeave: () => gsap.to('.p154w2', { y: '20%',opacity:0 }), // 離開範圍時設定 y 為 -100%
      onEnterBack: () => gsap.to('.p154w2', { y: 0,opacity:1 }), // 回到範圍內時設定 y 為 0
      onLeaveBack: () => gsap.to('.p154w2', { y: '20%',opacity:0 }) // 再次離開範圍時設定 y 為 -100%
  },
  duration: 1,
  ease: "power2.out"
  })
  gsap.to('.p155w2', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.p155',
      start: 'top top',
      end: 'bottom top',
      toggleActions: "restart none none reverse",
      onEnter: () => gsap.to('.p155w2', { y: 0,opacity:1 }), // 進入範圍時設定 y 為 0
      onLeave: () => gsap.to('.p155w2', { y: '20%',opacity:0 }), // 離開範圍時設定 y 為 -100%
      onEnterBack: () => gsap.to('.p155w2', { y: 0,opacity:1 }), // 回到範圍內時設定 y 為 0
      onLeaveBack: () => gsap.to('.p155w2', { y: '20%',opacity:0 }) // 再次離開範圍時設定 y 為 -100%
  },
  duration: 1,
  ease: "power2.out"
  })
  gsap.to('.p152pic', { 
    scrollTrigger:{
    //    markers:true,
      trigger:'.p152pic',
      scrub:2,
      start: 'top bottom',
      end: 'bottom 40%',
      toggleActions: "restart none none reverse",
  },
  opacity:1,
  rotation:2,
  y:"-130%",
  onComplete: () => gsap.set('.p152pic', { zIndex: -1 }) 
  })
  gsap.to('.p152pic2', { 
    scrollTrigger:{
    //    markers:true,
      trigger:'.p152pic2',
      scrub:2,
      start: 'top 110%',
      end: 'bottom 30%',
      toggleActions: "restart none none reverse",
  },
  opacity:1,
  rotation:-3,
  y:"-120%",
  onComplete: () => gsap.set('.p152pic', { zIndex: -1 }) 
  })

//   gsap.to('.b p', {
//     scrollTrigger: {
//         markers: true,
//         trigger: '.p151',
//         start: 'top top', // 當 trigger 進入視窗頂部時開始
//         end: 'bottom 10%', // 當 trigger 離開視窗頂部時結束
//         toggleActions: "play none none reverse", // 讓動畫在進入和離開範圍時播放
//         onEnter: () => gsap.to('.b p', { y: 0, opacity: 1, delay: 0.2 }), // 進入範圍時設定 y 為 0
//         onLeave: () => gsap.to('.b p', { y: '100%' }), // 離開範圍時設定 y 為 -100%
//         onEnterBack: () => gsap.to('.b p', { y: 0, opacity: 1, delay: 0.2 }), // 回到範圍內時設定 y 為 0
//         onLeaveBack: () => gsap.to('.b p', { y: '100%' }) // 再次離開範圍時設定 y 為 -100%
//     },
//     opacity:1,
//     duration: 1,
//     ease: "power2.inOut"
// });
// gsap.to('.b2 p', {
//     scrollTrigger: {
//         markers: true,
//         trigger: '.p151',
//         start: 'top top', // 當 trigger 進入視窗頂部時開始
//         end: 'bottom 10%', // 當 trigger 離開視窗頂部時結束
//         toggleActions: "play none none reverse", // 讓動畫在進入和離開範圍時播放
//         onEnter: () => gsap.to('.b2 p', { y: 0, opacity: 1, delay: 0.4 }), // 進入範圍時設定 y 為 0
//         onLeave: () => gsap.to('.b2 p', { y: '100%' }), // 離開範圍時設定 y 為 -100%
//         onEnterBack: () => gsap.to('.b2 p', { y: 0, opacity: 1, delay: 0.4 }), // 回到範圍內時設定 y 為 0
//         onLeaveBack: () => gsap.to('.b2 p', { y: '100%' }) // 再次離開範圍時設定 y 為 -100%
//     },
//     opacity:1,
//     duration: 1,
//     ease: "power2.inOut"
// });
// gsap.to('.b3 p', {
//     scrollTrigger: {
//         markers: true,
//         trigger: '.p151',
//         start: 'top top', // 當 trigger 進入視窗頂部時開始
//         end: 'bottom 10%', // 當 trigger 離開視窗頂部時結束
//         toggleActions: "play none none reverse", // 讓動畫在進入和離開範圍時播放
//         onEnter: () => gsap.to('.b3 p', { y: 0, opacity: 1, delay: 0.6 }), // 進入範圍時設定 y 為 0
//         onLeave: () => gsap.to('.b3 p', { y: '100%' }), // 離開範圍時設定 y 為 -100%
//         onEnterBack: () => gsap.to('.b3 p', { y: 0, opacity: 1, delay: 0.6 }), // 回到範圍內時設定 y 為 0
//         onLeaveBack: () => gsap.to('.b3 p', { y: '100%' }) // 再次離開範圍時設定 y 為 -100%
//     },
//     opacity:1,
//     duration: 1,
//     ease: "power2.inOut"
// });
// gsap.to('.b4 p', {
//     scrollTrigger: {
//         markers: true,
//         trigger: '.p152',
//         start: 'top top', // 當 trigger 進入視窗頂部時開始
//         end: 'bottom 10%', // 當 trigger 離開視窗頂部時結束
//         onEnter: () => gsap.to('.b4 p', { y: 0, opacity: 1, delay: 0.2 }), // 進入範圍時設定 y 為 0
//         onLeave: () => gsap.to('.b4 p', { y: '100%' }), // 離開範圍時設定 y 為 -100%
//         onEnterBack: () => gsap.to('.b4 p', { y: 0, opacity: 1, delay: 0.2 }), // 回到範圍內時設定 y 為 0
//         onLeaveBack: () => gsap.to('.b4 p', { y: '100%' }),
//         invalidateOnRefresh: true,
//         // 讓動畫進行到結束時
//         onUpdate: (self) => {
//             if (self.progress === 1) {
//                 self.animation.progress(1); // 讓動畫直接結束
//             }
//         }
//     },
//     opacity:1,
//     duration: 1,
//     ease: "power2.inOut"
// });
// gsap.to('.b5 p', {
//     scrollTrigger: {
//         markers: true,
//         trigger: '.p152',
//         start: 'top top', // 當 trigger 進入視窗頂部時開始
//         end: 'bottom top', // 當 trigger 離開視窗頂部時結束
//         onEnter: () => gsap.to('.b5 p', { y: 0, opacity: 1, delay: 0.4 }), // 進入範圍時設定 y 為 0
//         onLeave: () => gsap.to('.b5 p', { y: '100%' }), // 離開範圍時設定 y 為 -100%
//         onEnterBack: () => gsap.to('.b5 p', { y: 0, opacity: 1, delay: 0.4 }), // 回到範圍內時設定 y 為 0
//         onLeaveBack: () => gsap.to('.b5 p', { y: '100%' }) ,
//         invalidateOnRefresh: true,
//         // 讓動畫進行到結束時
//         onUpdate: (self) => {
//             if (self.progress === 1) {
//                 self.animation.progress(1); // 讓動畫直接結束
//             }
//         }
//     },
//     opacity:1,
//     duration: 1,
//     ease: "power2.inOut"
// });
// gsap.to('.b6 p', {
//     scrollTrigger: {
//         markers: true,
//         trigger: '.p152',
//         start: 'top top', // 當 trigger 進入視窗頂部時開始
//         end: 'bottom top', // 當 trigger 離開視窗頂部時結束
//         onEnter: () => gsap.to('.b6 p', { y: 0, opacity: 1, delay: 0.6 }), // 進入範圍時設定 y 為 0
//         onLeave: () => gsap.to('.b6 p', { y: '100%' }), // 離開範圍時設定 y 為 -100%
//         onEnterBack: () => gsap.to('.b6 p', { y: 0, opacity: 1, delay: 0.6 }), // 回到範圍內時設定 y 為 0
//         onLeaveBack: () => gsap.to('.b6 p', { y: '100%' }),
//         invalidateOnRefresh: true,
//         // 讓動畫進行到結束時
//         onUpdate: (self) => {
//             if (self.progress === 1) {
//                 self.animation.progress(1); // 讓動畫直接結束
//             }
//         }
//     },
//     opacity:1,
//     duration: 1,
//     ease: "power2.inOut"
// });
  gsap.to('.eraa1 p, .eraa2 p, .block p', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.mmtt',
      start: 'top -10%',
      end: 'bottom top',
    //   toggleActions: "restart none none none",
     },   
     y:0,
  })
  gsap.to('.block1 p ', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.mmtt',
      start: 'top -10%',
      end: 'bottom top',
    //   toggleActions: "restart none none none",
     },
     duration:.9,
     delay:1,   
     y:0,
  })
  gsap.to('.block2 p ', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.mmtt',
      start: 'top -10%',
      end: 'bottom top',
    //   toggleActions: "restart none none none",
     },
     duration:.9,
     delay:1.2,   
     y:0,
  })
  gsap.to('.block3 p ', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.mmtt',
      start: 'top -10%',
      end: 'bottom top',
    //   toggleActions: "restart none none none",
     },
     duration:.9,
     delay:1.4,   
     y:0,
  })
  gsap.to('.block4 p ', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.mmtt',
      start: 'top -10%',
      end: 'bottom top',
    //   toggleActions: "restart none none none",
     },
     duration:.9,
     delay:1.6,   
     y:0,
  })
  gsap.to('.namehome p', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.mmtt',
      start: 'top -10%',
      end: 'bottom top',
    //   toggleActions: "restart none none none",
     },   
     opacity:1,
     duration:1,
     ease:"power2.out"
  })
  gsap.to('.genus', { 
    scrollTrigger:{
      //  markers:true,
      trigger:'.mmtt',
      start: 'top -10%',
      end: 'bottom top',
    //   toggleActions: "restart none none none",
     },   
     opacity:1,
     duration:1,
     ease:"power2.out"
  })
  gsap.to('.totra',{
    scrollTrigger:{
      trigger:'.totra',
      start:'top top',
      end:'bottom bottom',
      pin:true,
    }
  })
gsap.to('.p2pic',{
    scrollTrigger: {
        // markers: true,
        trigger: '.p2pic ',
        start: 'top top',
        end: 'bottom bottom',
        pin: true,
        toggleActions: "restart none none reverse",
    },
});
gsap.to('.p154pic',{
    scrollTrigger: {
        // markers: true,
        trigger: '.p154pic ',
        start: 'top top',
        end: 'bottom bottom',
        toggleActions: "restart none none reverse",
    },
    opacity:1,
    duration:1,
    ease:"power2.inOut"
});
gsap.to('.tashi', {
    scrollTrigger: {
        // markers: true,
        trigger: '.tashi',
        start: 'top top',
        end:'bottom bottom',
        pin: true,
        pinSpacing: true, // Ensure spacing is maintained
        toggleActions: "play none none reverse", // Simplify toggle actions
    },
});
gsap.to('.process p',{
    scrollTrigger: {
        // markers: true,
        trigger: '.process',
        start: 'top bottom',
        end: 'bottom bottom',
        toggleActions: "restart none none reverse",
    },
    y:-2,
    duration:1,
    ease:"power2.out",
});
gsap.to('.tap1', {
    scrollTrigger: {
        trigger: '.p31',
        start: 'top top',
        end: 'bottom top',
        onEnter: () => {
            gsap.to('.tap1', { opacity: 1, marginBottom: "55%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp1', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic1', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onLeave: () => {
            gsap.to('.tap1', { opacity: 0.3, marginBottom:"0%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp1', { opacity: 0, y: "10%", duration: 0.7, ease: "power2.out" });
            gsap.to('.p3pic1', { opacity: 0,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onEnterBack: () => {
            gsap.to('.tap1', { opacity: 1, marginBottom:"55%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp1', { opacity: 1, y: "0%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic1', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onLeaveBack: () => {
            gsap.to('.tap1', { opacity: 0.3, marginBottom:"0%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp1', { opacity: 0, y: "10%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic1', { opacity: 0,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
    }
});
gsap.to('.tap2', {
    scrollTrigger: {
        trigger: '.p32',
        start: 'top top',
        end: 'bottom top',
        onEnter: () => {
            gsap.to('.tap2', { opacity: 1, marginBottom:"55%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp2', { opacity: 1,y: "0%", duration: 0.7,  ease: "power2.out" }); 
            gsap.to('.p3pic2', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onLeave: () => {
            gsap.to('.tap2', { opacity: 0.3, marginBottom:"0%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp2', { opacity: 0, y: "10%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic2', { opacity: 0,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onEnterBack: () => {
            gsap.to('.tap2', { opacity: 1, marginBottom:"55%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp2', { opacity: 1, y: "0%", duration: 0.7,  ease: "power2.out" }); 
            gsap.to('.p3pic2', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onLeaveBack: () => {
            gsap.to('.tap2', { opacity: 0.3, marginBottom:"0%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp2', { opacity: 0, y: "10%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic2', { opacity: 0,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
    }
});
gsap.to('.tap3', {
    scrollTrigger: {
        trigger: '.p33',
        start: 'top top',
        onEnter: () => {
            gsap.to('.tap3', { opacity: 1, marginBottom:"55%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp3', { opacity: 1,y: "0%", duration: 0.7,  ease: "power2.out" }); 
            gsap.to('.p3pic3', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onLeave: () => {
            gsap.to('.tap3', { opacity: 0.3, marginBottom:"0%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp3', { opacity: 0, y: "10%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic3', { opacity: 0,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onEnterBack: () => {
            gsap.to('.tap3', { opacity: 1, marginBottom:"55%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp3', { opacity: 1, y: "0%", duration: 0.7,  ease: "power2.out" }); 
            gsap.to('.p3pic3', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onLeaveBack: () => {
            gsap.to('.tap3', { opacity: 0.3, marginBottom:"0%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp3', { opacity: 0, y: "10%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic3', { opacity: 0,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
    }
});
gsap.to('.tap4', {
    scrollTrigger: {
        trigger: '.p34',
        start: 'top top',
        end: 'bottom top',
        onEnter: () => {
            gsap.to('.tap4', { opacity: 1, marginBottom:"55%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp4', { opacity: 1,y: "0%", duration: 0.7,  ease: "power2.out" }); 
            gsap.to('.p3pic4', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onLeave: () => {
            gsap.to('.tap4', { opacity: 0.3, marginBottom:"0%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp4', { opacity: 0, y: "10%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic4', { opacity: 0,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onEnterBack: () => {
            gsap.to('.tap4', { opacity: 1, marginBottom:"55%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp4', { opacity: 1, y: "0%", duration: 0.7,  ease: "power2.out" }); 
            gsap.to('.p3pic4', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onLeaveBack: () => {
            gsap.to('.tap4', { opacity: 0.3, marginBottom:"0%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp4', { opacity: 0, y: "10%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic4', { opacity: 0,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
    }
});
gsap.to('.tap5', {
    scrollTrigger: {
        trigger: '.p35',
        start: 'top top',
        end: 'bottom top',
        onEnter: () => {
            gsap.to('.tap5', { opacity: 1, marginBottom:"55%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp5', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic5', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onLeave: () => {
            gsap.to('.tap5', { opacity: 1, marginBottom:"55%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp5', { opacity: 1, y: "0%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic5', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onEnterBack: () => {
            gsap.to('.tap5', { opacity: 1, marginBottom:"55%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp5', { opacity: 1, y: "0%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic5', { opacity: 1,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
        onLeaveBack: () => {
            gsap.to('.tap5', { opacity: 0.3, marginBottom:"0%", duration: 0.7, ease: "power2.out" });
            gsap.to('.tapp5', { opacity: 0, y: "10%", duration: 0.7, ease: "power2.out" }); 
            gsap.to('.p3pic5', { opacity: 0,y: "0%", duration: 0.7, ease: "power2.out" }); 
        },
    }
});

gsap.to('.tap1 p',{
    scrollTrigger: {
        // markers: true,
        trigger: '.tap1',
        start: 'top bottom',
        end: 'bottom bottom',
        toggleActions: "restart none none reverse",
    },
    y:0,
    duration:1,
    ease:"power2.out",
});
gsap.to('.tap2 p',{
    scrollTrigger: {
        // markers: true,
        trigger: '.tap2',
        start: 'top bottom',
        end: 'bottom bottom',
        toggleActions: "restart none none reverse",
    },
    y:0,
    duration:1,
    ease:"power2.out",
});
gsap.to('.tap3 p',{
    scrollTrigger: {
        // markers: true,
        trigger: '.tap3',
        start: 'top bottom',
        end: 'bottom bottom',
        toggleActions: "restart none none reverse",
    },
    y:0,
    duration:1,
    ease:"power2.out",
});
gsap.to('.tap4 p',{
    scrollTrigger: {
        // markers: true,
        trigger: '.tap4',
        start: 'top bottom',
        end: 'bottom bottom',
        toggleActions: "restart none none reverse",
    },
    y:0,
    duration:1,
    ease:"power2.out",
});
gsap.to('.tap5 p',{
    scrollTrigger: {
        // markers: true,
        trigger: '.tap5',
        start: 'top bottom',
        end: 'bottom bottom',
        toggleActions: "restart none none reverse",
    },
    y:0,
    duration:1,
    ease:"power2.out",
});
gsap.fromTo("#text", 
    { strokeDashoffset: 246 }, 
    { 
        strokeDashoffset: 0, 
        duration: 3, 
        ease: "linear",
        scrollTrigger: {
            trigger: "#text",
            start: "top bottom",   // 當 #text 滑動到畫面 80% 時開始動畫
            end: "top 50%",     // 當 #text 滑動到 20% 時結束動畫
            scrub: 2,           // 讓動畫隨滾動進度播放
        }
    }
);
gsap.to('.p42pic img',{
    scrollTrigger: {
        // markers:true,
        trigger:'.p42pic',
        start:'top bottom',
        end:'bottom -40%',
        
        toggleAction:'restart none none restart',
    },
    y:"0",
})
gsap.to('.p42w p',{
    scrollTrigger: {
        // markers:true,
        trigger:'.p42w',
        start:'top bottom',
        end:'bottom -40%',
        
        toggleAction:'restart none none restart',
    },
    y:"0",
})
gsap.to('.s3svg1',{
    scrollTrigger: {
        // markers:true,
        trigger:'.p153',
        start:'top top',
        end:'bottom -40%',
        scrub:true,
        toggleAction:'restart none none restart',
    },
    y:"-10%",
    opacity:0,
})
gsap.to('.s3svg2',{
    scrollTrigger: {
        // markers:true,
        trigger:'.p153',
        start:'top top',
        end:'bottom -40%',
        scrub:true,
        toggleAction:'restart none none restart',
    },
    y:"-20%",
    opacity:0,
})
gsap.to('.s3svg3',{
        scrollTrigger: {
            // markers:true,
        trigger:'.p153',
        start:'top top',
        end:'bottom -40%',
            scrub:true,
            toggleAction:'restart none none restart',
        },
        y:"-35%",
    opacity:0,
})
gsap.to('.s3svg4',{
        scrollTrigger: {
            // markers:true,
        trigger:'.p153',
        start:'top top',
        end:'bottom -40%',
            scrub:true,
            toggleAction:'restart none none restart',
        },
        y:"-45%",
    opacity:0,
})
gsap.to('.s3svg5',{
        scrollTrigger: {
            // markers:true,
        trigger:'.p153',
        start:'top top',
        end:'bottom -40%',
            scrub:true,
            toggleAction:'restart none none restart',
        },
        y:"-5%",
    opacity:0,
})
gsap.to('.s3svg6',{
        scrollTrigger: {
            // markers:true,
        trigger:'.p153',
        start:'top top',
        end:'bottom -40%',
            scrub:true,
            toggleAction:'restart none none restart',
        },
        y:"-25%",
    opacity:0,
})
gsap.to('.s3svg7',{
        scrollTrigger: {
            // markers:true,
            trigger:'.p153',
            start:'top top',
            end:'bottom -40%', 
            scrub:true,
            toggleAction:'restart none none restart',
        },
        y:"-20%",
    opacity:0,
})
gsap.fromTo("#v1", 
    { strokeDashoffset: 420, y:"0%" }, 
    { 
        strokeDashoffset: 0, 
        ease: "linear",
        scrollTrigger: {
            trigger:'.p153',
            start:'top 70%',
            end:'bottom -5%',    // 當 #text 滑動到 20% 時結束動畫
            scrub: 2,           // 讓動畫隨滾動進度播放
        }
    }
);
gsap.fromTo("#v2", 
    { strokeDashoffset: 420, y:"0%" }, 
    { 
        strokeDashoffset: 0, 
        ease: "linear",
        scrollTrigger: {
            trigger:'.p153',
            start:'top 60%',
            end:'bottom -5%',    // 當 #text 滑動到 20% 時結束動畫
            scrub: 2,           // 讓動畫隨滾動進度播放
        }
    }
);
gsap.fromTo("#v3", 
    { strokeDashoffset: 600, y:"0%" }, 
    { 
        strokeDashoffset: 0, 
        markers:true,
        ease: "linear",
        scrollTrigger: {
            trigger:'.p153',
            start:'top 50%',
            end:'bottom 20%',     // 當 #text 滑動到 20% 時結束動畫
            scrub: 2,           // 讓動畫隨滾動進度播放
        }
});
gsap.fromTo("#v4", 
    { strokeDashoffset: 1020, y:"0%" }, 
    { 
        strokeDashoffset: 0, 
        markers:true,
        ease: "linear",
        scrollTrigger: {
            trigger:'.p153',
            start:'top 0%',
            end:'bottom 30%',     // 當 #text 滑動到 20% 時結束動畫
            scrub: 2,           // 讓動畫隨滾動進度播放
        }
    })
gsap.fromTo("#v5", 
    { strokeDashoffset: 77, y:"0%" }, 
    { 
        strokeDashoffset: 0, 
        markers:true,
        ease: "linear",
        scrollTrigger: {
            trigger:'.p153',
            start:'top 80%',
            end:'bottom 10%',     // 當 #text 滑動到 20% 時結束動畫
            scrub: 2,           // 讓動畫隨滾動進度播放
        }
    });
gsap.fromTo("#v6", 
    { strokeDashoffset: 46, y:"0%" }, 
    { 
        strokeDashoffset: 0, 
        ease: "linear",
        scrollTrigger: {
            trigger:'.p153',
            start:'top 60%',
            end:'bottom 20%',    // 當 #text 滑動到 20% 時結束動畫
            scrub: 2,           // 讓動畫隨滾動進度播放
        }
    }
);
gsap.fromTo("#v7", 
    { strokeDashoffset: 380, y:"0%" }, 
    { 
        strokeDashoffset: 0, 
        ease: "linear",
        scrollTrigger: {
            trigger:'.p153',
            start:'top 40%',
            end:'bottom 50%',    // 當 #text 滑動到 20% 時結束動畫
            scrub: 2,           // 讓動畫隨滾動進度播放
        }
    }
);


console.clear();
/* The encoding is super important here to enable frame-by-frame scrubbing. */

// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

/* Make sure the video is 'activated' on iOS */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

/* ---------------------------------- */
/* Scroll Control! */

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: ".p151",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  }
});
once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0
    },
    {
      currentTime: video.duration || 1
    }
  );
});

/* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 1000);
