import pool from "../utils/pool";

export default class Music {
    id;
    artist;
    album;
    song;

    constructor(row) {
        this.id = row.id;
        this.artist = row.artist;
        this.album = row.album;
        this.song = row.song;
    }
    static async insert({ artist, album, song }) {
        const { rows } = await pool.query(
            'INSERT INTO music (artist, album, song) VALUES ($1, $2, $3) RETURNING *',
            [artist, album, song]
        );

        return new Music(rows[0]);
    }
}
