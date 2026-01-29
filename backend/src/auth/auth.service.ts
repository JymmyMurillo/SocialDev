// =====================================================
// Auth Service - Lógica de autenticación
// =====================================================
// Contiene la lógica de negocio para login y validación

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { AuthResponse } from "./entities/auth-response.entity";

/**
 * AuthService - Maneja la lógica de autenticación
 */
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Login - Valida credenciales y genera JWT
   *
   * @param loginDto - Email y contraseña
   * @returns Token JWT y datos del usuario
   */
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    // 1. Buscar usuario por email
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    // 2. Verificar que el usuario existe
    if (!user) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    // 3. Comparar contraseña
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    // 4. Generar JWT
    const payload = {
      sub: user.id, // 'sub' es el estándar para ID
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    // 5. Retornar token y datos del usuario (SIN contraseña)
    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    };
  }

  /**
   * Validar usuario por ID (usado por JwtStrategy)
   *
   * @param userId - ID del usuario
   * @returns Datos del usuario o null
   */
  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return user;
  }
}
