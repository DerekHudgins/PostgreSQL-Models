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

    static async updateById(id, { name, age, favoriteFood }) {
        const existingCat = await Cat.getById(id);
        const newName = name ?? existingCat.name;
        const newAge = age ?? existingCat.age;
        const newFood = favoriteFood ?? existingCat.favoriteFood;
    
        const { rows } = await pool.query(
          'UPDATE cats SET name=$1, age=$2, favorite_food=$3 WHERE id=$4 RETURNING *',
          [newName, newAge, newFood, id]
        );
    
        return new Cat(rows[0]);
      }
      static async deleteById(id) {
        const { rows } = await pool.query(
          'DELETE FROM cats WHERE id=$1 RETURNING *',
          [id]
        );
    
        return new Cat(rows[0]);
      }
}
