// =====================================================
// Prisma Seeder - Datos Iniciales
// =====================================================
// Este script se ejecuta para poblar la BD con datos de prueba
// Ejecución: npx prisma db seed

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

// Instancia de Prisma para interactuar con la BD
const prisma = new PrismaClient();

/**
 * Función principal del seeder
 */
async function main() {
  console.log("🌱 Iniciando seeder...");

  // ===================================================
  // LIMPIAR DATOS EXISTENTES (Opcional)
  // ===================================================
  // Descomenta estas líneas si quieres eliminar datos antes de insertar
  // console.log('🗑️  Limpiando datos existentes...');
  // await prisma.post.deleteMany();
  // await prisma.user.deleteMany();

  // ===================================================
  // CREAR USUARIOS DE PRUEBA
  // ===================================================
  console.log("👥 Creando usuarios de prueba...");

  const usersData = [
    {
      name: "Usuario Uno",
      email: "user1@socialdev.com",
      password: "password123",
    },
    {
      name: "Usuario Dos",
      email: "user2@socialdev.com",
      password: "password123",
    },
    {
      name: "Usuario Tres",
      email: "user3@socialdev.com",
      password: "password123",
    },
    {
      name: "Usuario Cuatro",
      email: "user4@socialdev.com",
      password: "password123",
    },
    {
      name: "Usuario Cinco",
      email: "user5@socialdev.com",
      password: "password123",
    },
    {
      name: "Usuario Seis",
      email: "user6@socialdev.com",
      password: "password123",
    },
    {
      name: "Usuario Siete",
      email: "user7@socialdev.com",
      password: "password123",
    },
    {
      name: "Usuario Ocho",
      email: "user8@socialdev.com",
      password: "password123",
    },
    {
      name: "Usuario Nueve",
      email: "user9@socialdev.com",
      password: "password123",
    },
    {
      name: "Usuario Diez",
      email: "user10@socialdev.com",
      password: "password123",
    },
  ];

  // Contenidos de ejemplo para las publicaciones
  const postContents = [
    "¡Hola a todos! Este es mi primer post en SocialDev 🚀",
    "Me encanta esta nueva plataforma de desarrolladores",
    "Acabo de terminar mi proyecto en React, ¡estoy muy emocionado!",
    "TypeScript es increíble, cambia la forma de desarrollar",
    "Aprendiendo NestJS y me está gustando mucho la estructura",
    "Docker hace que el deployment sea mucho más fácil",
    "Prisma ORM es muy intuitivo, lo recomiendo 100%",
    "Compartiendo mi experiencia con microservicios",
    "Zustand vs Redux, ¿cuál prefieren ustedes?",
    "Tailwind CSS me ha ahorrado muchísimo tiempo en estilos",
  ];

  // Crear usuarios uno por uno con sus publicaciones
  for (let i = 0; i < usersData.length; i++) {
    const userData = usersData[i];

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      console.log(`   ⏭️  Usuario ${userData.email} ya existe, saltando...`);
      continue;
    }

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        posts: {
          create: {
            content: postContents[i],
          },
        },
      },
      include: {
        posts: true,
      },
    });

    console.log(`   ✅ Usuario creado: ${user.email} (con 1 publicación)`);
  }

  // ===================================================
  // ESTADÍSTICAS FINALES
  // ===================================================
  const totalUsers = await prisma.user.count();
  const totalPosts = await prisma.post.count();

  console.log("\n📊 Estadísticas finales:");
  console.log(`   👥 Total de usuarios: ${totalUsers}`);
  console.log(`   📝 Total de publicaciones: ${totalPosts}`);
  console.log("\n✅ Seeder completado exitosamente!\n");
  console.log("🔐 Credenciales de prueba:");
  console.log("   Email: user1@socialdev.com");
  console.log("   Password: password123");
  console.log("   (Aplica para user1 hasta user10)\n");
}

// ===================================================
// EJECUCIÓN Y MANEJO DE ERRORES
// ===================================================
main()
  .catch((e) => {
    console.error("❌ Error en el seeder:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Cerrar conexión con la BD
    await prisma.$disconnect();
  });


