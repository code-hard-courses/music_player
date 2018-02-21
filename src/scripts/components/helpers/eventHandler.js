function $$(str) {
  return document.querySelector(str);
}
let dom = {
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
};

export default function (dataMM, ev) {
  console.log("tutPlay");
  console.log('jkfhslkjhflkjdsa', dataMM, ev);

  let indexMusic = ev.target.dataset.index;

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
  };

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
}