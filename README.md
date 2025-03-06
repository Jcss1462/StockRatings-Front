# StockRatings-Front

StockRatings-Front es una aplicación web desarrollada con **Vue 3**, **TypeScript**, **Vite** y **Tailwind CSS**. Su propósito es proporcionar una interfaz moderna y eficiente para la gestión y visualización de calificaciones de acciones en el mercado bursátil.

## 🚀 Tecnologías utilizadas

- **Pinia**: Biblioteca de gestión de estado para Vue 3, que facilita el manejo global del estado de la aplicación.

- **Vue 3**: Framework progresivo para la construcción de interfaces de usuario.

- **Vite**: Herramienta de construcción rápida para proyectos frontend.

- **TypeScript**: Lenguaje de programación tipado que mejora la seguridad del código.

- **Tailwind CSS**: Framework de estilos basado en utilidades para un diseño responsivo y moderno.

## 🎯 Backend asociado

Este frontend está diseñado para funcionar junto con el backend desarrollado en Go Go, alojado en el siguiente repositorio: [StockRatings-Back](https://github.com/Jcss1462/StockRatings-Back). El proyecto trabaja con una API externa que proporciona un token JWT, el cual es enviado y utilizado por el backend de la aplicación para que la API externa permita la sincronización de la base de datos del proyecto. Las URLs de las APIs y los datos de acceso están preconfigurados en el archivo `.env` para funcionar en modo desarrollo, pero deben ajustarse según el entorno en el que se ejecute la aplicación o las APIs utilizadas.

## 🔧 Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión recomendada: 18.x o superior)
- **npm** (incluido con Node.js) como gestor de paquetes. Se recomienda no usar `yarn` para evitar posibles inconsistencias.
- **Backend en ejecución**: Debes clonar y ejecutar el backend alojado en [StockRatings-Back](https://github.com/Jcss1462/StockRatings-Back) para que la aplicación funcione correctamente.



## 📦 Instalación y ejecución

1. **Clonar el repositorio**

   ```sh
   git clone https://github.com/Jcss1462/StockRatings-Front.git
   cd StockRatings-Front
   ```

2. **Instalar dependencias**

   ```sh
   npm install
   ```

3. **Ejecutar en modo desarrollo**

   ```sh
   npm run dev
   ```

4. **Construir para producción**

   ```sh
   npm run build
   ```

5. **Previsualizar el build**

   ```sh
   npm run preview
   ```

