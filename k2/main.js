
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


//page5 timeline
// 獲取滑動條和按鈕

// let hasOpened = false; // 防止重複觸發
// window.addEventListener('scroll', () => {
//   if (!hasOpened && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//     hasOpened = true;
//     window.location.href = "playground.html"; // 替換為你的檔案名稱
//   }
// });


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

let port;
let reader;
let currentLetter = "";
let isInteractionAllowed = false;

// const keyMap = {
//   L: 'ArrowLeft', // "L" 對應左箭頭鍵
//   R: 'ArrowRight' // "R" 對應右箭頭鍵
// };

// 模擬鍵盤按鍵事件
// function simulateKey(key) {
//   // 模擬按下按鍵
//   const keydownEvent = new KeyboardEvent('keydown', { key });
//   document.dispatchEvent(keydownEvent);

//   // 模擬釋放按鍵
//   setTimeout(() => {
//     const keyupEvent = new KeyboardEvent('keyup', { key });
//     document.dispatchEvent(keyupEvent);
//   }, 100); // 按下 100 毫秒後釋放

//   console.log(`Triggered key: ${key}`);
// }

async function autoConnect() {
    try {
        const ports = await navigator.serial.getPorts();
        if (ports.length > 0) {
            port = ports[0];
            console.log("找到可用串口，嘗試連接...");
            await port.open({ baudRate: 9600 });
            reader = port.readable.getReader();
            console.log("串口連接成功！");
            listenToSerial();
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
            if (done) break;

            const text = new TextDecoder().decode(value).trim();
            if (text === "") continue;

            console.log(`接收到的有效數據: ${text}`);
            displayImage(text);

            // if (keyMap[text]) {
            //   simulateKey(keyMap[text]);
            // } else {
            //   console.warn(`未定義的指令: ${text}`);
            // }
        }
    } catch (err) {
        console.error("讀取數據時發生錯誤: ", err);
    } finally {
        reader.releaseLock();
    }
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
        document.getElementById('eresult').textContent = "( LU )";
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
        document.getElementById('eresult').textContent = "( SHOU )";
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
        document.getElementById('eresult').textContent = "( LILONG )";
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
        document.getElementById('eresult').textContent = "( YUJINSHIAN )";
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
        document.getElementById('eresult').textContent = "( ARABIC )";
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
        document.getElementById('eresult').textContent = "( NIAO )";
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
        document.getElementById('eresult').textContent = "( CHIUYA )";
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
        document.getElementById('eresult').textContent = "( SANSUISUSHI )";
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
        document.getElementById('eresult').textContent = "( FONNIAO )";
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
        document.getElementById('eresult').textContent = "( BAGUATAIJI )";
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
        document.getElementById('eresult').textContent = "( BINMEI )";
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
        document.getElementById('eresult').textContent = "( TUANJU )";
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
        document.getElementById('eresult').textContent = "( LINGI )";
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
        document.getElementById('eresult').textContent = "( SHILIU )";
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
        document.getElementById('eresult').textContent = "( YUNLONG )";
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
        document.getElementById('eresult').textContent = "( MUDAN )";
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
        document.getElementById('eresult').textContent = "( SANSKRIT )";
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
        document.getElementById('eresult').textContent = "( HUSHIHUATSAO )";
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
        document.getElementById('eresult').textContent = "( FUJISAN )";
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
        document.getElementById('eresult').textContent = "( HE )";
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
        document.getElementById('eresult').textContent = "(JOURNAL)";
        document.getElementById('eraa1').textContent = "陶瓷與臺灣";
        document.getElementById('eraa2').textContent = "17世紀";
        document.getElementById('word').textContent = "回看過去四百年";
        document.getElementById('word1').textContent = "台灣經過四個殖民時期，各時期的文化體現在陶瓷上。";
        document.getElementById('word2').textContent = "不同時期的紋樣，反映了當時社會生活與審美風格，";
        document.getElementById('word3').textContent = "這些紋樣寓意深刻，承載當時人們對生活的寄託與願望，";
        document.getElementById('word4').textContent = "展現當時的思想與價值觀，記錄下了時代變遷與文化融合。";
        
    }
}

//如果把設置滾動監聽器刪掉就要加入這個
// document.addEventListener('DOMContentLoaded', autoConnect);

