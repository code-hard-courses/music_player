import Router from './utils/Router.js';

import { main } from "./routes/main.js";
import { author } from './routes/author.js';
import { help } from './routes/help.js';

import { apiConnect } from './components/apiConnect.js'


let routes = [author, help, main];

new Router({ routes }).init()