// =====================================================
// Posts Controller - Endpoints de publicaciones
// =====================================================

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostEntity } from "./entities/post.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUser } from "../common/decorators/get-user.decorator";

/**
 * PostsController - Maneja las rutas de publicaciones
 *
 * Todas las rutas requieren autenticación con JWT
 * Ruta base: /api/posts
 */
@ApiTags("Posts")
@Controller("posts")
@UseGuards(JwtAuthGuard) // Todas las rutas requieren autenticación
@ApiBearerAuth("JWT-auth") // Documentación de autenticación en Swagger
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * POST /api/posts
   * Crear una nueva publicación
   */
  @Post()
  @ApiOperation({
    summary: "Crear publicación",
    description:
      "Crea una nueva publicación. El autor es el usuario autenticado.",
  })
  @ApiResponse({
    status: 201,
    description: "Publicación creada exitosamente",
    type: PostEntity,
  })
  @ApiResponse({
    status: 401,
    description: "No autenticado",
  })
  @ApiResponse({
    status: 400,
    description: "Datos inválidos",
  })
  create(
    @GetUser("id") userId: string, // Obtiene el ID del usuario del token
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(userId, createPostDto);
  }

  /**   * POST /api/posts/:id
   * Actualizar una publicación existente
   */
  @Post(":id")
  @ApiOperation({
    summary: "Actualizar publicación",  
    description: "Actualiza los detalles de una publicación existente",
  })
  @ApiResponse({
    status: 200,
    description: "Publicación actualizada exitosamente",
    type: PostEntity,
  })
  @ApiResponse({
    status: 404,
    description: "Publicación no encontrada",
  })
  @ApiResponse({
    status: 401,
    description: "No autenticado",
  })
  update(
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  /**
   * GET /api/posts
   * Obtener todas las publicaciones
   */
  @Get()
  @ApiOperation({
    summary: "Listar publicaciones",
    description: "Obtiene todas las publicaciones ordenadas por más recientes",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de publicaciones",
    type: [PostEntity], // Array de PostEntity
  })
  @ApiResponse({
    status: 401,
    description: "No autenticado",
  })
  findAll() {
    return this.postsService.findAll();
  }

  /**
   * GET /api/posts/:id
   * Obtener una publicación específica
   */
  @Get(":id")
  @ApiOperation({
    summary: "Obtener publicación por ID",
    description: "Obtiene los detalles de una publicación específica",
  })
  @ApiResponse({
    status: 200,
    description: "Publicación encontrada",
    type: PostEntity,
  })
  @ApiResponse({
    status: 404,
    description: "Publicación no encontrada",
  })
  @ApiResponse({
    status: 401,
    description: "No autenticado",
  })
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(id);
  }

  /**
   * GET /api/posts/user/:userId
   * Obtener todas las publicaciones de un usuario
   */
  @Get("user/:userId")
  @ApiOperation({
    summary: "Obtener publicaciones por usuario",
    description: "Obtiene todas las publicaciones de un usuario específico",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de publicaciones del usuario",
    type: [PostEntity],
  })
  @ApiResponse({
    status: 401,
    description: "No autenticado",
  })
  findByUser(@Param("userId") userId: string) {
    return this.postsService.findByUser(userId);
  }

  /**
   * DELETE /api/posts/:id
   * Eliminar una publicación (solo el autor puede hacerlo)
   */
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Eliminar publicación",
    description:
      "Elimina una publicación. Solo el autor puede eliminar su publicación.",
  })
  @ApiResponse({
    status: 200,
    description: "Publicación eliminada exitosamente",
    schema: {
      example: {
        message: "Publicación eliminada exitosamente",
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Publicación no encontrada",
  })
  @ApiResponse({
    status: 403,
    description: "Sin permiso para eliminar esta publicación",
  })
  @ApiResponse({
    status: 401,
    description: "No autenticado",
  })
  remove(@Param("id") id: string, @GetUser("id") userId: string) {
    return this.postsService.remove(id, userId);
  }
}
