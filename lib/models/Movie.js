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
    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM movies WHERE id=$1', [id]);
    
        return new Movie(rows[0]);
      }
    static async getAll() {
        const { rows } = await pool.query('SELECT * from movies');
    
        return rows.map((row) => new Movie(row));
      }
    static async updateById(id, { title, director, genre }) {
        const existingMovie = await Movie.getById(id);
        const newTitle = title ?? existingMovie.title;
        const newDirector = director ?? existingMovie.director;
        const newGenre = genre ?? existingMovie.genre;
        

        const { rows } = await pool.query(
            'UPDATE movies SET title=$1, director=$2, genre=$3 WHERE id=$4 RETURNING *',
            [newTitle, newDirector, newGenre, id]
        );

        return new Movie(rows[0]);
       }
    static async deleteById(id) {
        const { rows } = await pool.query(
          'DELETE FROM movies WHERE id=$1 RETURNING *',
          [id]
    );

    return new Movie(rows[0]);
}
}
