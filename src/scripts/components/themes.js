class Themes {
    constructor() {
        let options = document.getElementsByName('options');
        let header = document.querySelector('.header');
        let middle = document.querySelector('.mainContent2');
        let footer = document.querySelector('.footercli');
        let radioClick = document.querySelector('.divRadio');
        this.radio = options;
        this.header = header;
        this.middle = middle;
        this.footer = footer;
        this.radioClick = radioClick;
    }

    themeState() {
        this.stateCheck()
        this.radioClick.addEventListener("click", function () {
            if (this.radio[0].type === "radio" && this.radio[0].checked) {
                this.header.style.removeProperty("background");
                this.middle.style.removeProperty("background");
                this.footer.style.removeProperty("background");
                localStorage.removeItem("objectTheme");
            };
            if (this.radio[1].type === "radio" && this.radio[1].checked) {
                let theme = "blackWhite";
                this.header.style.background = "black";
                this.middle.style.background = "white";
                this.footer.style.background = "black";
                this.save(theme);


            };
            if (this.radio[2].type === "radio" && this.radio[2].checked) {
                let theme = "sand";
                this.header.style.background = "#DEB887";
                this.middle.style.background = "#FFE4C4";
                this.footer.style.removeProperty("background");
                this.save(theme);
            };



        }.bind(this));

    }

    stateCheck() {
        let retObj = JSON.parse(localStorage.getItem("objectTheme"));
        console.log("ha " + retObj);
        if (retObj === "blackWhite") {
            this.radio[1].checked = true;
            this.header.style.background = "black";
            this.middle.style.background = "white";
            this.footer.style.background = "black";
        }
        else if (retObj === "sand") {
            this.radio[2].checked = true;
            this.header.style.background = "#DEB887";
            this.middle.style.background = "#FFE4C4";
            this.footer.style.removeProperty("background");
        }
    }

    save(theme) {
        let sObj = JSON.stringify(theme);
        localStorage.setItem("objectTheme", sObj);
    }
}

let state = new Themes();
state.themeState();

export { Themes };
