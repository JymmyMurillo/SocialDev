// =====================================================
// Post Entity - Estructura de respuesta de publicaciones
// =====================================================

import { ApiProperty } from "@nestjs/swagger";

/**
 * Información básica del autor de la publicación
 */
export class PostAuthor {
  @ApiProperty({
    description: "ID del autor",
    example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  })
  id: string;

  @ApiProperty({
    description: "Nombre del autor",
    example: "Usuario Uno",
  })
  name: string;

  @ApiProperty({
    description: "Email del autor",
    example: "user1@socialdev.com",
  })
  email: string;
}

/**
 * Publicación completa con información del autor
 */
export class PostEntity {
  @ApiProperty({
    description: "ID único de la publicación",
    example: "b2c3d4e5-f6g7-8901-bcde-fg2345678901",
  })
  id: string;

  @ApiProperty({
    description: "Contenido de la publicación",
    example: "¡Hola! Este es mi primer post en SocialDev 🚀",
  })
  content: string;

  @ApiProperty({
    description: "Fecha de creación",
    example: "2024-01-15T10:30:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Fecha de última actualización",
    example: "2024-01-15T10:30:00.000Z",
  })
  updatedAt: Date;

  @ApiProperty({
    description: "Información del autor",
    type: PostAuthor,
  })
  user: PostAuthor;
}
