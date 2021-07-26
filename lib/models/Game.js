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
      static async updateById(id, { title, gameSystem, genre }) {
        const existingGame = await Game.getById(id);
        const newTitle = title ?? existingGame.title;
        const newGameSystem = gameSystem ?? existingGame.gameSystem;
        const newGenre = genre ?? existingGame.genre;
        

        const { rows } = await pool.query(
            'UPDATE games SET title=$1, game_system=$2, genre=$3 WHERE id=$4 RETURNING *',
            [newTitle, newGameSystem, newGenre, id]
        );

        return new Game(rows[0]);
       }
        static async deleteById(id) {
            const { rows } = await pool.query(
              'DELETE FROM games WHERE id=$1 RETURNING *',
              [id]
        );

        return new Game(rows[0]);
    }
}
