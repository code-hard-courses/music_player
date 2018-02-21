import Songs from '../components/Songs'
let mainContent = document.querySelector(".mainContent");
const songs = {
    name: "songs",
    match: "songs",
    onBeforeEnter: () => { },
    onEnter: () => {
        // let column = document.querySelector(".column_count");
        // column.classList.remove("column_count");

        new Songs().init();
    },
    onLeave: () => {
        mainContent.innerHTML = '';
    }
};

export { songs };