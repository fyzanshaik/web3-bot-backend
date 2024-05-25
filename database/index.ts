import {  Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Connect to the database
pool.connect()
    .then(() => {
        console.log("Connected to database");
        createTable();
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

const createTable = async () => {
    try {
        const result = await pool.query(`
            CREATE TABLE IF NOT EXISTS user_scores (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                score INTEGER NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW()
            )
        `);

        console.log('Schema and table created successfully');
    } catch (error) {
        console.error('Error creating schema and table:', error);
    }
};

export default pool;
