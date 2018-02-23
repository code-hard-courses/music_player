import { ApiConnect } from '../components/apiConnect.js'

class Favorites {
    init() {
        let dataMM = JSON.parse(localStorage.getItem('favorites')) || new ApiConnect().connectFMA();
        this.renderSongs(dataMM);
    }

    renderSongs(dataMM) {
        let artistsName = dataMM.aTracks.map((name) => {
            let mainContent = document.querySelector(".mainContent");
            let card = document.querySelector(".artists_card");
        });
    }
}

export default Favorites;