/*
  Warnings:

  - You are about to drop the `Bookmark` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- DropTable
DROP TABLE "Bookmark";

-- CreateTable
CREATE TABLE "Collections" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "discordUrl" TEXT NOT NULL,
    "externalUrl" TEXT NOT NULL,
    "twitterUsername" TEXT NOT NULL,
    "openseaVerificationStatus" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sampleImages" TEXT[],
    "tokenCount" TEXT NOT NULL,
    "onSaleCount" TEXT NOT NULL,
    "primaryContract" TEXT NOT NULL,
    "tokenSetId" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "collectionBidSupported" BOOLEAN NOT NULL,
    "ownerCount" INTEGER NOT NULL,
    "contractKind" TEXT NOT NULL,
    "mintedTimestamp" INTEGER NOT NULL,
    "mintStages" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Royalties" (
    "id" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "breakdown" TEXT[],
    "bps" INTEGER NOT NULL,
    "collectionId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Collections_id_key" ON "Collections"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Royalties_id_key" ON "Royalties"("id");

-- AddForeignKey
ALTER TABLE "Royalties" ADD CONSTRAINT "Royalties_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
