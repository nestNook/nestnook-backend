/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE BIGINT;
