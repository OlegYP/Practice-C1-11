window.onload = function() {

function Timer( options ) {
    var that = this;
    this.time = 0;
    this.nIntervId = null;
    this.maxtime = options.maxtime || 3599;
    this.minute_html = document.querySelector(options.minute_html);
    this.seconds_html = document.querySelector(options.seconds_html);
    this.timer_html = document.querySelector(options.timer_html);
    this.btnStart = document.querySelector(options.btnStart);
    this.btnPause = document.querySelector(options.btnPause);
    this.btnReset = document.querySelector(options.btnReset);
    this.btnPlus10min = document.querySelector(options.btnPlus10min);
    this.btnPlus10sec = document.querySelector(options.btnPlus10sec);
    this.btnPlus1min =  document.querySelector(options.btnPlus1min);
    this.btnPlus1sec = document.querySelector(options.btnPlus1sec);
    this.btnMinus10min = document.querySelector(options.btnMinus10min);
    this.btnMinus10sec = document.querySelector(options.btnMinus10sec);
    // for (var option in options) this[option] = document.querySelector(options[option]);


    if (this.btnStart){
        this.btnStart.addEventListener('click', function(){
            that.startTimer(that);
        })
    }
    if (this.btnPause){
        this.btnPause.addEventListener('click', function(){
            that.pauseTimer(that);
        })
    }
    if (this.btnReset){
        this.btnReset.addEventListener('click', function(){
            that.resetTimer(that);
        })
    }
    if (this.btnPlus10min){
        this.btnPlus10min.addEventListener('click', function (){
            that.addTime(600);
        })
    }
    if (this.btnPlus1min) {
        this.btnPlus1min.addEventListener('click', function (){
            that.addTime(60);
        })
    }
    if (this.btnPlus10sec) {
        this.btnPlus10sec.addEventListener('click', function () {
            that.addTime(10);
        })
    }
    if (this.btnPlus1sec) {
        this.btnPlus1sec.addEventListener('click', function () {
            that.addTime(1);
        })
    }
    if (this.btnMinus10min) {
        this.btnMinus10min.addEventListener('click', function () {
            that.subTime(600);
        })
    }
    if (this.btnMinus10sec) {
        this.btnMinus10sec.addEventListener('click', function () {
            that.subTime(10);
        })
    }

}

Timer.prototype.addTime = function(value){
    let newtime = this.time + parseInt(value);
    if (newtime <= this.maxtime) {
        this.time = newtime;
    }
    this.showTime();
};
Timer.prototype.subTime = function(value){
    this.time = this.time - parseInt(value);
    if (this.time < 0) {
        this.time = 0;
    }
    this.showTime();
};

Timer.prototype.numberConverter = function(value){
    if (value < 10) {
        return `0${value}`;
    }
    return `${value}`;
};

Timer.prototype.showTime = function() {
    let minutes = Math.floor(this.time / 60);
    let seconds = this.time - minutes * 60;
    this.minute_html.innerHTML = this.numberConverter(minutes);
    this.seconds_html.innerHTML = this.numberConverter(seconds);
};
Timer.prototype.showResult = function(textinfo) {
        this.timer_html.innerHTML = textinfo;
};

Timer.prototype.decrementor = function() {
     if (this.time > 0)
      {
       this.time = this.time - 1;
       this.showTime();
      }
     else
      {
        clearInterval(this.nIntervId);
        this.nIntervId = null;
        this.showResult('Работа таймера завершена');
      }

};
Timer.prototype.pause = function() {
    if (this.nIntervId){
        clearInterval(this.nIntervId);
        this.nIntervId = null;
        this.showResult('Таймер на паузе');
    }
};

Timer.prototype.startTimer = function(context) {
    if (!this.nIntervId && this.time > 0){
         this.showResult('Таймер работает');
         this.nIntervId = setInterval(function(){
            context.decrementor()
        },1000);
    }
};
Timer.prototype.pauseTimer = function(context) {
    context.pause();
};
Timer.prototype.resetTimer = function(context) {
    context.pause();
    context.time = 0;
    context.showTime();
    this.showResult('Таймер');
};

const MyTimer = new Timer({
    minute_html : '.j-timer__minutes',
    seconds_html: '.j-timer__seconds',
    timer_html: '.timer__title',
    btnStart: '.j-btn-start',
    btnPause: '.j-btn-pause',
    btnReset: '.j-btn-reset',
    btnPlus10min: '.j-btn-P10m',
    btnPlus10sec:  '.j-btn-P10s',
    btnPlus1min: '.j-btn-P1m',
    btnPlus1sec: '.j-btn-P1s',
    btnMinus10min: '.j-btn-M10m',
    btnMinus10sec: '.j-btn-M10s',
});

}; // end of window.onload