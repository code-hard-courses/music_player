import { apiConnect } from '../components/apiConnect.js'

const main = {
    name: "main",
    match: "",
    onBeforeEnter: () => { },
    onEnter: () => {
        let mainContent = document.querySelector(".mainContent");
        mainContent.innerHTML = `
        <div class="listMain">
        <div class="demo-list-action mdl-list">
            <div class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <div class="material-icons mdl-list__item-avatar">person</div>
                    <span>Bryan Cranston</span>
                </span>
                <a class="mdl-list__item-secondary-action" href="#">
                    <div class="material-icons">play_circle_filled</div>
                </a>
                <div class="material-icons">star</div>
            </div>
        </div>
    </div>`;
    },
    onLeave: () => { }
};

export { main };