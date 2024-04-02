/*
  Warnings:

  - You are about to drop the column `notificationId` on the `Jobs` table. All the data in the column will be lost.
  - Added the required column `jobId` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Jobs` DROP FOREIGN KEY `Jobs_notificationId_fkey`;

-- AlterTable
ALTER TABLE `Jobs` DROP COLUMN `notificationId`;

-- AlterTable
ALTER TABLE `Notifications` ADD COLUMN `jobId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Jobs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
