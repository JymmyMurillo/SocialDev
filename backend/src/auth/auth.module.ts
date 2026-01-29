// =====================================================
// Auth Module - Módulo de autenticación
// =====================================================
// Agrupa todos los componentes relacionados con autenticación

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";

/**
 * AuthModule - Módulo de autenticación
 * Contiene toda la funcionalidad de login y JWT
 */
@Module({
  imports: [
    // PassportModule: Integra Passport.js con NestJS
    PassportModule.register({ defaultStrategy: "jwt" }),

    // JwtModule: Proporciona JwtService para firmar/verificar tokens
    JwtModule.register({
      // Secreto para firmar tokens (debe ser el mismo para verificar)
      secret: process.env.JWT_SECRET || "super-secret-key-change-in-production",

      // Opciones de firma
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN || "24h") as any, // Expiración del token
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}

