/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.booking.deleteMany();
  await prisma.trainerAvailability.deleteMany();
  await prisma.timeSlot.deleteMany();
  await prisma.duration.deleteMany();
  await prisma.session.deleteMany();
  await prisma.trainer.deleteMany();

  // Create trainers
  const trainers = await Promise.all([
    prisma.trainer.create({
      data: { name: 'John Doe', specialty: 'FITNESS' },
    }),
    prisma.trainer.create({
      data: { name: 'Jane Smith', specialty: 'TENNIS' },
    }),
    prisma.trainer.create({
      data: { name: 'Mike Johnson', specialty: 'PADEL' },
    }),
  ]);

  // Create sessions with durations and time slots
  const sessions = await Promise.all([
    // Fitness Session
    prisma.session.create({
      data: {
        type: 'FITNESS',
        durations: {
          create: [
            { minutes: 30, price: 40 },
            { minutes: 60, price: 70 },
            { minutes: 90, price: 100 },
          ],
        },
      },
    }),
    // Tennis Session
    prisma.session.create({
      data: {
        type: 'TENNIS',
        durations: {
          create: [
            { minutes: 60, price: 80 },
            { minutes: 90, price: 110 },
          ],
        },
      },
    }),
    // Padel Session
    prisma.session.create({
      data: {
        type: 'PADEL',
        durations: {
          create: [
            { minutes: 60, price: 75 },
            { minutes: 90, price: 100 },
          ],
        },
      },
    }),
  ]);

  // Create time slots for next 7 days
  const timeSlots = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    // Create slots from 9 AM to 5 PM
    for (let hour = 9; hour < 17; hour++) {
      date.setHours(hour, 0, 0, 0);

      for (const session of sessions) {
        const timeSlot = await prisma.timeSlot.create({
          data: {
            sessionId: session.id,
            startTime: new Date(date),
          },
        });
        timeSlots.push(timeSlot);
      }
    }
  }

  // Create trainer availability for time slots
  for (const timeSlot of timeSlots) {
    const session = sessions.find((s) => s.id === timeSlot.sessionId);
    const relevantTrainers = trainers.filter(
      (t) => t.specialty === session?.type || t.specialty === 'FITNESS',
    );

    for (const trainer of relevantTrainers) {
      await prisma.trainerAvailability.create({
        data: {
          trainerId: trainer.id,
          timeSlotId: timeSlot.id,
          isBooked: false,
        },
      });
    }
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
