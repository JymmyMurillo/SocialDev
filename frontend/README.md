# 🎨 SocialDev FRONTEND - React + TypeScript + Vite



---

## 📁 Estructura Completa del Frontend

```
frontend/
├── 📄 package.json              # Dependencias
├── 📄 tsconfig.json             # Config TypeScript
├── 📄 tsconfig.node.json        # Config TypeScript para Vite
├── 📄 vite.config.ts            # Config Vite
├── 📄 tailwind.config.js        # Config Tailwind
├── 📄 postcss.config.js         # Config PostCSS
├── 📄 index.html                # HTML principal
├── 📄 .env                      # Variables de entorno
├── 📄 .gitignore                # Git ignore
├── 📄 Dockerfile                # Docker del frontend
├── 📄 nginx.conf                # Config nginx
├── 📄 .dockerignore             # Docker ignore
│
└── src/
    ├── 📄 main.tsx              # Punto de entrada
    ├── 📄 App.tsx               # Componente raíz con rutas
    ├── 📄 index.css             # Estilos globales
    │
    ├── types/
    │   └── 📄 index.ts          # Tipos TypeScript
    │
    ├── services/
    │   └── 📄 api.ts            # Cliente HTTP (Axios)
    │
    ├── store/
    │   ├── 📄 authStore.ts      # Estado de autenticación
    │   └── 📄 postsStore.ts     # Estado de publicaciones
    │
    ├── components/
    │   ├── 📄 Navbar.tsx        # Barra de navegación
    │   ├── 📄 PostCard.tsx      # Tarjeta de publicación
    │   ├── 📄 CreatePostForm.tsx # Formulario crear post
    │   └── 📄 Loading.tsx       # Spinner de carga
    │
    └── pages/
        ├── 📄 LoginPage.tsx     # Página de login
        └── 📄 HomePage.tsx      # Página principal (feed)
```



---

## 🚀 PASOS PARA INSTALAR Y EJECUTAR

### Opción 1: Desarrollo Local (SIN Docker)

#### 1. Navegar a la carpeta frontend

```bash
cd frontend
```

#### 2. Instalar dependencias

```bash
npm install
```

Esto tardará 2-5 minutos. Instalará:
- React y React DOM
- React Router
- Zustand
- Axios
- Tailwind CSS
- Vite
- TypeScript
- Y todas las dependencias

#### 3. Verificar que el backend esté corriendo

El frontend necesita el backend en `http://localhost:3000`

```bash
# En otra terminal, en la carpeta backend/
npm run start:dev
```

Puedes ir al directorio backend y seguir las instrucciones de su documentacion.

#### 4. Iniciar el frontend

```bash
npm run dev
```

Verás algo como:
```
  VITE v5.0.11  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### 5. Abrir en el navegador

```
http://localhost:5173
```

Deberías ver la página de login de SocialDev.

---

### Opción 2: Con Docker Compose (Proyecto Completo)

Desde la raíz del proyecto (carpeta `socialdev/`):

```bash
docker-compose up -d
```

Esto levanta:
- PostgreSQL en puerto 5432
- Backend en puerto 3000
- Frontend en puerto 5173

---

## 🔑 CREDENCIALES DE PRUEBA

```
Email: user1@socialdev.com
Password: password123

(Funciona para user1 hasta user10)
```

---

## 🧪 PROBAR LA APLICACIÓN

### 1. Login

1. Abre `http://localhost:5173`
2. Verás la página de login con gradiente azul-morado
3. Ingresa las credenciales:
   - Email: `user1@socialdev.com`
   - Password: `password123`
4. Haz clic en "Iniciar Sesión"

### 2. Ver Publicaciones

1. Después del login, verás el feed de publicaciones
2. Deberías ver 10 publicaciones (una por cada usuario del seeder configurado en el backend)
3. Cada publicación muestra:
   - Nombre del autor
   - Email del autor
   - Contenido
   - Fecha relativa ("Hace X minutos")

### 3. Crear Publicación

1. En la parte superior verás "¿Qué estás pensando?"
2. Escribe algo en el textarea
3. Haz clic en "Publicar"
4. Tu publicación aparecerá al inicio de la lista

### 4. Eliminar Publicación

1. Solo puedes eliminar TUS publicaciones
2. Verás un botón "Eliminar" en tus posts
3. Haz clic y confirma
4. La publicación desaparecerá

