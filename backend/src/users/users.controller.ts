// =====================================================
// Users Controller - Endpoints de usuarios
// =====================================================

import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UserEntity } from "./entities/user.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUser } from "../common/decorators/get-user.decorator";

/**
 * UsersController - Maneja las rutas de usuarios
 *
 * Todas las rutas requieren autenticación
 * Ruta base: /api/users
 */
@ApiTags("Users")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /api/users
   * Obtener lista de todos los usuarios
   */
  @Get()
  @ApiOperation({
    summary: "Listar usuarios",
    description: "Obtiene la lista de todos los usuarios registrados",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de usuarios",
    type: [UserEntity],
  })
  @ApiResponse({
    status: 401,
    description: "No autenticado",
  })
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * GET /api/users/profile
   * Obtener perfil del usuario autenticado
   */
  @Get("profile")
  @ApiOperation({
    summary: "Obtener mi perfil",
    description: "Obtiene el perfil del usuario autenticado con estadísticas",
  })
  @ApiResponse({
    status: 200,
    description: "Perfil del usuario",
    schema: {
      example: {
        id: "uuid-123",
        email: "user1@socialdev.com",
        name: "Usuario Uno",
        createdAt: "2024-01-15T10:30:00.000Z",
        updatedAt: "2024-01-15T10:30:00.000Z",
        postsCount: 5,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "No autenticado",
  })
  getProfile(@GetUser("id") userId: string) {
    return this.usersService.getProfile(userId);
  }

  /**
   * GET /api/users/:id
   * Obtener un usuario específico por ID
   */
  @Get(":id")
  @ApiOperation({
    summary: "Obtener usuario por ID",
    description: "Obtiene los datos públicos de un usuario específico",
  })
  @ApiResponse({
    status: 200,
    description: "Usuario encontrado",
    type: UserEntity,
  })
  @ApiResponse({
    status: 404,
    description: "Usuario no encontrado",
  })
  @ApiResponse({
    status: 401,
    description: "No autenticado",
  })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }
}