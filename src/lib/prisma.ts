// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// 開発環境ではグローバルオブジェクトを使用してホットリロード時に
// 複数のPrismaClientインスタンスが作成されるのを防ぎます
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;