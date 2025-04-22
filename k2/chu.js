
let lastPhwId = null;
let up2Timeout = null;
let isTransitioning = false;
let isColorChanging = false;
let isLocked = false;
let navOffset = 0; // 記錄 navtrack 的偏移距離

const phwIds = Array.from({ length: 20 }, (_, i) => `phw${(i + 1).toString().padStart(2, '0')}`);

function showCorrespondingW(phwId) {
    // 隱藏所有 w 元素
    document.querySelectorAll('[id^="w"]').forEach(el => el.classList.remove('w'));
    document.querySelectorAll('[id^="svg"]').forEach(el => el.classList.remove('run'));
  
    // 從 phwId 中取出數字，例如 'php01' -> '1'
    const index = parseInt(phwId.replace('phw', ''), 10);
    const paddedIndex = String(index).padStart(2, '0');
  
    // 尋找對應的 w 元素，例如 w1, w2...
    const targetW = document.getElementById(`w${index}`);
    const tardetsvg = document.getElementById(`svg${index}`);
    if (targetW) {
      targetW.classList.add('w'); // 加上你要的 class
    }
    if (tardetsvg) {
        tardetsvg.classList.add('run'); // 加上你要的 class
      }
      const textMap = {
        "01": [ "祿、仕途順遂", "始於宋代，官祿、福祿，代表長壽和福氣，\n常與動植物如鶴、松、竹、梅搭配，表達富裕和幸福。\n此時期的鹿紋陶器常使用鮮明的顏色，如藍、紅、金。\n使用雕刻、凹雕技術，使鹿紋顯得更加生動。"],
        "02": ["生命的敬畏、健康的祝願、生活的期盼", "可追溯至漢代，在清代達到工藝高峰。\n與和諧的生活息息相關，日常生活中追求的重要美德。\n樣式和裝飾方式的表現形式多樣。\n使用雕刻、凹雕技術，光線變化使紋路更加清晰。"],
        "03": ["美好、吉祥、招財", "始於唐宋，經過多次演變。\n中國神話中一種沒有角的龍，龍與虎的後代。\n使用雕刻、浮雕技術，使得龍形圖案更加立體，表現出龍身的曲線和細節，甚至是龍鱗的質感。"],
        "04": ["荷蘭上層社會的代表", "透過荷蘭東印度公司貿易網絡進入台灣。\n寓意著繁榮和美麗，也代表荷蘭人對異國情調的熱愛。\n台灣的陶瓷工匠在荷蘭的影響下，開始模仿這種風格。\n體現了荷蘭對植物的偏好、貿易影響及文化的交融。"],
        "05": ["來自伊斯蘭教，阿拉伯文的宗教祈禱", "透過荷蘭東印度公司貿易網絡進入台灣。\n被認為具有祝福功能，能保護擁有者免受邪惡或不幸，如「奉仁慈的真主之名」或「真主至大」等祈語。\n是當時國際貿易和文化交流的體現。"],
        "06": ["吉祥、長壽，還是表達自然的自由精神", "發展悠久，始於漢代之前。\n有吉祥和幸福的寓意，與自由、季節變化相關，常與其他元素如花卉、雲紋等搭配。\n常以浮雕或刻花技法表現，展現鳥羽的細節。"],
        "07": ["「梧桐一落葉，天下盡知秋」", "始於唐代，此時葉片紋樣逐漸成為一種常見的紋樣。\n秋季是收穫的季節，代表豐收、成熟和安定。\n清順治時期流行的一種搭配為石頭、落葉與警語。\n常以浮雕或刻花技法表現，凸顯葉片的立體感。"],
        "08": ["山川、溪流、樹木、奇石", "起源於宋代的山水畫藝術，在元明清逐漸成熟。\n以山水景致為主題，突出自然山水的廣闊與深遠，常見於具觀賞性的器物，體現文人對寄情山水的理想。\n技法偏向寫意，以勾勒、皴法為主，常見於青花瓷、釉里紅。"],
        "09": ["吉祥與高貴", "發展悠久，始於新石器時代。\n與祥雲、山水結合，常用於宮廷瓷器上。\n是生活器具如盤、碗、瓶與祭祀、禮儀中的重要體現。\n常以浮雕或刻花雕刻鳳鳥，突出線條的流暢與紋理。"],
        "10": ["起源於道家思想，陰陽相生、萬物變化", "始於魏晉南北朝，在隋唐至宋代逐漸成熟。\n八卦紋以短線組成八組不同的符號，搭配太極紋。\n常作為宗教供奉、風水器物，是道教宇宙觀的體現。\n以青花、釉里紅或彩繪技法表現。"],
        "11": ["寒冬時誕生、象徵堅強意志與生命的復甦", "始於清康熙，又稱「冰裂梅花紋」，描述冬季冰面裂紋與梅花盛開的景象。\n釉面在高溫燒製後形成自然的裂紋，稱為「開片」，再在其釉面繪上梅花或枝梅。"],
        "12": ["長壽之花，正直不屈、高雅純潔", "始於宋代，常被用於婚嫁或吉慶場合的器物裝飾。\n團菊紋的主體多數以對稱的形式呈現，花瓣層層疊疊，細線勾勒菊花輪廓，用填色或施釉技術增加立體感。\n以青花藍、釉裏紅、黃色為主，色彩鮮明而典雅。"],
        "13": ["被視為仙草，象徵長壽、健康與祥瑞", "可追溯至漢代，在明清兩代達到工藝高峰。\n珍貴的藥材，形似不規則的波浪，似雲或花。\n常以曲線勾勒，與其他圖案如雲紋、如意紋等結合。\n在青花瓷中，多以青花料勾畫。"],
        "14": ["多子多福、繁榮昌盛", "始於明代，常見於清代的婚慶用瓷及壽器上。\n豐滿的外形和許多果實顆粒，代表繁榮和生生不息。\n常見於青花瓷中，工匠以藍色釉料繪製石榴外形。"],
        "15": ["花王，富貴與繁榮、吉祥與美好", "始於宋代，常見於壽器、婚慶以及其他吉祥禮品中。\n花中之王，長久以來被視為富貴、繁榮和幸福。\n牡丹的顏色多變，常見的有紅色、粉色、紫色。\n常與其他圖案如蝙蝠、鳳凰等結合，強化其祝福意涵。"],
        "17": ["湖石、花卉、草木", "始於宋代，在明清兩代達到工藝高峰。\n刻畫庭園中湖石與花草如牡丹、菊花、梅花的搭配。\n構圖集中，注重花草與湖石的局部組合。\n技法偏向工筆，細膩描繪、色彩豐富常見於粉彩、五彩。"],
        "16": ["權威、力量、保護和祥瑞", "始於唐宋，在宮廷瓷器中得到廣泛應用。\n龍多呈現蜿蜒或盤旋，雲則外形多變，作為輔紋，常與龍的動態形成對比。\n在青花瓷中最為常見，青花龍搭配白色的雲。"],
        "18": ["來自佛教經典，寓意祥和、安寧與幸福。", "始於唐代，在明清兩代達到工藝高峰。\n起源於宗教藝術，古印度的文字，常見於佛經中。\n多以篆書字母，以圓形、方形整齊排列構成規律圖案。\n融合了宗教信仰、藝術表現和文化交流的紋樣。"],
        "19": ["長壽、吉祥與和平", "這一紋樣反映了日治時期中日文化交融的特點，\n常與松樹、富士山、櫻花等搭配，體現日本物哀美學。\n此時期陶瓷工藝在台灣迅速發展，多以日本引進技法，\n如釉下彩、印花轉印等，結合台灣本地資源與傳統技藝。"],
        "20": ["安穩、神聖與吉祥", "這一紋樣反映了日治時期中日文化交融的特點，\n常以簡練的線條呈現，搭配太陽、櫻花、波浪或雲朵。\n此時期陶瓷工藝在台灣迅速發展，多以日本引進技法，\n如釉下彩、印花轉印等，結合台灣本地資源與傳統技藝。"]
    };
      const ta = document.getElementById('phw3');
      const tb = document.getElementById('phw4');
      
      // 根據 paddedIndex 更新 textContent
      if (tb && textMap[paddedIndex]) {
        tb.textContent = textMap[paddedIndex][0];
        tb.classList.remove('fade-in');
        void tb.offsetWidth; // 觸發 reflow，讓動畫可以重新啟動
        tb.classList.add('fade-in');
    } else if (tb) {
        tb.textContent = '';
        tb.classList.remove('fade-in');
    }
    
    if (ta && textMap[paddedIndex]) {
        ta.textContent = textMap[paddedIndex][1];
        ta.classList.remove('fade-in');
        void ta.offsetWidth;
        ta.classList.add('fade-in');
    } else if (ta) {
        ta.textContent = '';
        ta.classList.remove('fade-in');
    }
  }
  
