/*
  Warnings:

  - You are about to drop the column `adress_id` on the `Fabricator` table. All the data in the column will be lost.
  - Added the required column `address_id` to the `Fabricator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Fabricator" DROP CONSTRAINT "Fabricator_adress_id_fkey";

-- AlterTable
ALTER TABLE "Fabricator" DROP COLUMN "adress_id",
ADD COLUMN     "address_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Fabricator" ADD CONSTRAINT "Fabricator_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
