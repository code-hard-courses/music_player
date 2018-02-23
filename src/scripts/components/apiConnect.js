import eventHandler from './helpers/eventHandler';

const API_KEY_LASTFM = "52bc3b6e84807de0f34482110ffa0834";
const API_KEY_FMA = "29UT3KA87Q3MV8Q1";
function $$(str) {
  return document.querySelector(str);
}
class ApiConnect {
  constructor() {
    // this.trackUrls = [];
    this.dom = {
      player: $$(".player"),

      play: $$(".play"),
      pause: $$(".pause"),


      progress: {
        bar: $$(".progress"),
        loaded: $$(".progress_loaded"),
        current: $$(".progress_current")
      },
      duration: $$(".duration"),

      volume: {
        bar: $$(".volume"),
        value: $$(".volume__bar"),
        valueVolume: $$(".valueVolume")
      },

      radio: $$(".divRadio"),
      overlay: $$(".overlay")
    }
  }

  init() {
    let dataMM = JSON.parse(localStorage.getItem('dataMM')) || this.connectFMA();
    this.controls(dataMM);
  }

  connectFMA() {
    // fetch(
    //   `https://freemusicarchive.org/api/get/curators.json?api_key=${API_KEY_FMA}`
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     let main = document.querySelector(".mainContent");

    //   });
    fetch(`https://freemusicarchive.org/recent.json`)
      .then(response => response.json())
      .then(dataMM => {

        // console.log(dataMM)
        // console.log(dataMM.aTracks[10].track_duration);
        localStorage.setItem('dataMM', JSON.stringify(dataMM));
        return dataMM;
      });
  }

  controls(dataMM) {

    console.log(dataMM.aTracks[16].track_listen_url);
    //let listenUrl = dataMM.aTracks[10].track_listen_url;
    let trackUrls = dataMM.aTracks.map((track) => {
      return track.track_listen_url;
    })
    // trackUrls.unshift(dataMM.aTracks[10].track_listen_url);
    // console.log('this tral!!!', trackUrls);
    let mainContent = document.querySelector(".mainContent");
    mainContent.innerHTML += '<div class="listMusic"></div>';
    let artistsName = dataMM.aTracks.map((name, i) => {



      let listMusic = document.querySelector(".listMusic");
      listMusic.innerHTML += `
      <div class="listMain">
        <div class="demo-list-action mdl-list">
            <div class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <div class="material-icons mdl-list__item-avatar">person</div>
                    <span>${name.artist_name} </span><span class="mdl-list__item-secondary-content"><span> ${name.track_duration} </span></span>
                </span>
                <div class="material-icons mainPlay" data-index="${i}">play_circle_filled</div>
            </div>
        </div>
    </div>`;
    });

    let btnArray = document.querySelectorAll('.mainPlay');
    btnArray.forEach(btn => {
      let data = dataMM;
      btn.addEventListener('click', (event, data) => eventHandler(dataMM, event))
    })


    let trackIndex = 0;

    let AudioPlayer = ya.music.Audio;

    let audioPlayer = new AudioPlayer(null, this.dom.overlay);

    var startPlay = function () {
      var track = trackUrls[trackIndex];
      if (audioPlayer.isPreloaded(track)) {
        audioPlayer.playPreloaded(track);
      } else {
        audioPlayer.play(track);

      }
    };

    audioPlayer.on(ya.music.Audio.EVENT_LOADED, function () {
      if (trackIndex + 1 < trackUrls.length) {
        audioPlayer.preload(trackUrls[trackIndex + 1]);
      }
    });


    this.dom.play.addEventListener("click", function () {
      console.log("tutPlay");

      let trackDuration = dataMM.aTracks[0].track_duration;//dataMM.aTracks[10].track_duration; // sec 3:30
      this.dom.duration.innerHTML = trackDuration;
      let maxDurationArr = trackDuration.split(":"); //[3,30]
      let maxDurationSec = (maxDurationArr[0] * 60) + +maxDurationArr[1]; //перевод в секунды 210sec (number)
      let that = this;

      function printNumbersTimeout(maxDurationSec) {

        var i = 1;
        var timerId = setTimeout(function go() {
          console.log(i);
          if (i < maxDurationSec) setTimeout(go, 1004);
          i++;

          that.dom.progress.current.style.width = ((i * 100) / maxDurationSec).toFixed() + "%"; //пропорция
        }, 1004);
      }

      // вызов
      printNumbersTimeout(maxDurationSec);
      //
      let state = audioPlayer.getState();
      audioPlayer.on(ya.music.Audio.EVENT_PROGRESS, timings => {
        console.log(timings);
        if (timings.loaded < 100) {
          this.dom.progress.loaded.style.width = timings.loaded + "%";
        }
        else {
          this.dom.progress.loaded.style.width = "100%";
        };
      });

      switch (state) {
        case ya.music.Audio.STATE_PLAYING:
          audioPlayer.pause();
          console.log("pause");
          break;

        case ya.music.Audio.STATE_PAUSED:
          audioPlayer.resume();
          console.log("resume");
          break;

        default:
          startPlay();
          break;
      }
    }.bind(this));

    audioPlayer.on(ya.music.Audio.EVENT_ENDED, function () {
      trackIndex++;

      if (trackIndex < trackUrls.length) {
        startPlay();
      }
    });

    this.dom.play.addEventListener("click", () => {
      if (this.dom.play.innerHTML === "play_circle_filled") {
        this.dom.play.innerHTML = "pause_circle_filled";
      } else if (this.dom.play.innerHTML === "pause_circle_filled") {
        this.dom.play.innerHTML = "play_circle_filled";
      }
    }); // состояние
    audioPlayer.on(ya.music.Audio.EVENT_STATE, function (state) {
      switch (state) {
        case ya.music.Audio.STATE_INIT: console.log("Инициализация плеера"); break;
        case ya.music.Audio.STATE_IDLE: console.log("Плеер готов и ожидает"); break;
        case ya.music.Audio.STATE_PLAYING: console.log("Плеер проигрывает музыку"); break;
        case ya.music.Audio.STATE_PAUSED: console.log("Плеер поставлен на паузу"); break;
        case ya.music.Audio.STATE_CRASHED: console.log("Не удалось инициализировать плеер"); break;
      }
    });
    // need some think about it:
    var offsetLeft = function (node) {
      var offset = node.offsetLeft;
      if (node.offsetParent) {
        offset += offsetLeft(node.offsetParent);
      }
      return offset;
    };

    var offsetTop = function (node) {
      var offset = node.offsetTop;
      if (node.offsetParent) {
        offset += offsetTop(node.offsetParent);
      }
      return offset;
    };

    this.dom.volume.bar.addEventListener('change', () => {
      let volume = dom.volume.bar.value;

      this.dom.volume.valueVolume.innerHTML = volume;
      let volumeSet = volume / 100;
      audioPlayer.setVolume(volumeSet);
    });

    // this.dom.progress.bar.addEventListener("click", function (evt) {
    //   debugger;
    //   var fullWidth = this.dom.progress.bar.offsetWidth;
    //   var offset = offsetLeft(this.dom.progress.bar);

    //   var relativePosition = Math.max(
    //     0,
    //     Math.min(1, ((evt.pageX || evt.screenX) - offset) / fullWidth)
    //   );
    //   var duration = audioPlayer.getDuration(1);

    //   audioPlayer.setPosition(duration * relativePosition);
    // });


  }
}
export { ApiConnect };