// 設置滾動監聽器
function setupObserver() {
  const sadSection = document.querySelector('.mmtt');
  if (!sadSection) return;

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              console.log("進入 .mmtt 區域，將在 5 秒後啟用與 Arduino 的互動！");
              
              // 延遲 5 秒啟用互動
              setTimeout(() => {
                  isInteractionAllowed = true; // 啟用互動
                  autoConnect(); // 僅需執行一次
                  console.log("與 Arduino 的互動已啟用！");
              }, 3000);

              observer.unobserve(sadSection); // 停止觀察，避免重複觸發
          }
      });
  });

  observer.observe(sadSection);
}

// 初始化滾動監聽
setupObserver();



// const slider = document.getElementById('slider');
// const button1 = document.getElementById('button1');
// const button2 = document.getElementById('button2');
// const button3 = document.getElementById('button3');
// const circle = document.getElementById('circle');

// slider.addEventListener('input', function () {
//     const value = parseInt(slider.value);
  
//     // 根據 slider 的值添加相應的圓形大小
//     if (value === 1) {
//       updateCircle('scale-70');
//     } else if (value === 2) {
//       updateCircle('scale-30');
//     } else if (value === 3) {
//       updateCircle('scale-50');
//     }
//   });
  
//   // 通用函數，用於更新圓形的大小
//   function updateCircle(scaleClass) {
//     circle.className = `circle ${scaleClass}`; // 確保僅添加所需的類
//   }

// // 按鈕1事件：圓形縮放為70%
// button1.addEventListener('click', function() {
//   circle.classList.remove('scale-30', 'scale-50'); // 移除其他的大小類
//   circle.classList.add('scale-70');
//   slider.value = 1; // 設置滑動條值為 1
//   slider.dispatchEvent(new Event('input')); // 添加70%大小的類
// });

// // 按鈕2事件：圓形縮放為30%
// button2.addEventListener('click', function() {
//   circle.classList.remove('scale-70', 'scale-50'); // 移除其他的大小類
//   circle.classList.add('scale-30'); // 添加30%大小的類
//   slider.value = 2; // 設置滑動條值為 2
//   slider.dispatchEvent(new Event('input'));
// });

// // 按鈕3事件：圓形縮放為50%
// button3.addEventListener('click', function() {
//   circle.classList.remove('scale-70', 'scale-30'); // 移除其他的大小類
//   circle.classList.add('scale-50'); // 添加50%大小的類
//   slider.value = 3; // 設置滑動條值為 3
//   slider.dispatchEvent(new Event('input'));
// });






