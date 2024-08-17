import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router()

// Obtener todos los libros
router.get('/libros', libro.getAll);

// Obtener un libro por ID
router.get('/libros/:id_libro', libro.getOne);

// Añadir un nuevo libro
router.post('/libros', libro.add);

// Actualizar un libro por ID
router.put('/libros/:id_libro', libro.update);

// Eliminar un libro por ID
router.delete('/libros/:id_libro', libro.deleteId);

// Eliminar un libro por ISBN
router.delete('/libros/isbn/:isbn', libro.deleteIsbn);

