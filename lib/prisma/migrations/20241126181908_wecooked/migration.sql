-- CreateTable
CREATE TABLE "Chef" (
    "chefId" SERIAL NOT NULL,
    "chefName" TEXT NOT NULL,
    "chefSurname" TEXT NOT NULL,
    "chefBio" TEXT NOT NULL,
    "chefSpecialty" TEXT NOT NULL,
    "chefExperience" TEXT NOT NULL,
    "chefImage" TEXT NOT NULL,
    "chefSex" TEXT NOT NULL,
    "chefPhone" TEXT NOT NULL,
    "chefEmail" TEXT NOT NULL,
    "chefPassword" TEXT NOT NULL,

    CONSTRAINT "Chef_pkey" PRIMARY KEY ("chefId")
);

-- CreateTable
CREATE TABLE "Course" (
    "courseId" SERIAL NOT NULL,
    "courseTitle" TEXT NOT NULL,
    "courseDetail" TEXT NOT NULL,
    "coursePrice" INTEGER NOT NULL,
    "courseIngredientDetail" TEXT NOT NULL,
    "courseCategory" TEXT NOT NULL,
    "courseVideoPath" TEXT NOT NULL,
    "courseChefId" INTEGER NOT NULL,
    "courseIngredientPrice" INTEGER NOT NULL,
    "courseImage" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId")
);

-- CreateTable
CREATE TABLE "Dietary" (
    "dietaryId" SERIAL NOT NULL,
    "dietaryName" TEXT NOT NULL,
    "dietaryCourseId" INTEGER NOT NULL,

    CONSTRAINT "Dietary_pkey" PRIMARY KEY ("dietaryId")
);

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
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "userAddress" TEXT,
    "userProfile" TEXT,
    "favouriteChefId" INTEGER,
    "Sex" TEXT,
    "userPhone" TEXT,
    "userEmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Enroll" (
    "enrollId" SERIAL NOT NULL,
    "enrollUserId" INTEGER NOT NULL,
    "enrollCourseId" INTEGER NOT NULL,
    "isCourseComplete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Enroll_pkey" PRIMARY KEY ("enrollId")
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

-- CreateIndex
CREATE UNIQUE INDEX "Chef_chefPhone_key" ON "Chef"("chefPhone");

-- CreateIndex
CREATE UNIQUE INDEX "Chef_chefEmail_key" ON "Chef"("chefEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Workshop_workshopLinkZoom_key" ON "Workshop"("workshopLinkZoom");

-- CreateIndex
CREATE UNIQUE INDEX "User_userPhone_key" ON "User"("userPhone");

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "User"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Enroll_enrollUserId_enrollCourseId_key" ON "Enroll"("enrollUserId", "enrollCourseId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseChefId_fkey" FOREIGN KEY ("courseChefId") REFERENCES "Chef"("chefId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dietary" ADD CONSTRAINT "Dietary_dietaryCourseId_fkey" FOREIGN KEY ("dietaryCourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workshop" ADD CONSTRAINT "Workshop_workshopChefId_fkey" FOREIGN KEY ("workshopChefId") REFERENCES "Chef"("chefId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favouriteChefId_fkey" FOREIGN KEY ("favouriteChefId") REFERENCES "Chef"("chefId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enroll" ADD CONSTRAINT "Enroll_enrollUserId_fkey" FOREIGN KEY ("enrollUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enroll" ADD CONSTRAINT "Enroll_enrollCourseId_fkey" FOREIGN KEY ("enrollCourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

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
