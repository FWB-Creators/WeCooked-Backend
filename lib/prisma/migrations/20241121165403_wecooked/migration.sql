/*
  Warnings:

  - You are about to drop the column `chefPayment` on the `Chef` table. All the data in the column will be lost.
  - You are about to drop the column `courseDietary` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseVideoId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `groupNumberOfParticipants` on the `GroupID` table. All the data in the column will be lost.
  - You are about to alter the column `groupPrice` on the `GroupID` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `sex` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userPayment` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeTracking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TutorialVideo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoTools` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseVideoPath` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Made the column `courseChefId` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `groupNumberofparticipants` to the `GroupID` table without a default value. This is not possible if the table is not empty.
  - Made the column `groupLinkZoom` on table `GroupID` required. This step will fail if there are existing NULL values in that column.
  - Made the column `groupPicture` on table `GroupID` required. This step will fail if there are existing NULL values in that column.
  - Made the column `groupChefId` on table `GroupID` required. This step will fail if there are existing NULL values in that column.
  - Made the column `groupDescription` on table `GroupID` required. This step will fail if there are existing NULL values in that column.
  - Made the column `groupIngredientPrice` on table `GroupID` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Chef" DROP CONSTRAINT "Chef_chefPayment_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_courseChefId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_courseVideoId_fkey";

-- DropForeignKey
ALTER TABLE "GroupID" DROP CONSTRAINT "GroupID_groupChefId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderCourseId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderPaymentId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderUserId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewCourseId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewUserId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userPayment_fkey";

-- DropForeignKey
ALTER TABLE "VideoTools" DROP CONSTRAINT "VideoTools_videoToolsCourseId_fkey";

-- DropForeignKey
ALTER TABLE "VideoTools" DROP CONSTRAINT "VideoTools_videoToolsTutorialId_fkey";

-- AlterTable
ALTER TABLE "Chef" DROP COLUMN "chefPayment",
ALTER COLUMN "chefPhone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "courseDietary",
DROP COLUMN "courseVideoId",
ADD COLUMN     "courseVideoPath" TEXT NOT NULL,
ALTER COLUMN "courseChefId" SET NOT NULL;

-- AlterTable
ALTER TABLE "GroupID" DROP COLUMN "groupNumberOfParticipants",
ADD COLUMN     "groupNumberofparticipants" INTEGER NOT NULL,
ALTER COLUMN "groupPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "groupLinkZoom" SET NOT NULL,
ALTER COLUMN "groupPicture" SET NOT NULL,
ALTER COLUMN "groupChefId" SET NOT NULL,
ALTER COLUMN "groupDescription" SET NOT NULL,
ALTER COLUMN "groupIngredientPrice" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sex",
DROP COLUMN "userPayment",
ADD COLUMN     "Sex" TEXT,
ALTER COLUMN "userPhone" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "TimeTracking";

-- DropTable
DROP TABLE "TutorialVideo";

-- DropTable
DROP TABLE "Video";

-- DropTable
DROP TABLE "VideoTools";

-- CreateTable
CREATE TABLE "Dietary" (
    "dietaryId" SERIAL NOT NULL,
    "dietaryName" TEXT NOT NULL,
    "dietaryCourseId" INTEGER NOT NULL,

    CONSTRAINT "Dietary_pkey" PRIMARY KEY ("dietaryId")
);

-- CreateTable
CREATE TABLE "review" (
    "reviewId" SERIAL NOT NULL,
    "reviewUserId" INTEGER NOT NULL,
    "reviewRating" INTEGER NOT NULL,
    "reviewDetail" TEXT,
    "reviewTimestamp" TIMESTAMP(3) NOT NULL,
    "reviewCourseId" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "order" (
    "orderId" SERIAL NOT NULL,
    "orderUserId" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "orderFormat" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "orderWithIngredient" BOOLEAN NOT NULL DEFAULT false,
    "orderPrice" INTEGER NOT NULL,
    "orderDeliveryDate" TIMESTAMP(3),
    "orderDeliveryAddress" TEXT,

    CONSTRAINT "order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "tutorialvideo" (
    "tutorialId" SERIAL NOT NULL,
    "tutorialVideo" TEXT NOT NULL,
    "tutorialTitle" TEXT NOT NULL,

    CONSTRAINT "tutorialvideo_pkey" PRIMARY KEY ("tutorialId")
);

-- CreateTable
CREATE TABLE "listofTutorial" (
    "Id" SERIAL NOT NULL,
    "CourseId" INTEGER NOT NULL,
    "TutorialId" INTEGER NOT NULL,
    "Timestamp" INTEGER NOT NULL,

    CONSTRAINT "listofTutorial_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "timetracking" (
    "timeId" SERIAL NOT NULL,
    "timeCourseId" INTEGER NOT NULL,
    "timeCountdown" INTEGER NOT NULL,
    "timeTriggered" BOOLEAN NOT NULL DEFAULT false,
    "timePopup" INTEGER NOT NULL,

    CONSTRAINT "timetracking_pkey" PRIMARY KEY ("timeId")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseChefId_fkey" FOREIGN KEY ("courseChefId") REFERENCES "Chef"("chefId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dietary" ADD CONSTRAINT "Dietary_dietaryCourseId_fkey" FOREIGN KEY ("dietaryCourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupID" ADD CONSTRAINT "GroupID_groupChefId_fkey" FOREIGN KEY ("groupChefId") REFERENCES "Chef"("chefId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_reviewUserId_fkey" FOREIGN KEY ("reviewUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_reviewCourseId_fkey" FOREIGN KEY ("reviewCourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_orderUserId_fkey" FOREIGN KEY ("orderUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listofTutorial" ADD CONSTRAINT "listofTutorial_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listofTutorial" ADD CONSTRAINT "listofTutorial_TutorialId_fkey" FOREIGN KEY ("TutorialId") REFERENCES "tutorialvideo"("tutorialId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetracking" ADD CONSTRAINT "timetracking_timeCourseId_fkey" FOREIGN KEY ("timeCourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;
