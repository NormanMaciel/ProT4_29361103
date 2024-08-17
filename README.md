# Biblioteca API
Este proyecto es una API para la gestión de libros en una biblioteca. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en los registros de libros almacenados en la base de datos. La API está diseñada para facilitar la administración de una colección de libros, ofreciendo diversas rutas para interactuar con los datos.

## Modelo de Datos
La API maneja un modelo de datos para los libros con los siguientes campos:

- id: Identificador único del libro (generado automáticamente).
- nombre: Nombre o título del libro.
- autor: Autor del libro.
- categoria: Categoría o género del libro.
- anio_publicacion: Fecha de publicación del libro.
- isbn: Número ISBN del libro, un identificador único para publicaciones.
## Rutas de la API
A continuación, se describen las rutas disponibles en la API:

### Obtener todos los libros
- Ruta: GET /libros
- Descripción: Retorna una lista de todos los libros disponibles en la base de datos.
### Obtener un libro por ID
- Ruta: GET /libros/:id_libro
- Descripción: Retorna los detalles de un libro específico, identificado por su ID.
### Añadir un nuevo libro
- Ruta: POST /libros
- Descripción: Añade un nuevo libro a la colección.
- Body: Debe incluir los siguientes campos en formato JSON:

{
    "nombre": "string",
    "autor": "string",
    "categoria": "string",
    "anio_publicacion": "YYYY-MM-DD",
    "isbn": "string"
}
### Actualizar un libro por ID
- Ruta: PUT /libros/:id_libro
- Descripción: Actualiza los detalles de un libro existente, identificado por su ID.
- Body: Debe incluir los campos a actualizar en formato JSON.
### Eliminar un libro por ID
- Ruta: DELETE /libros/:id_libro
- Descripción: Elimina un libro de la base de datos, identificado por su ID.
### Eliminar un libro por ISBN
- Ruta: DELETE /libros/isbn/:isbn
- Descripción: Elimina un libro de la base de datos, identificado por su ISBN.
## Requisitos Previos
Para ejecutar este proyecto, asegúrate de tener instalado:

- Node.js
- MySQL (o cualquier base de datos SQL compatible)
- npm (Node Package Manager)

## Uso
Una vez que el servidor esté en funcionamiento, podrás acceder a la API a través de las rutas descritas anteriormente utilizando un cliente HTTP como Postman o curl en puerto 4000.

El codigo **sql** se encuentra en la carpeta "script".