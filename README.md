# E-commerce Project

Este proyecto incluye una API para un sistema de comercio electrónico y una aplicación web para interactuar con la API.

## Requisitos previos

- Node.js (v14 o superior)
- PostgreSQL
- Angular CLI (v12 o superior)

## Instalación

### API

1. Clona el repositorio:

    ```bash
    git clone https://github.com/juanpperezj1/ecommerce.git
    cd ecommerce/ecommerce-api
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en el directorio `api` con la configuración de la base de datos:

    ```plaintext
    DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_bd?schema=public"
    ```

4. Ejecuta las migraciones de Prisma para configurar la base de datos:

    ```bash
    npx prisma migrate dev
    ```

5. Inicia la API:

    ```bash
    npm start
    ```

    La API estará disponible en `http://localhost:3000`.

### Aplicación Web

1. Clona el repositorio (si no lo has hecho ya):

    ```bash
    git clone https://github.com/juanpperezj1/ecommerce.git
    cd ecommerce/ecommerce-app
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Inicia la aplicación web:

    ```bash
    ng serve
    ```

    La aplicación web estará disponible en `http://localhost:4200`.

## Uso

- Visita `http://localhost:4200` en tu navegador para interactuar con la aplicación web.
- Usa Postman o cualquier herramienta similar para probar los endpoints de la API en `http://localhost:3000`.

## Estructura del Proyecto

- `api/`: Contiene el código de la API de Node.js y Express.
- `app/`: Contiene el código de la aplicación web de Angular.

