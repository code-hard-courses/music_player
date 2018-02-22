import { ApiConnect } from '../components/apiConnect.js';
import eventHandler from './helpers/eventHandler';

class Songs {
    init() {
        let dataMM = JSON.parse(localStorage.getItem('dataMM')) || new ApiConnect().connectFMA();
        this.renderSongs(dataMM);
    }

    renderSongs(dataMM) {
        let mainContent = document.querySelector(".mainContent");
        mainContent.innerHTML += '<div class="listMusic"></div>'
        let listMusic = document.querySelector(".listMusic");
        let artistsName = dataMM.aTracks.map((name, i) => {
            listMusic.innerHTML += `
            <div class="listMain">
              <div class="demo-list-action mdl-list">
                  <div class="mdl-list__item">
                      <span class="mdl-list__item-primary-content">
                          <div class="material-icons mdl-list__item-avatar">person</div>
                          <span> ${name.track_title} </span>
                      </span>
                      <div class="material-icons mainPlay" data-index="${i}">play_circle_filled</div>
                      <div class="material-icons star">star</div>
                      <a href="${name.track_file_url}"><div class="material-icons">file_download</div></a>
                  </div>
              </div>
          </div>`;
        });
        let btnArray = document.querySelectorAll('.mainPlay');
        btnArray.forEach(btn => {
            let data = dataMM;
            btn.addEventListener('click', (event, data) => eventHandler(dataMM, event))
        })
    }
}

export default Songs;