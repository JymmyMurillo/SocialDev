// =====================================================
// JWT Strategy - Estrategia de autenticación JWT
// =====================================================
// Define cómo se valida un token JWT

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

/**
 * Payload que viene dentro del token JWT
 */
interface JwtPayload {
  sub: string; // User ID
  email: string;
}

/**
 * JwtStrategy - Define cómo validar tokens JWT
 *
 * Extiende PassportStrategy con la estrategia 'jwt' de passport-jwt
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      // De dónde extraer el token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // ¿Permitir tokens expirados?
      ignoreExpiration: false,

      // Secreto para verificar la firma (debe coincidir con el usado al firmar)
      secretOrKey:
        process.env.JWT_SECRET || "super-secret-key-change-in-production",
    });
  }

  /**
   * Método validate - Se ejecuta automáticamente después de verificar el JWT
   *
   * @param payload - Datos decodificados del token
   * @returns Objeto usuario que se adjunta a request.user
   */
  async validate(payload: JwtPayload) {
    // El payload ya fue verificado por Passport (firma válida, no expirado)
    // Ahora verificamos que el usuario aún exista en la BD

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        // NO incluimos password por seguridad
      },
    });

    // Si el usuario no existe, rechazamos el token
    if (!user) {
      throw new UnauthorizedException("Usuario no encontrado");
    }

    // Este objeto se adjunta a request.user
    // Estará disponible en todos los controllers que usen @UseGuards(JwtAuthGuard)
    return user;
  }
}
