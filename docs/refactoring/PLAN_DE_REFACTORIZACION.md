# Plan de Refactorización - Simpsons Web App

## Resumen Ejecutivo

Este documento presenta el análisis completo del proyecto Simpsons Web App, identificando vulnerabilidades de seguridad, malas prácticas, violaciones a los principios SOLID, y proponiendo un plan de refactorización integral.

---

## 1. Análisis del Estado Actual

### 1.1 Tecnologías Utilizadas

- **React 19** con TypeScript
- **React Router 7** para enrutamiento
- **TanStack Query (React Query)** para gestión de estado del servidor
- **Framer Motion** para animaciones
- **Tailwind CSS 4** para estilos
- **Vite 7** como build tool
- **Lucide React** para iconos
- **Radix UI** para componentes base

### 1.2 Estructura Actual del Proyecto

```
src/
├── characters/
│   └── pages/
│       ├── character/
│       │   └── CharacterPage.tsx
│       └── home/
│           └── CharacterHomePage.tsx
├── components/
│   ├── custom/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   └── PageTransition.tsx
│   └── ui/
│       ├── button.tsx
│       └── sheet.tsx
├── episodes/
│   └── pages/
│       ├── episode/
│       │   └── EpisodePage.tsx
│       └── home/
│           └── EpisodesHomePage.tsx
├── home/
│   ├── components/
│   │   ├── CardNavigation.tsx
│   │   ├── NavigationSection.tsx
│   │   └── StatsSection.tsx
│   └── pages/
│       └── HomePage.tsx
├── hooks/
│   └── useSimpsonsApi.ts
├── layout/
│   └── GlobalLayout.tsx
├── lib/
│   ├── simpsonsApi.ts
│   └── utils.ts
├── locations/
│   └── pages/
│       ├── location/
│       │   └── LocationPage.tsx
│       └── home/
│           └── LocationsHomePage.tsx
├── router/
│   └── appRouter.tsx
├── constants/
│   └── navigation.ts
├── mock/
│   └── data.mock.ts
├── SimpsonsWebApp.tsx
└── main.tsx
```

---

## 2. Vulnerabilidades de Seguridad

### 2.1 Hallazgos

| # | Vulnerabilidad | Severidad | Ubicación |
|---|---------------|-----------|-----------|
| 1 | Validación de entrada ausente | Alta | `simpsonsApi.ts`, todas las pages |
| 2 | Mensajes de error demasiado descriptivos | Media | Todas las pages |
| 3 | Sin manejo de rate limiting | Media | `simpsonsApi.ts` |
| 4 | URLs de imágenes sin validación | Media | `simpsonsApi.ts:getImageUrl()` |
| 5 | Sin sanitización de datos HTML | Alta | Todas las pages |
| 6 | Dependencias desactualizadas potencial | Baja | `package.json` |

### 2.2 Detalles

#### 2.2.1 Validación de Entrada Ausente

Los datos recibidos de la API se renderizan directamente sin validación:

```typescript
// src/lib/simpsonsApi.ts:60-61
const data: ApiPaginatedResponse<ApiCharacter> = await response.json();
return { data: data.results, ... }; // Sin validación
```

```typescript
// src/characters/pages/home/CharacterHomePage.tsx:208-209
<p className="line-clamp-2 ...">
  {character.phrases[0] || character.occupation || 'Habitante de Springfield'}
</p>
```

#### 2.2.2 Mensajes de Error Excesivamente Descriptivos

Los errores se propagan directamente al usuario:

```typescript
// src/characters/pages/home/CharacterHomePage.tsx:117
<p className="...">{String(error)}</p>
```

Esto puede exponer información sensible del servidor.

#### 2.2.3 URLs de Imágenes Sin Validación

La función `getImageUrl` permite URLs arbitrarias:

```typescript
// src/lib/simpsonsApi.ts:121-128
export const getImageUrl = (path: string): string => {
  if (!path) return '/placeholder.svg';
  if (path.startsWith('http')) return path; // ⚠️ Posible SSRF
  // ...
};
```

---

## 3. Malas Prácticas

### 3.1 Duplicación de Código

#### 3.1.1 Lógica de IntersectionObserver

La misma lógica se repite en 3 archivos:

