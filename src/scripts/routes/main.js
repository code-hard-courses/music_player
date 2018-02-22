import { ApiConnect } from '../components/apiConnect.js';
let mainContent = document.querySelector(".mainContent");
let maincho = document.querySelector(".mainCho");



const main = {
    name: "main",
    match: "",
    onBeforeEnter: () => {
        maincho.style.borderBottom = "solid yellow";
    },
    onEnter: () => {
        let connect = new ApiConnect();
        connect.init();
    },
    onLeave: () => {
        mainContent.innerHTML = '';
        maincho.style.borderBottom = '';

    }
};

export { main };