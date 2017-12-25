import Router from './utils/Router.js';

import { author } from './routes/author.js';
import { help } from './routes/help.js';


let routes = [author, help]; 

new Router({ routes }).init()