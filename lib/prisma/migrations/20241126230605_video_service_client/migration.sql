/*
  Warnings:

  - Added the required column `tutorialDetail` to the `tutorialvideo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutorialImage` to the `tutorialvideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tutorialvideo" ADD COLUMN     "tutorialDetail" TEXT NOT NULL,
ADD COLUMN     "tutorialImage" TEXT NOT NULL;
