/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.trainer.createMany({
        data: [
          { name: 'Bryan', specialty: 'FITNESS' },
          { name: 'Rachel', specialty: 'TENNIS' },
          { name: 'John', specialty: 'PADEL' },
        ],
      });

      const createdTrainers = await tx.trainer.findMany();

      if (!createdTrainers) throw new Error('No trainers found');

      console.log({ createdTrainers });

      await tx.session.createMany({
        data: [
          {
            type: 'FITNESS',
            duration: 60,
            price: 50,
            startTime: new Date('2025-02-15T10:00:00Z'),
            trainerId:
              createdTrainers.find((t) => t.name === 'Bryan')?.id ?? '',
            isBooked: false,
          },
          {
            type: 'FITNESS',
            duration: 45,
            price: 40,
            startTime: new Date('2025-02-16T14:00:00Z'),
            trainerId:
              createdTrainers.find((t) => t.name === 'Bryan')?.id ?? '',
            isBooked: false,
          },
          {
            type: 'TENNIS',
            duration: 90,
            price: 75,
            startTime: new Date('2025-02-17T11:00:00Z'),
            trainerId:
              createdTrainers.find((t) => t.name === 'Rachel')?.id ?? '',
            isBooked: false,
          },
          {
            type: 'PADEL',
            duration: 60,
            price: 55,
            startTime: new Date('2025-02-18T16:00:00Z'),
            trainerId: createdTrainers.find((t) => t.name === 'John')?.id ?? '',
            isBooked: false,
          },
          {
            type: 'FITNESS',
            duration: 60,
            price: 50,
            startTime: new Date('2025-02-15T10:00:00Z'),
            trainerId:
              createdTrainers.find((t) => t.name === 'Bryan')?.id ?? '',
            isBooked: false,
          },
          {
            type: 'FITNESS',
            duration: 45,
            price: 40,
            startTime: new Date('2025-02-16T14:00:00Z'),
            trainerId:
              createdTrainers.find((t) => t.name === 'Bryan')?.id ?? '',
            isBooked: false,
          },
          {
            type: 'TENNIS',
            duration: 90,
            price: 75,
            startTime: new Date('2025-02-17T11:00:00Z'),
            trainerId:
              createdTrainers.find((t) => t.name === 'Rachel')?.id ?? '',
            isBooked: false,
          },
          {
            type: 'PADEL',
            duration: 60,
            price: 55,
            startTime: new Date('2025-02-18T16:00:00Z'),
            trainerId: createdTrainers.find((t) => t.name === 'John')?.id ?? '',
            isBooked: false,
          },
        ],
      });

      console.log('Seeding completed successfully');
    });
  } catch (error) {
    console.log('Failed to see data', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
