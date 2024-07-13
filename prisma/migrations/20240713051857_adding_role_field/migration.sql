/*
  Warnings:

  - Added the required column `role` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "role" TEXT NOT NULL;
