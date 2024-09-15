/*
  Warnings:

  - The values [file] on the enum `AttachmentType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `PostAttachment` table. All the data in the column will be lost.
  - Made the column `title` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttachmentType_new" AS ENUM ('image', 'video');
ALTER TABLE "PostAttachment" ALTER COLUMN "type" TYPE "AttachmentType_new" USING ("type"::text::"AttachmentType_new");
ALTER TYPE "AttachmentType" RENAME TO "AttachmentType_old";
ALTER TYPE "AttachmentType_new" RENAME TO "AttachmentType";
DROP TYPE "AttachmentType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "PostAttachment" DROP CONSTRAINT "PostAttachment_userId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "PostAttachment" DROP COLUMN "userId";
