/*
  Warnings:

  - The values [Accepted] on the enum `Job_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Job` MODIFY `status` ENUM('Applied', 'Interview', 'Offer', 'Rejected') NOT NULL;
