import db from '../config/db.js'

export const getProducts = async(req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM products ORDER BY createdAt ASC");
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
};

export const getProduct = async(req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
        if (result.length === 0)
            return res.status(404).json({ message: 'Task not found'});
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
};

export const createProduct = async(req, res) => {
    try {
        const {title, description} = req.body;
        const stock = req.body.stock ?? 0;
        const [result] = await db.query('INSERT INTO products(title, stock, description) VALUES (?, ?, ?)',
        [title, stock, description]
        );
        console.log(result);
        res.json({
            id: result.insertId,
            title,
            stock,
            description
        });    
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
};

export const updateProduct = async(req, res) => {
    try {
        const result = await db.query("UPDATE products SET ? WHERE id = ?",
        [req.body, req.params.id]);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: 'Task not found'});
        res.json(result);    
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
};

export const deleteProduct = async(req, res) => {
    try {
        const [result] = await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: 'Task not found'});
        return res.sendStatus(204);    
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
};