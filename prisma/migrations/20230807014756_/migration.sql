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
    "royalties" JSONB NOT NULL,
    "allRoyalties" JSONB NOT NULL,
    "floorAsk" JSONB NOT NULL,
    "topBid" JSONB NOT NULL,
    "rank" JSONB NOT NULL,
    "volume" JSONB NOT NULL,
    "collectionBidSupported" BOOLEAN NOT NULL,
    "ownerCount" INTEGER NOT NULL,
    "contractKind" TEXT NOT NULL,
    "mintedTimestamp" TEXT NOT NULL,
    "mintStages" TEXT[],
    "volumeChange" JSONB NOT NULL,
    "floorSale" JSONB NOT NULL,
    "floorSaleChange" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "collections_id_key" ON "collections"("id");
