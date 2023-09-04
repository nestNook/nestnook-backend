-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profile_pic_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile_pic_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profile_pic_id_fkey" FOREIGN KEY ("profile_pic_id") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
