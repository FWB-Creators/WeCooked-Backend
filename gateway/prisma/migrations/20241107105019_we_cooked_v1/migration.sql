-- CreateTable
CREATE TABLE "Chef" (
    "chefId" SERIAL NOT NULL,
    "chefName" TEXT NOT NULL,
    "chefSurname" TEXT NOT NULL,
    "chefBio" TEXT,
    "chefSpecialty" TEXT,
    "chefExperience" TEXT,
    "chefPicture" TEXT,
    "chefEmail" TEXT,
    "chefPayment" INTEGER,
    "chefPhone" INTEGER,
    "chefUsername" TEXT NOT NULL,
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
    "coursePackId" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId")
);

-- CreateTable
CREATE TABLE "GroupID" (
    "groupId" SERIAL NOT NULL,
    "groupTitle" TEXT NOT NULL,
    "groupDetail" TEXT NOT NULL,
    "groupPrice" DOUBLE PRECISION NOT NULL,
    "groupNumberofparticipants" INTEGER NOT NULL,
    "groupDate" TIMESTAMP(3) NOT NULL,
    "groupCategory" TEXT NOT NULL,
    "groupLinkZoom" TEXT,
    "groupPicture" TEXT,
    "groupChefId" INTEGER,
    "groupPackId" TEXT,

    CONSTRAINT "GroupID_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "IngredientPack" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "packCode" TEXT NOT NULL,

    CONSTRAINT "IngredientPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackName" (
    "packId" TEXT NOT NULL,
    "menuName" TEXT NOT NULL,

    CONSTRAINT "PackName_pkey" PRIMARY KEY ("packId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" SERIAL NOT NULL,
    "cardNo" INTEGER NOT NULL,
    "cardHolder" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "userAddress" TEXT,
    "userProfile" TEXT,
    "favouriteChefId" INTEGER,
    "sex" TEXT,
    "userPhone" INTEGER,
    "userEmail" TEXT,
    "userPayment" INTEGER,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Video" (
    "videoID" SERIAL NOT NULL,
    "videoPath" TEXT NOT NULL,
    "videoTitle" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("videoID")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "ingredientId" SERIAL NOT NULL,
    "ingredientName" TEXT,
    "ingredientPrice" DOUBLE PRECISION,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("ingredientId")
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

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chef_chefEmail_key" ON "Chef"("chefEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Chef_chefPhone_key" ON "Chef"("chefPhone");

-- CreateIndex
CREATE UNIQUE INDEX "Chef_chefUsername_key" ON "Chef"("chefUsername");

-- CreateIndex
CREATE UNIQUE INDEX "GroupID_groupLinkZoom_key" ON "GroupID"("groupLinkZoom");

-- CreateIndex
CREATE UNIQUE INDEX "PackName_packId_key" ON "PackName"("packId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_cardNo_key" ON "Payment"("cardNo");

-- CreateIndex
CREATE UNIQUE INDEX "User_userPhone_key" ON "User"("userPhone");

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "User"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_ingredientName_key" ON "Ingredient"("ingredientName");

-- AddForeignKey
ALTER TABLE "Chef" ADD CONSTRAINT "Chef_chefPayment_fkey" FOREIGN KEY ("chefPayment") REFERENCES "Payment"("paymentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_coursePackId_fkey" FOREIGN KEY ("coursePackId") REFERENCES "PackName"("packId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseVideoId_fkey" FOREIGN KEY ("courseVideoId") REFERENCES "Video"("videoID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseChefId_fkey" FOREIGN KEY ("courseChefId") REFERENCES "Chef"("chefId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupID" ADD CONSTRAINT "GroupID_groupPackId_fkey" FOREIGN KEY ("groupPackId") REFERENCES "PackName"("packId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupID" ADD CONSTRAINT "GroupID_groupChefId_fkey" FOREIGN KEY ("groupChefId") REFERENCES "Chef"("chefId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientPack" ADD CONSTRAINT "IngredientPack_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("ingredientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientPack" ADD CONSTRAINT "IngredientPack_packCode_fkey" FOREIGN KEY ("packCode") REFERENCES "PackName"("packId") ON DELETE CASCADE ON UPDATE CASCADE;

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
