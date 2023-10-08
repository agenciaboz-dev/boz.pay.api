-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `date_created` VARCHAR(191) NOT NULL,
    `date_modified` VARCHAR(191) NOT NULL,
    `total` VARCHAR(191) NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `order_key` VARCHAR(191) NOT NULL,
    `cart_hash` VARCHAR(191) NOT NULL,
    `billing_id` INTEGER NOT NULL,
    `shipping_id` INTEGER NOT NULL,

    UNIQUE INDEX `Order_billing_id_key`(`billing_id`),
    UNIQUE INDEX `Order_shipping_id_key`(`shipping_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Billing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `address_1` VARCHAR(191) NOT NULL,
    `address_2` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `postcode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shipping` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `address_1` VARCHAR(191) NOT NULL,
    `address_2` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `postcode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_billing_id_fkey` FOREIGN KEY (`billing_id`) REFERENCES `Billing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_shipping_id_fkey` FOREIGN KEY (`shipping_id`) REFERENCES `Shipping`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