**CharacterHomePage.tsx:40-55**
```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { threshold: 0.1 },
  );
  const currentTarget = observerTarget.current;
  if (currentTarget) observer.observe(currentTarget);
  return () => {
    if (currentTarget) observer.unobserve(currentTarget);
  };
}, [hasNextPage, isFetchingNextPage, fetchNextPage]);
```

**EpisodesHomePage.tsx:39-49** - Código idéntico
**LocationsHomePage.tsx:34-44** - Código idéntico

#### 3.1.2 Estados de Loading/Error

Cada página implementa sus propios estados de loading y error:

```typescript
// Tres implementaciones casi idénticas:
if (isLoading) {
  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-b from-[#ffde00] to-[#f58ea8] pt-24">
        <div className="container mx-auto px-4">
          <motion.div>...</motion.div>
          <motion.h1>PERSONAJES</motion.h1>
          <div className="flex min-h-[50vh] items-center justify-center">
            <motion.div>
              <Loader2 className="h-5 w-5 animate-spin ..." />
              <span>Cargando personajes...</span>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
```

#### 3.1.3 Función getStatusColor Duplicada

```typescript
// src/characters/pages/home/CharacterHomePage.tsx:59-63
const getStatusColor = (status: string) => {
  if (status === 'Alive') return { bg: 'bg-[#88d498]', emoji: '💚' };
  if (status === 'Deceased') return { bg: 'bg-[#ff6b6b]', emoji: '💀' };
  return { bg: 'bg-[#78c7f0]', emoji: '❓' };
};
```

#### 3.1.4 Constantes de Colores Duplicadas

```typescript
// src/episodes/pages/home/EpisodesHomePage.tsx:12-19
const seasonColors = [
  { bg: 'bg-[#ffde00]', border: 'border-black', shadow: '#1a1a2e' },
  // ...
];

// src/characters/pages/home/CharacterHomePage.tsx también tiene definiciones similares
```

### 3.2 Acoplamiento Directo

Los componentes dependen directamente de implementaciones concretas:

```typescript
// Acoplamiento directo a simpsonsApi
import { getImageUrl } from '@/lib/simpsonsApi';
import { useCharacters } from '@/hooks/useSimpsonsApi';
```

### 3.3 Valores Hardcoded

- URLs de API dispersas en el código
- Mensajes de error hardcoded
- Colores y gradientes repetidos

### 3.4 Mezcla de Responsabilidades

Las páginas manejan:
- Fetching de datos
- Renderizado de UI
- Manejo de estados (loading, error, éxito)
- Navegación
- Animaciones

---

## 4. Principios SOLID Violados

### 4.1 Principio de Responsabilidad Única (SRP)

**Problema**: Las páginas tienen múltiples responsabilidades.

```typescript
// src/characters/pages/home/CharacterHomePage.tsx
// Esta página maneja:
// 1. Fetching de datos (useCharacters)
// 2. Estado de loading
// 3. Estado de error
// 4. Renderizado de UI
// 5. Animaciones
// 6. Paginación infinita
// 7. Navegación
```

**Solución**: Separar en componentes:
- `useCharacters` → solo datos
- `CharacterCard` → solo UI
- `LoadingState` → solo loading
- `ErrorState` → solo errores

### 4.2 Principio de Abierto/Cerrado (OCP)

**Problema**: Cada página reimplementa la lógica de paginación.

```typescript
// Mismo patrón repetido en 3 lugares:
useEffect(() => {
  const observer = new IntersectionObserver(...);
  // ...
}, [hasNextPage, isFetchingNextPage, fetchNextPage]);
```

**Solución**: Crear un componente `InfiniteScrollTrigger` reutilizable.

### 4.3 Principio de Inversión de Dependencias (DIP)

**Problema**: Dependencia directa de implementaciones concretas.

```typescript
// Acoplamiento directo
import { simpsonsApi } from '@/lib/simpsonsApi';
import { useCharacters } from '@/hooks/useSimpsonsApi';
```

**Solución**: Usar abstracciones/interfaces:

```typescript
// Definir interfaces
interface ICharacterRepository {
  getAll(): Promise<PaginatedResult<Character>>;
  getById(id: number): Promise<Character>;
}

// Inyectar dependencias
function CharacterPage({ repository }: { repository: ICharacterRepository }) {
  // ...
}
```

