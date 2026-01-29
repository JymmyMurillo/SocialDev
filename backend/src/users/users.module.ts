// =====================================================
// Users Module - Módulo de usuarios
// =====================================================

import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

/**
 * UsersModule - Módulo de gestión de usuarios
 */
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
