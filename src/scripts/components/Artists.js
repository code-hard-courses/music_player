import { ApiConnect } from '../components/apiConnect.js'

class Artists {
    init() {
        let dataMM = JSON.parse(localStorage.getItem('dataMM')) || new ApiConnect().connectFMA();
        this.renderSongs(dataMM);
    }

    renderSongs(dataMM) {
        let artistsName = dataMM.aTracks.map((name) => {
            let mainContent = document.querySelector(".mainContent");
            let card = document.querySelector(".artists_card");
            mainContent.innerHTML += `
            <div class="authorIMG">
                <div class="demo-card-image mdl-card artists_card mdl-shadow--2dp">
                    <div class="mdl-card__title mdl-card--expand"></div>
                        <div class="mdl-card__actions">
                             <span class="demo-card-image__filename">${card.style.background = "black"}${name.artists_name}${name.track_image_file}</span>    

                        </div>
                     </div>
                 </div>
            <div class ="authorText">
            Music is an art form and cultural activity whose medium is sound organized in time. <br>
            I hope this player will only help you to enjoy the art.
            </div>`;
        });
    }
}

export default Artists;