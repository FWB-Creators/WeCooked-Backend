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
    "chefPayment" INTEGER,
    "chefPhone" INTEGER NOT NULL,
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
    "courseCategory" TEXT NOT NULL,
    "courseVideoId" INTEGER,
    "courseChefId" INTEGER,
    "courseIngredientPrice" INTEGER NOT NULL,
    "courseDietary" TEXT[],
    "courseImage" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId")
);

-- CreateTable
CREATE TABLE "GroupID" (
    "groupId" SERIAL NOT NULL,
    "groupTitle" TEXT NOT NULL,
    "groupDetail" TEXT NOT NULL,
    "groupPrice" DOUBLE PRECISION NOT NULL,
    "groupNumberOfParticipants" INTEGER NOT NULL,
    "groupDate" TIMESTAMP(3) NOT NULL,
    "groupCategory" TEXT NOT NULL,
    "groupLinkZoom" TEXT,
    "groupPicture" TEXT,
    "groupChefId" INTEGER,
    "groupIngredientPrice" INTEGER,
    "groupDescription" TEXT,

    CONSTRAINT "GroupID_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "Dietary" (
    "dietaryId" SERIAL NOT NULL,
    "dietaryName" TEXT NOT NULL,
    "dietaryCourseId" INTEGER NOT NULL,

    CONSTRAINT "Dietary_pkey" PRIMARY KEY ("dietaryId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" SERIAL NOT NULL,
    "cardNo" INTEGER NOT NULL,
    "cardHolder" TEXT NOT NULL,
    "cvc" INTEGER NOT NULL,
    "expireDate" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "userAddress" TEXT,
    "userProfile" TEXT,
    "userPayment" INTEGER,
    "favouriteChefId" INTEGER,
    "sex" TEXT,
    "userEmail" TEXT NOT NULL,
    "userPhone" INTEGER,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Video" (
    "videoId" SERIAL NOT NULL,
    "videoPath" TEXT NOT NULL,
    "videoTitle" TEXT NOT NULL,
    "videoDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("videoId")
);

-- CreateTable
CREATE TABLE "Review" (
    "reviewId" SERIAL NOT NULL,
    "reviewUserId" INTEGER NOT NULL,
    "reviewRating" INTEGER NOT NULL,
    "reviewDetail" TEXT,
    "reviewTimestamp" TIMESTAMP(3) NOT NULL,
    "reviewCourseId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderId" SERIAL NOT NULL,
    "orderUserId" INTEGER NOT NULL,
    "orderCourseId" INTEGER NOT NULL,
    "orderPaymentId" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "orderFormat" TEXT NOT NULL,
    "orderWithIngredient" BOOLEAN NOT NULL DEFAULT false,
    "orderPrice" DOUBLE PRECISION NOT NULL,
    "orderDeliveryDate" TIMESTAMP(3),
    "orderDeliveryAddress" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Chef_chefPhone_key" ON "Chef"("chefPhone");

-- CreateIndex
CREATE UNIQUE INDEX "Chef_chefEmail_key" ON "Chef"("chefEmail");

-- CreateIndex
CREATE UNIQUE INDEX "GroupID_groupLinkZoom_key" ON "GroupID"("groupLinkZoom");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_cardNo_key" ON "Payment"("cardNo");

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "User"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_userPhone_key" ON "User"("userPhone");

-- AddForeignKey
ALTER TABLE "Chef" ADD CONSTRAINT "Chef_chefPayment_fkey" FOREIGN KEY ("chefPayment") REFERENCES "Payment"("paymentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseVideoId_fkey" FOREIGN KEY ("courseVideoId") REFERENCES "Video"("videoId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseChefId_fkey" FOREIGN KEY ("courseChefId") REFERENCES "Chef"("chefId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupID" ADD CONSTRAINT "GroupID_groupChefId_fkey" FOREIGN KEY ("groupChefId") REFERENCES "Chef"("chefId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dietary" ADD CONSTRAINT "Dietary_dietaryCourseId_fkey" FOREIGN KEY ("dietaryCourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favouriteChefId_fkey" FOREIGN KEY ("favouriteChefId") REFERENCES "Chef"("chefId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPayment_fkey" FOREIGN KEY ("userPayment") REFERENCES "Payment"("paymentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewUserId_fkey" FOREIGN KEY ("reviewUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewCourseId_fkey" FOREIGN KEY ("reviewCourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderCourseId_fkey" FOREIGN KEY ("orderCourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderUserId_fkey" FOREIGN KEY ("orderUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderPaymentId_fkey" FOREIGN KEY ("orderPaymentId") REFERENCES "Payment"("paymentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoTools" ADD CONSTRAINT "VideoTools_videoToolsCourseId_fkey" FOREIGN KEY ("videoToolsCourseId") REFERENCES "Course"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoTools" ADD CONSTRAINT "VideoTools_videoToolsTutorialId_fkey" FOREIGN KEY ("videoToolsTutorialId") REFERENCES "TutorialVideo"("tutorialId") ON DELETE RESTRICT ON UPDATE CASCADE;
