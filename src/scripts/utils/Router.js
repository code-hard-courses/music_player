class Router {
    constructor(options, eventBus) {
        this.routes = options.routes;
        this.eventBus = eventBus;
    }

    init() {
        window.addEventListener('hashchange', event => {
            this.handlerURl(
                event.oldURL.split('#')[1] || '',
                event.newURL.split('#')[1]
            );
        });
        this.handlerURl(undefined, window.location.hash.slice(1));
    }

    handlerURl(oldURL, newURL) {

        let currentRoute = this.routes.find(item => {
            if (typeof item.match === "string") {
                newURL = newURL.split("?")[0];
                return newURL === item.match;
            } else if (typeof item.match === "function") {
                return item.match(newURL);
            } else if (item.match instanceof RegExp) {
                return newURL.match(item.match);
            }
        });

        if (oldURL !== undefined) {
            var previousRoute = this.routes.find(item => {
                if (typeof item.match === "string") {
                    return oldURL === item.match;
                } else if (typeof item.match === "function") {
                    return item.match(oldURL);
                } else if (item.match instanceof RegExp) {
                    return oldURL.match(item.match);
                }
            });
        }

        Promise.resolve()
            .then(
                () =>
                previousRoute &&
                previousRoute.onLeave &&
                previousRoute.onLeave(oldURL.split("=")[1])
            )
            .then(
                () =>
                currentRoute &&
                currentRoute.onBeforeEnter &&
                currentRoute.onBeforeEnter()
            )
            .then(
                () =>
                currentRoute &&
                currentRoute.onEnter &&
                currentRoute.onEnter(this.eventBus)
            );
    }

}

export default Router