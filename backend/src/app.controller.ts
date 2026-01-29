// =====================================================
// App Controller - Controlador raíz
// =====================================================

import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";

/**
 * AppController - Controlador de nivel de aplicación
 * Maneja rutas básicas de la API
 */
@ApiTags("General")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * GET /api
   */
  @Get()
  @ApiOperation({
    summary: "Mensaje de bienvenida",
    description: "Retorna un mensaje de bienvenida de la API",
  })
  @ApiResponse({
    status: 200,
    description: "Mensaje de bienvenida",
    schema: {
      example: "Welcome to SocialDev API! Visit /api for documentation.",
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * GET /api/health
   */
  @Get("health")
  @ApiOperation({
    summary: "Health check",
    description: "Verifica que la API está funcionando correctamente",
  })
  @ApiResponse({
    status: 200,
    description: "API funcionando correctamente",
    schema: {
      example: {
        status: "ok",
        timestamp: "2024-01-15T10:30:00.000Z",
        service: "SocialDev API",
        version: "1.0.0",
      },
    },
  })
  getHealth() {
    return this.appService.getHealth();
  }
}


// =====================================================
// Estas rutas NO requieren autenticación porque:
// - Son públicas e informativas
// - No exponen datos sensibles
// - Útiles para verificar que el servidor está arriba
//
// =====================================================
