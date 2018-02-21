let mainContent = document.querySelector(".mainContent");

const help = { //main help
    name: "help",
    match: "help",
    onBeforeEnter: () => { },
    onEnter: () => {
        mainContent.innerHTML = `
        <div class="helpme">
        <div>
        <h1>WHAT?!</h1>
        <h2>This is a perfect design and user-friendly web-app!
        </h2>
        <h2>
        <div>If you want, you also can report some bugs : <a href="https://github.com/OzzyMalv/music_player/issues" target="_blank"style="color: white">GIT</a></div>
        </h2>
        </div>
        </div>
       
      `;
    },
    onLeave: () => {
        mainContent.innerHTML = '';
    }
};

export { help };