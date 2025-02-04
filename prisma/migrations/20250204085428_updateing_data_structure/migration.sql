/*
  Warnings:

  - You are about to drop the column `duration` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `isBooked` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `trainerId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `_BookingToSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "_BookingToSession" DROP CONSTRAINT "_BookingToSession_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookingToSession" DROP CONSTRAINT "_BookingToSession_B_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "duration",
DROP COLUMN "isBooked",
DROP COLUMN "price",
DROP COLUMN "startTime",
DROP COLUMN "trainerId";

-- DropTable
DROP TABLE "_BookingToSession";

-- CreateTable
CREATE TABLE "Duration" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Duration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerAvailability" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "timeSlotId" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "bookingId" TEXT,

    CONSTRAINT "TrainerAvailability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Duration" ADD CONSTRAINT "Duration_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerAvailability" ADD CONSTRAINT "TrainerAvailability_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerAvailability" ADD CONSTRAINT "TrainerAvailability_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerAvailability" ADD CONSTRAINT "TrainerAvailability_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
