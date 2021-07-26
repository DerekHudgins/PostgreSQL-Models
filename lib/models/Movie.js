import pool from "../utils/pool";

export default class Movie {
    id;
    title;
    director;
    genre;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.director = row.director;
        this.genre = row.genre;
    }
}
