-- CreateTable
CREATE TABLE "Chef" (
    "ChefID" SERIAL NOT NULL,
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

    CONSTRAINT "Chef_pkey" PRIMARY KEY ("ChefID")
);

-- CreateTable
CREATE TABLE "Course" (
    "courseID" SERIAL NOT NULL,
    "courseTitle" TEXT NOT NULL,
    "courseDetail" TEXT NOT NULL,
    "coursePrice" INTEGER NOT NULL,
    "courseCategory" TEXT NOT NULL,
    "courseVideoId" INTEGER,
    "courseChefId" INTEGER,
    "coursePackId" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseID")
);

-- CreateTable
CREATE TABLE "GroupID" (
    "GroupID" SERIAL NOT NULL,
    "groupTitle" TEXT NOT NULL,
    "groupDetail" TEXT,
    "groupprice" DOUBLE PRECISION,
    "groupNumberofparticipants" INTEGER,
    "groupDate" TIMESTAMP(3),
    "groupCategory" TEXT NOT NULL,
    "groupLinkZoom" TEXT,
    "groupPicture" TEXT,
    "groupChefId" INTEGER,
    "groupPackId" TEXT,

    CONSTRAINT "GroupID_pkey" PRIMARY KEY ("GroupID")
);

-- CreateTable
CREATE TABLE "IngredientPack" (
    "ID" SERIAL NOT NULL,
    "quantity" INTEGER,
    "packCode" TEXT NOT NULL,
    "ingredientId" INTEGER,

    CONSTRAINT "IngredientPack_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "PackName" (
    "PackID" TEXT NOT NULL,
    "menuName" TEXT,

    CONSTRAINT "PackName_pkey" PRIMARY KEY ("PackID")
);

-- CreateTable
CREATE TABLE "Payment" (
    "PaymentID" SERIAL NOT NULL,
    "cardNo" INTEGER,
    "cardHolder" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("PaymentID")
);

-- CreateTable
CREATE TABLE "User" (
    "UserID" SERIAL NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "userAddress" TEXT,
    "userProfile" TEXT,
    "favouriteChefId" INTEGER,
    "userPhone" INTEGER,
    "userEmail" TEXT,
    "userPayment" INTEGER,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Video" (
    "VideoID" SERIAL NOT NULL,
    "videoPath" TEXT NOT NULL,
    "videoTitle" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("VideoID")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "IngredientID" SERIAL NOT NULL,
    "ingredientName" TEXT,
    "ingredientPrice" DOUBLE PRECISION,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("IngredientID")
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
CREATE UNIQUE INDEX "PackName_PackID_key" ON "PackName"("PackID");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_cardNo_key" ON "Payment"("cardNo");

-- CreateIndex
CREATE UNIQUE INDEX "User_userPhone_key" ON "User"("userPhone");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_ingredientName_key" ON "Ingredient"("ingredientName");

-- AddForeignKey
ALTER TABLE "Chef" ADD CONSTRAINT "Chef_chefPayment_fkey" FOREIGN KEY ("chefPayment") REFERENCES "Payment"("PaymentID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_coursePackId_fkey" FOREIGN KEY ("coursePackId") REFERENCES "PackName"("PackID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseVideoId_fkey" FOREIGN KEY ("courseVideoId") REFERENCES "Video"("VideoID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseChefId_fkey" FOREIGN KEY ("courseChefId") REFERENCES "Chef"("ChefID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupID" ADD CONSTRAINT "GroupID_groupPackId_fkey" FOREIGN KEY ("groupPackId") REFERENCES "PackName"("PackID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupID" ADD CONSTRAINT "GroupID_groupChefId_fkey" FOREIGN KEY ("groupChefId") REFERENCES "Chef"("ChefID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientPack" ADD CONSTRAINT "IngredientPack_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("IngredientID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientPack" ADD CONSTRAINT "IngredientPack_packCode_fkey" FOREIGN KEY ("packCode") REFERENCES "PackName"("PackID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favouriteChefId_fkey" FOREIGN KEY ("favouriteChefId") REFERENCES "Chef"("ChefID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPayment_fkey" FOREIGN KEY ("userPayment") REFERENCES "Payment"("PaymentID") ON DELETE SET NULL ON UPDATE CASCADE;
