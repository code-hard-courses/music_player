const artists = {
    name: "artists",
    match: "artists",
    onBeforeEnter: () => { },
    onEnter: () => {
        let mainContent = document.querySelector(".mainContent");
        // let tabMain = document.querySelector('.artists');
        // tabMain.style.border = "solid 2px white";
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
            </div>
            <div class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                    <div class="material-icons mdl-list__item-avatar">person</div>
                    <span>Aaron Paul</span>
                </span>
                <a class="mdl-list__item-secondary-action" href="#">
                    <div class="material-icons">star</div>
                </a>
            </div>
        </div>
    </div>`;
    },
    onLeave: () => { }
};

export { artists };