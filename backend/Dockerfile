# =====================================================
# Dockerfile - Backend (NestJS)
# =====================================================
# Este archivo define cómo se construye la imagen Docker del backend

# ===================================================== # Etapa 1: Builder
# =====================================================
# Imagen base de Node.js 20 (Alpine es una versión ligera)
FROM node:20-alpine AS builder

# Etiquetas de metadata
LABEL maintainer="Jymmy Murillo <murillojymmy@gmail.com>"
LABEL description="Backend API para SocialDev"

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
# Copiamos primero solo package*.json para aprovechar el cache de Docker
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
# --frozen-lockfile asegura que se usen las versiones exactas
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar el resto del código fuente
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Construir la aplicación
RUN npm run build

# =====================================================
# Etapa 2: Production
# =====================================================
FROM node:20-alpine AS production

# Instalar OpenSSL (requerido por Prisma)
RUN apk add --no-cache openssl

WORKDIR /app

# Copiar archivos necesarios desde la etapa builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Crear usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

# Cambiar a usuario no-root
USER nestjs

# Exponer puerto 3000
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]
