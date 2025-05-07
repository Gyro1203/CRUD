import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.ACCESS_TOKEN_SECRET;

export const register = async (req, res) => {
  const { username, password, role } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role || 'user']
    );
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log('BODY:', req.body);
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    console.log('DB RESULT:', rows);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch)

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      TOKEN,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el login' });
  }
};