//process滑動
document.addEventListener('DOMContentLoaded', () => {
  let slideImages = document.querySelectorAll('#sl5 img');
  let indicators = document.querySelectorAll('.groundd .swiperr li'); // 所有的 li
  let kkIndicators = document.querySelectorAll('.grounddd .swiperrr li'); // 所有的 kk
  let isDragging = false; // 用來判斷是否正在拖動
  let startX, endX;
  let counter = 0;
  const sliderContainer = document.querySelector('#sl5'); // 滑動區域

  // 禁用圖片選擇和拖動
  slideImages.forEach(img => {
      img.setAttribute('draggable', 'false');
      img.style.userSelect = 'none'; // 禁用選擇
  });

  // li
  function updateIndicators() {
      indicators.forEach((li, index) => {
          li.classList.toggle('active', index === counter); // 根據 counter 更新 li 的 active 狀態
          if (index === counter) {
              // 設置 active 狀態並添加顯示動畫
              gsap.fromTo(
                  li,
                  { opacity: 0, x: 20 }, // 初始狀態
                  { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' } // 動畫到最終狀態
              );
          } else {
              // 隱藏非 active 的 li
              gsap.to(li, {
                  opacity: 0,
                  x: -20,
                  duration: 0.5,
                  ease: 'power2.in'
              });
          }
      });

      // kk
      kkIndicators.forEach((li, index) => {
          li.classList.toggle('active', index === counter); // 根據 counter 更新 kk 的 active 狀態
          if (index === counter) {
              // 設置 active 狀態並添加顯示動畫
              gsap.fromTo(
                  li,
                  { opacity: 0, x: 50 }, // 初始狀態
                  { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' } // 動畫到最終狀態
              );
          } else {
              // 隱藏非 active 的 kk
              gsap.to(li, {
                  opacity: 0,
                  y: 10,
                  duration: 0.5,
                  ease: 'power2.in'
              });
          }
      });
  }

  // 處理拖動開始
  slideImages.forEach((img) => {
      img.addEventListener('mousedown', (e) => {
          isDragging = true;
          startX = e.pageX; // 記錄起始位置
          img.style.cursor = 'grabbing'; // 更改滑鼠樣式
      });

      // 處理拖動過程
      img.addEventListener('mousemove', (e) => {
          if (!isDragging) return; // 如果沒有拖動就不處理
          endX = e.pageX; // 記錄當前位置
      });

      // 處理拖動結束
      img.addEventListener('mouseup', () => {
          if (!isDragging) return; // 如果沒有拖動就不處理

          isDragging = false;
          img.style.cursor = 'grab'; // 還原滑鼠樣式

          // 根據拖動方向切換圖片
          if (startX - endX > 50) {
              // 往左拖動超過 50px，切換到下一張
              slideNext();
          } else if (endX - startX > 50) {
              // 往右拖動超過 50px，切換到上一張
              slidePrev();
          }
      });
  });

  // 處理圖片的下一張
  function slideNext() {
      slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
      if (counter >= slideImages.length - 1) {
          counter = 0;
      } else {
          counter++;
      }
      slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
      updateIndicators(); // 更新 li 和 kk 狀態
  }

  // 處理圖片的上一張
  function slidePrev() {
      slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
      if (counter === 0) {
          counter = slideImages.length - 1;
      } else {
          counter--;
      }
      slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';
      updateIndicators(); // 更新 li 和 kk 狀態
  }

  // 初始化時設置默認 li 和 kk 狀態
  updateIndicators();

  // 處理鍵盤事件
  document.addEventListener('keydown', (e) => {
      // 檢查滑動區域是否存在，且頁面可見
      if (sliderContainer && sliderContainer.offsetParent !== null) {
          if (e.key === 'ArrowRight') {
              // 按下右箭頭鍵，切換到下一張
              slideNext();
          } else if (e.key === 'ArrowLeft') {
              // 按下左箭頭鍵，切換到上一張
              slidePrev();
          }
      }
  });
});



let lastScrollTop = 0; // 上一次滚动位置

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  // 滚动在 3800px 到 4200px 之间
  if (scrollTop >= 3600 && scrollTop < 4200) {
    // 检测滚动方向
    if (scrollTop > lastScrollTop) {
      // 向下滚动：播放动画
      clipPathAnimation.play();
    } else if (scrollTop < lastScrollTop) {
      // 向上滚动：倒转动画
      clipPathAnimation.reverse();
    }
  } else if (scrollTop >= 4200) {
    // 滚动超过 4200px 时：倒转动画
    clipPathAnimation.reverse();
  } else if (scrollTop < 3600) {
    // 滚动回到 3800px 以下时：倒转动画
    clipPathAnimation.reverse();
  }

  // lastScrollTop = scrollTop; // 更新上一次滚动位置 
});




const tl = gsap.timeline(); 
// tl.to(".txt ",{
//   delay:1,
//   opacity: 0,
//   duration: 1.5,
//   ease:"power2.out",
// });  
// tl.to(".txt2 ",{
//   opacity: 1,
//   duration: 1.5,
//   ease:"power2.out",
// });  
// tl.to(".txt2 ",{
//   opacity: 0,
//   duration: 1.5,
//   ease:"power2.out",
// }); 
tl.to(".title p ",{
  y:0,
  duration: 2,
  ease:"power2.out",
  stagger:.2,
});   
tl.to(".item img",{
  opacity: 1,
  duration: 1.7,
  ease:"power2.out",
  y:0,
},"-=1.3");
tl.to(".brown",{
  duration: 1.5,
  ease:"power2.out",
  y:"-15%",
},"-=1.5");
tl.to(".scrr p",{
  opacity: 1,
  duration: 1,
  ease:"power2.out",
  opacity:.7,
  y:0,
}),"-=1";
tl.to(".material-symbols-outlined",{
  opacity: 1,
  duration: 1,
  opacity:.7,
  y:"20%",
},"-=1");




const timeline = gsap.timeline({
  repeat: -1,             // 无限循环
  repeatDelay: 3,
});

// 动画定义
timeline.to(".sssad",  {
  delay:0.5,
  rotationY: 360,
  duration: 1,
  ease: "power4.out",       
});

