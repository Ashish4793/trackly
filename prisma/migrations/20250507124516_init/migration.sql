-- CreateTable
CREATE TABLE `Job` (
    `id` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `status` ENUM('Applied', 'Interview', 'Accepted', 'Rejected') NOT NULL,
    `notes` VARCHAR(191) NULL,
    `salary` VARCHAR(191) NULL,
    `contact` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
