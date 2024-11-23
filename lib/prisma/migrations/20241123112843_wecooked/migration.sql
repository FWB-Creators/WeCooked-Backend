/*
  Warnings:

  - You are about to drop the `GroupID` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupID" DROP CONSTRAINT "GroupID_groupChefId_fkey";

-- DropTable
DROP TABLE "GroupID";

-- CreateTable
CREATE TABLE "Workshop" (
    "workshopId" SERIAL NOT NULL,
    "workshopTitle" TEXT NOT NULL,
    "workshopDetail" TEXT NOT NULL,
    "workshopPrice" INTEGER NOT NULL,
    "workshopIngredientDetail" TEXT NOT NULL,
    "workshopNumberofparticipants" INTEGER NOT NULL,
    "workshopDate" TIMESTAMP(3) NOT NULL,
    "workshopCategory" TEXT NOT NULL,
    "workshopLinkZoom" TEXT NOT NULL,
    "workshopPicture" TEXT NOT NULL,
    "workshopChefId" INTEGER NOT NULL,
    "workshopIngredientPrice" INTEGER NOT NULL,
    "workshopDescription" TEXT NOT NULL,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("workshopId")
);

-- CreateTable
CREATE TABLE "Enroll" (
    "enrollId" SERIAL NOT NULL,
    "enrollUserId" INTEGER NOT NULL,
    "enrollCourseId" INTEGER NOT NULL,
    "enrollStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Enroll_pkey" PRIMARY KEY ("enrollId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workshop_workshopLinkZoom_key" ON "Workshop"("workshopLinkZoom");

-- AddForeignKey
ALTER TABLE "Workshop" ADD CONSTRAINT "Workshop_workshopChefId_fkey" FOREIGN KEY ("workshopChefId") REFERENCES "Chef"("chefId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enroll" ADD CONSTRAINT "Enroll_enrollUserId_fkey" FOREIGN KEY ("enrollUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enroll" ADD CONSTRAINT "Enroll_enrollCourseId_fkey" FOREIGN KEY ("enrollCourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;
