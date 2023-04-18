import * as pg from './script.js'

const IMAGE = document.querySelector('.slider img');
const POINTER = document.querySelector('.pointer');

pg.default.REQUEST('https://api.themoviedb.org/3/movie/popular?api_key=d61d03c4897622853f09d1e0b7a41c5b&page=1', IMAGE, POINTER)
