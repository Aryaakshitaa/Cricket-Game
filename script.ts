//Global Variables
var scoreT1: number;
var scoreT2: number;
var mvpTeam1 = 0;
var mvpTeam2 = 0;
var maxScore: number;
var winnerTeam: number;
var playerNum1: number;
var playerNum2: number;
//mmscore --> Man Of The Match score
var mmScore = 0;
//mmPlayer --> Man Of The Match player number
var mmPlayer: number;
var flagA=false;
var flagB=false;

class Board{
    teamNo:number;
    btnNo: number;
    score: number;
    col:HTMLElement;
    h2a:HTMLElement;
    h2b:HTMLElement;
    btnEle:HTMLElement;
    constructor(teamNo:number,sc:number,btnNo:number){
        this.teamNo=teamNo;
        this.score=sc;
        this.btnNo=btnNo;
        this.col=document.createElement("div");
        this.col.setAttribute("class","col-4 text-center");      
        this.h2a=document.createElement("h2");
        this.h2a.innerText="TEAM "+this.teamNo+" SCORE";
        this.h2b=document.createElement("h2");
        this.h2b.setAttribute("id","sc"+this.teamNo);
        this.h2b.innerText=this.score.toString();
        this.btnEle=document.createElement("button");
        this.btnEle.setAttribute("class","btn btn-primary");
        this.btnEle.innerText="Hit"+this.btnNo;
        this.btnEle.setAttribute("id","btn"+this.btnNo);
        this.col.appendChild(this.h2a);
        this.col.appendChild(this.h2b);
        this.col.appendChild(this.btnEle);
        let rw=document.getElementById("row2");
        rw.appendChild(this.col);
    }
}

class Timer{
    head:HTMLElement;
    col:HTMLElement;
    scoreT1:HTMLElement;
    constructor(public counter=0){
        this.col=document.createElement("div");
        this.col.setAttribute("class","col-4 text-center");
        this.head=document.createElement("h2");
        this.head.innerText="TIMER";
        this.col.appendChild(this.head);
        this.scoreT1=document.createElement("h2");
        this.scoreT1.innerText="0";
        this.col.appendChild(this.scoreT1);
        let rw=document.getElementById("row2");
        rw.appendChild(this.col);
        let inter=this.change();
        inter();       
    }

 change(): () => void{
        return () => {
            let k=0;
            let f=0;
            let intervalId = setInterval(() => {
                if(f===0){
                    let button=<HTMLButtonElement>document.getElementById("btn"+2);
                    button.disabled=true;
                    button=<HTMLButtonElement>document.getElementById("ResultBtn");
                    button.disabled=true;
                    f=1;
                }
                if(flagA===true){
                    k=0;
                    this.counter=59;
                    flagA=false;
                }else if(flagB===true){
                    this.counter=59;
                    k=1;
                    flagB=false;
                }
                this.scoreT1.innerText=this.counter.toString();
                this.counter = this.counter+1;
                if(this.counter === 60){
                    this.scoreT1.innerText=this.counter.toString();
                    this.counter=0;
                    k=k+1;
                    if(k === 1){
                        let button=<HTMLButtonElement>document.getElementById("btn"+1);
                        button.disabled=true;
                        button=<HTMLButtonElement>document.getElementById("btn"+2);
                        button.disabled=false;
                    }
                    if(k === 2){
                        clearInterval(intervalId);
                        let button=<HTMLButtonElement>document.getElementById("btn"+2);
                        button.disabled=true;
                        button=<HTMLButtonElement>document.getElementById("ResultBtn");
                        button.disabled=false;
                    }
                }
            },1000)
        }
    }
}