function showOnly(phwId) {
  isTransitioning = true;
  

  phwIds.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('up', 'up2');
    el.style.opacity = '';
  });

  const current = document.getElementById(phwId);
  current.classList.add('up');
  setTimeout(() => {
    current.style.opacity = '1';
  }, 50);

  if (lastPhwId && lastPhwId !== phwId) {
    const lastEl = document.getElementById(lastPhwId);
    lastEl.classList.add('up2');

    if (up2Timeout) clearTimeout(up2Timeout);

    setTimeout(() => {
      lastEl.style.opacity = '0';
    }, 800);

    up2Timeout = setTimeout(() => {
      lastEl.classList.remove('up2');
    }, 800);
  }

  lastPhwId = phwId;
  showCorrespondingW(phwId);

  setTimeout(() => {
    isTransitioning = false;
  }, 1500);
}

function queueShowOnly(phwId) {
  if (isTransitioning) return;
  showOnly(phwId);
}

const materialIcons = document.querySelectorAll('.icon-track');
const materialIcon = document.querySelectorAll('.icon-trac');
document.querySelectorAll('.php').forEach((el, index) => {
  el.addEventListener('click', () => {
    if (isLocked || isColorChanging) return;

    isLocked = true;
    isColorChanging = true;

    materialIcons.forEach(icon => icon.classList.add('animate-once'));
    materialIcon.forEach(icon => icon.classList.add('animate-twice'));

    setTimeout(() => {
      materialIcons.forEach(icon => icon.classList.remove('animate-once'));
      isLocked = false;
    }, 2000);
    setTimeout(() => {
        materialIcon.forEach(icon => icon.classList.remove('animate-twice'));
        isLocked = false;
      }, 2000);

      document.querySelectorAll('.php').forEach(p => {
        p.style.setProperty('--after-h', '0%');
      });
      
      // 再設置新值，確保 transition 生效
      el.style.setProperty('--after-h', '5rem');
      
      const phwId = `phw${(index + 1).toString().padStart(2, '0')}`;
      queueShowOnly(phwId);


    setTimeout(() => {
      isColorChanging = false;
    }, 2000);
  });
});
function changePhw(direction = 1) {
  if (isTransitioning) return;

  const currentIndex = phwIds.indexOf(lastPhwId);
  const nextIndex = (currentIndex + direction + phwIds.length) % phwIds.length;
  const nextId = phwIds[nextIndex];
  const navTrack = document.getElementById('navhome');


  // 動畫 class 操作
  materialIcons.forEach(icon => icon.classList.add('animate-once'));
  materialIcon.forEach(icon => icon.classList.add('animate-twice'));

  setTimeout(() => {
    materialIcons.forEach(icon => icon.classList.remove('animate-once'));
    isLocked = false;
  }, 2000);

  setTimeout(() => {
    materialIcon.forEach(icon => icon.classList.remove('animate-twice'));
    isLocked = false;
  }, 2000);

  // 所有 .php 的 --after-h 重設為 0%
  document.querySelectorAll('.php').forEach(p => {
    p.style.setProperty('--after-h', '0%');
  });

  // 讓要顯示的元素加上動畫效果
  const targetPhp = document.querySelector(`.php:nth-child(${nextIndex + 2})`);
  if (targetPhp) {
    targetPhp.style.setProperty('--after-h', '5rem');
  }

  showOnly(nextId);
  showCorrespondingW(nextId);
}

  
  // 原本的函式可保留調用用法
  function nextPhw() {
    changePhw(1);
  }
  function prevPhw() {
    changePhw(-1);
  }
  