gsap.registerPlugin(ScrollTrigger);

//四位老哥
gsap.to('.link', {
    scrollTrigger: {
    //   markers: true,
      trigger: '.block',
      start: 'top center',
      end: 'bottom 100px',
      scrub: true,
    },
    y: -60,
  });
  //封面圖
  gsap.to('.cera', {
    scrollTrigger: {
      // markers: true,
      trigger: '.cera',
      start: 'top top',
      end: 'bottom 50px',
      scrub: true,
    },
    y: -80,
    zIndex:99,
  })
gsap.to('.scrr', {
  scrollTrigger: {
    // markers: true,
    trigger: '.scrr',
    start: 'top 400px',
    end: 'top top',
    scrub: true,
  },
  opacity:0,
})

//漸層concept
  gsap.to('.brown', {
    backgroundColor: "#5D5752",
    scrollTrigger: {
        // markers: true,
        trigger: '.brown',
        start: 'top 70%%',
        end: 'bottom 200%',
        scrub: true,
      },
    borderRadius: "10%",
    scaleX: 0.8,
    opacity: .8,
  })

//台灣陶瓷史 十六世紀末到日治時期
    gsap.to('.cback p', {
      scrollTrigger: {
        // markers:true,
        trigger:'.cback',
        start: 'top 30px',
        end: 'bottom -125px',
        pin: true,
      }
    })
//三個花紋
    gsap.to('.motion',{
      scrollTrigger: {
        // markers:true,
        trigger:'.motion',
        start: 'top 800px',
        end: 'bottom -1200px',
        scrub:true,
      },
      y:-370,
    })
//花1
    gsap.to('.sssad', {
      delay:0.4,
      scaleX: 16,
      opacity:1,
      scrollTrigger: {
        // markers: true,
        trigger: '.sssad',
        start: 'top 630px',
        end: 'bottom top',

      }
    });

//花2
gsap.to('.sssad1', {
      delay:0.2,
      scaleX: 20,
      opacity:1,
      scrollTrigger: {
        // markers: true,
        trigger: '.sssad',
        start: 'top 630px',
        end: 'bottom top',

      }
});
gsap.to('.up p', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.up',
    start: 'top bottom',
    end: 'bottom 130px',
    toggleActions: "restart none none reverse",
   },   
   y:0,  
    duration: 1,
    ease: "power2.out",
  })
gsap.to('.up1 p', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.up1',
    start: 'top bottom',
    end: 'bottom 130px',
    toggleActions: "restart none none reverse",
   },   
   y:0,  
    duration: 1,
    ease: "power2.out",
});
gsap.to('.up2 p', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.up2',
    start: 'top bottom',
    end: 'bottom 130px',
    toggleActions: "restart none none reverse",
   },   
   y:0,  
    duration: 1,
    ease: "power2.out",
})
gsap.to('.up3 p', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.up3',
    start: 'top bottom',
    end: 'bottom 130px',
    toggleActions: "restart none none reverse",
   },   
   y:0,  
    duration: 1,
    ease: "power2.out",
})
gsap.to('.cut', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.pcut',
    start: 'top top',
    end: 'bottom top',
    scrub:true,
    pin:true,
    toggleActions: "restart none none reverse",
   },   
   y:"-101%",
})
gsap.to('.cut1', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.pcut',
    start: 'top top',
    end: 'bottom top',
    scrub:true,
    toggleActions: "restart none none reverse",
   },   
   y:"-101%",
})
gsap.to('.cut2', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.pcut',
    start: 'top top',
    end: 'bottom top',
    scrub:true,
    toggleActions: "restart none none reverse",
   },   
   y:"-101%",
})
gsap.to('.cut3', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.pcut',
    start: 'top top',
    end: 'bottom top',
    scrub:true,
    toggleActions: "restart none none reverse",
   },   
   y:"-101%",
})
gsap.to('.cut4', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.pcut',
    start: 'top top',
    end: 'bottom top',
    scrub:true,
    toggleActions: "restart none none reverse",
   },   
   y:"-101%",
})
gsap.timeline({
  scrollTrigger: {
    // markers: true,
    trigger: '.psoo',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    pin:true,
    toggleActions: "restart reverse none none",
  }
})
.to('.psoo', { opacity: 1, duration: 1 })
.to('.psoo', { opacity: 0, duration: 1 });

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
gsap.to('.eraa1 p, .eraa2 p, .block p', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.mmtt',
    start: 'top top',
    end: 'bottom top',
    toggleActions: "restart none none reverse",
   },   
   y:0,
})

