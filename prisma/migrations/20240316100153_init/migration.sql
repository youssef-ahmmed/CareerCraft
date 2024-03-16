/*
  Warnings:

  - You are about to alter the column `location` on the `Companies` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Companies` MODIFY `location` VARCHAR(191) NOT NULL;
