/*
  Warnings:

  - Added the required column `groupIngredientDetail` to the `GroupID` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupID" ADD COLUMN     "groupIngredientDetail" TEXT NOT NULL;
