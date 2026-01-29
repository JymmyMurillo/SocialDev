// =====================================================
// Users Service - Lógica de usuarios
// =====================================================

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

/**
 * UsersService - Maneja la lógica de negocio de usuarios
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtener todos los usuarios
   *
   * @returns Lista de usuarios (sin contraseñas)
   */
  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        // NO incluimos password
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  }

  /**
   * Obtener un usuario por ID
   *
   * @param id - ID del usuario
   * @returns Usuario encontrado
   * @throws NotFoundException si no existe
   */
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  /**
   * Obtener perfil del usuario autenticado
   *
   * @param userId - ID del usuario autenticado
   * @returns Perfil del usuario con estadísticas
   */
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            posts: true, // Cuenta cuántos posts tiene
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    // Transformar la respuesta para que sea más clara
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      postsCount: user._count.posts,
    };
  }
}