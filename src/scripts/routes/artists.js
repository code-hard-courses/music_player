import Artists from '../components/Artists'
let mainContent = document.querySelector(".mainContent");
const artists = {
    name: "artists",
    match: "artists",
    onBeforeEnter: () => { },
    onEnter: () => {
        new Artists().init();
    },
    onLeave: () => { mainContent.innerHTML = ''; }
};

export { artists };