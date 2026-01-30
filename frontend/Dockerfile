# =====================================================
# Dockerfile - Frontend (React + Vite)
# =====================================================

# Etapa 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Build de producción
RUN npm run build

# =====================================================
# Etapa 2: Production
# =====================================================
FROM nginx:alpine AS production

# Copiar build al servidor nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]