document.getElementById('prevBtn').addEventListener('click', prevPhw);
document.getElementById('nextBtn').addEventListener('click', nextPhw);

const content = document.querySelector('.content'); // 或用 getElementById('content')
const ctent1 = document.querySelector('.ctent1');
const ctent2 = document.querySelector('.ctent2');
const j = document.querySelectorAll('.j li'); // 修改：選擇所有 <li> 元素
const jElements = document.querySelectorAll('.j');
const j1 = document.getElementById('j1');
let clicked = false;

// 點擊菜單
document.querySelector('.menu').addEventListener('click', () => {

    if (!clicked) {
        // 回復原本 j 元素樣式
        jElements.forEach(jEl => {
            jEl.style.opacity = 1;
        });

        // 第一次點擊，添加 slide-in 類
        ctent1.classList.add('slide-in');
        ctent1.classList.remove('slide-out');
        ctent2.classList.add('slide-in');
        ctent2.classList.remove('slide-outt');

        // 顯示所有 li 元素
        j.forEach((li, index) => {
            setTimeout(() => {
                li.classList.add('show');
            }, index * 200);
        });

        j.forEach((li) => {
            li.classList.remove('nosh');
        });

        clicked = true;  // 更新點擊狀態
    } else {
        ctent1.classList.replace('slide-in', 'slide-out');
        ctent2.classList.replace('slide-in', 'slide-outt');


        // 隱藏所有 li 元素
        j.forEach((li, index) => {
            setTimeout(() => {
                li.classList.add('nosh');
                li.classList.remove('show');
            }, index * 200); 
        });

        clicked = false;  // 更新點擊狀態
    }
});

