let allElement = document.querySelectorAll('.letter');
let wordsList = ['HURRY','LOOSE','THEME','BLOCK','BRAVE','WORDS','HAIRS','KILLS','WHERE','THERE','COLOR','CODER'];

const randWord = wordsList[Math.floor(Math.random() * wordsList.length)];
console.log(randWord);

for(let b of allElement){
    b.addEventListener('keydown',function(ev){
        if(ev.code=='Backspace'){
            if(this.value==""){
                this.parentElement.previousElementSibling.firstElementChild.value="";
                this.parentElement.previousElementSibling.firstElementChild.focus();
            }
            else if(this.value!="" & this.parentElement.parentElement.lastElementChild != this.parentElement){
                this.value="";
                this.parentElement.previousElementSibling.firstElementChild.focus();
            }
        }
    })
    b.addEventListener('keyup',function(ev){
        console.log(this.value);
        // console.log(this.parentElement.prevElementSibling.firstElementChild);
        if(this.parentElement.parentElement.lastElementChild == this.parentElement & ev.code=='Enter'){
            // Match the word if in array
            let found=[false,false,false,false,false];
            for(let i=0;i<5;i++){
                for(let j=0;j<5;j++){
                    if(randWord[i] == this.parentElement.parentElement.children[i].firstElementChild.value.toUpperCase()){
                        this.parentElement.parentElement.children[i].firstElementChild.classList.add('correct');
                        found[i]=true;
                    }
                    else if((i!=j) & (randWord[j]==this.parentElement.parentElement.children[i].firstElementChild.value.toUpperCase())){
                        this.parentElement.parentElement.children[i].firstElementChild.classList.add('present');
                        if(found[i]){
                            found[i]=false;
                        }
                        found[i]=true;
                    }
                }
            }
            for(let i=0;i<5;i++){
                if(!found[i]){
                    this.parentElement.parentElement.children[i].firstElementChild.classList.add('wrong');
                }
            }
            // Going to next line
            this.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.focus();
        }
        else if((ev.keyCode >= 97 & ev.keyCode<=122) | (ev.keyCode<=90 & ev.keyCode>=65)){
            if(this.parentElement.parentElement.lastElementChild != this.parentElement){
                this.parentElement.nextElementSibling.firstElementChild.focus();
            }
        }
        else{
            this.value="";
        }

    })
}