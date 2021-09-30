//Global Variables
var scoreT1;
var scoreT2;
var mvpTeam1 = 0;
var mvpTeam2 = 0;
var maxScore;
var winnerTeam;
var playerNum1;
var playerNum2;
//mmscore --> Man Of The Match score
var mmScore = 0;
//mmPlayer --> Man Of The Match player number
var mmPlayer;
var flagA = false;
var flagB = false;
var Board = /** @class */ (function () {
    function Board(teamNo, sc, btnNo) {
        this.teamNo = teamNo;
        this.score = sc;
        this.btnNo = btnNo;
        this.col = document.createElement("div");
        this.col.setAttribute("class", "col-4 text-center");
        this.h2a = document.createElement("h2");
        this.h2a.innerText = "TEAM " + this.teamNo + " SCORE";
        this.h2b = document.createElement("h2");
        this.h2b.setAttribute("id", "sc" + this.teamNo);
        this.h2b.innerText = this.score.toString();
        this.btnEle = document.createElement("button");
        this.btnEle.setAttribute("class", "btn btn-primary");
        this.btnEle.innerText = "Hit" + this.btnNo;
        this.btnEle.setAttribute("id", "btn" + this.btnNo);
        this.col.appendChild(this.h2a);
        this.col.appendChild(this.h2b);
        this.col.appendChild(this.btnEle);
        var rw = document.getElementById("row2");
        rw.appendChild(this.col);
    }
    return Board;
}());
var Timer = /** @class */ (function () {
    function Timer(counter) {
        if (counter === void 0) { counter = 0; }
        this.counter = counter;
        this.col = document.createElement("div");
        this.col.setAttribute("class", "col-4 text-center");
        this.head = document.createElement("h2");
        this.head.innerText = "TIMER";
        this.col.appendChild(this.head);
        this.scoreT1 = document.createElement("h2");
        this.scoreT1.innerText = "0";
        this.col.appendChild(this.scoreT1);
        var rw = document.getElementById("row2");
        rw.appendChild(this.col);
        var inter = this.change();
        inter();
    }
    Timer.prototype.change = function () {
        var _this = this;
        return function () {
            var k = 0;
            var f = 0;
            var intervalId = setInterval(function () {
                if (f === 0) {
                    var button = document.getElementById("btn" + 2);
                    button.disabled = true;
                    button = document.getElementById("ResultBtn");
                    button.disabled = true;
                    f = 1;
                }
                if (flagA === true) {
                    k = 0;
                    _this.counter = 59;
                    flagA = false;
                }
                else if (flagB === true) {
                    _this.counter = 59;
                    k = 1;
                    flagB = false;
                }
                _this.scoreT1.innerText = _this.counter.toString();
                _this.counter = _this.counter + 1;
                if (_this.counter === 60) {
                    _this.scoreT1.innerText = _this.counter.toString();
                    _this.counter = 0;
                    k = k + 1;
                    if (k === 1) {
                        var button = document.getElementById("btn" + 1);
                        button.disabled = true;
                        button = document.getElementById("btn" + 2);
                        button.disabled = false;
                    }
                    if (k === 2) {
                        clearInterval(intervalId);
                        var button = document.getElementById("btn" + 2);
                        button.disabled = true;
                        button = document.getElementById("ResultBtn");
                        button.disabled = false;
                    }
                }
            }, 1000);
        };
    };
    return Timer;
}());
var Table = /** @class */ (function () {
    function Table(teamNo) {
        this.teamNo = teamNo;
        this.parentCol = document.createElement("div");
        this.parentCol.setAttribute("class", "col-sm-12 col-md-6 col-lg-4 text-center");
        this.table = document.createElement("table");
        this.table.setAttribute("class", "table table-bordered");
        this.table.setAttribute("id", "table" + this.teamNo);
        this.tHead = document.createElement("thead");
        this.tRow = document.createElement("tr");
        this.h4El = document.createElement("h4");
        this.h4El.innerText = "TEAM " + this.teamNo + " SCORE BOARD";
        for (var i = 0; i < 8; i++) {
            this.th = document.createElement("th");
            this.th.setAttribute("scope", "col");
            if (i === 0)
                this.th.innerText = "TEAM " + this.teamNo;
            else if (i === 7)
                this.th.innerText = "TOTAL";
            else
                this.th.innerText = "B" + i;
            this.tRow.appendChild(this.th);
        }
        this.tHead.appendChild(this.tRow);
        this.table.appendChild(this.tHead);
        this.tBody = document.createElement("tbody");
        for (var i = 1; i <= 10; i++) {
            this.tRow = document.createElement("tr");
            this.tRow.setAttribute("id", "player" + i);
            for (var j = 0; j < 8; j++) {
                if (j === 0) {
                    this.th = document.createElement("th");
                    this.th.setAttribute("scope", "row");
                    this.th.setAttribute("id", this.teamNo + "Player" + i);
                    this.th.innerText = "Player" + i;
                    this.tRow.appendChild(this.th);
                }
                else if (j === 7) {
                    this.tData = document.createElement("td");
                    this.tData.setAttribute("id", this.teamNo + "Total" + i);
                    this.tRow.appendChild(this.tData);
                }
                else {
                    this.tData = document.createElement("td");
                    this.tData.setAttribute("id", this.teamNo + "" + i + j);
                    this.tRow.appendChild(this.tData);
                }
            }
            this.tBody.appendChild(this.tRow);
        }
        this.table.appendChild(this.tBody);
        this.parentCol.appendChild(this.h4El);
        this.parentCol.appendChild(this.table);
        var row3b = document.getElementById("row3b");
        row3b.appendChild(this.parentCol);
        this.indexi = 1;
        this.indexj = 1;
        this.grandTotal = 0;
        this.total = 0;
        var button = document.getElementById("btn" + this.teamNo);
        this.count = 1;
        var handleClick = this.handleBtnEvent();
        button.addEventListener("click", handleClick);
    }
    Table.prototype.handleBtnEvent = function () {
        var _this = this;
        return function () {
            var randomNumGenerator = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            var randomNum = randomNumGenerator(0, 6);
            var button = document.getElementById("btn" + _this.teamNo);
            if (button.disabled === false && _this.indexi < 11) {
                if (randomNum !== 0) {
                    if (_this.indexj === 1) {
                        _this.total = 0;
                    }
                    if (_this.indexj < 7) {
                        var td = document.getElementById(_this.teamNo + "" + _this.indexi + _this.indexj);
                        td.innerText = randomNum.toString();
                        _this.total = _this.total + randomNum;
                        _this.indexj++;
                        _this.grandTotal = _this.grandTotal + randomNum;
                        var sc = document.getElementById("sc" + _this.teamNo);
                        sc.innerText = _this.grandTotal.toString();
                    }
                    else {
                        var td = document.getElementById(_this.teamNo + "Total" + _this.indexi);
                        td.innerText = _this.total.toString();
                        if (_this.teamNo === 1) {
                            if (mvpTeam1 < _this.total) {
                                mvpTeam1 = _this.total;
                                playerNum1 = _this.indexi;
                            }
                        }
                        else {
                            if (mvpTeam2 < _this.total) {
                                mvpTeam2 = _this.total;
                                playerNum2 = _this.indexi;
                            }
                        }
                        _this.indexi++;
                        _this.indexj = 1;
                    }
                }
                else if (randomNum === 0 && _this.indexi < 11) {
                    var td = document.getElementById(_this.teamNo + "" + _this.indexi + _this.indexj);
                    td.innerText = randomNum.toString();
                    var fd = document.getElementById(_this.teamNo + "Total" + _this.indexi);
                    if (_this.indexj > 1) {
                        fd.innerText = _this.total.toString();
                        _this.grandTotal = _this.grandTotal + randomNum;
                        var sc = document.getElementById("sc" + _this.teamNo);
                        sc.innerText = _this.grandTotal.toString();
                    }
                    _this.total = 0;
                    if (_this.indexj === 1) {
                        fd.innerText = _this.total.toString();
                        _this.grandTotal = _this.grandTotal + randomNum;
                        var sc = document.getElementById("sc" + _this.teamNo);
                        sc.innerText = _this.grandTotal.toString();
                    }
                    _this.indexi++;
                    _this.indexj = 1;
                }
                if (_this.indexi > 10) {
                    button.disabled = true;
                    if (_this.teamNo === 1) {
                        flagA = true;
                    }
                    else if (_this.teamNo === 2) {
                        flagB = true;
                    }
                    if (_this.teamNo === 1) {
                        scoreT1 = _this.grandTotal;
                    }
                    else {
                        scoreT2 = _this.grandTotal;
                    }
                }
            }
        };
    };
    return Table;
}());
var SubBoard = /** @class */ (function () {
    function SubBoard() {
        this.col = document.createElement("div");
        this.col.setAttribute("class", "col-sm-12 col-lg-4 text-center");
        this.h4a = document.createElement("h4");
        this.h4a.innerText = "MATCH WON BY";
        this.winnerEle1 = document.createElement("h4");
        this.winnerEle1.setAttribute("id", "winner1");
        this.col.appendChild(this.h4a);
        this.col.appendChild(this.winnerEle1);
        this.hr = document.createElement("hr");
        this.winnerPlayer = document.createElement("h4");
        this.winnerPlayer.setAttribute("id", "winnerP");
        this.winnerEle2 = document.createElement("h4");
        this.winnerEle2.setAttribute("id", "winner2");
        this.winnerScore = document.createElement("h4");
        this.winnerScore.setAttribute("id", "winnerS");
        this.col.appendChild(this.hr);
        this.h4b = document.createElement("h4");
        this.h4b.innerText = "MAN OF THE MATCH";
        this.col.appendChild(this.h4b);
        this.col.appendChild(this.winnerPlayer);
        this.col.appendChild(this.winnerEle2);
        this.col.appendChild(this.winnerScore);
        this.hr.style.width = "50%";
        this.hr.style.margin = "0 auto";
        var rw = document.getElementById("row3b");
        rw.appendChild(this.col);
    }
    return SubBoard;
}());
var Game = /** @class */ (function () {
    function Game() {
        new Board(1, 0, 1);
        new Timer();
        new Board(2, 0, 2);
        new Table(1);
        new SubBoard();
        new Table(2);
    }
    return Game;
}());
new Game();
var Gbutton = document.getElementById("ResultBtn");
var handleGbuttonClick = function () {
    if (scoreT1 > scoreT2) {
        maxScore = scoreT1;
    }
    else {
        maxScore = scoreT2;
    }
    if (scoreT1 === maxScore) {
        winnerTeam = 1;
        mmPlayer = playerNum1;
        mmScore = mvpTeam1;
    }
    if (scoreT2 === maxScore) {
        winnerTeam = 2;
        mmPlayer = playerNum2;
        mmScore = mvpTeam2;
    }
    var winner1 = document.getElementById("winner1");
    winner1.innerText = "TEAM" + winnerTeam;
    var player = document.getElementById("winnerP");
    player.innerText = "PLAYER" + mmPlayer;
    var winner2 = document.getElementById("winner2");
    winner2.innerText = "TEAM " + winnerTeam;
    var winScore = document.getElementById("winnerS");
    winScore.innerText = "SCORE: " + mmScore;
};
Gbutton.addEventListener("click", handleGbuttonClick);
