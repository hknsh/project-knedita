import { PrismaClient } from '@prisma/client'

// Cria uma instância do cliente Prisma
const prisma = new PrismaClient()

// Exporta o cliente Prisma para ser usado em outros módulos
export default prisma
