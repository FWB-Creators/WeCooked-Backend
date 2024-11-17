/*
  Warnings:

  - You are about to drop the column `chefUsername` on the `Chef` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Chef_chefUsername_key";

-- AlterTable
ALTER TABLE "Chef" DROP COLUMN "chefUsername",
ADD COLUMN     "chefSex" TEXT;
