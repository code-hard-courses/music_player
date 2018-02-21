import { ApiConnect } from '../components/apiConnect.js';
let mainContent = document.querySelector(".mainContent");


const main = {
    name: "main",
    match: "",
    onBeforeEnter: () => { },
    onEnter: () => {
        let connect = new ApiConnect();
        connect.init();
    },
    onLeave: () => {
        mainContent.innerHTML = '';
    }
};

export { main };