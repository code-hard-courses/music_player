let mainContent = document.querySelector(".mainContent");

const author = {
    name: "author",
    match: "author",
    onBeforeEnter: () => { },
    onEnter: () => {
        mainContent.innerHTML = `
        <div class="authorIMG">
        <div class="demo-card-image mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title mdl-card--expand"></div>
                <div class="mdl-card__actions">
                <span class="demo-card-image__filename">Alex Malv</span>      
            </div>
        </div>
        </div>
        <div class ="authorText">
        Music is an art form and cultural activity whose medium is sound organized in time. <br>
        I hope this player will only help you to enjoy the art.
        </div>
      `;
    },
    onLeave: () => {
        mainContent.innerHTML = '';

    }
};

export { author };