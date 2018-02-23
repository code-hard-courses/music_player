class EventHandler {
  constructor() {
    this.play = document.querySelectorAll('.play');
  }

  clickHandler(dataMM) {
    debugger;
    this.play.addEventListener("click", function () {
      console.log("tutPlay");

      let trackDuration = dataMM.aTracks[10].track_duration;
      this.dom.duration.innerHTML = trackDuration;
      let maxDurationArr = trackDuration.split(":");
      let maxDurationSec = (maxDurationArr[0] * 60) + +maxDurationArr[1];
      let that = this;

      function printNumbersTimeout(maxDurationSec) {

        var i = 1;
        var timerId = setTimeout(function go() {
          console.log(i);
          if (i < maxDurationSec) setTimeout(go, 1004);
          i++;

          that.dom.progress.current.style.width = ((i * 100) / maxDurationSec).toFixed() + "%";
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
  };
}

export default EventHandler