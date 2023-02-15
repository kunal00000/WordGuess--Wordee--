let allElement = document.querySelectorAll(".letter");
let allBtns = document.querySelectorAll(".btn");

// List of Words
let wordsList = ['HURRY','LOOSE','THEME','BLOCK','BRAVE','WORDS','HAIRS','KILLS','WHERE','THERE','COLOR','CODER','ABUSE','ADULT','AGENT','ANGER','APPLE','AWARD','BASIS','BEACH','BIRTH','BLOCK','BLOOD','BOARD','BRAIN','BREAD','BREAK','BROWN','BUYER','CAUSE','CHAIN',
'CHAIR','CHEST','CHIEF','CHILD','CHINA','CLAIM','CLASS','CLOCK','COACH','COAST','COURT','COVER','CREAM','CRIME','CROSS','CROWD','CROWN','CYCLE','DANCE','DEATH','DEPTH','DOUBT','DRAFT','DRAMA','DREAM','DRESS','DRINK','DRIVE','EARTH','ENEMY','ENTRY','ERROR','EVENT',
'FAITH','FAULT','FIELD','FIGHT','FINAL','FLOOR','FOCUS','FORCE','FRAME','FRANK','FRONT','FRUIT','GLASS','GRANT','GRASS','GREEN','GROUP','GUIDE','HEART','HENRY','HORSE','HOTEL','HOUSE','IMAGE','INDEX','INPUT','JAPAN','JONES','KNIFE','LAURA','LAYER','LEVEL','LEWIS',
'LIGHT','LIMIT','LUNCH','MAJOR','MARCH','MATCH','METAL','MODEL','MONEY','MONTH','MOTOR','MOUTH','MUSIC','NIGHT','NOISE','NORTH','NOVEL','NURSE','OFFER','ORDER','OTHER','OWNER','PANEL','PAPER','PARTY','PEACE','PETER','PHASE','PHONE','PIECE','PILOT','PITCH','PLACE',
'PLANE','PLANT','PLATE','POINT','POUND','POWER','PRESS','PRIDE','PRIZE','PROOF','QUEEN','RADIO','RANGE','RATIO','REPLY','RIGHT','RIVER','ROUND','ROUTE','RUGBY','SCALE','SCENE','SCOPE','SCORE','SENSE','SHAPE','SHARE','SHEEP','SHEET','SHIFT','SHIRT','SHOCK','SIGHT',
'SIMON','SKILL','SLEEP','SMILE','SMITH','SMOKE','SOUND','SOUTH','SPACE','SPEED','SPITE','SPORT','SQUAD','STAFF','STAGE','START','STATE','STEAM','STEEL','STOCK','STONE','STORE','STUDY','STUFF','STYLE','SUGAR','TABLE','TASTE','TERRY','THEME','THING','TITLE','TOTAL',
'TOUCH','TOWER','TRACK','TRADE','TRAIN','TREND','TRIAL','TRUST','TRUTH','UNCLE','UNION','UNITY','VALUE','VIDEO','VISIT','VOICE','WASTE','WATCH','WATER','WHILE','WHITE','WHOLE','WOMAN','WORLD','YOUTH'];

const randWord = wordsList[Math.floor(Math.random() * wordsList.length)];
console.log(randWord); // Getting a random word from the above wordlist

allElement[0].focus(); // Focus on 1st box

fetch('config.json')
  .then(response => response.json())
  .then(data => {
    const apiKey = data.API_KEY;
    const apiUrl = data.API_URL;

    axios.post(apiUrl, {
      "prompt": `You are a english dictionary, answer this question in short. What is the meaning of ${randWord} ?`,
      "max_tokens": 64,
      "temperature": 0.5,
      "model": "text-davinci-003",
      "n": 1 
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      const meaning = response.data.choices[0].text.trim();
      console.log(response);
      console.log(meaning);
    }).catch(error => {
      console.log(error);
    });
  })
  .catch(err => {
    console.log(err);
  });

for (let b of allElement) {
  b.addEventListener("keydown", function (ev) {
    if (ev.code == "Backspace") {
        console.log(this.value);
      if (this.value == "") {
        // Clear previous box and move to that box
        this.parentElement.previousElementSibling.firstElementChild.value = "";
        this.parentElement.previousElementSibling.firstElementChild.focus();
      } else if (
        (this.value != "") &
        (this.parentElement.parentElement.lastElementChild !=
          this.parentElement)
      ) {
        // If current box is last one in that row then clear that value and  
        this.value = "";
        this.parentElement.previousElementSibling.firstElementChild.focus();
      }
      this.classList.remove("letterOutline"); // Outline class removal 
    }
  });
  b.addEventListener("keydown", function (ev) {
    if (
      (this.parentElement.parentElement.lastElementChild ==
        this.parentElement) &
      (this.value != "") &
      ((ev.code == "Enter") | (ev.keyCode == 13))
    ) {
      // Match the word if in array
      let found = [false, false, false, false, false];
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          let x = this.parentElement.parentElement.children[
            i
          ].firstElementChild.value
            .toUpperCase()
            .charCodeAt();
          if (
            randWord[i] ==
            this.parentElement.parentElement.children[
              i
            ].firstElementChild.value.toUpperCase()
          ) {
            this.parentElement.parentElement.children[
              i
            ].firstElementChild.classList.add("correct");
            if (allBtns[x - 65].classList.contains("present"))
              allBtns[x - 65].classList.remove("present");
            allBtns[x - 65].classList.add("correct");
            found[i] = true;
          } else if (
            (i != j) &
            (randWord[j] ==
              this.parentElement.parentElement.children[
                i
              ].firstElementChild.value.toUpperCase())
          ) {
            this.parentElement.parentElement.children[
              i
            ].firstElementChild.classList.add("present");
            if (allBtns[x - 65].classList.contains("correct"))
              allBtns[x - 65].classList.remove("correct");
            allBtns[x - 65].classList.add("present");
            if (found[i]) {
              found[i] = false;
            }
            found[i] = true;
          }
        }
      }
      let countTrue = 0;
      for (let i = 0; i < 5; i++) {
        if (!found[i]) {
          this.parentElement.parentElement.children[
            i
          ].firstElementChild.classList.add("wrong");
          let y = this.parentElement.parentElement.children[
            i
          ].firstElementChild.value
            .toUpperCase()
            .charCodeAt();
          allBtns[y - 65].classList.add("wrong");
        } else if (
          found[i] &&
          this.parentElement.parentElement.children[
            i
          ].firstElementChild.classList.contains("correct")
        ) {
          countTrue++;
        }
      }
      // Going to next line
      if ((countTrue < 5) & (this != allElement[29])) {
        this.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.focus();
      } else if (countTrue == 5) {
        setTimeout(() => {
          window.alert("You Got It Right!!");
          window.location.reload();
        }, 1500);
      } else if ((countTrue < 5) & (this == allElement[29])) {
        setTimeout(() => {
          window.alert("" + randWord);
          window.location.reload();
        }, 1000);
      }
    }
    // Going to next input box after keydown
    else if ((ev.code >= "KeyA") & (ev.code <= "KeyZ")) {
      if (
        (this.parentElement.parentElement.lastElementChild !=
          this.parentElement) &
        (this.value != "")
      ) {
        this.parentElement.nextElementSibling.firstElementChild.focus();
      }
      this.classList.add("letterOutline");
    } else {
      this.value = "";
      ev.preventDefault();
    }
  });
}
