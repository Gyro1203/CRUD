import {Router} from 'express';
import {db} from '../config/db.js';

const router = Router();

router.get('/ping', async (req, res)=> {
    const [rows] = await db.query('SELECT 1 + 1 as result');
    console.log(rows);
    res.json(rows);
})

export default router;