jElements.forEach((jElement, index) => {
    jElement.addEventListener('click', (event) => {
        const clickedJ = event.currentTarget;  // 獲取被點擊的元素

        // 隱藏其他 li 元素
        jElements.forEach((otherElement, index) => {
            if (otherElement !== clickedJ) {
                const li = otherElement.querySelector('li');
                setTimeout(() => {
                    li.classList.add('nosh');
                    li.classList.remove('show');
                }, index * 200);
            }
        });

        // 點擊的元素不需要添加 .nosh 類，保持顯示
        clickedJ.querySelector('li').classList.remove('nosh'); // 修改：選擇 <li> 元素

        if (clickedJ.id !== 'j1') {
            const rect = clickedJ.getBoundingClientRect();
            const clone = clickedJ.cloneNode(true);
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        
            clone.classList.add('fixed-j');
            
            clone.style.setProperty('--left', (rect.left + scrollLeft) + 'px');
            clone.style.setProperty('--top', (rect.top + scrollTop) + 'px');
            clone.style.setProperty('--h', rect.height + 'px');
            clone.style.setProperty('--w', rect.width + 'px');
        
            // 設定透明度為 0，讓原始元素隱藏
            clickedJ.style.opacity = 0;
        
            // 把克隆元素添加到頁面
            document.querySelectorAll('.fixed-j').forEach(el => el.remove());
            document.body.appendChild(clone);
        
            // 為克隆的元素添加動畫類
            const transformClass = `tin-${index + 1}`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    clone.classList.add(transformClass);
                });
            });
        }
        
        // 隱藏所有 .r 區塊
        document.querySelectorAll('[class^="r"]').forEach(r => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            r.style.display = 'none';
        });

        // 顯示對應的 .r 區塊
        const rTarget = document.querySelector(`.r${index + 1}`);
        if (rTarget) {
            rTarget.style.display = 'flex';
        }

        ctent1.classList.replace('slide-in', 'slide-out');
        ctent2.classList.replace('slide-in', 'slide-outt');

        clicked = false;

        // 移除 .nosh 類，恢復其他元素
        setTimeout(() => {
            jElements.forEach((otherElement) => {
                const li = otherElement.querySelector('li'); // 修改：選擇 <li> 元素
                li.classList.remove('nosh');
                j1.classList.remove('color');
            });
        }, 2000);  // 動畫結束後移除 .nosh 類
    });
});

