import Favorites from '../components/Favorites'
let mainContent = document.querySelector(".mainContent");
let songss = document.querySelector(".favorites");

const favorites = {
    name: "favorites",
    match: "favorites",
    onBeforeEnter: () => {
        songss.style.borderBottom = "solid yellow";
    },
    onEnter: () => {
        new Favorites().init();
    },
    onLeave: () => {
        mainContent.innerHTML = '';
        songss.style.borderBottom = '';
    }
};

export { favorites };