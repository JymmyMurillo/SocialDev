// =====================================================
// Auth Controller - Endpoints de autenticación
// =====================================================
// Define las rutas HTTP para autenticación

import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthResponse } from "./entities/auth-response.entity";

/**
 * AuthController - Maneja las rutas de autenticación
 *
 * Ruta base: /api/auth
 */
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /api/auth/login
   * Endpoint para iniciar sesión
   *
   * @param loginDto - Email y contraseña
   * @returns Token JWT y datos del usuario
   */
  @Post("login")
  @HttpCode(HttpStatus.OK) // 200 en vez de 201 (default de POST)
  @ApiOperation({
    summary: "Iniciar sesión",
    description:
      "Autentica un usuario con email y contraseña, retornando un token JWT",
  })
  @ApiResponse({
    status: 200,
    description: "Login exitoso",
    type: AuthResponse,
  })
  @ApiResponse({
    status: 401,
    description: "Credenciales inválidas",
    schema: {
      example: {
        statusCode: 401,
        message: "Credenciales inválidas",
        error: "Unauthorized",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Datos de entrada inválidos",
    schema: {
      example: {
        statusCode: 400,
        message: ["El email debe ser válido", "La contraseña es requerida"],
        error: "Bad Request",
      },
    },
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }
}

// =====================================================
// EXPLICACIÓN DETALLADA
// =====================================================
//
// ¿QUÉ ES UN CONTROLLER EN NESTJS?
// Un controller maneja las peticiones HTTP entrantes y
// retorna respuestas al cliente. Básicamente define las rutas.
//
// =====================================================
// DECORADORES DEL CONTROLLER
// =====================================================
//
// @ApiTags('Auth')
//   - Agrupa endpoints en Swagger bajo la etiqueta "Auth"
//   - Organiza la documentación
//
// @Controller('auth')
//   - Define la ruta base: /auth
//   - Con el prefijo global 'api' (main.ts): /api/auth
//
// =====================================================
// DECORADORES DEL MÉTODO
// =====================================================
//
// @Post('login')
//   - Define un endpoint POST
//   - Ruta completa: POST /api/auth/login
//   - Alternativas: @Get(), @Put(), @Patch(), @Delete()
//
// @HttpCode(HttpStatus.OK)
//   - Establece el código de respuesta exitosa
//   - Por defecto, POST retorna 201 (Created)
//   - Para login, 200 (OK) es más apropiado
//   - HttpStatus es un enum con todos los códigos HTTP
//
// @ApiOperation()
//   - Describe el endpoint en Swagger
//   - summary: Título corto
//   - description: Explicación detallada
//
// @ApiResponse()
//   - Documenta posibles respuestas en Swagger
//   - status: Código HTTP
//   - description: Qué significa
//   - type: Clase TypeScript (para 200)
//   - schema: Objeto de ejemplo (para errores)
//
// @Body()
//   - Extrae el body de la petición
//   - Automáticamente convierte JSON a LoginDto
//   - ValidationPipe valida el DTO
//
// =====================================================
// FLUJO DE UNA PETICIÓN
// =====================================================
//
// 1. Cliente envía:
//    POST http://localhost:3000/api/auth/login
//    Content-Type: application/json
//    {
//      "email": "user1@socialdev.com",
//      "password": "password123"
//    }
//
// 2. NestJS recibe la petición:
//    - Busca el controller con ruta 'auth'
//    - Busca el método con decorador @Post('login')
//    - Encuentra: AuthController.login()
//
// 3. Convierte body JSON a LoginDto:
//    - Parsea el JSON
//    - Crea una instancia de LoginDto
//    - loginDto = { email: '...', password: '...' }
//
// 4. ValidationPipe valida LoginDto:
//    - ¿email es válido? ✓
//    - ¿password cumple minLength? ✓
//    - Si falla: retorna 400 Bad Request
//
// 5. Llama al método del controller:
//    - login(loginDto)
//
// 6. Controller llama al service:
//    - this.authService.login(loginDto)
//
// 7. AuthService procesa la lógica:
//    - Valida credenciales
//    - Genera JWT
//    - Retorna AuthResponse
//
// 8. Controller retorna la respuesta:
//    - NestJS convierte AuthResponse a JSON
//    - Establece Content-Type: application/json
//    - Establece status code: 200 (por @HttpCode)
//
// 9. Cliente recibe:
//    {
//      "access_token": "eyJhbGc...",
//      "user": { ... }
//    }
//
// =====================================================
// VENTAJAS DE SEPARAR CONTROLLER Y SERVICE
// =====================================================
//
// CONTROLLER:
// - Maneja HTTP (rutas, códigos de estado, headers)
// - Extrae datos de la petición
// - Retorna respuestas
// - Delgado, solo coordina
//
// SERVICE:
// - Contiene lógica de negocio
// - No sabe nada de HTTP
// - Reutilizable (se puede llamar desde otros lugares)
// - Testeable independientemente
//
// EJEMPLO:
// Si quisieras agregar un comando CLI para login:
//
// // En un CLI command
// const result = await this.authService.login(loginDto);
// // ✅ Funciona porque AuthService no depende de HTTP
//
// // Si la lógica estuviera en el controller:
// // ❌ No podrías reutilizarla fuera de HTTP
//
// =====================================================
// CÓDIGOS HTTP COMUNES
// =====================================================
//
// 2xx - Éxito:
// 200 OK           → Petición exitosa
// 201 Created      → Recurso creado
// 204 No Content   → Exitoso pero sin respuesta
//
// 4xx - Error del cliente:
// 400 Bad Request  → Datos inválidos
// 401 Unauthorized → No autenticado
// 403 Forbidden    → Sin permisos
// 404 Not Found    → Recurso no existe
// 409 Conflict     → Conflicto (ej: email duplicado)
//
// 5xx - Error del servidor:
// 500 Internal     → Error inesperado
// 503 Unavailable  → Servidor no disponible
//
// =====================================================
// RESPUESTAS DE EJEMPLO
// =====================================================
//
// ÉXITO (200):
// {
//   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
//   "user": {
//     "id": "uuid-123",
//     "email": "user1@socialdev.com",
//     "name": "Usuario Uno",
//     "createdAt": "2024-01-15T10:30:00.000Z"
//   }
// }
//
// ERROR VALIDACIÓN (400):
// {
//   "statusCode": 400,
//   "message": [
//     "El email debe ser válido",
//     "La contraseña debe tener al menos 6 caracteres"
//   ],
//   "error": "Bad Request"
// }
//
// ERROR CREDENCIALES (401):
// {
//   "statusCode": 401,
//   "message": "Credenciales inválidas",
//   "error": "Unauthorized"
// }
//
// =====================================================
// DOCUMENTACIÓN SWAGGER
// =====================================================
//
// Con estos decoradores, Swagger genera automáticamente:
//
// 1. Lista de endpoints
// 2. Parámetros requeridos
// 3. Estructura de respuestas
// 4. Códigos de error posibles
// 5. Interfaz para probar la API
//
// Accede a Swagger en: http://localhost:3000/api
//
// Puedes:
// - Ver todos los endpoints
// - Leer descripciones
// - Probar peticiones directamente
// - Ver ejemplos de respuestas
//
// =====================================================
// PROBAR EL ENDPOINT
// =====================================================
//
// Con cURL:
// curl -X POST http://localhost:3000/api/auth/login \
//   -H "Content-Type: application/json" \
//   -d '{"email":"user1@socialdev.com","password":"password123"}'
//
// Con Postman:
// 1. Método: POST
// 2. URL: http://localhost:3000/api/auth/login
// 3. Headers: Content-Type: application/json
// 4. Body (raw JSON):
//    {
//      "email": "user1@socialdev.com",
//      "password": "password123"
//    }
// 5. Send
//
// Con Thunder Client (VS Code):
// 1. Clic en el ícono de rayo ⚡
// 2. New Request
// 3. POST http://localhost:3000/api/auth/login
// 4. Body → JSON
// 5. Pegar el JSON
// 6. Send
//
// Con Swagger:
// 1. Ir a http://localhost:3000/api
// 2. Expandir POST /api/auth/login
// 3. Clic en "Try it out"
// 4. Editar el JSON de ejemplo
// 5. Clic en "Execute"
//
// =====================================================
// INYECCIÓN DE DEPENDENCIAS
// =====================================================
//
// constructor(private readonly authService: AuthService) {}
//
// - NestJS inyecta automáticamente AuthService
// - private: Solo accesible dentro de la clase
// - readonly: No se puede reasignar
// - No necesitas escribir: this.authService = authService
//
// Es equivalente a:
//
// private authService: AuthService;
//
// constructor(authService: AuthService) {
//   this.authService = authService;
// }
//
// Pero mucho más conciso con 'private' en el constructor.
//
// =====================================================
// ASYNC/AWAIT
// =====================================================
//
// async login(...): Promise<AuthResponse>
//
// - async: La función retorna una Promise
// - await: Espera a que una Promise se resuelva
// - Promise<AuthResponse>: El tipo que retorna
//
// Sin async/await:
//
// login(loginDto: LoginDto): Promise<AuthResponse> {
//   return this.authService.login(loginDto)
//     .then(result => result)
//     .catch(error => { throw error });
// }
//
// Con async/await (más limpio):
//
// async login(loginDto: LoginDto): Promise<AuthResponse> {
//   return this.authService.login(loginDto);
// }
//
// NestJS maneja automáticamente las Promises.
//
// =====================================================
