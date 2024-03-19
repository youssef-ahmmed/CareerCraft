/*
  Warnings:

  - You are about to drop the column `companiesId` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `JobUser` DROP FOREIGN KEY `JobUser_jobId_fkey`;

-- DropForeignKey
ALTER TABLE `JobUser` DROP FOREIGN KEY `JobUser_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Jobs` DROP FOREIGN KEY `Jobs_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `Jobs` DROP FOREIGN KEY `Jobs_notificationId_fkey`;

-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Reviews` DROP FOREIGN KEY `Reviews_companiesId_fkey`;

-- DropForeignKey
ALTER TABLE `Reviews` DROP FOREIGN KEY `Reviews_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SkillJob` DROP FOREIGN KEY `SkillJob_jobId_fkey`;

-- DropForeignKey
ALTER TABLE `SkillJob` DROP FOREIGN KEY `SkillJob_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `SkillUser` DROP FOREIGN KEY `SkillUser_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `SkillUser` DROP FOREIGN KEY `SkillUser_userId_fkey`;

-- AlterTable
ALTER TABLE `Reviews` DROP COLUMN `companiesId`,
    ADD COLUMN `companyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `bio` VARCHAR(1024) NULL;

-- AddForeignKey
ALTER TABLE `SkillUser` ADD CONSTRAINT `SkillUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillUser` ADD CONSTRAINT `SkillUser_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skills`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_notificationId_fkey` FOREIGN KEY (`notificationId`) REFERENCES `Notifications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobUser` ADD CONSTRAINT `JobUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobUser` ADD CONSTRAINT `JobUser_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Jobs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillJob` ADD CONSTRAINT `SkillJob_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Jobs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillJob` ADD CONSTRAINT `SkillJob_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skills`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
