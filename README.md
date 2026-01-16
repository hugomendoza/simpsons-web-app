# 🏠 Simpsons Web App

Una aplicación web interactiva y visualmente atractiva dedicada a la serie animada "Los Simpsons". Explora personajes, locaciones icónicas y episodios de la primera temporada.

![Simpsons Web App](./src/assets/logo-the-simpsons.svg)

## ✨ Características

- **Personajes**: Descubre a Homer, Marge, Bart, Lisa, Maggie, Mr. Burns y más
- **Locaciones**: Explora la Casa de los Simpsons, Planta Nuclear, Escuela Primaria y más
- **Episodios**: Revive los episodios de la primera temporada
- **Diseño**: Interfaz moderna con animaciones fluidas y temática de Los Simpsons
- **Responsive**: Diseño mobile-first que se adapta a cualquier dispositivo

## 🛠️ Tecnologías

- **React 19** - Framework de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS 4** - Framework CSS utilitario
- **Framer Motion** - Animaciones para React
- **React Router** - Enrutamiento
- **shadcn/ui** - Componentes UI accesibles

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd simpsons-web-app

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 🚀 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint |

**Puerto por defecto:** `http://localhost:5173`

## 📁 Estructura del Proyecto

```
simpsons-web-app/
├── src/
│   ├── assets/              # Imágenes y recursos estáticos
│   ├── characters/          # Módulo de personajes
│   ├── components/          # Componentes reutilizables
│   │   ├── custom/          # Componentes personalizados
│   │   └── ui/              # Componentes shadcn/ui
│   ├── episodes/            # Módulo de episodios
│   ├── home/                # Página principal
│   ├── locations/           # Módulo de locaciones
│   ├── layout/              # Layout global
│   ├── lib/                 # Utilidades
│   ├── mock/                # Datos de ejemplo
│   ├── router/              # Configuración de rutas
│   ├── SimpsonsWebApp.tsx   # Componente principal
│   ├── main.tsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── public/
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎨 Diseño

- **Colores**: Amarillo, azul y rosa inspirados en la serie
- **Tipografía**: Albert Sans (texto) + Patrick Hand SC (títulos)
- **Animaciones**: Transiciones suaves con Framer Motion
- **Tema**: Modo oscuro/claro soportado

## 📄 Licencia

MIT

---

¡D'oh! Hecho con 🍩 y ❤️
