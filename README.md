# 🚀 SocialDev - Red Social Full Stack


## 📋 Descripción del Proyecto

SocialDev es una red social desarrollada como prueba técnica Full Stack, donde los usuarios pueden autenticarse y crear/visualizar publicaciones de texto.

### 🎯 Características Principales

- ✅ Sistema de autenticación con JWT
- ✅ Creación y visualización de publicaciones
- ✅ Arquitectura modular escalable (preparada para microservicios)
- ✅ Dockerización completa del proyecto
- ✅ API REST documentada con Swagger
- ✅ Interfaz moderna y responsiva

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **NestJS** - Framework Node.js progresivo
- **TypeScript** - Tipado estático
- **Prisma ORM** - ORM moderno para PostgreSQL
- **JWT** - Autenticación segura
- **PostgreSQL** - Base de datos relacional
- **Swagger** - Documentación automática de API

### Frontend
- **React 18** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultrarrápido
- **Zustand** - Gestión de estado simple
- **Tailwind CSS** - Framework de estilos utility-first
- **Axios** - Cliente HTTP

### DevOps
- **Docker** - Contenedores
- **Docker Compose** - Orquestación de servicios

---

## 📁 Estructura del Proyecto

```
socialdev/
├── backend/                    # API NestJS
│   ├── src/
│   │   ├── auth/              # Módulo de autenticación
│   │   ├── posts/             # Módulo de publicaciones
│   │   ├── users/             # Módulo de usuarios
│   │   ├── prisma/            # Configuración Prisma
│   │   └── common/            # Utilidades compartidas
│   ├── prisma/
│   │   ├── schema.prisma      # Esquema de base de datos
│   │   └── seed.ts            # Datos iniciales
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                   # Aplicación React
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/             # Páginas principales
│   │   ├── store/             # Estado global (Zustand)
│   │   ├── services/          # Servicios API
│   │   ├── types/             # Tipos TypeScript
│   │   ├── assets/            # Imágenes y recursos
│   │   └── utils/             # Funciones auxiliares
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml          # Orquestación de servicios
├── .env.example               # Variables de entorno ejemplo
├── README.md                  # Este archivo
└── docs/                      # Documentación
    ├── INSTALACION.md         # Guía de instalación
    ├── API.md                 # Documentación de endpoints
    └── ARQUITECTURA.md        # Explicación de la arquitectura
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

Asegúrate de tener instalado:
- **Node.js** v18 o superior
- **Docker Desktop** para Windows
- **Git**

### Instalación Paso a Paso

#### 1. Clonar el repositorio

```bash
git clone https://github.com/JymmyMurillo/SocialDev
cd socialdev
```

#### 2. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# El archivo ya tiene valores por defecto que funcionan
# No necesitas modificar nada para desarrollo local
```

#### 3. Levantar los servicios con Docker

```bash
# Esto levantará: PostgreSQL, Backend y Frontend
docker-compose up -d

# Ver los logs en tiempo real
docker-compose logs -f
```

#### 4. Esperar a que los servicios estén listos

```bash
# Verificar que los contenedores estén corriendo
docker ps

# Deberías ver 3 contenedores:
# - socialdev-db (PostgreSQL)
# - socialdev-backend (NestJS)
# - socialdev-frontend (React)
```

#### 5. Abrir la aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api

### Usuarios de Prueba

El seeder crea automáticamente 10 usuarios:

| Email | Contraseña | Nombre |
|-------|------------|--------|
| user1@socialdev.com | password123 | Usuario Uno |
| user2@socialdev.com | password123 | Usuario Dos |
| user3@socialdev.com | password123 | Usuario Tres |
| ... | ... | ... |
| user10@socialdev.com | password123 | Usuario Diez |

Cada usuario tiene una publicación inicial creada.

---

## 🔧 Desarrollo Local (Sin Docker)

Si prefieres ejecutar el proyecto sin Docker:

### Backend

```bash
cd backend

# Instalar dependencias
npm install

# Levantar PostgreSQL con Docker (solo la BD)
docker run -d \
  --name socialdev-postgres \
  -e POSTGRES_USER=socialdev \
  -e POSTGRES_PASSWORD=socialdev123 \
  -e POSTGRES_DB=socialdev_db \
  -p 5432:5432 \
  postgres:15-alpine

# Generar Prisma Client
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Ejecutar seeder
npx prisma db seed

# Iniciar en modo desarrollo
npm run start:dev
```

