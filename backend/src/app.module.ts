// =====================================================
// App Module - Módulo Raíz de la Aplicación
// =====================================================
// Este es el módulo principal que importa todos los demás

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
//import { UsersModule } from "./users/users.module";
//import { PostsModule } from "./posts/posts.module";

/**
 * AppModule - Módulo raíz de NestJS
 * Importa y organiza todos los módulos de la aplicación
 */
@Module({
  imports: [
    // Módulo de base de datos (Global)
    PrismaModule,

    // Módulos de funcionalidad
    AuthModule,
    // UsersModule,
    // PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
