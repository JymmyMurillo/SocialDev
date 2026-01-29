// =====================================================
// Login DTO - Validación de datos de login
// =====================================================
// Define y valida la estructura de datos para el login

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

/**
 * DTO para el endpoint de login
 * Define qué datos se esperan y cómo validarlos
 */
export class LoginDto {
  /**
   * Email del usuario
   */
  @ApiProperty({
    description: "Email del usuario",
    example: "user1@socialdev.com",
    required: true,
  })
  @IsEmail({}, { message: "El email debe ser válido" })
  @IsNotEmpty({ message: "El email es requerido" })
  email: string;

  /**
   * Contraseña del usuario
   */
  @ApiProperty({
    description: "Contraseña del usuario",
    example: "password123",
    minLength: 6,
    required: true,
  })
  @IsString({ message: "La contraseña debe ser un texto" })
  @IsNotEmpty({ message: "La contraseña es requerida" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password: string;
}
