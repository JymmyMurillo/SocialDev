// =====================================================
// Get User Decorator - Decorador para obtener usuario
// =====================================================
// Decorador personalizado que extrae el usuario del request

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * @GetUser() - Decorador que extrae el usuario autenticado del request
 *
 * Uso:
 * @Get('profile')
 * @UseGuards(JwtAuthGuard)
 * getProfile(@GetUser() user) {
 *   return user; // { id, email, name, createdAt }
 * }
 *
 * También puedes extraer una propiedad específica:
 * @Post()
 * @UseGuards(JwtAuthGuard)
 * createPost(@GetUser('id') userId: string) {
 *   return this.postsService.create(userId, ...);
 * }
 */
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // Obtenemos el objeto request del contexto
    const request = ctx.switchToHttp().getRequest();

    // El usuario está en request.user (puesto ahí por JwtStrategy)
    const user = request.user;

    // Si se especificó una propiedad, la retornamos
    // Ejemplo: @GetUser('id') → retorna user.id
    if (data) {
      return user?.[data];
    }

    // Si no se especificó propiedad, retornamos el usuario completo
    return user;
  },
);

