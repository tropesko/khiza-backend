export class CollectionsDto {
  id: string;
  slug: string | null;
  createdAt: Date | null;
  name: string | null;
  image: string | null;
  banner: string | null;
  discordUrl: string | null;
  externalUrl: string | null;
  twitterUsername: string | null;
  openseaVerificationStatus: string | null;
  description: string | null;
  sampleImages: string[] | null;
  tokenCount: string | null;
  onSaleCount: string | null;
  primaryContract: string | null;
  tokenSetId: string | null;
  creator: string | null;
  collectionBidSupported: boolean | null;
  ownerCount: number | null;
  contractKind: string | null;
  mintedTimestamp: string | null;
  mintStages: string[] | null;
}

export class RoyaltiesDto {
  id: string;
  recipient: string | null;
  breakdown: string[] | null;
  bps: number | null;
}

export class FloorSaleChangeDto {
  oneDay: number | null;
  sevenDays: number | null;
  thirtyDays: number | null;
}
