import { db } from './prisma.js';


async function testConnection() {
  try {
    const test = await db.user.findMany();
    console.log("Database connection successful:", test);
  } catch (error) {
    console.error("Database connection error:", error);
  } finally {
    await db.$disconnect();
  }
}

testConnection();
