class Chronometer{
     constructor(){
         this._value;
         this._state;
         this._time = document.querySelector('#time');
         this._interval;
         this._audio; 
         this._box; 
         this._button;
         this.init();
     }

    init(){
        this.time = "00:00:00";
        let button = document.querySelector('#sendButton');
        button.addEventListener('click',a=>{
            this.process();
        })
    }

    process(){
        
        clearInterval(this.interval);
        this.audio = new Audio('./audios/sirene.mp3');
        let duration = document.querySelector('#duration').value;
        let progression = document.querySelector('#progression').value;
        if(parseFloat(duration) > 0){
         if(progression === "reg"){
               let milliseconds = duration*60000;
               milliseconds < 1000 ? milliseconds = 1000 : true;
               this.time = this.transform(milliseconds);
               this.interval = setInterval(()=>{
                  milliseconds -= 1000;
                  this.time = this.transform(milliseconds);
                  if(milliseconds <= 0){
                     this.activateAudio();
                     clearInterval(this.interval);
                     
                  }
               },1000)
         }else{
               if(progression == "prog"){
                  let milliseconds = 0;
                  this.time = this.transform(milliseconds);
                  this.interval = setInterval(()=>{
                  milliseconds += 1000;
                  this.time = this.transform(milliseconds);
                  if(milliseconds >= duration*60000){ 
                     this.activateAudio();
                     clearInterval(this.interval);
                     }
               },1000)
            }
        }
      }
    }

    activateAudio(){
        
        let sendButton = document.querySelector('#sendButton');
        sendButton.disabled = true;

        this.box = document.querySelector('#showButton');
        this.button = document.createElement('button');
        this.button.setAttribute('id',"boxButton")
        this.button.innerHTML = "Parar alarme";

        setTimeout(()=>{
         this.closeButtonEvents();
        },this.audio.duration*1000);
        this.button.addEventListener('click',a=>{
              this.closeButtonEvents();
        })
        this.box.appendChild(this.button);
        this.audio.play();    
    }

    closeButtonEvents(){
         this.audio.pause();
         this.end();
         this.init();  
         sendButton.disabled = false;
    }

    end(){
         this.box.removeChild(this.button);
    }

    transform(value){
          let hours, minutes, seconds;
          
          hours = parseInt(value/3600000)
          value -= hours*3600000;
          minutes = parseInt(value/60000);
          value -= minutes*60000;
          seconds = parseInt(value/1000);
          value -= seconds*1000;
          (hours+"").length < 2 ?  hours = "0"+hours : true; 
          (minutes+"").length < 2 ?  minutes = "0"+minutes : true; 
          (seconds+"").length < 2 ? seconds = "0"+seconds : true; 
          return `${hours}:${minutes}:${seconds}`;
    }

     //acessadores
     get value(){
        return this._value;
     }
     set value(value){
        this._value = value;
     }
     get state(){
        return this._state;
     }
     set state(value){
        this._state = value;
     }
     get time(){
        return this._time.innerHTML;
     }
     set time(value){
        this._time.innerHTML = value;
     }
     get interval(){
        return this._interval;
     }
     set interval(value){
        this._interval = value;
     }
     get audio(){
        return this._audio;
     }
     set audio(value){
        this._audio = value;
     }
     get button(){
        return this._button;
     }
     set button(value){
        this._button = value;
     }
     get box(){
        return this._box;
     }
     set box(value){
        this._box = value;
     }
}