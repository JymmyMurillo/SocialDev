// =====================================================
// Main.ts - Punto de Entrada de la Aplicación
// =====================================================
// Este es el archivo principal que inicia la aplicación NestJS

import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

/**
 * Función principal que bootstrapea (inicia) la aplicación
 */
async function bootstrap() {
  // =================================================
  // 1. CREAR APLICACIÓN NESTJS
  // =================================================
  const app = await NestFactory.create(AppModule, {
    // Habilitar logs detallados en desarrollo
    logger: ["log", "error", "warn", "debug", "verbose"],
  });

  // =================================================
  // 2. CONFIGURAR PREFIJO GLOBAL PARA RUTAS
  // =================================================
  // Todas las rutas tendrán el prefijo /api
  // Ejemplo: /api/auth/login, /api/posts, etc.
  app.setGlobalPrefix("api");

  // =================================================
  // 3. CONFIGURAR CORS
  // =================================================
  // CORS (Cross-Origin Resource Sharing) permite que el frontend
  // en otro dominio/puerto pueda hacer peticiones al backend
  app.enableCors({
    origin: [
      "http://localhost:5173", // Vite dev server
      "http://localhost:3000", // Backend (para Swagger)
      "http://localhost:4173", // Vite preview
    ],
    credentials: true, // Permite enviar cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // =================================================
  // 4. CONFIGURAR VALIDACIÓN GLOBAL
  // =================================================
  // ValidationPipe valida automáticamente todos los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      // Remueve propiedades que no están en el DTO
      whitelist: true,
      // Lanza error si hay propiedades no permitidas
      forbidNonWhitelisted: true,
      // Transforma tipos automáticamente (string a number, etc.)
      transform: true,
      // Opciones de transformación
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // =================================================
  // 5. CONFIGURAR SWAGGER (DOCUMENTACIÓN API)
  // =================================================
  const config = new DocumentBuilder()
    .setTitle("SocialDev API")
    .setDescription("API REST para la red social SocialDev")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Ingresa tu token JWT",
        in: "header",
      },
      "JWT-auth", // Este nombre se usa en los decoradores @ApiBearerAuth()
    )
    .addTag("Auth", "Endpoints de autenticación")
    .addTag("Posts", "Endpoints de publicaciones")
    .addTag("Users", "Endpoints de usuarios")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    // Personalización de Swagger UI
    customSiteTitle: "SocialDev API Docs",
    customCss: ".swagger-ui .topbar { display: none }",
    swaggerOptions: {
      persistAuthorization: true, // Mantiene el token en localStorage
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
  });

  // =================================================
  // 6. INICIAR EL SERVIDOR
  // =================================================
  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0"); // 0.0.0.0 permite acceso desde fuera del contenedor

  // =================================================
  // 7. MENSAJES DE INICIO
  // =================================================
  console.log("\n🚀 SocialDev Backend API está corriendo!");
  console.log(`📡 Servidor: http://localhost:${port}`);
  console.log(`📚 Documentación Swagger: http://localhost:${port}/api`);
  console.log(`🔐 Health Check: http://localhost:${port}/api/health\n`);
}


bootstrap();
