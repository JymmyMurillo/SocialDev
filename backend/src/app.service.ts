// =====================================================
// App Service - Servicio raíz de la aplicación
// =====================================================

import { Injectable } from "@nestjs/common";

/**
 * AppService - Servicio de nivel de aplicación
 * Contiene lógica básica de la aplicación
 */
@Injectable()
export class AppService {
  /**
   * Retorna mensaje de bienvenida
   */
  getHello(): string {
    return "Welcome to SocialDev API! Visit /api for documentation.";
  }

  /**
   * Health check - Verifica que la API está funcionando
   */
  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "SocialDev API",
      version: "1.0.0",
    };
  }
}