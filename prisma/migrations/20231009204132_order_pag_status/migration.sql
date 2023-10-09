-- AlterTable
ALTER TABLE `Order` ADD COLUMN `pag_status` VARCHAR(191) NOT NULL DEFAULT 'waiting';

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_billing_id_fkey` FOREIGN KEY (`billing_id`) REFERENCES `Billing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_shipping_id_fkey` FOREIGN KEY (`shipping_id`) REFERENCES `Shipping`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
