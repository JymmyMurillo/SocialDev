// =====================================================
// User Entity - Estructura de usuario
// =====================================================

import { ApiProperty } from "@nestjs/swagger";

/**
 * Usuario (sin contraseña)
 * Se usa para retornar información de usuarios
 */
export class UserEntity {
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

  @ApiProperty({
    description: "Fecha de última actualización",
    example: "2024-01-15T10:30:00.000Z",
  })
  updatedAt: Date;
}
