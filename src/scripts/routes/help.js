const help = { //main help
    name: "help",
    match: "help",
    onBeforeEnter: () => {},
    onEnter: () => {
        let mainContent = document.querySelector(".mainContent");
        mainContent.innerHTML = `
        <h1>Hi!</h1>
        <h2>Some rules and main task:</h2>
        <ul>
        <li>The main task is to avoid enemies.</li>
        <li>Stay alive as long as possible.</li>
        </ul>
        <h2>Good luck Santa!</h2>
      `;
    },
    onLeave: () => {}
};

export { help };