class Table{
    parentCol:HTMLElement;
    teamNo:number;
    col:HTMLElement;
    row:HTMLElement;
    tHead:HTMLElement;
    table:HTMLElement;
    tRow:HTMLElement;
    th:HTMLElement;
    tBody:HTMLElement;
    tData:HTMLElement;
    count:number;
    total:number;
    indexi:number;
    indexj:number;
    grandTotal:number;
    h4El:HTMLElement;
    constructor(teamNo:number){
        this.teamNo=teamNo;
        this.parentCol=document.createElement("div");
        this.parentCol.setAttribute("class","col-sm-12 col-md-6 col-lg-4 text-center")
        this.table = document.createElement("table");
        this.table.setAttribute("class","table table-bordered");
        this.table.setAttribute("id","table"+this.teamNo);
        this.tHead = document.createElement("thead");
        this.tRow = document.createElement("tr");
        this.h4El = document.createElement("h4");
        this.h4El.innerText = "TEAM " + this.teamNo + " SCORE BOARD"
        for(let i=0;i<8;i++){
            this.th = document.createElement("th");
            this.th.setAttribute("scope","col");
            if(i===0)
                this.th.innerText = "TEAM "+this.teamNo;
            else if(i === 7)
                this.th.innerText = "TOTAL";
            else
                this.th.innerText = "B" + i;
            this.tRow.appendChild(this.th);
        }
        this.tHead.appendChild(this.tRow);
        this.table.appendChild(this.tHead);
        this.tBody = document.createElement("tbody");
        for(let i=1;i<=10;i++){
            this.tRow = document.createElement("tr");
            this.tRow.setAttribute("id","player"+i);
            for(let j=0;j<8;j++){
                if(j===0){
                    this.th=document.createElement("th");
                    this.th.setAttribute("scope","row");
                    this.th.setAttribute("id",this.teamNo+"Player"+i);
                    this.th.innerText="Player" + i;
                    this.tRow.appendChild(this.th);
                }else if(j===7){
                    this.tData=document.createElement("td");
                    this.tData.setAttribute("id",this.teamNo+"Total"+i);
                    this.tRow.appendChild(this.tData);
                }else{
                    this.tData=document.createElement("td");
                    this.tData.setAttribute("id",this.teamNo+""+i+j);
                    this.tRow.appendChild(this.tData);
                }
            }
            this.tBody.appendChild(this.tRow);
        }
        this.table.appendChild(this.tBody);
        this.parentCol.appendChild(this.h4El);
        this.parentCol.appendChild(this.table);
        let row3b = document.getElementById("row3b");
        row3b.appendChild(this.parentCol);
        this.indexi=1;                                  
        this.indexj=1;                                  
        this.grandTotal=0;
        this.total=0;                                   
        let button =<HTMLButtonElement>document.getElementById("btn"+this.teamNo);
        this.count=1;
        let handleClick = this.handleBtnEvent();        
        button.addEventListener("click",handleClick);        
    }
 handleBtnEvent() : ()  => void{
      return () => {
          let randomNumGenerator = (min:number,max:number) => {
              return Math.floor(Math.random() * (max - min +1))+min;
          }
          let randomNum = randomNumGenerator(0,6);
          let button=<HTMLButtonElement>document.getElementById("btn"+this.teamNo);
          if(button.disabled===false && this.indexi<11){
              if(randomNum !== 0){
                  if(this.indexj===1){
                        this.total=0;
                  }
                  if(this.indexj < 7){
                        let td = document.getElementById(this.teamNo+""+this.indexi+this.indexj);
                        td.innerText=randomNum.toString();
                        this.total=this.total + randomNum;
                        this.indexj++;
                        this.grandTotal=this.grandTotal+randomNum;
                        let sc=document.getElementById("sc"+this.teamNo);
                        sc.innerText=this.grandTotal.toString();
                  }
                  else {
                        let td = document.getElementById(this.teamNo+"Total"+this.indexi);
                        td.innerText = this.total.toString();
                        if(this.teamNo===1){
                            if(mvpTeam1<this.total){
                                mvpTeam1 = this.total;
                                playerNum1=this.indexi;
                            }
                        }
                        else {
                            if(mvpTeam2<this.total){
                                mvpTeam2 = this.total;
                                playerNum2=this.indexi;
                            }
                        }
                        this.indexi++;
                        this.indexj=1;  
                  }
              }
              else if (randomNum === 0 && this.indexi < 11) {
                    let td = document.getElementById(this.teamNo+""+this.indexi+this.indexj);
                    td.innerText=randomNum.toString();
                    let fd = document.getElementById(this.teamNo+"Total"+this.indexi);
                    if(this.indexj>1){
                        fd.innerText = this.total.toString();
                        this.grandTotal=this.grandTotal+randomNum;
                        let sc=document.getElementById("sc"+this.teamNo);
                        sc.innerText=this.grandTotal.toString();
                    }                  
                    this.total=0;
                    if(this.indexj===1){
                        fd.innerText = this.total.toString();
                        this.grandTotal=this.grandTotal+randomNum;
                        let sc=document.getElementById("sc"+this.teamNo);
                        sc.innerText=this.grandTotal.toString();
                    }
                    this.indexi++;
                    this.indexj=1;
                } 
                if(this.indexi>10){
                    button.disabled=true;
                    if(this.teamNo===1){
                        flagA=true;
                    }
                    else if (this.teamNo === 2) {
                        flagB=true;
                    }
                    if(this.teamNo===1){
                        scoreT1=this.grandTotal;
                    }
                    else{
                        scoreT2=this.grandTotal;
                    }
                }  
            }
        }
    }
}

