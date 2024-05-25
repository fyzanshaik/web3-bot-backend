"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUser = void 0;
const database_1 = __importDefault(require("../database"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    try {
        const result = yield database_1.default.query('SELECT * FROM user_scores WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, score } = req.body;
    console.log(`Username: ${username} score:${score}`);
    if (!username || score === undefined) {
        return res
            .status(400)
            .json({ error: 'Username and score are required' });
    }
    try {
        yield database_1.default.query('INSERT INTO user_scores (username, score) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET score = user_scores.score + $2', [username, score]);
        console.log('User value is updated');
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error updating user score:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.updateUser = updateUser;
