import Router from './utils/Router.js';

//import { main } from "./routes/main";
import { author } from './routes/author.js';
import { help } from './routes/help.js';

import { apiConnect } from './components/apiConnect.js'


let routes = [author, help];

new Router({ routes }).init()