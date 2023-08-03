export class CollectionsDto {
  collectionId: string;
  slug: string;
  createdAt: Date;
  name: string;
  image: string;
  banner: string;
  discordUrl: string | null;
  externalUrl: string | null;
  twitterUsername: string | null;
  openseaVerificationStatus: string;
  description: string;
  sampleImages: string[];
  tokenCount: number;
  onSaleCount: number;
  primaryContract: string;
  tokenSetId: string;
  creator: string;
  royalties: any;
  allRoyalties: any
  floorAsk: any;
  topBid: any;
  rank: any;
  volume: any;
  volumeChange: any;
  floorSale: any;
  floorSaleChange: any;
  collectionBidSupported: boolean;
  ownerCount: number;
  contractKind: string;
  mintedTimestamp: Date | null;
  mintStages: any[];
}
