const help = { //main help
    name: "help",
    match: "help",
    onBeforeEnter: () => { },
    onEnter: () => {
        let mainContent = document.querySelector(".page-content");
        mainContent.innerHTML = `
        <div class="helpme">
        <div>
        <h1>WHAT?!</h1>
        <h2>This is a perfect design and user-friendly web-app!
        </h2>
        <h2>So why you here?! Go back and enjoy!</h2>
        </div>
        </div>
      `;
    },
    onLeave: () => { }
};

export { help };