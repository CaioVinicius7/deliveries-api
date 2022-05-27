/*
  Warnings:

  - Added the required column `final_address` to the `deliveries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initial_address` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "final_address" TEXT NOT NULL,
ADD COLUMN     "initial_address" TEXT NOT NULL;
