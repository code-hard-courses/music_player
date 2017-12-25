import Router from './utils/Router';

import { author } from './routes/author';
import { help } from './routes/help';


let routes = [author, help]; 

new Router({ routes }).init()