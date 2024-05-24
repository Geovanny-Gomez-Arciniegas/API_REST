import e from 'express';
import { pool } from '../db.js' // Importamos la conexión a la base de datos

// consultar todos los usuarios
export const getUsers = async (req, res) => {
  // Consulta a la base de datos de todos los usuarios
  const { rows } = await pool.query('SELECT * FROM users')
  res.json(rows);
}
// consultar un usuario por su id
export const getUserById = async (req, res) => {
  // Obtenemos el id de los parámetros de la URL
  const { id } = req.params;
  // Consulta a la base de datos de un usuario por su id
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

  if (rows.length === 0) {
    return res.status(404).json(`message: El Usuario con id: ${id} no se a encontrado`);
  }

  res.json(rows[0]);
}
// Crear un usuario
export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [data.name, data.email]
    );
    return res.json(rows[0]);
    
  } catch (error) {
    console.log(error);

    if (error?.code === '23505') {
      return res.status(400).json('El email ya está en uso');
    }

    return res.status(500).json('Internal Server Error');
  }
}
// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

  if (rowCount === 0) {
    return res.status(404).json({ message: `El usuario con el id: ${id} no se ha encontrado` });
  }

  return res.sendStatus(204);
}
// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { rows } = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [data.name, data.email, id]);

  return res.json(rows[0]);
}