### 5. Logout

1. En la esquina superior derecha, haz clic en "Cerrar Sesión"
2. Serás redirigido al login
3. Tu sesión se habrá cerrado

---

## 📚 COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev               # Iniciar servidor de desarrollo

# Build
npm run build             # Compilar para producción
npm run preview           # Vista previa del build

# Linting
npm run lint              # Verificar código
```

---

## 🎨 COMPONENTES PRINCIPALES

### 1. LoginPage
- Formulario de inicio de sesión
- Validación de campos
- Manejo de errores
- Usuarios de prueba visibles

### 2. HomePage
- Feed de publicaciones
- Formulario para crear posts
- Lista de posts con scroll
- Estados de carga y error

### 3. Navbar
- Logo de SocialDev
- Información del usuario
- Botón de logout

### 4. PostCard
- Muestra una publicación
- Botón eliminar (solo dueño)
- Fecha relativa
- Responsive

### 5. CreatePostForm
- Textarea para contenido
- Contador de caracteres (max 500)
- Validación
- Optimistic update

### 6. Loading
- Spinner animado
- Mensaje personalizable

---

## 🔄 FLUJO DE DATOS

```
┌──────────────────────────────────────────────┐
│              COMPONENTES                     │
├──────────────────────────────────────────────┤
│  LoginPage → HomePage → PostCard             │
│                      ↓                       │
│                  CreatePostForm              │
└────────────────┬─────────────────────────────┘
                 │
                 ↓
┌──────────────────────────────────────────────┐
│         ZUSTAND STORES (Estado)              │
├──────────────────────────────────────────────┤
│  authStore         │  postsStore             │
│  - user            │  - posts[]              │
│  - token           │  - loading              │
│  - isAuthenticated │  - error                │
│  - login()         │  - fetchPosts()         │
│  - logout()        │  - createPost()         │
│                    │  - deletePost()         │
└────────────────┬───────────────┬─────────────┘
                 │               │
                 ↓               ↓
┌─────────────────────────────────────────────┐
│         SERVICIO API (Axios)                 │
├─────────────────────────────────────────────┤
│  login()        getPosts()     createPost()  │
│  getProfile()   deletePost()   getUsers()    │
└────────────────┬────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│          BACKEND (NestJS)                    │
│       http://localhost:3000/api              │
└─────────────────────────────────────────────┘
```

---

## 🎨 COLORES DEL TEMA

```css
Azul (Primary):    #4A90E2
Morado (Secondary): #9058D8
Verde (Accent):     #63D4B8
Rojo (Danger):      #E64980
Gris Oscuro (Dark): #2D3748
```

Uso en Tailwind:
```jsx
<button className="bg-primary hover:bg-primary-hover">
  Botón
</button>
```

---

## 🔧 TECNOLOGÍAS USADAS

### React 18
- Librería de UI
- Componentes funcionales
- Hooks (useState, useEffect)

### TypeScript
- Tipado estático
- Mejor autocompletado
- Menos errores

### Vite
- Build tool ultrarrápido
- Hot Module Replacement (HMR)
- Optimizado para producción

### Zustand
- Gestión de estado simple
- Sin boilerplate
- TypeScript friendly

### React Router
- Navegación entre páginas
- Rutas protegidas
- History API

### Axios
- Cliente HTTP
- Interceptors
- Manejo de errores

### Tailwind CSS
- Utility-first CSS
- Responsive design
- Componentes reutilizables

---

## 📱 RESPONSIVE DESIGN

La aplicación es responsive y funciona en:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px)
- ✅ Mobile (375px)

Tailwind maneja esto automáticamente con clases como:
- `sm:`, `md:`, `lg:`, `xl:`

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### "Cannot find module 'react'"
**Solución:** Ejecuta `npm install` en la carpeta frontend/

### "Network Error" al hacer login
**Solución:** Verifica que el backend esté corriendo en `http://localhost:3000`

### Puerto 5173 ocupado
**Solución:** 
```bash
# Cambiar puerto en vite.config.ts
server: {
  port: 5174, // Cambiar aquí
}
```

### No se actualizan los cambios
**Solución:**
```bash
# Detener el servidor (Ctrl+C)
# Borrar cache
rm -rf node_modules/.vite
# Reiniciar
npm run dev
```

### Errores de TypeScript
**Solución:**
```bash
# Verificar tipos
npm run build
```

---
