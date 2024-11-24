/*
  Warnings:

  - You are about to drop the column `enrollStatus` on the `Enroll` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[enrollUserId,enrollCourseId]` on the table `Enroll` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Enroll" DROP COLUMN "enrollStatus",
ADD COLUMN     "isCourseComplete" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Enroll_enrollUserId_enrollCourseId_key" ON "Enroll"("enrollUserId", "enrollCourseId");
