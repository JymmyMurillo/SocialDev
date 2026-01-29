// =====================================================
// JWT Auth Guard - Protector de rutas autenticadas
// =====================================================
// Guard que protege endpoints requiriendo un JWT válido

import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * JwtAuthGuard - Protege rutas que requieren autenticación
 *
 * Extiende AuthGuard de Passport con la estrategia 'jwt'
 * Cuando se usa en un endpoint, valida automáticamente el JWT
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
