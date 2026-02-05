// =====================================================
// Posts Service - Lógica de publicaciones
// =====================================================

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

/**
 * PostsService - Maneja la lógica de negocio de publicaciones
 */
@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crear una nueva publicación
   *
   * @param userId - ID del usuario que crea el post
   * @param createPostDto - Datos del post
   * @returns Publicación creada con información del autor
   */
  async create(userId: string, createPostDto: CreatePostDto) {
    // Crear el post en la base de datos
    const post = await this.prisma.post.create({
      data: {
        content: createPostDto.content,
        userId: userId, // El autor es el usuario autenticado
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return post;
  }

  /**   * Actualizar una publicación existente
   *
   * @param id - ID de la publicación a actualizar
   * @param userId - ID del usuario que intenta editar
   * @param updatePostDto - Datos para actualizar la publicación
   * @returns Publicación actualizada
   * @throws NotFoundException si la publicación no existe
   * @throws ForbiddenException si el usuario no es el autor
   */

  async update(id: string, userId: string, updatePostDto: UpdatePostDto) {
    // Verificar que el post existe
    const existingPost = await this.prisma.post.findUnique({
      where: { id },
    });
    if (!existingPost) {
      throw new NotFoundException(`Publicación con ID ${id} no encontrada`);
    }

        // Verificar que el usuario es el autor
    if (existingPost.userId !== userId) {
      throw new ForbiddenException('No tienes permiso para editar esta publicación');
    }

    // Actualizar el post
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: {
        content: updatePostDto.content,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return updatedPost;
  }

  /**
   * Obtener todas las publicaciones (ordenadas por más recientes)
   *
   * @returns Lista de publicaciones con información de autores
   */
  async findAll() {
    const posts = await this.prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Más recientes primero
      },
    });

    return posts;
  }

  /**
   * Obtener una publicación específica por ID
   *
   * @param id - ID de la publicación
   * @returns Publicación encontrada
   * @throws NotFoundException si no existe
   */
  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Publicación con ID ${id} no encontrada`);
    }

    return post;
  }

  /**
   * Obtener todas las publicaciones de un usuario específico
   *
   * @param userId - ID del usuario
   * @returns Lista de publicaciones del usuario
   */
  async findByUser(userId: string) {
    const posts = await this.prisma.post.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  }

  /**
   * Eliminar una publicación
   * Solo el autor puede eliminar su publicación
   *
   * @param id - ID de la publicación
   * @param userId - ID del usuario que intenta eliminar
   * @throws NotFoundException si no existe
   * @throws ForbiddenException si el usuario no es el autor
   */
  async remove(id: string, userId: string) {
    // Buscar el post
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    // Verificar que existe
    if (!post) {
      throw new NotFoundException(`Publicación con ID ${id} no encontrada`);
    }

    // Verificar que el usuario es el autor
    if (post.userId !== userId) {
      throw new ForbiddenException(
        "No tienes permiso para eliminar esta publicación",
      );
    }

    // Eliminar el post
    await this.prisma.post.delete({
      where: { id },
    });

    return { message: "Publicación eliminada exitosamente" };
  }
}

