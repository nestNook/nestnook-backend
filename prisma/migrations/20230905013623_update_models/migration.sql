/*
  Warnings:

  - You are about to drop the column `address_id` on the `Fabricator` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fabricator" DROP CONSTRAINT "Fabricator_address_id_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "fabricator_id" TEXT,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Fabricator" DROP COLUMN "address_id";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_fabricator_id_fkey" FOREIGN KEY ("fabricator_id") REFERENCES "Fabricator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
