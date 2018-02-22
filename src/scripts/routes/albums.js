import Albums from '../components/Albums'
let mainContent = document.querySelector(".mainContent");
let albumss = document.querySelector(".albumsTab");

const albums = {
    name: "albums",
    match: "albums",
    onBeforeEnter: () => {
        albumss.style.borderBottom = "solid yellow";
    },
    onEnter: () => {
        new Albums().init();
    },
    onLeave: () => {
        mainContent.innerHTML = '';
        albumss.style.borderBottom = '';
    }
};

export { albums };