---

## 5. Plan de Refactorización

### Fase 1: Componentes Comunes (Prioridad: ALTA)

#### 1.1 Objetivo
Extraer componentes duplicados para reutilización.

#### 1.2 Componentes a Crear

```
src/components/common/
├── LoadingSpinner.tsx      # Spinner de carga genérico
├── ErrorDisplay.tsx        # Display de errores genérico
├── InfiniteScrollTrigger.tsx # Trigger de paginación infinita
├── EntityCard/
│   ├── CharacterCard.tsx
│   ├── EpisodeCard.tsx
│   └── LocationCard.tsx
└── DetailHeader.tsx        # Header con botón back
```

#### 1.3 Beneficios
- Reducción de ~200 líneas duplicadas
- Consistencia visual
- Mantenimiento más fácil

---

### Fase 2: Abstracciones de API (Prioridad: ALTA)

#### 2.1 Objetivo
Crear una capa de acceso a datos bien definida.

#### 2.2 Estructura Propuesta

```
src/
├── types/
│   ├── Character.ts
│   ├── Episode.ts
│   └── Location.ts
├── services/
│   ├── api/
│   │   ├── SimpsonsApiClient.ts   # Cliente HTTP
│   │   ├── SimpsonsRepository.ts   # Repositorio
│   │   └── SimpsonsApiError.ts     # Manejo de errores
│   └── config/
│       └── apiConfig.ts            # Configuración centralizada
```

#### 2.3 Tipos a Definir

```typescript
// src/types/Character.ts
export interface Character {
  id: number;
  name: string;
  age: string | null;
  gender: string | null;
  occupation: string | null;
  portraitPath: string;
  phrases: string[];
  status: 'Alive' | 'Deceased' | 'Unknown';
}

// Mapper de API a dominio
export const mapApiCharacter = (api: ApiCharacter): Character => ({
  id: api.id,
  name: sanitizeString(api.name),
  // ...
});
```

---

### Fase 3: Hooks Genéricos (Prioridad: MEDIA)

#### 3.1 Objetivo
Crear hooks reutilizables para operaciones comunes.

#### 3.2 Hooks a Crear

```typescript
// src/hooks/useInfiniteEntityQuery.ts
export function useInfiniteEntityQuery<T>(
  entityKey: string,
  fetchFn: (page: number) => Promise<PaginatedResponse<T>>
) {
  // Lógica genérica de paginación infinita
}

// src/hooks/useEntityById.ts
export function useEntityById<T>(
  entityKey: string,
  id: number,
  fetchFn: (id: number) => Promise<T>
) {
  // Lógica genérica para obtener entidad por ID
}
```

---

### Fase 4: Refactorización de Pages (Prioridad: MEDIA)

#### 4.1 Objetivo
Simplificar las páginas usando componentes extraídos.

#### 4.2 Antes vs Después

**Antes (CharacterHomePage.tsx - 258 líneas)**

```typescript
export default function CharacterHomePage() {
  const { data, fetchNextPage, ... } = useCharacters();
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lógica de IntersectionObserver duplicada
    const observer = new IntersectionObserver(...);
  }, [...]);

  // Estados de loading/error inline

  return (
    // UI mezclada con lógica
  );
}
```

**Después (≈100 líneas)**

```typescript
export default function CharacterHomePage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useCharacters();

  if (isLoading) return <LoadingSpinner message="Cargando personajes..." />;
  if (isError) return <ErrorDisplay message={error?.message} />;

  return (
    <PageTransition>
      <main className="...">
        <EntityGrid>
          {data.pages.flatMap(p => p.data).map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </EntityGrid>
        <InfiniteScrollTrigger
          hasMore={hasNextPage}
          isLoading={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      </main>
    </PageTransition>
  );
}
```

---

### Fase 5: Mejoras de Seguridad (Prioridad: ALTA)

#### 5.1 Validación de URLs

```typescript
// src/services/api/safeUrl.ts
const ALLOWED_DOMAINS = ['thesimpsonsapi.com', 'cdn.thesimpsonsapi.com'];

export const isValidImageUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ALLOWED_DOMAINS.some(domain => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
};
```

#### 5.2 Sanitización de Datos

