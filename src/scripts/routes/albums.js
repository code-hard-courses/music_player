import Albums from '../components/Albums'
let mainContent = document.querySelector(".mainContent");
const albums = {
    name: "albums",
    match: "albums",
    onBeforeEnter: () => { },
    onEnter: () => {
        new Albums().init();
    },
    onLeave: () => {
        mainContent.innerHTML = '';
    }
};

export { albums };