import { Router } from 'express'
import { getUsers, getUserById, createUser, deleteUser, updateUser } from '../controllers/users.controllers.js';


const router = Router();

// Obtener lista de usuarios
router.get('/users', getUsers);

// Obtener un usuario por su Id
router.get('/users/:id', getUserById);

// Crear un usuario
router.post('/users', createUser);

// Eliminar un usuario
router.delete('/users/:id', deleteUser);

// Actualizar un usuario
router.put('/users/:id', updateUser);
export default router;