class SubBoard{
    col:HTMLElement;
    h4a:HTMLElement;
    h4b:HTMLElement;
    hr:HTMLElement;
    winnerEle1:HTMLElement;
    winnerEle2:HTMLElement;
    winnerPlayer:HTMLElement;
    winnerScore:HTMLElement;
    constructor(){
        this.col = document.createElement("div");
        this.col.setAttribute("class","col-sm-12 col-lg-4 text-center");
        this.h4a = document.createElement("h4");
        this.h4a.innerText = "MATCH WON BY";
        this.winnerEle1 = document.createElement("h4");
        this.winnerEle1.setAttribute("id","winner1");
        this.col.appendChild(this.h4a);
        this.col.appendChild(this.winnerEle1);      
        this.hr = document.createElement("hr");
        this.winnerPlayer = document.createElement("h4");
        this.winnerPlayer.setAttribute("id","winnerP");
        this.winnerEle2 = document.createElement("h4");
        this.winnerEle2.setAttribute("id","winner2");
        this.winnerScore = document.createElement("h4");
        this.winnerScore.setAttribute("id","winnerS");
        this.col.appendChild(this.hr);
        this.h4b = document.createElement("h4");
        this.h4b.innerText = "MAN OF THE MATCH";
        this.col.appendChild(this.h4b);    
        this.col.appendChild(this.winnerPlayer);
        this.col.appendChild(this.winnerEle2);
        this.col.appendChild(this.winnerScore);
        this.hr.style.width = "50%";
        this.hr.style.margin = "0 auto";
        let rw = document.getElementById("row3b");
        rw.appendChild(this.col);
    }
}

class Game{
    constructor(){
        new Board(1,0,1);
        new Timer();
        new Board(2,0,2);
        new Table(1);
        new SubBoard();
        new Table(2);
    }
}
new Game();
let Gbutton = <HTMLButtonElement>document.getElementById("ResultBtn");
let handleGbuttonClick = () =>{
    if(scoreT1>scoreT2){
        maxScore=scoreT1;
    }
    else {
        maxScore=scoreT2;
    }
    if(scoreT1===maxScore){
        winnerTeam = 1;
        mmPlayer = playerNum1;
        mmScore = mvpTeam1;
    }
    if(scoreT2===maxScore){
        winnerTeam = 2;
        mmPlayer = playerNum2;
        mmScore =mvpTeam2;
    }
    let winner1 = document.getElementById("winner1");
    winner1.innerText = "TEAM"+winnerTeam;
    let player = document.getElementById("winnerP");
    player.innerText = "PLAYER"+mmPlayer;
    let winner2 = document.getElementById("winner2");
    winner2.innerText = "TEAM "+winnerTeam;
    let winScore = document.getElementById("winnerS");
    winScore.innerText = "SCORE: "+mmScore;
}
Gbutton.addEventListener("click",handleGbuttonClick);