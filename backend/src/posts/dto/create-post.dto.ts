// =====================================================
// Create Post DTO - Validación para crear publicaciones
// =====================================================

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

/**
 * DTO para crear una nueva publicación
 */
export class CreatePostDto {
  /**
   * Contenido de la publicación
   */
  @ApiProperty({
    description: "Contenido de la publicación",
    example: "¡Hola! Este es mi primer post en SocialDev 🚀",
    minLength: 1,
    maxLength: 500,
  })
  @IsString({ message: "El contenido debe ser texto" })
  @IsNotEmpty({ message: "El contenido es requerido" })
  @MinLength(1, { message: "El contenido debe tener al menos 1 carácter" })
  @MaxLength(500, { message: "El contenido no puede exceder 500 caracteres" })
  content: string;
}
