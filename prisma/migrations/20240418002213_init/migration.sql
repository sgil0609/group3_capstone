/*
  Warnings:

  - You are about to drop the column `productId` on the `Cart_Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart_Item" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Shopping_Session" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
