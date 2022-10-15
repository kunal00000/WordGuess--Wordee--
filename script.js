let allElement = document.querySelectorAll('.letter');
let allBtns = document.querySelectorAll('.btn');

// for(let bt of allBtns){
//     bt.addEventListener('click',function(){
//         console.log(this);
//     })
// }
let wordsList = ['HURRY','LOOSE','THEME','BLOCK','BRAVE','WORDS','HAIRS','KILLS','WHERE','THERE','COLOR','CODER','ABUSE','Adult','Agent','Anger','Apple','Award','Basis','Beach','Birth','Block','Blood','Board','Brain','Bread','Break','Brown','Buyer','Cause','Chain',
'Chair','Chest','Chief','Child','China','Claim','Class','Clock','Coach','Coast','Court','Cover','Cream','Crime','Cross','Crowd','Crown','Cycle','Dance','Death','Depth','Doubt','Draft','Drama','Dream','Dress','Drink','Drive','Earth','Enemy','Entry','Error','Event',
'Faith','Fault','Field','Fight','Final','Floor','Focus','Force','Frame','Frank','Front','Fruit','Glass','Grant','Grass','Green','Group','Guide','Heart','Henry','Horse','Hotel','House','Image','Index','Input','Japan','Jones','Knife','Laura','Layer','Level','Lewis',
'Light','Limit','Lunch','Major','March','Match','Metal','Model','Money','Month','Motor','Mouth','Music','Night','Noise','North','Novel','Nurse','Offer','Order','Other','Owner','Panel','Paper','Party','Peace','Peter','Phase','Phone','Piece','Pilot','Pitch','Place',
'Plane','Plant','Plate','Point','Pound','Power','Press','Pride','Prize','Proof','Queen','Radio','Range','Ratio','Reply','Right','River','Round','Route','Rugby','Scale','Scene','Scope','Score','Sense','Shape','Share','Sheep','Sheet','Shift','Shirt','Shock','Sight',
'Simon','Skill','Sleep','Smile','Smith','Smoke','Sound','South','Space','Speed','Spite','Sport','Squad','Staff','Stage','Start','State','Steam','Steel','Stock','Stone','Store','Study','Stuff','Style','Sugar','Table','Taste','Terry','Theme','Thing','Title','Total',
'Touch','Tower','Track','Trade','Train','Trend','Trial','Trust','Truth','Uncle','Union','Unity','Value','Video','Visit','Voice','Waste','Watch','Water','While','White','Whole','Woman','World','Youth'];

const randWord = wordsList[Math.floor(Math.random() * wordsList.length)];
console.log(randWord);

allElement[0].focus();

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
            this.classList.remove('letterOutline');
        }
    })
    b.addEventListener('keydown',function(ev){
        if(this.parentElement.parentElement.lastElementChild == this.parentElement & this.value!="" & ev.code=='Enter'){
            // Match the word if in array
            let found=[false,false,false,false,false];
            for(let i=0;i<5;i++){
                for(let j=0;j<5;j++){
                    let x = this.parentElement.parentElement.children[i].firstElementChild.value.toUpperCase().charCodeAt();
                    if(randWord[i] == this.parentElement.parentElement.children[i].firstElementChild.value.toUpperCase()){
                        this.parentElement.parentElement.children[i].firstElementChild.classList.add('correct');
                        if(allBtns[x-65].classList.contains('present')) allBtns[x-65].classList.remove('present');
                        allBtns[x-65].classList.add('correct');
                        found[i]=true;
                    }
                    else if((i!=j) & (randWord[j]==this.parentElement.parentElement.children[i].firstElementChild.value.toUpperCase())){
                        this.parentElement.parentElement.children[i].firstElementChild.classList.add('present');
                        if(allBtns[x-65].classList.contains('correct')) allBtns[x-65].classList.remove('correct');
                        allBtns[x-65].classList.add('present');
                        if(found[i]){
                            found[i]=false;
                        }
                        found[i]=true;
                    }
                }
            }
            let countTrue =0;
            for(let i=0;i<5;i++){
                if(!found[i]){
                    this.parentElement.parentElement.children[i].firstElementChild.classList.add('wrong');
                    let y = this.parentElement.parentElement.children[i].firstElementChild.value.toUpperCase().charCodeAt();
                    allBtns[y-65].classList.add('wrong');
                }
                else{
                    countTrue++;
                }
            }
            // Going to next line
            if(countTrue<5){
                this.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.focus();
            }
        }
        else if((ev.keyCode >= 97 & ev.keyCode<=122) | (ev.keyCode<=90 & ev.keyCode>=65)){
            if(this.parentElement.parentElement.lastElementChild != this.parentElement & this.value!=""){
                this.parentElement.nextElementSibling.firstElementChild.focus();
            }
            this.classList.add('letterOutline');
        }
        else{
            this.value="";
            ev.preventDefault();
        }
    })
}