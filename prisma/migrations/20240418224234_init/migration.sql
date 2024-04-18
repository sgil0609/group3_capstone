/*
  Warnings:

  - You are about to drop the `Cart_Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shopping_Session` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `Order_Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart_Item" DROP CONSTRAINT "Cart_Item_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Cart_Item" DROP CONSTRAINT "Cart_Item_shoppingSessionId_fkey";

-- DropForeignKey
ALTER TABLE "Shopping_Session" DROP CONSTRAINT "Shopping_Session_userId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order_Item" ADD COLUMN     "unit_price" DECIMAL(65,30) NOT NULL;

-- DropTable
DROP TABLE "Cart_Item";

-- DropTable
DROP TABLE "Shopping_Session";
