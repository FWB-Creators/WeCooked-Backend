/*
  Warnings:

  - You are about to drop the column `chefPicture` on the `Chef` table. All the data in the column will be lost.
  - You are about to drop the column `coursePackId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `groupNumberofparticipants` on the `GroupID` table. All the data in the column will be lost.
  - You are about to drop the column `groupPackId` on the `GroupID` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `videoID` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IngredientPack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackName` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chefImage` to the `Chef` table without a default value. This is not possible if the table is not empty.
  - Made the column `chefBio` on table `Chef` required. This step will fail if there are existing NULL values in that column.
  - Made the column `chefSex` on table `Chef` required. This step will fail if there are existing NULL values in that column.
  - Made the column `chefSpecialty` on table `Chef` required. This step will fail if there are existing NULL values in that column.
  - Made the column `chefExperience` on table `Chef` required. This step will fail if there are existing NULL values in that column.
  - Made the column `chefEmail` on table `Chef` required. This step will fail if there are existing NULL values in that column.
  - Made the column `chefPhone` on table `Chef` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `courseImage` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseIngredientPrice` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupNumberOfParticipants` to the `GroupID` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cvc` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expireDate` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `surname` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userEmail` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `videoDate` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_coursePackId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_courseVideoId_fkey";

-- DropForeignKey
ALTER TABLE "GroupID" DROP CONSTRAINT "GroupID_groupPackId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientPack" DROP CONSTRAINT "IngredientPack_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientPack" DROP CONSTRAINT "IngredientPack_packCode_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Chef" DROP COLUMN "chefPicture",
ADD COLUMN     "chefImage" TEXT NOT NULL,
ALTER COLUMN "chefBio" SET NOT NULL,
ALTER COLUMN "chefSex" SET NOT NULL,
ALTER COLUMN "chefSpecialty" SET NOT NULL,
ALTER COLUMN "chefExperience" SET NOT NULL,
ALTER COLUMN "chefEmail" SET NOT NULL,
ALTER COLUMN "chefPhone" SET NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "coursePackId",
ADD COLUMN     "courseDietary" TEXT[],
ADD COLUMN     "courseImage" TEXT NOT NULL,
ADD COLUMN     "courseIngredientPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GroupID" DROP COLUMN "groupNumberofparticipants",
DROP COLUMN "groupPackId",
ADD COLUMN     "groupDescription" TEXT,
ADD COLUMN     "groupIngredientPrice" INTEGER,
ADD COLUMN     "groupNumberOfParticipants" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderDeliveryAddress" TIMESTAMP(3),
ADD COLUMN     "orderDeliveryDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "cvc" INTEGER NOT NULL,
ADD COLUMN     "expireDate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "surname" SET NOT NULL,
ALTER COLUMN "userEmail" SET NOT NULL;

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
DROP COLUMN "videoID",
ADD COLUMN     "videoDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "videoId" SERIAL NOT NULL,
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("videoId");

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "IngredientPack";

-- DropTable
DROP TABLE "PackName";

-- CreateTable
CREATE TABLE "TutorialVideo" (
    "tutorialId" SERIAL NOT NULL,
    "tutorialVideo" TEXT NOT NULL,
    "tutorialTitle" TEXT NOT NULL,

    CONSTRAINT "TutorialVideo_pkey" PRIMARY KEY ("tutorialId")
);

-- CreateTable
CREATE TABLE "VideoTools" (
    "videoToolsId" SERIAL NOT NULL,
    "videoToolsCourseId" INTEGER NOT NULL,
    "videoToolsTutorialId" INTEGER NOT NULL,
    "videoToolsTimestamp" INTEGER NOT NULL,

    CONSTRAINT "VideoTools_pkey" PRIMARY KEY ("videoToolsId")
);

-- CreateTable
CREATE TABLE "TimeTracking" (
    "timeId" SERIAL NOT NULL,
    "timeVideoId" INTEGER NOT NULL,
    "timeCountdown" INTEGER NOT NULL,
    "timeTriggered" BOOLEAN NOT NULL DEFAULT false,
    "timeStop" INTEGER NOT NULL,

    CONSTRAINT "TimeTracking_pkey" PRIMARY KEY ("timeId")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseVideoId_fkey" FOREIGN KEY ("courseVideoId") REFERENCES "Video"("videoId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoTools" ADD CONSTRAINT "VideoTools_videoToolsCourseId_fkey" FOREIGN KEY ("videoToolsCourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoTools" ADD CONSTRAINT "VideoTools_videoToolsTutorialId_fkey" FOREIGN KEY ("videoToolsTutorialId") REFERENCES "TutorialVideo"("tutorialId") ON DELETE RESTRICT ON UPDATE CASCADE;
