// =====================================================
// Prisma Service - Gestión de Conexión a BD
// =====================================================
// Este servicio maneja la conexión con PostgreSQL usando Prisma

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService extiende PrismaClient y gestiona el ciclo de vida
 * de la conexión a la base de datos
 * 
 * @Injectable() - Marca esta clase como un provider de NestJS
 * OnModuleInit - Se ejecuta cuando el módulo se inicializa
 * OnModuleDestroy - Se ejecuta cuando el módulo se destruye
 */
@Injectable()
export class PrismaService 
  extends PrismaClient 
  implements OnModuleInit, OnModuleDestroy 
{
  /**
   * Constructor que inicializa el cliente de Prisma
   * con configuraciones personalizadas
   */
  constructor() {
    super({
      // Configuración de logs en desarrollo
      log: ['query', 'info', 'warn', 'error'],
      
      // Configuración de manejo de errores
      errorFormat: 'pretty',
    });
  }

  /**
   * Se ejecuta automáticamente cuando el módulo se inicializa
   * Establece la conexión con la base de datos
   */
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Conexión a PostgreSQL establecida correctamente');
    } catch (error) {
      console.error('❌ Error al conectar con PostgreSQL:', error);
      throw error;
    }
  }

  /**
   * Se ejecuta cuando la aplicación se cierra
   * Cierra la conexión con la base de datos de forma limpia
   */
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Conexión a PostgreSQL cerrada');
  }

  /**
   * Método helper para limpiar la base de datos
   * Útil para testing
   */
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('No se puede limpiar la base de datos en producción');
    }

    // Orden importante: primero tablas dependientes, luego independientes
    await this.post.deleteMany();
    await this.user.deleteMany();
  }
}
