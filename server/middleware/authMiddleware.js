import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.ACCESS_TOKEN_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Esperamos algo como: "Bearer <token>"
  if (!authHeader) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1]; // Sacamos solo el token

  try {
    const decoded = jwt.verify(token, TOKEN);
    req.user = decoded; // Guardamos los datos del usuario en la request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
