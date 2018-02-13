import Router from './utils/Router.js';

import { main } from "./routes/main.js";
import { songs } from "./routes/songs.js";
import { albums } from "./routes/albums.js";
import { artists } from "./routes/artists.js";
import { author } from './routes/author.js';
import { help } from './routes/help.js';

import { apiConnect } from './components/apiConnect.js'


let routes = [author, help, main, songs, albums, artists];

new Router({ routes }).init()