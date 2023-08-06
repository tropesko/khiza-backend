-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
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
    "mintedTimestamp" TEXT NOT NULL,
    "mintStages" TEXT[]
);

-- CreateTable
CREATE TABLE "royalties" (
    "id" SERIAL NOT NULL,
    "recipient" TEXT NOT NULL,
    "breakdown" TEXT[],
    "bps" INTEGER NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "royalties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "floorSaleChange" (
    "id" SERIAL NOT NULL,
    "oneDay" INTEGER NOT NULL,
    "sevenDays" INTEGER NOT NULL,
    "thirtyDays" INTEGER NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "floorSaleChange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "collections_id_key" ON "collections"("id");

-- AddForeignKey
ALTER TABLE "royalties" ADD CONSTRAINT "royalties_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "floorSaleChange" ADD CONSTRAINT "floorSaleChange_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
