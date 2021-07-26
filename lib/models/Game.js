import pool from "../utils/pool";

export default class Game {
    id;
    title;
    gameSystem;
    genre;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.gameSystem = row.game_system;
        this.genre = row.genre;
    }

    static async insert({ title, gameSystem, genre }) {
        const { rows } = await pool.query(
            'INSERT INTO games (title, game_system, genre) VALUES ($1, $2, $3) RETURNING *',
            [title, gameSystem, genre]
        );

        return new Game(rows[0]);
    }
    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM games WHERE id=$1', [id]);
    
        return new Game(rows[0]);
      }
    static async getAll() {
        const { rows } = await pool.query('SELECT * from games');
    
        return rows.map((row) => new Game(row));
      }
}
