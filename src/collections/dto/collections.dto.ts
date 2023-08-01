export interface CollectionsDto {
  id: string;
  slug: string;
  createdAt: string;
  name: string;
  image: string;
  banner: string;
  discordUrl: string;
  externalUrl: string;
  twitterUsername: string;
  openseaVerificationStatus: string;
  description: string;
  sampleImages: string[];
  tokenCount: string;
  onSaleCount: string;
  primaryContract: string;
  tokenSetId: string;
  creator: string;
  royalties: string[];
  // allRoyalties: { opensea: any[] };
  // floorAsk: FloorAsk;
  // topBid: TopBid;
  // rank: Rank;
  // volume: Volume;
  // volumeChange: VolumeChange;
  // floorSale: FloorSale;
  // floorSaleChange: FloorSaleChange;
  collectionBidSupported: boolean;
  ownerCount: number;
  contractKind: string;
  mintedTimestamp: number;
  mintStages: string;
}
//   const data: CollectionDTO = {
//     collections: [
//       {},
//     ],
//   };

// export default data;
