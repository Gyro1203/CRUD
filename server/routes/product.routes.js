import { Router } from "express";
import { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from "../controllers/product.controllers.js";
import { verifyToken } from '../middleware/authMiddleware.js';
import { allowRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/products',verifyToken, getProducts);

router.get('/products/:id',verifyToken, getProduct);

router.post('/products',verifyToken, createProduct);

router.put('/products/:id',verifyToken,allowRoles('admin'), updateProduct);

router.delete('/products/:id',verifyToken,allowRoles('admin'), deleteProduct);

export default router;