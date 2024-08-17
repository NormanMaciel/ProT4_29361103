import { pool } from "./database.js";

class LibroController {
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async getOne(req, res) {
        const { id_libro } = req.params;
    
        try {
            const [result] = await pool.query(`SELECT * FROM libros WHERE id = ?`, [id_libro]);
    
            // Si no se encuentra un libro, lanza un error
            if (result.length === 0) {
                throw new Error('No se encontró un libro con ese ID');
            }
    
            res.json(result[0]);
        } catch (error) {
            // Manejo de errores, incluyendo el caso de libro no encontrado
            console.error('Error al obtener el libro:', error);
            
            if (error.message === 'No se encontró un libro con ese ID') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        }
    }
    

    async add(req, res) {
        const { nombre, autor, categoria, anio_publicacion, isbn } = req.body;
    
        try {
            // Verificación preliminar de los datos
            if (!nombre || !autor || !categoria || !anio_publicacion || !isbn) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }
    
            // Inserción en la base de datos
            const query = `
                INSERT INTO libros (nombre, autor, categoria, anio_publicacion, isbn)
                VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await pool.query(query, [nombre, autor, categoria, anio_publicacion, isbn]);
    
            // Respuesta exitosa
            res.status(201).json({ message: 'Libro agregado exitosamente', id: result.insertId });
        } catch (error) {
            console.error('Error al insertar el libro:', error);
    
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ message: 'Error: Ya exise un libro con este ISBN.' });
            } else {
                res.status(500).json({ message: 'Error al tratar de insertar el libro', error: error.message });
            }
        }
    }
        

    async deleteId(req, res) {
        const { id_libro } = req.params;
    
        try {
            const [result] = await pool.query(`DELETE FROM libros WHERE id = ?`, [id_libro]);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'No  se encontro un libro con ese Id' });
            }
    
            res.json({ message: 'Libro eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            res.status(500).json({ message: 'Error al eliminar el libro', error: error.message });
        }
    }
    

    async deleteIsbn(req, res) {
        const { isbn } = req.params;
    
        try {
            const [result] = await pool.query(`DELETE FROM libros WHERE isbn = ?`, [isbn]);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'No se encontro un libro con el ISBN proporcionado' });
            }
    
            res.json({ message: 'Libro eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            res.status(500).json({ message: 'Error al eliminar el libro', error: error.message });
        }
    }
    

    async update(req, res) {
        const { id_libro } = req.params;
        const { nombre, autor, categoria, anio_publicacion, isbn } = req.body;
    
        try {
            const [result] = await pool.query(
                `UPDATE libros SET nombre = ?, autor = ?, categoria = ?, anio_publicacion = ?, isbn = ? WHERE id = ?`,
                [nombre, autor, categoria, anio_publicacion, isbn, id_libro]
            );
    
            if (result.changedRows === 0) {
                return res.status(404).json({ 
                    message: 'No se encontro el libro o no se realizo cambios', 
                    details: 'Verifique que el ID sea correcto y que los datos enviados sean diferentes a los actuales.' 
                });
            }
    
            res.json({ message: 'Libro actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
    
            let errorMessage = 'Error al actualizar el libro';
            let errorCode = 500;
    
            if (error.code === 'ER_DUP_ENTRY') {
                errorMessage = 'Error: El ISBN proporcionado ya está en uso.';
                errorCode = 400; // Bad Request
            } else if (error.code === 'ER_BAD_FIELD_ERROR') {
                errorMessage = 'Error: Campo incorrecto en la solicitud. Verifique los nombres de los campos.';
                errorCode = 400; // Bad Request
            } else if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
                errorMessage = 'Error: Valor de campo incorrecto. Verifique los datos enviados.';
                errorCode = 400; // Bad Request
            }
    
            res.status(errorCode).json({ message: errorMessage, error: error.message });
        }
    }
    
}

export const libro = new LibroController();