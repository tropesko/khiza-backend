/*
  Warnings:

  - The `mintedTimestamp` column on the `Collections` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mintStages` column on the `Collections` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Royalties` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `allRoyalties` to the `Collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorAsk` to the `Collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorSale` to the `Collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorSaleChange` to the `Collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `royalties` to the `Collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topBid` to the `Collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volume` to the `Collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volumeChange` to the `Collections` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tokenCount` on the `Collections` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `onSaleCount` on the `Collections` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Royalties" DROP CONSTRAINT "Royalties_collectionId_fkey";

-- DropIndex
DROP INDEX "Collections_id_key";

-- AlterTable
ALTER TABLE "Collections" ADD COLUMN     "allRoyalties" JSONB NOT NULL,
ADD COLUMN     "floorAsk" JSONB NOT NULL,
ADD COLUMN     "floorSale" JSONB NOT NULL,
ADD COLUMN     "floorSaleChange" JSONB NOT NULL,
ADD COLUMN     "rank" JSONB NOT NULL,
ADD COLUMN     "royalties" JSONB NOT NULL,
ADD COLUMN     "topBid" JSONB NOT NULL,
ADD COLUMN     "volume" JSONB NOT NULL,
ADD COLUMN     "volumeChange" JSONB NOT NULL,
ALTER COLUMN "discordUrl" DROP NOT NULL,
ALTER COLUMN "externalUrl" DROP NOT NULL,
ALTER COLUMN "twitterUsername" DROP NOT NULL,
DROP COLUMN "tokenCount",
ADD COLUMN     "tokenCount" INTEGER NOT NULL,
DROP COLUMN "onSaleCount",
ADD COLUMN     "onSaleCount" INTEGER NOT NULL,
DROP COLUMN "mintedTimestamp",
ADD COLUMN     "mintedTimestamp" TIMESTAMP(3),
DROP COLUMN "mintStages",
ADD COLUMN     "mintStages" JSONB[],
ADD CONSTRAINT "Collections_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Royalties";
