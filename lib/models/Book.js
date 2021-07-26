import pool from "../utils/pool";

export default class Book {
    id;
    title;
    author;
    genre;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.author = row.author;
        this.genre = row.genre;
    }

    static async insert({ title, author, genre }) {
        const { rows } = await pool.query(
            'INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *',
            [title, author, genre]
        );

        return new Book(rows[0]);
    }
    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM books WHERE id=$1', [id]);
    
        return new Book(rows[0]);
      }
}