Backend disponible en: http://localhost:3000

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

Frontend disponible en: http://localhost:5173

---

## 🧪 Probar la API con Postman

### Flujo de Prueba

#### 1. Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "user1@socialdev.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user1@socialdev.com",
    "name": "Usuario Uno"
  }
}
```

Copia el `access_token` para las siguientes peticiones.

#### 2. Listar Publicaciones
```http
GET http://localhost:3000/api/posts
Authorization: Bearer {access_token}
```

#### 3. Crear Publicación
```http
POST http://localhost:3000/api/posts
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "content": "Mi primera publicación en SocialDev!"
}
```

---

## 📚 Comandos Útiles

### Docker

```bash
# Levantar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f [servicio]

# Reconstruir servicios
docker-compose up -d --build

# Eliminar volúmenes (resetear BD)
docker-compose down -v
```

### Backend

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Generar migración
npx prisma migrate dev --name descripcion

# Ver BD con Prisma Studio
npx prisma studio

# Ejecutar seeder
npx prisma db seed

# Linting
npm run lint

# Tests
npm run test
```

### Frontend

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

---

## 🏗️ Arquitectura del Proyecto

### Backend - Arquitectura Modular

El backend está organizado en módulos independientes que pueden convertirse fácilmente en microservicios:

```
┌─────────────────────────────────────────────┐
│            API Gateway (NestJS)             │
├──────────────┬──────────────┬───────────────┤
│  Auth Module │ Users Module │ Posts Module  │
├──────────────┴──────────────┴───────────────┤
│           Prisma ORM Client                 │
├─────────────────────────────────────────────┤
│         PostgreSQL Database                 │
└─────────────────────────────────────────────┘
```

**Ventajas de esta arquitectura:**
- ✅ Separación de responsabilidades
- ✅ Código mantenible y testeable
- ✅ Fácil evolución a microservicios
- ✅ Reutilización de componentes

### Frontend - Arquitectura por Capas

```
┌──────────────────────────────────────────────┐
│         Components (UI Layer)                │
├──────────────────────────────────────────────┤
│         Pages (View Layer)                   │
├──────────────────────────────────────────────┤
│     Store (State Management - Zustand)       │
├──────────────────────────────────────────────┤
│      Services (API Communication)            │
└──────────────────────────────────────────────┘
```

---

## 🔐 Seguridad

- **JWT**: Tokens con expiración de 24 horas
- **Bcrypt**: Hashing de contraseñas con salt de 10 rounds
- **CORS**: Configurado para desarrollo y producción
- **Validación**: DTOs con class-validator
- **Guards**: Protección de rutas autenticadas

---

## 🎨 Paleta de Colores

```css
--color-primary: #4A90E2;    /* Azul */
--color-secondary: #9058D8;  /* Morado */
--color-accent: #63D4B8;     /* Verde */
--color-danger: #E64980;     /* Rojo */
--color-dark: #2D3748;       /* Dark Grey */
```

---

## 🐛 Solución de Problemas

### Error: "Docker daemon not running"
**Solución:** Asegúrate de que Docker Desktop está abierto y corriendo.

### Error: "Port 5432 already in use"
**Solución:** Ya tienes PostgreSQL corriendo localmente. Detén el servicio o cambia el puerto en `docker-compose.yml`.

### Error: "Cannot connect to database"
**Solución:** 
1. Verifica que el contenedor de PostgreSQL esté corriendo: `docker ps`
2. Revisa los logs: `docker-compose logs db`
3. Espera 10-15 segundos después de levantar los servicios

### Error en migraciones de Prisma
**Solución:**
```bash
# Resetear la base de datos
npx prisma migrate reset

# Regenerar cliente
npx prisma generate
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto fue creado como prueba técnica y está disponible bajo la licencia MIT.

---

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@JymmyMurillo](https://github.com/JymmyMurillo)
- LinkedIn: [Jymmy Murillo](https://www.linkedin.com/in/jymmy)
- Email: murillojymmy@gmail.com

---

## 🙏 Agradecimientos

- NestJS Team por el increíble framework
- Prisma Team por el ORM más developer-friendly
- React Team por React 18
- Tailwind Labs por Tailwind CSS

---

**¿Preguntas o problemas?** Abre un [issue](https://github.com/tu-usuario/socialdev/issues) en GitHub.