# Backend AdoptMe - API REST con Mocking y Arquitectura por Capas

Este proyecto es una API REST para una plataforma de adopción de mascotas. Originalmente basado en una estructura base, ha sido **refactorizado, modernizado y ampliado** para cumplir con estándares de arquitectura profesional, implementación de seguridad y generación de datos de prueba (Mocking).

##  Mejoras y Funcionalidades Implementadas

Este trabajo práctico se centró en la profesionalización del código y la creación de herramientas de desarrollo.

### 1. Módulo de Mocking y Generación de Data
Se implementó un router específico (`mocks.router.js`) para manejar la generación de datos falsos utilizando `@faker-js/faker`, facilitando pruebas de carga y frontend sin depender de datos reales.

*   **Endpoint `/mockingpets`:** Genera 100 mascotas con datos aleatorios.
*   **Endpoint `/mockingusers`:** Genera 50 usuarios con las siguientes características:
    *   Contraseña encriptada (`coder123`) usando `bcrypt`.
    *   Roles aleatorios (`user` o `admin`).
    *   Array de mascotas vacío.
    *   Formato idéntico al esquema de Mongoose.
*   **Endpoint `/generateData` (POST):** Recibe los parámetros `users` y `pets` (numéricos), genera la cantidad solicitada e **inserta los datos directamente en la base de datos** MongoDB Atlas.

### 2. Refactorización a ES Modules
El proyecto fue migrado completamente de **CommonJS** (`require`) a **ES Modules** (`import/export`), alineándose con los estándares modernos de JavaScript y Node.js.

### 3. Arquitectura por Capas (DAO / Repository / Service)
Se corrigió la arquitectura del proyecto para respetar la separación de responsabilidades:
*   **Controladores:** Ya no acceden directamente a los Modelos de Mongoose. Ahora interactúan con la capa de **Servicios**.
*   **Servicios/Repositorios:** Se implementó el patrón Repository (`GenericRepository`, `UserRepository`, `PetRepository`) para abstraer la lógica de negocio y el acceso a datos.
*   **DAO:** Manejo directo de la base de datos.

### 4. Seguridad y Configuración
*   Implementación de variables de entorno con `dotenv` para proteger credenciales (URI de Mongo, Puertos).
*   Corrección de `__dirname` para compatibilidad con ES Modules.
*   Manejo de errores y respuestas estandarizadas.

---

##  Tecnologías Utilizadas

*   **Node.js** (Entorno de ejecución)
*   **Express.js** (Framework web)
*   **MongoDB Atlas** (Base de datos en la nube)
*   **Mongoose** (ODM)
*   **@faker-js/faker** (Generación de data Mock)
*   **Bcrypt** (Encriptación de contraseñas)
*   **Dotenv** (Manejo de variables de entorno)

---

##  Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd RecursosBackend-Adoptme
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y agrega tus credenciales:
    ```env
    PORT=8080
    MONGO_URL=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/Adoptme?retryWrites=true&w=majority
    ```

4.  **Iniciar el servidor:**
    ```bash
    npm start
    # O para desarrollo:
    # node src/app.js
    ```

---

##  Documentación de Endpoints

###  Mocks (Nuevas Funcionalidades)

| Método | Endpoint | Descripción | Parámetros (Query/Body) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/mocks/mockingpets` | Obtiene 100 mascotas generadas aleatoriamente (no se guardan en DB). | N/A |
| `GET` | `/api/mocks/mockingusers` | Obtiene 50 usuarios generados aleatoriamente (no se guardan en DB). | `?count=Num` (Opcional) |
| `POST` | `/api/mocks/generateData` | Genera e **INSERTA** usuarios y mascotas en la Base de Datos. | Body: `{ "users": 10, "pets": 5 }` |

### 👥 Usuarios

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/users` | Obtiene todos los usuarios de la base de datos. |
| `GET` | `/api/users/:uid` | Obtiene un usuario específico por ID. |
| `POST` | `/api/users` | Crea un nuevo usuario. |
| `PUT` | `/api/users/:uid` | Actualiza un usuario existente. |
| `DELETE`| `/api/users/:uid` | Elimina un usuario. |

### 🐾 Mascotas

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/pets` | Obtiene todas las mascotas. |
| `POST` | `/api/pets` | Crea una nueva mascota. |
| `PUT` | `/api/pets/:pid` | Actualiza una mascota. |
| `DELETE`| `/api/pets/:pid` | Elimina una mascota. |

### 🏠 Adopciones

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/adoptions` | Lista todas las adopciones realizadas. |
| `GET` | `/api/adoptions/:aid` | Obtiene una adopción por ID. |
| `POST` | `/api/adoptions/:uid/:pid` | Crea una adopción (vincula User con Pet). |

---

## 🧪 Pruebas Sugeridas

1.  Iniciar el servidor.
2.  Usar **Postman** o el navegador.
3.  Ejecutar `POST /api/mocks/generateData` con el body JSON `{ "users": 50, "pets": 100 }`.
4.  Verificar que los datos se insertaron consultando `GET /api/users` y `GET /api/pets`.
5.  Probar el flujo de adopción con los IDs generados usando `POST /api/adoptions/:uid/:pid`.

---

### Autor
Desarrollado como parte del Desafío Entregable de Backend por el alumno Diego Enrique Larripa. 