
const API_KEY_FMA = "29UT3KA87Q3MV8Q1";

class Yandex {
    constructor(){
        //52bc3b6e84807de0f34482110ffa0834
        //http://ws.audioscrobbler.com/2.0/?method=library.getartists&api_key=YOUR_API_KEY&user=joanofarctan&format=json
    }

    init() {
        this.controls();
        this.handlerEvents();
    }

    handlerEvents(){

      //  var AudioPlayer = ya.music.Audio;

        

    }

    controls(){
        var dom = {
            player: document.querySelector(".player"),
        
            play: document.querySelector(".play"),
            pause: document.querySelector(".pause"),
        
            progress: {
                bar: document.querySelector(".progress"),
                loaded: document.querySelector(".progress__loaded"),
                current: document.querySelector(".progress__current")
            },
        
            volume: {
                bar: document.querySelector(".volume"),
                value: document.querySelector(".volume__bar"),
                valueVolume: document.querySelector(".valueVolume")       
            },
            
            overlay: document.querySelector(".overlay")
        };

        dom.play.addEventListener('click', () => {
            // Проверка текущего статуса плеера.
           // var state = audioPlayer.getState();
           if(dom.play.innerHTML === "play_circle_filled")
            {
                dom.play.innerHTML = "pause_circle_filled";
            }
            else if  (dom.play.innerHTML === "pause_circle_filled"){
                dom.play.innerHTML = "play_circle_filled"; 
            }
            
        });
        
      
        dom.volume.bar.addEventListener('change', () =>{
            let value = dom.volume.bar.value;
        
            dom.volume.valueVolume.innerHTML = `<span>${value}</span>`;
        });
        
    }
}

let connect = new Yandex();
connect.init();

export { yandex }