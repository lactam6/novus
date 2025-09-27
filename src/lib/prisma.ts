// lib/prisma.ts

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"; // 👈 これをインポート

// グローバルなシングルトンインスタンスの設定 (開発環境での重複防止)
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// Prisma Clientを初期化し、Accelerateで拡張
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  }).$extends(withAccelerate()); // 👈 ここに .\$extends(withAccelerate()) を追加

if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  globalForPrisma.prisma = prisma as any;
}