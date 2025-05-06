import express from 'express';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(productRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);