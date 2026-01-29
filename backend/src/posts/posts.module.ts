// =====================================================
// Posts Module - Módulo de publicaciones
// =====================================================

import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";

/**
 * PostsModule - Módulo de gestión de publicaciones
 */
@Module({
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService], // Exporta por si otros módulos lo necesitan
})
export class PostsModule {}