gsap.to('.block1 p ', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.mmtt',
    start: 'top top',
    end: 'bottom top',
    toggleActions: "restart none none reverse",
   },
   duration:.9,
   delay:1,   
   y:0,
})
gsap.to('.block2 p ', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.mmtt',
    start: 'top top',
    end: 'bottom top',
    toggleActions: "restart none none reverse",
   },
   duration:.9,
   delay:1.2,   
   y:0,
})
gsap.to('.block3 p ', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.mmtt',
    start: 'top top',
    end: 'bottom top',
    toggleActions: "restart none none reverse",
   },
   duration:.9,
   delay:1.4,   
   y:0,
})
gsap.to('.block4 p ', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.mmtt',
    start: 'top top',
    end: 'bottom top',
    toggleActions: "restart none none reverse",
   },
   duration:.9,
   delay:1.6,   
   y:0,
})
gsap.to('.namehome p', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.mmtt',
    start: 'top top',
    end: 'bottom top',
    toggleActions: "restart none none reverse",
   },   
   opacity:1,
   duration:1,
   ease:"power2.out"
})
gsap.to('.genus', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.mmtt',
    start: 'top top',
    end: 'bottom top',
    toggleActions: "restart none none reverse",
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

gsap.to('.friend1',{
  scrollTrigger:{
    trigger:'.friend1',
    start:'top bottom',
    end:'bottom 60%',
    scrub:true,
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  x:0,
  y:"-80%",
})
gsap.to('.friend2',{
  scrollTrigger:{
    trigger:'.friend2',
    start:'top bottom',
    end:'bottom 60%',
    scrub:true,
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  x:0,
  y:"-80%",
})
gsap.to('.friend3',{
  scrollTrigger:{
    trigger:'.friend3',
    start:'top bottom',
    end:'bottom 60%',
    scrub:true,
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  x:0,
  y:"-80%",
})
gsap.to('.friend4',{
  scrollTrigger:{
    trigger:'.friend4',
    start:'top bottom',
    end:'bottom 60%',
    scrub:true,
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  x:0,
  y:"-80%",
})
gsap.to('.friend5',{
  scrollTrigger:{
    trigger:'.friend5',
    start:'top bottom',
    end:'bottom 60%',
    scrub:true,
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  x:0,
  y:"-80%",
})
gsap.to('.friendname1',{
  scrollTrigger:{
    trigger:'.friendname1',
    start:'top bottom',
    end:'bottom 60%',
    scrub:true,
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  x:0,
  y:"-80%",
})
gsap.to('.friendname2',{
  scrollTrigger:{
    trigger:'.friendname2',
    start:'top bottom',
    end:'bottom 60%',
    scrub:true,
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  x:0,
  y:"-80%",
})
gsap.to('.friendname3',{
  scrollTrigger:{
    trigger:'.friendname3',
    start:'top bottom',
    end:'bottom 60%',
    scrub:true,
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  x:0,
  y:"-80%",
})
gsap.to('.friendname4',{
  scrollTrigger:{
    trigger:'.friendname4',
    start:'top bottom',
    end:'bottom 60%',
    scrub:true,
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  x:0,
  y:"-80%",
})
gsap.to('.friendname5',{
  scrollTrigger:{
    trigger:'.friendname5',
    start:'top bottom',
    end:'bottom 60%',
    scrub:true,
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  x:0,
  y:"-80%",
})
gsap.to('.roma1 p',{
  scrollTrigger:{
    trigger:'.roma1',
    start:'top bottom',
    end:'bottom 60%',
    toggleActions: "restart none none reverse",
  },
  duration:1.5,
  ease:"power2.out",
  x:0,
})

gsap.to('.nono p',{
  scrollTrigger:{
    trigger:'.mo1',
    start:'top top',
    end:'bottom top',
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  y:0,
  // onComplete: () => {
  //   document.querySelector('.bon').style.display = 'block';
  // }
})
          
gsap.to('.nono2 p',{
  scrollTrigger:{
    trigger:'.mo2',
    start:'top bottom',
    end:'bottom top',
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  y:0,
  // onComplete: () => {
  //   document.querySelector('.bon1').style.display = 'block';
  // }
}) 
               
gsap.to('.nono3 p',{
  scrollTrigger:{
    trigger:'.mo3',
    start:'top bottom',
    end:'bottom top',
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  y:0,
  // onComplete: () => {
  //   document.querySelector('.bon2').style.display = 'block';
  // }
}) 
               
gsap.to('.nono4 p',{
  scrollTrigger:{
    trigger:'.mo4',
    start:'top bottom',
    end:'bottom top',
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  y:0,
  // onComplete: () => {
  //   document.querySelector('.bon3').style.display = 'block';
  // }
}) 

gsap.to('.nono5 p',{
  scrollTrigger:{
    trigger:'.mo5',
    start:'top bottom',
    end:'bottom top',
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  y:0,
  // onComplete: () => {
  //   document.querySelector('.bon4').style.display = 'block';
  // }
}) 

gsap.to('.dont',{
  scrollTrigger:{
    trigger:'.bonn',
    start:'top bottom',
    end:'bottom top',
    toggleActions: "restart none none reverse",
  },
  duration:1,
  ease: "power2.out",
  y:0,
  // onComplete: () => {
  //   document.querySelector('.bonn').style.display = 'block';
  // }
}) 



gsap.to('.roun', {
  scrollTrigger:{
    // markers:true,
    trigger:'.roun',
    start:'center 630',
    end:'center top',
    toggleActions: "restart none none reverse",
  },
  x:60,
  duration:1,
  ease:"power4.out"
})



gsap.to('.wordcess',{
  scrollTrigger:{
    // markers:true,
    trigger:'.wordcess',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:1,
  y:0,
})

gsap.to('.err',{
  scrollTrigger:{
    // markers:true,
    trigger:'.err',
    start:'bottom bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:1,
  y:0,
})

gsap.to('.eraa',{
  scrollTrigger:{
    // markers:true,
    trigger:'.eraa',
    start:'bottom bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  delay:0.3,
  ease:"power2.out(1)",
  duration:1,
  y:0,
})

gsap.to('.tradii',{
  scrollTrigger:{
    // markers:true,
    trigger:'.tradii',
    start:'bottom bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:1,
  y:0,
})

gsap.to('.traditionn',{
  scrollTrigger:{
    // markers:true,
    trigger:'.traditionn',
    start:'bottom bottom',
    end:'bottom top',
    toggleActions: "restart none none none",
  },
  delay:0.3,
  ease:"power2.out(1)",
  duration:1,
  y:0,
})

gsap.to('.tt1',{
  scrollTrigger:{
    // markers:true,
    trigger:'.tt1',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:2,
  y:0,
})

gsap.to('.tt2',{
  scrollTrigger:{
    // markers:true,
    trigger:'.tt2',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:2,
  y:0,
})

gsap.to('.tt3',{
  scrollTrigger:{
    // markers:true,
    trigger:'.tt3',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:2,
  y:0,
})

gsap.to('.tt4',{
  scrollTrigger:{
    // markers:true,
    trigger:'.tt4',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:2,
  y:0,
})

gsap.to('.tt5',{
  scrollTrigger:{
    // markers:true,
    trigger:'.tt5',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:2,
  y:0,
})

gsap.to('.tt6',{
  scrollTrigger:{
    // markers:true,
    trigger:'.tt6',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:2,
  y:0,
})

gsap.to('.tt7',{
  scrollTrigger:{
    // markers:true,
    trigger:'.tt7',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:2,
  y:0,
})

gsap.to('.tt8',{
  scrollTrigger:{
    // markers:true,
    trigger:'.tt8',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:2,
  y:0,
})

gsap.to('.tt9',{
  scrollTrigger:{
    // markers:true,
    trigger:'.tt9',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:2,
  y:0,
})

gsap.to('.tt10',{
  scrollTrigger:{
    // markers:true,
    trigger:'.tt10',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:2,
  y:0,
})

gsap.to('.trapic', {
  scrollTrigger:{
    // markers:true,
    trigger:'.trapic',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none reverse",
  },
     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",// 最終狀態
      duration: 2, // 動畫持續時間
      ease: "power2.out", // 動畫緩動效果
})

gsap.to('.picesss', {
  scrollTrigger:{
    // markers:true,
    trigger:'.picesss',
    start:'top 600',
    end:'bottom top',
    // toggleActions: "restart none none reverse",
  },
     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",// 最終狀態
      duration: 2, // 動畫持續時間
      ease: "power2.out", // 動畫緩動效果
})

gsap.to('.trapicc', {
  scrollTrigger:{
    // markers:true,
    trigger:'.trapicc',
    start:'top bottom',
    end:'bottom top',
    scrub:true,
    // toggleActions: "restart none none reverse",
  },
     y:-50,
})

gsap.to('.picess', {
  scrollTrigger:{
    // markers:true,
    trigger:'.picess',
    start:'top bottom',
    end:'bottom top',
    scrub:true,
    // toggleActions: "restart none none reverse",
  },
     y:-100,
})

gsap.to('.groundd',{
  scrollTrigger:{
    // markers:true,
    trigger:'.groundd',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:1,
  y:-50,
})

gsap.to('.grounddd',{
  scrollTrigger:{
    // markers:true,
    trigger:'.grounddd',
    start:'top bottom',
    end:'bottom top',
    // toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:1,
  y:-50,
})



gsap.to('.swiper',{
  scrollTrigger:{
    // markers:true,
    trigger:'.swiper',
    start:'top bottom',
    end:'bottom top',
    toggleActions: "restart none none none",
  },
  ease:"power2.out(1)",
  duration:0.5,
  y:-50,
})

gsap.to('.rounline', {
  scrollTrigger:{
    // markers:true,
    trigger:'.rounline',
    start:'top bottom',
    end:'center top',
    toggleActions: "restart none none reverse",
  },
  delay:1.5,
  scaleX:1350,
  duration:1.5,
  ease:"power4.out(1)"
})

//.horizontal-container
// gsap.to('.coolor', {
//   scrollTrigger:{
//     // markers:true,
//     trigger:'.coolor',
//     start:'top top',
//     end:'top -700',
//     scrub:true,
//   },
//   opacity:.5,
// })

gsap.to('.quhome', {
  scrollTrigger:{
    // markers:true,
    trigger:'.quhome',
    start:'top top',
    end:'bottom top',
    pin:true,
    // toggleActions: "restart none none reverse",
  },
})

gsap.to('.too', {
  scrollTrigger:{
    trigger:'.too',
    start:'top 500',
    end:'top top',
  },
  y:0,
})

gsap.to('.ppt',{
  scrollTrigger:{
    trigger:'.ppthome',
    start:'top top',
    end:'bottom top',
    scrub:true,
  },
  y:2350,
  // y:3050,
}) 

gsap.to('.ppt1',{
  scrollTrigger:{
    trigger:'.ppt1',
    start:'top bottom',
    end:'bottom top',
    scrub:true,
  },
  y:-1500,
}) 

gsap.to('.coco',{
  scrollTrigger:{
    trigger:'.coco',
    start:'top top',
    end:'bottom bottom',
    scrub:true,
  },
  opacity:0,
}) 
gsap.to('.bye',{
  scrollTrigger:{
    trigger:'.bye',
    start:'top bottom',
    end:'bottom bottom',
  },
  x:0,
  duration:1.5,
  ease:"power2.out",
}) 
gsap.to('.texx1 p',{
  scrollTrigger:{
    trigger:'.texx1',
    start:'top 90%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
}) 
gsap.to('.texx2 p',{
  scrollTrigger:{
    trigger:'.texx2',
    start:'top 90%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
}) 
gsap.to('.ggl p',{
  scrollTrigger:{
    trigger:'.ggl',
    start:'top 90%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
}) 
gsap.to('.ggl2 p',{
  scrollTrigger:{
    trigger:'.ggl2',
    start:'top 90%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
}) 
gsap.to('.ggl3 p',{
  scrollTrigger:{
    trigger:'.ggl3',
    start:'top 90%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
})
gsap.to('.ggl4 p',{
  scrollTrigger:{
    trigger:'.ggl4',
    start:'top 90%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
})  
gsap.to('.ggl5 p',{
  scrollTrigger:{
    trigger:'.ggl5',
    start:'top 90%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
})
gsap.to('.ggll p',{
  scrollTrigger:{
    trigger:'.ggll',
    start:'top 80%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
}) 
gsap.to('.ggll2 p',{
  scrollTrigger:{
    trigger:'.ggll2',
    start:'top 80%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
}) 
gsap.to('.ggll3 p',{
  scrollTrigger:{
    trigger:'.ggll3',
    start:'top 80%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
})
gsap.to('.ggll4 p',{
  scrollTrigger:{
    trigger:'.ggll4',
    start:'top 80%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
})  
gsap.to('.ggll5 p',{
  scrollTrigger:{
    trigger:'.ggll5',
    start:'top 80%',
    end:'bottom bottom',
  },
  y:0,
  duration:1.5,
  ease:"power2.out",
}) 
gsap.to('.byebye p',{
  scrollTrigger:{
    trigger:'.byebye p',
    start:'top bottom',
    end:'bottom bottom',
  },
  delay:1.2,
  y:0,
  duration:1.5,
  ease:"power2.out",
}) 
    
//home鍵fix
//   gsap.fromTo(".fixed-icon", {
//     pointerEvents: "none",
//     opacity: 0, }, {
//     opacity: 1,
//     pointerEvents: "auto", // 滾動到第二頁後顯示
//     scrollTrigger: {
//         // markers: true,
//         trigger: ".concept", 
//         start: "top 10", 
//         end: "bottom 10", 
//         toggleActions: "restart none none reset", 
//     }
// });

// //home鍵旋轉效果(last)
// const fixedIcon = document.querySelector('.fixed-icon');
// const overlay = document.querySelector('.overlay');
// const menu= document.querySelector('.menu');
// const menuf= document.querySelector('.menuf');
// const xx=document.querySelectorAll(".text");
//   let isRotated = false;

//   fixedIcon.addEventListener('click', function() {
//     if (isRotated) {
//       gsap.to(fixedIcon, {
//         rotation: 0,  
//         duration: .5,  
//         ease: "power2.out"
//       });
//       gsap.to(overlay, {
//         opacity: 0, // 使蒙版逐渐消失
//         duration: 0.5,
//         onComplete: () => { 
//           overlay.style.display = 'none'; // 完全透明后隐藏蒙版
//         }
//       });
//       gsap.to(menu, {
//         x:0,
//         duration:.5,
//         ease:"power2.out"
//       });
//       gsap.to(menuf, {
//         x:0,
//         duration:.5,
//         ease:"power2.out"
//       });
    
//     } else {
//       gsap.to(fixedIcon, {
//         rotation: "+=45", 
//         duration: .5,      
//         ease: "power2.out"
//       });
//       gsap.to(overlay, {
//         display: 'block',
//         opacity: .7, // 使蒙版从透明变为可见
//         duration: 0.5
//       });
//       gsap.to(menu, {
//         x:-500,
//         duration:1,
//         ease:"elastic.out(0.3)"
//       });
//       gsap.to(menuf, {
//         x:-470,
//         duration:1.1,
//         opacity:.5,
//         ease:"elastic.out(0.3)"
//       });
    
//     }
//     isRotated = !isRotated;
//   });

//   overlay.addEventListener('click', () => {
//     gsap.to(overlay, {
//       opacity: 0, // 使蒙版逐渐消失
//       duration: 0.5,
//       onComplete: () => { 
//         overlay.style.display = 'none'; // 完全透明后隐藏蒙版
//       }
//     });
//     gsap.to(fixedIcon, {
//       rotation: "0", 
//       duration: .5,      
//       ease: "power2.out"
//     });
//     gsap.to(menu, {
//       x:0,
//       duration:.5,
//       ease:"power2.out"
//     });
//     gsap.to(menuf, {
//       x:0,
//       duration:.5,
//       ease:"power2.out"
//     });
//     isRotated = !isRotated;
//   });

// xx.addEventListener('click',  () => {
//   gsap.to(overlay, {
//     opacity: 0, // 使蒙版逐渐消失
//     duration: 0.5,
//     onComplete: () => { 
//       overlay.style.display = 'none'; // 完全透明后隐藏蒙版
//     }
//   });
//   gsap.to(fixedIcon, {
//     rotation: "0", 
//     duration: .5,      
//     ease: "power2.out"
//   });
//   gsap.to(menu, {
//     x:0,
//     duration:.5,
//     ease:"power2.out"
//   });
//   gsap.to(menuf, {
//     x:0,
//     duration:.5,
//     ease:"power2.out"
//   });
//   isRotated = !isRotated;
// });


