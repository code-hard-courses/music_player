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
      overlay: $$(".overlay")
    }
  }

  init() {
    this.connectFMA();
  }
  // dom_elements() { }
  // handlerEvents() {
  //   //  var AudioPlayer = ya.music.Audio;
  // }
  connectFMA() {
    fetch(
      `https://freemusicarchive.org/api/get/curators.json?api_key=${API_KEY_FMA}`
    )
      .then(response => response.json())
      .then(data => {
        let main = document.querySelector(".mainContent");
        // main.innerHTML = `${data.dataset[0]}`;

        //console.log(data.dataset[0]);
      });
    fetch(`https://freemusicarchive.org/recent.json`)
      .then(response => response.json())
      .then(dataMM => {
        // document.querySelector('.mainContent').innerHTML += `
        //     <audio controls>
        //         <source src="${dataMM.aTracks[18].track_listen_url}" type="audio/mpeg">
        //     </audio> .aTracks["0"]
        // `;
        console.log(dataMM)
        console.log(dataMM.aTracks[10].track_duration);  //string .aTracks[10].track_duration
        this.controls(dataMM);

      });
  }

  controls(dataMM) {

    console.log(dataMM.aTracks[10].track_listen_url);
    //let listenUrl = dataMM.aTracks[10].track_listen_url;
    let trackUrls = dataMM.aTracks.map((track) => {
      return track.track_listen_url;
    })
    // trackUrls.unshift(dataMM.aTracks[10].track_listen_url);
    console.log('this tral!!!', trackUrls);


    let trackIndex = 0;

    let AudioPlayer = ya.music.Audio;

    let audioPlayer = new AudioPlayer(null, this.dom.overlay);

    var startPlay = function () {
      audioPlayer.play(trackUrls[trackIndex]);
    };

    audioPlayer.on(ya.music.Audio.EVENT_STATE, state => {
      if (state === ya.music.Audio.STATE_PLAYING) {
        this.dom.play.innerHTML = "pause_circle_filled";
      } else {
        this.dom.play.innerHTML = "play_circle_filled";
      }
    });

    audioPlayer.on(ya.music.Audio.EVENT_PROGRESS, timings => {
      console.log(timings);
      if (timings.loaded < 100) {
        this.dom.progress.loaded.style.width = timings.loaded + "%";
      }
      else {
        this.dom.progress.loaded.style.width = "100%";
      };
    });

    this.dom.play.addEventListener("click", function () {
      console.log("alloblat" + dataMM.aTracks[10].track_duration);
      console.log("tutPlay");

      let trackDuration = dataMM.aTracks[10].track_duration;//dataMM.aTracks[10].track_duration; // sec 3:30
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
    // this.dom.play.addEventListener("click", () => {
    //   if (this.dom.play.innerHTML === "play_circle_filled") {
    //     this.dom.play.innerHTML = "pause_circle_filled";
    //   } else if (this.dom.play.innerHTML === "pause_circle_filled") {
    //     this.dom.play.innerHTML = "play_circle_filled";
    //   }
    // });

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

    this.dom.progress.bar.addEventListener("click", function (evt) {
      var fullWidth = this.dom.progress.bar.offsetWidth;
      var offset = offsetLeft(this.dom.progress.bar);

      var relativePosition = Math.max(
        0,
        Math.min(1, ((evt.pageX || evt.screenX) - offset) / fullWidth)
      );
      var duration = audioPlayer.getDuration();

      audioPlayer.setPosition(duration * relativePosition);
    });

    this.dom.volume.bar.addEventListener('change', () => {
      let volume = this.dom.volume.bar.value;

      this.dom.volume.valueVolume.innerHTML = volume;
      let volumeSet = volume / 100; // 0 - mute 1 - bass
      audioPlayer.setVolume(volumeSet);
    });


  }
}

let connect = new ApiConnect();
connect.init();

export { ApiConnect };
