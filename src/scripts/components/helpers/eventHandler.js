function $$(str) {
  return document.querySelector(str);
}
let dom = {
  player: $$(".player"),

  play: $$(".play"),
  pause: $$(".pause"),

  mainPlay: $$(".mainPlay"),


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
};

export default function (dataMM, ev) {
  console.log("tutPlay");
  console.log(' ', dataMM, ev);

  let indexMusic = ev.target.dataset.index; //индекс трека

  if (!indexMusic) {
    console.log(indexMusic);
    indexMusic = 0;
  };

  let trackDuration = dataMM.aTracks[indexMusic].track_duration;//dataMM.aTracks[10].track_duration; // sec 3:30
  dom.duration.innerHTML = trackDuration;
  let maxDurationArr = trackDuration.split(":"); //[3,30]
  let maxDurationSec = (maxDurationArr[0] * 60) + +maxDurationArr[1]; //перевод в секунды 210sec (number)
  let that = this;

  function printNumbersTimeout(maxDurationSec) {

    var i = 1;
    var timerId = setTimeout(function go() {
      console.log(i);
      if (i < maxDurationSec) setTimeout(go, 1004);
      i++;

      dom.progress.current.style.width = ((i * 100) / maxDurationSec).toFixed() + "%"; //пропорция
    }, 1004);
  };

  // вызов
  printNumbersTimeout(maxDurationSec);
  //
  let AudioPlayer = ya.music.Audio;
  let audioPlayer = new AudioPlayer(null, dom.overlay);
  let state = audioPlayer.getState();

  function startPlay() {
    let tracks = JSON.parse(localStorage.getItem('dataMM'));
    console.log(tracks);
    var track = tracks.aTracks[indexMusic].track_listen_url;
    if (audioPlayer.isPreloaded(track)) {
      audioPlayer.playPreloaded(track);
    } else {
      audioPlayer.play(track);

    }
  };

  audioPlayer.on(ya.music.Audio.EVENT_PROGRESS, timings => {
    console.log(timings);
    if (timings.loaded < 100) {
      dom.progress.loaded.style.width = timings.loaded + "%";
    }
    else {
      dom.progress.loaded.style.width = "100%";
    };
  });

  audioPlayer.on(ya.music.Audio.EVENT_STATE, state => {
    if (state === ya.music.Audio.STATE_PLAYING) {
      dom.play.innerHTML = "pause_circle_filled";
    } else {
      dom.play.innerHTML = "play_circle_filled";
    }
  });

  // if (ya.music.Audio.STATE_PLAYING) {
  //   console.log("stop");
  //   audioPlayer.stop();
  // }



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
      console.log("pause2");
      audioPlayer.pause();
      startPlay();
      break;
  };




  dom.volume.bar.addEventListener('change', () => {
    let volume = dom.volume.bar.value;

    dom.volume.valueVolume.innerHTML = volume;
    let volumeSet = volume / 100;
    audioPlayer.setVolume(volumeSet);
  });

  //debugger;
  if (ev.target.innerHTML !== 'pause_circle_filled') {
    ev.target.innerHTML = 'pause_circle_filled';
  } else {
    ev.target.innerHTML = 'play_circle_filled';
  }
}