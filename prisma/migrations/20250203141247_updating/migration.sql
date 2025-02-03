/*
  Warnings:

  - The values [fitness] on the enum `SessionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SessionType_new" AS ENUM ('PADEL', 'FITNESS', 'TENNIS');
ALTER TABLE "Session" ALTER COLUMN "type" TYPE "SessionType_new" USING ("type"::text::"SessionType_new");
ALTER TYPE "SessionType" RENAME TO "SessionType_old";
ALTER TYPE "SessionType_new" RENAME TO "SessionType";
DROP TYPE "SessionType_old";
COMMIT;
