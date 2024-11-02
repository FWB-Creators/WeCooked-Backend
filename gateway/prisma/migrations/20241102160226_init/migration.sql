/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_orderCourseId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_orderPaymentId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_orderUserId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_reviewCourseId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_reviewUserId_fkey";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "review";

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
