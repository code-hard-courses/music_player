import { ApiConnect } from '../components/apiConnect.js'

class Albums {
    init() {
        let dataMM = JSON.parse(localStorage.getItem('dataMM')) || new ApiConnect().connectFMA();
        this.renderSongs(dataMM);
    }

    renderSongs(dataMM) {
        let artistsName = dataMM.aTracks.map((name) => {
            let mainContent = document.querySelector(".mainContent");
            mainContent.innerHTML += `
            <div class="listMain">
              <div class="demo-list-action mdl-list">
                  <div class="mdl-list__item">
                      <span class="mdl-list__item-primary-content">
                          <div class="material-icons mdl-list__item-avatar">person</div>
                          <span>${name.album_title} </span>
                      </span>
                      <div class="material-icons play">play_circle_filled</div>
                      <div class="material-icons">star</div>
                  </div>
              </div>
          </div>`;
        });
    }
}

export default Albums;