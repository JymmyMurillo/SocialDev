// =====================================================
// Auth Response Entity - Estructura de respuesta de login
// =====================================================
// Define qué datos se retornan después de un login exitoso

import { ApiProperty } from "@nestjs/swagger";

/**
 * Información básica del usuario
 * Se incluye en la respuesta de login
 */
export class UserResponse {
  @ApiProperty({
    description: "ID único del usuario",
    example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  })
  id: string;

  @ApiProperty({
    description: "Email del usuario",
    example: "user1@socialdev.com",
  })
  email: string;

  @ApiProperty({
    description: "Nombre del usuario",
    example: "Usuario Uno",
  })
  name: string;

  @ApiProperty({
    description: "Fecha de creación de la cuenta",
    example: "2024-01-15T10:30:00.000Z",
  })
  createdAt: Date;
}

/**
 * Respuesta completa del endpoint de login
 * Incluye el token JWT y la información del usuario
 */
export class AuthResponse {
  @ApiProperty({
    description: "Token JWT para autenticación",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  })
  access_token: string;

  @ApiProperty({
    description: "Información del usuario autenticado",
    type: UserResponse,
  })
  user: UserResponse;
}

// =====================================================
// FLUJO DE AUTENTICACIÓN
// =====================================================
//
// 1. Cliente envía credenciales:
//    POST /api/auth/login
//    {
//      "email": "user1@socialdev.com",
//      "password": "password123"
//    }
//
// 2. Backend valida credenciales
// 3. Si son correctas, genera JWT
// 4. Retorna AuthResponse:
//    {
//      "access_token": "eyJhbGciOiJIUzI1NiIsInR...",
//      "user": {
//        "id": "uuid-123",
//        "email": "user1@socialdev.com",
//        "name": "Usuario Uno",
//        "createdAt": "2024-01-15T10:30:00.000Z"
//      }
//    }
//
// 5. Cliente guarda el token (localStorage, sessionStorage, etc.)
// 6. En peticiones siguientes, incluye el token:
//    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
//
