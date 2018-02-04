const API_KEY_LASTFM = "52bc3b6e84807de0f34482110ffa0834";
const API_KEY_FMA = "29UT3KA87Q3MV8Q1";

class ApiConnect {
  constructor() {
    //52bc3b6e84807de0f34482110ffa0834
    //http://ws.audioscrobbler.com/2.0/?method=library.getartists&api_key=YOUR_API_KEY&user=joanofarctan&format=json
  }

  init() {
    this.controls();
    this.connectFMA();
  }
  dom_elements() {}
  handlerEvents() {
    //  var AudioPlayer = ya.music.Audio;
  }
  connectFMA() {
    fetch(
      `https://freemusicarchive.org/api/get/curators.json?api_key=${API_KEY_FMA}`
    )
      .then(response => response.json())
      .then(data => {
        let main = document.querySelector(".mainContent");
        // main.innerHTML = `${data.dataset[0]}`;

        console.log(data.dataset[0]);
      });
    fetch(`https://freemusicarchive.org/recent.json`)
      .then(response => response.json())
      .then(dataMM => {
        console.log(dataMM);
        console.log(dataMM.aTracks[4].track_file);
        // document.querySelector('.mainContent').innerHTML += `
        //     <audio controls>
        //         <source src="${dataMM.aTracks[18].track_listen_url}" type="audio/mpeg">
        //     </audio>
        // `;
      });
  }

  controls() {
    let trackUrls = [
      "https://freemusicarchive.org/music/listen/bfdef2117a5762d4b9c8c2980e73c246dcb6c7d7"
    ];
    let trackIndex = 0;

    let dom = {
      player: document.querySelector(".player"),

      play: document.querySelector(".play"),
      pause: document.querySelector(".pause"),

      progress: {
        bar: document.querySelector(".progress"),
        loaded: document.querySelector(".progress_loaded"),
        current: document.querySelector(".progress_current")
      },

      volume: {
        bar: document.querySelector(".volume"),
        value: document.querySelector(".volume__bar"),
        valueVolume: document.querySelector(".valueVolume")
      },
      overlay: document.querySelector(".overlay")
    };

    let AudioPlayer = ya.music.Audio;

    let audioPlayer = new AudioPlayer(null, dom.overlay);

    var startPlay = function() {
      audioPlayer.play(trackUrls[trackIndex]);
    };

    audioPlayer.on(ya.music.Audio.EVENT_STATE, state => {
      if (state === ya.music.Audio.STATE_PLAYING) {
        dom.play.innerHTML = "pause_circle_filled";
      } else {
        dom.play.innerHTML = "play_circle_filled";
      }
    });

    audioPlayer.on(ya.music.Audio.EVENT_PROGRESS, timings => {
      dom.progress.loaded.style.width =
        (timings.loaded / timings.duration * 100).toFixed(2) + "%";
      dom.progress.current.style.width =
        (timings.position / timings.duration * 100).toFixed(2) + "%";
    });

    // let updateVolume = function(volume) {
    //   dom.volume.value.style.height = (volume * 100).toFixed(2) + "%";
    // };
    // audioPlayer.on(ya.music.Audio.EVENT_VOLUME, updateVolume);
    dom.play.addEventListener("click", function() {
      var state = audioPlayer.getState();

      switch (state) {
        case ya.music.Audio.STATE_PLAYING:
          audioPlayer.pause();
          break;

        case ya.music.Audio.STATE_PAUSED:
          audioPlayer.resume();
          break;

        default:
          startPlay();
          break;
      }
    });

    audioPlayer.on(ya.music.Audio.EVENT_ENDED, function() {
      trackIndex++;

      if (trackIndex < trackUrls.length) {
        startPlay();
      }
    });
    // dom.play.addEventListener("click", () => {
    //   if (dom.play.innerHTML === "play_circle_filled") {
    //     dom.play.innerHTML = "pause_circle_filled";
    //   } else if (dom.play.innerHTML === "pause_circle_filled") {
    //     dom.play.innerHTML = "play_circle_filled";
    //   }
    // });

    // need some think about it:
    var offsetLeft = function(node) {
      var offset = node.offsetLeft;
      if (node.offsetParent) {
        offset += offsetLeft(node.offsetParent);
      }
      return offset;
    };

    var offsetTop = function(node) {
      var offset = node.offsetTop;
      if (node.offsetParent) {
        offset += offsetTop(node.offsetParent);
      }
      return offset;
    };

    dom.progress.bar.addEventListener("click", function(evt) {
      var fullWidth = dom.progress.bar.offsetWidth;
      var offset = offsetLeft(dom.progress.bar);

      var relativePosition = Math.max(
        0,
        Math.min(1, ((evt.pageX || evt.screenX) - offset) / fullWidth)
      );
      var duration = audioPlayer.getDuration();

      audioPlayer.setPosition(duration * relativePosition);
    });

    dom.volume.bar.addEventListener("change", () => {
      let value = dom.volume.bar.value;

      dom.volume.valueVolume.innerHTML = `<span>${value}</span>`;
    });
  }
}

let connect = new ApiConnect();
connect.init();

export { ApiConnect };
