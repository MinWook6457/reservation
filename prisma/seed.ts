import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create default admin
  const adminPassword = await bcrypt.hash('admin1234', 10);
  await prisma.user.upsert({
    where: { email: 'admin@nursing.com' },
    update: {},
    create: {
      name: '관리자',
      phone: '010-0000-0000',
      email: 'admin@nursing.com',
      passwordHash: adminPassword,
      role: 'admin',
    },
  });

  // Create default visit time slots
  const slots = [
    { time: '11:00', label: '오전 면회 (11:00)', maxCount: 5 },
    { time: '15:00', label: '오후 면회 1 (15:00)', maxCount: 5 },
    { time: '16:10', label: '오후 면회 2 (16:10)', maxCount: 5 },
  ];

  for (const slot of slots) {
    const existing = await prisma.timeSlot.findFirst({ where: { time: slot.time } });
    if (!existing) {
      await prisma.timeSlot.create({ data: slot });
    }
  }

  console.log('Seed completed: admin account and time slots created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
