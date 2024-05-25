import { Request, Response } from 'express';
import pool from '../database';

export const getUser = async (req: Request, res: Response) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM user_scores WHERE username = $1',
            [username]
        );
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { username, score } = req.body;
    console.log(`Username: ${username} score:${score}`);
    if (!username || score === undefined) {
        return res
            .status(400)
            .json({ error: 'Username and score are required' });
    }

    try {
        await pool.query(
            'INSERT INTO user_scores (username, score) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET score = user_scores.score + $2',
            [username, score]
        );
        console.log('User value is updated');
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating user score:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
