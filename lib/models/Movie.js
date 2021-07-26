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
    static async insert({ title, director, genre }) {
        const { rows } = await pool.query(
            'INSERT INTO movies (title, director, genre) VALUES ($1, $2, $3) RETURNING *',
            [title, director, genre]
        );

        return new Movie(rows[0]);
    }
}
