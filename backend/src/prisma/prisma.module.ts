// =====================================================
// Prisma Module - Módulo de Gestión de BD
// =====================================================
// Este módulo exporta el servicio de Prisma como global

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * PrismaModule - Módulo global para acceso a la base de datos
 * 
 * @Global() - Hace que este módulo esté disponible en toda la aplicación
 *            sin necesidad de importarlo en cada módulo
 * @Module() - Define este archivo como un módulo de NestJS
 */
@Global()
@Module({
  // Providers: Servicios que este módulo proporciona
  providers: [PrismaService],
  
  // Exports: Servicios que otros módulos pueden usar
  exports: [PrismaService],
})
export class PrismaModule {}
