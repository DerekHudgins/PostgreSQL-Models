import pool from '../utils/pool';

export default class Cat {
    id;
    name;
    age;
    favoriteFood;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.age = row.age;
        this.favoriteFood = row.favorite_food;
    }

    static async insert({ name, age, favoriteFood }) {
      const { rows } = await pool.query(
          'INSERT INTO cats (name, age, favorite_food) VALUES ($1, $2, $3) RETURNING *',
          [name, age, favoriteFood]
      );

      return new Cat(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM cats WHERE id=$1', [id]);
    
        return new Cat(rows[0]);
      }

    static async getAll() {
        const { rows } = await pool.query('SELECT * from cats');
    
        return rows.map((row) => new Cat(row));
      }
}
