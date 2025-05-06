import express from 'express';
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import productRoutes from './routes/product.routes.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

app.use(indexRoutes);
app.use(productRoutes);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);