---
trigger: always_on
---

## Convenciones

- Usa Bun en lugar de npm y pnpm para la instalación de dependencias y para inicializar el ambiente de desarrollo y el build de producción.
- TypeScript es obligatorio
- Usa siempre Tailwind CSS para estilos
- Iconos de Lucide Icons para react. Importación explícita, nunca barrels
- Preferir ESM y sintaxis moderna del navegador

## Organización

- Componentes pequeños, con una sola responsabilidad
- Preferir composición frente a configuraciones complejas
- Evita abstracciones prematuras
- El código compartido debe vivir en carpetas claras como `components`, `layouts`, `lib` o `utils`

## Reglas de TypeScript

- Evita `any` y `unknown`
- Preferir siempre que se pueda inferencia
- Si los tipos no están claros, parar y aclarar antes de continuar

## UI y estilos

- Tailwind es la única solución de estilos
- Para componenetes de UI utiliza la biblioteca Shadcn
- No duplicar clases si se puede extraer un componente
- Priorizar legibilidad frente a micro-optimizaciones visuales
- Accesibilidad no es opcional: HTML semántico, roles ARIA cuando aplique y foco gestionado

## Testing y calidad

- No se acepta código con errores de tipos, lint o tests fallidos.
- Añadir o actualizar tests cuando se cambie comportamiento, aunque no se pida explícitamente.

## Rendimiento y decisiones técnicas

- No adivinar rendimiento, tamaño de bundle o tiempos de carga: medir.
- Si algo parece lento, añadir instrumentación antes de optimizar.
- Validar primero en pequeño antes de escalar cambios a todo el proyecto.

## Commits y Pull Requests

- Título del PR: [<project_name>] Descripción clara y concisa.
- PRs pequeños y enfocados.s
- Explicar qué ha cambiado, por qué y cómo se ha verificado.
- Si se introduce una nueva restricción ("nunca X", "siempre Y"), documentarla en este archivo.

## Comportamiento del agente

- Si una petición no está clara, hacer preguntas concretas antes de ejecutar.
- Tareas simples y bien definidas se ejecutan directamente.
- Cambios complejos (refactors, nuevas features, decisiones de arquitectura) requieren confirmar entendimiento antes de actuar.
- No asumir requisitos implícitos. Si falta información, se pide.
