import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(express.json());
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