j1.addEventListener('click', (event) => {
    const clickedJ = event.currentTarget;
    clickedJ.classList.add('color');
    document.querySelectorAll('.fixed-j').forEach(el => el.remove());
});

window.addEventListener('DOMContentLoaded', () => {
    const firstPhp = document.querySelector('.php');
    if (firstPhp) {
      firstPhp.click();
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: "-34% 0% -400% 0%", // top, right, bottom, left
    threshold: 0
  };
  
  const cess1 = document.querySelector('.cess1');
  const cess2 = document.querySelector('.cess2');
  const cess3 = document.querySelector('.cess3');
  const cess4 = document.querySelector('.cess4');
  const cess5 = document.querySelector('.cess5');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cess1.classList.add("cess11");
        cess2.classList.add("cess22");
        cess3.classList.add("cess33");
        cess4.classList.add("cess44");
        cess5.classList.add("cess55");
      } else {
        cess1.classList.remove("cess11");
        cess2.classList.remove("cess22");
        cess3.classList.remove("cess33");
        cess4.classList.remove("cess44");
        cess5.classList.remove("cess55");
      }
    });
  }, observerOptions);
  
  observer.observe(document.querySelector(".cess0"));
  



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
        if (now - lastScrollTime > 500) { // 限制滾動頻率
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
    document.querySelectorAll("#image-container svg").forEach(svg => {
        svg.classList.remove('run');
    });
    document.querySelectorAll("#image-container > div").forEach(div => {
        div.classList.remove('visible');
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
        document.getElementById('oto1').classList.add('visible');
        document.getElementById('sv1').classList.add('run');
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
        document.getElementById('oto2').classList.add('visible');
        document.getElementById('sv2').classList.add('run');
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
        document.getElementById('oto3').classList.add('visible');
        document.getElementById('sv3').classList.add('run');
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
        document.getElementById('oto4').classList.add('visible');
        document.getElementById('sv4').classList.add('run');
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
        document.getElementById('oto5').classList.add('visible');
        document.getElementById('sv5').classList.add('run');
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
        document.getElementById('oto6').classList.add('visible');
        document.getElementById('sv6').classList.add('run');
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
        document.getElementById('oto7').classList.add('visible');
        document.getElementById('sv7').classList.add('run');
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
        document.getElementById('oto8').classList.add('visible');
        document.getElementById('sv8').classList.add('run');
        document.getElementById('result').textContent = "山 水 樹 石";
        // document.getElementById('eresult').textContent = "( SANSUISUSHI )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "明鄭時期";
            document.getElementById('eraa2').textContent = "1662 - 1683";
            document.getElementById('word').textContent = "山川、溪流、樹木、奇石";
            document.getElementById('word1').textContent = "起源於宋代的山水畫藝術，在元明清逐漸成熟。";
            document.getElementById('word2').textContent = "以山水景致為主題，突出自然山水的廣闊與深遠，";
            document.getElementById('word3').textContent = "常見於具觀賞性的器物，體現文人對寄情山水的理想。";
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
        document.getElementById('oto9').classList.add('visible');
        document.getElementById('sv9').classList.add('run');
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
        document.getElementById('oto10').classList.add('visible');
        document.getElementById('sv10').classList.add('run');
        document.getElementById('result').textContent = "八 卦 太 極";
        // document.getElementById('eresult').textContent = "( BAGUATAIJI )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領前期";
            document.getElementById('eraa2').textContent = "1683 - 1750";
            document.getElementById('word').textContent = "起源於道家思想，陰陽相生、萬物變化";
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
        document.getElementById('oto11').classList.add('visible');
        document.getElementById('sv11').classList.add('run');
        document.getElementById('result').textContent = "冰 梅";
        // document.getElementById('eresult').textContent = "( BINMEI )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領前期";
            document.getElementById('eraa2').textContent = "1683 - 1750";
            document.getElementById('word').textContent = "寒冬時誕生、象徵堅強意志與生命的復甦";
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
        document.getElementById('oto12').classList.add('visible');
        document.getElementById('sv12').classList.add('run');
        document.getElementById('result').textContent = "團 菊";
        // document.getElementById('eresult').textContent = "( TUANJU )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領前期";
            document.getElementById('eraa2').textContent = "1683 - 1750";
            document.getElementById('word').textContent = "長壽之花，正直不屈、高雅純潔";
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
        document.getElementById('sv13').classList.add('run');
        document.getElementById('result').textContent = "靈 芝";
        // document.getElementById('eresult').textContent = "( LINGI )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領後期";
            document.getElementById('eraa2').textContent = "1750 - 1895";
            document.getElementById('word').textContent = "被視為仙草，象徵長壽、健康與祥瑞";
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
        document.getElementById('oto14').classList.add('visible');
        document.getElementById('sv14').classList.add('run');
        document.getElementById('result').textContent = "石 榴";
        // document.getElementById('eresult').textContent = "( SHILIU )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領後期";
            document.getElementById('eraa2').textContent = "1750 - 1895";
            document.getElementById('word').textContent = "多子多福、繁榮昌盛";
            document.getElementById('word1').textContent = "始於明代，常見於清代的婚慶用瓷及壽器上。";
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
        document.getElementById('oto15').classList.add('visible');
        document.getElementById('sv15').classList.add('run');
        document.getElementById('result').textContent = "雲 龍";
        // document.getElementById('eresult').textContent = "( YUNLONG )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領後期";
            document.getElementById('eraa2').textContent = "1750 - 1895";
            document.getElementById('word').textContent = "權威、力量、保護和祥瑞";
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
        document.getElementById('oto16').classList.add('visible');
        document.getElementById('sv16').classList.add('run');
        document.getElementById('result').textContent = "牡 丹";
        // document.getElementById('eresult').textContent = "( MUDAN )";
        setTimeout(() => {
            document.getElementById('eraa1').textContent = "清領後期";
            document.getElementById('eraa2').textContent = "1750 - 1895";
            document.getElementById('word').textContent = "花王，富貴與繁榮、吉祥與美好";
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
        document.getElementById('oto17').classList.add('visible');
        document.getElementById('sv17').classList.add('run');
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
        document.getElementById('oto18').classList.add('visible');
        document.getElementById('sv18').classList.add('run');
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
        document.getElementById('oto19').classList.add('visible');
        document.getElementById('sv19').classList.add('run');
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
        document.getElementById('oto20').classList.add('visible');
        document.getElementById('sv20').classList.add('run');
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
      toggleActions: "play none none none",
    }
  })
.to('.psoo', { opacity: 1, duration: 1 })
.to('.psoo', { opacity: 0, duration: 1 });

gsap.to("#p05path", {
    scrollTrigger:{
        //  markers:true,
        trigger:'.page05',
        start: 'top bottom',
        end: 'bottom 10%',
        scrub:true,
        toggleActions: "restart none none reverse",
       },
    attr: { startOffset: "40%" },
    ease: "linear"
  });

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
            start:'top 60%',
            end:'bottom -120%',    // 當 #text 滑動到 20% 時結束動畫
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
            start:'top 10%',
            end:'bottom -170%',
            scrub: 2,
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
            end:'bottom -50%',     // 當 #text 滑動到 20% 時結束動畫
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
gsap.to('.honmov ', { 
  scrollTrigger:{
    //  markers:true,
    trigger:'.mov35',
    start: 'top top',
    end: 'bottom bottom',
    pin: true,
    toggleActions: "restart none none none",
   },
   zIndex: 1,
})

