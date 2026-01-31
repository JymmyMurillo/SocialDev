# =====================================================
# SocialDev Backend
# =====================================================
# Este documento lista TODOS los archivos que deben existir en el backend

## 📁 Estructura Completa del Backend

```
backend/
├── 📄 package.json                           
├── 📄 tsconfig.json                          
├── 📄 nest-cli.json                          
├── 📄 Dockerfile                             
├── 📄 .dockerignore                          
├── 📄 .env                                   ⚠️  Debes crear manualmente
│
├── prisma/
│   ├── 📄 schema.prisma                      
│   └── 📄 seed.ts                            
│
└── src/
    ├── 📄 main.ts                            
    ├── 📄 app.module.ts                      
    ├── 📄 app.controller.ts                  
    ├── 📄 app.service.ts                     
    │
    ├── prisma/
    │   ├── 📄 prisma.service.ts              
    │   └── 📄 prisma.module.ts               
    │
    ├── auth/
    │   ├── dto/
    │   │   └── 📄 login.dto.ts               
    │   ├── entities/
    │   │   └── 📄 auth-response.entity.ts    
    │   ├── guards/
    │   │   └── 📄 jwt-auth.guard.ts          
    │   ├── strategies/
    │   │   └── 📄 jwt.strategy.ts            
    │   ├── 📄 auth.controller.ts             
    │   ├── 📄 auth.service.ts                
    │   └── 📄 auth.module.ts                 
    │
    ├── posts/
    │   ├── dto/
    │   │   └── 📄 create-post.dto.ts         
    │   ├── entities/
    │   │   └── 📄 post.entity.ts             
    │   ├── 📄 posts.controller.ts            
    │   ├── 📄 posts.service.ts               
    │   └── 📄 posts.module.ts                
    │
    ├── users/
    │   ├── entities/
    │   │   └── 📄 user.entity.ts             
    │   ├── 📄 users.controller.ts            
    │   ├── 📄 users.service.ts               
    │   └── 📄 users.module.ts                
    │
    └── common/
        └── decorators/
            └── 📄 get-user.decorator.ts      
```

## ⚠️ Archivo Faltante que DEBES crear:

### backend/.env

Crea este archivo manualmente en la carpeta `backend/` con el siguiente contenido:

```env
# Base de Datos
DATABASE_URL="postgresql://socialdev:socialdev123@localhost:5432/socialdev_db?schema=public"

# JWT
JWT_SECRET="mi-super-secreto-cambiar-en-produccion-123456"
JWT_EXPIRES_IN="24h"

# Puerto
PORT=3000

# Entorno
NODE_ENV=development
```

## 📝 Pasos Siguientes

### 1. Verificar que tienes todos los archivos

Abre VS Code en la carpeta `backend/` y verifica que la estructura de carpetas coincida con la de arriba.

### 2. Crear el archivo .env

```bash
# Desde la carpeta backend/
cd backend

# Crear archivo .env (Windows PowerShell)
New-Item -Path .env -ItemType File

# O crear manualmente:
# Clic derecho en backend/ → New File → .env
```

Copia el contenido del .env de arriba.

### 3. Instalar dependencias

```bash
# Asegúrate de estar en backend/
npm install
```

Esto instalará todos los paquetes necesarios (puede tardar 2-5 minutos).

### 4. Generar Prisma Client

```bash
npx prisma generate
```

Esto genera el cliente de Prisma basado en `schema.prisma`.

### 5. Verificar que no hay errores de TypeScript

```bash
npm run build
```

Si todo está bien, deberías ver:
```
Successfully compiled X files with swc
```

Si hay errores, revisa que todos los archivos estén en su lugar.

### 6. (Opcional) Ejecutar sin Docker

Si quieres probar el backend sin Docker:

```bash
# Levantar PostgreSQL con Docker (solo la BD)
docker run -d \
  --name socialdev-postgres \
  -e POSTGRES_USER=socialdev \
  -e POSTGRES_PASSWORD=socialdev123 \
  -e POSTGRES_DB=socialdev_db \
  -p 5432:5432 \
  postgres:15-alpine

# Ejecutar migraciones
npx prisma migrate dev --name init

# Ejecutar seeder
npx prisma db seed

# Iniciar backend en modo desarrollo
npm run start:dev
```

Deberías ver:
```
[Nest] INFO [NestFactory] Starting Nest application...
[Nest] INFO [InstanceLoader] PrismaModule dependencies initialized
...
✅ Conexión a PostgreSQL establecida correctamente
🚀 SocialDev Backend API está corriendo!
📡 Servidor: http://localhost:3000
📚 Documentación Swagger: http://localhost:3000/api
```

### 7. Probar un endpoint

Abre tu navegador o Postman:

```
GET http://localhost:3000/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "SocialDev API",
  "version": "1.0.0"
}
```

## 🐛 Solución de Problemas

### Error: "Cannot find module '@nestjs/common'"

**Solución:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Error: "DATABASE_URL environment variable not found"

**Solución:** Asegúrate de que existe el archivo `.env` en `backend/` con `DATABASE_URL`.

### Error: "Port 3000 is already in use"

**Solución:** Otro servicio está usando el puerto 3000. Cambia el puerto en `.env`:
```env
PORT=3001
```