```typescript
// src/lib/sanitize.ts
import DOMPurify from 'dompurify';

export const sanitizeString = (input: string): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

export const sanitizeHtml = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
  });
};
```

#### 5.3 Manejo de Errores Centralizado

```typescript
// src/services/errors/ApiError.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public isRetryable: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(response: Response): ApiError {
    // Mapear códigos de error HTTP
    return new ApiError(
      'Ha ocurrido un error al procesar tu solicitud',
      'UNKNOWN_ERROR',
      response.status,
      response.status >= 500
    );
  }
}
```

---

### Fase 6: Organización y Constantes (Prioridad: BAJA)

#### 6.1 Constants Centralizadas

```
src/
├── constants/
│   ├── colors.ts        # Colores del tema
│   ├── messages.ts      # Mensajes de UI
│   ├── config.ts       # Configuración de la app
│   └── routes.ts       # Rutas de la aplicación
```

---

## 6. Estructura Propuesta Final

```
src/
├── components/
│   ├── common/
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorDisplay.tsx
│   │   ├── InfiniteScrollTrigger.tsx
│   │   ├── EntityCard/
│   │   │   ├── CharacterCard.tsx
│   │   │   ├── EpisodeCard.tsx
│   │   │   └── LocationCard.tsx
│   │   └── DetailHeader.tsx
│   └── ui/
│       ├── button.tsx
│       └── sheet.tsx
├── hooks/
│   ├── useInfiniteEntityQuery.ts
│   ├── useEntityById.ts
│   └── useSimpsonsApi.ts (refactorizado)
├── services/
│   ├── api/
│   │   ├── SimpsonsApiClient.ts
│   │   ├── SimpsonsRepository.ts
│   │   └── SimpsonsApiError.ts
│   ├── errors/
│   │   └── ApiError.ts
│   └── validation/
│       ├── safeUrl.ts
│       └── sanitize.ts
├── types/
│   ├── Character.ts
│   ├── Episode.ts
│   ├── Location.ts
│   └── index.ts
├── constants/
│   ├── colors.ts
│   ├── messages.ts
│   └── config.ts
├── characters/
│   └── pages/
│       ├── character/
│       │   └── CharacterPage.tsx
│       └── home/
│           └── CharacterHomePage.tsx
├── episodes/
│   └── pages/
│       ├── episode/
│       │   └── EpisodePage.tsx
│       └── home/
│           └── EpisodesHomePage.tsx
├── locations/
│   └── pages/
│       ├── location/
│       │   └── LocationPage.tsx
│       └── home/
│           └── LocationsHomePage.tsx
├── home/
│   └── pages/
│       └── HomePage.tsx
├── layout/
│   └── GlobalLayout.tsx
├── router/
│   └── appRouter.tsx
├── SimpsonsWebApp.tsx
└── main.tsx
```

---

## 7. Métricas de Éxito

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Líneas de código duplicadas | ~300 | < 50 |
| Components reutilizables | 2 | 15+ |
| Tipos centralizados | 3 | 12+ |
| Páginas con lógica mezclada | 7 | 0 |
| Validaciones de seguridad | 0 | 5+ |

---

## 8. Orden de Implementación Recomendado

1. **Semana 1**: Componentes comunes básicos (LoadingSpinner, ErrorDisplay)
2. **Semana 2**: InfiniteScrollTrigger y tipos centralizados
3. **Semana 3**: EntityCards y abstracciones de API
4. **Semana 4**: Refactorización de CharacterHomePage
5. **Semana 5**: Refactorización de EpisodesHomePage y LocationsHomePage
6. **Semana 6**: Refactorización de páginas de detalle
7. **Semana 7**: Mejoras de seguridad
8. **Semana 8**: Limpieza final y pruebas

---

## 9. Notas Adicionales

### 9.1 Pruebas
- Agregar tests unitarios para componentes common
- Agregar tests de integración para hooks
- Validar que la funcionalidad existente no se rompa

### 9.2 Performance
- Los cambios propuestos NO afectan el rendimiento runtime
- La paginación infinita ya está implementada
- Solo se está reorganizando el código para mejor mantenimiento

### 9.3 Breaking Changes
- Los cambios son internos (refactorización)
- La API pública bleibt gleich
- Los usuarios no notarán cambios visuales
