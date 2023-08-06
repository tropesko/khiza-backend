
// type floorSale = {
//   '1day': number;
//   '7day': number;
//   '30day': number;
// }

import { IsNotEmpty, IsString } from "class-validator";

// type floorSaleChange = {
//   '1day': number;
//   '7day': number;
//   '30day': number;
// }

export class CollectionsDto {
  @IsString()
  @IsNotEmpty()
  collection_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  // collection_id: any;
  // id: string;
  // slug: string;
  // createdAt: Date;
  // name: string;
  // image: string;
  // banner: string;
  // discordUrl: string | null;
  // externalUrl: string | null;
  // twitterUsername: string | null;
  // openseaVerificationStatus: string;
  // description: string;
  // sampleImages: string[];
  // tokenCount: number;
  // onSaleCount: number;
  // primaryContract: string;
  // tokenSetId: string;
  // creator: string;
  // collectionBidSupported: boolean;
  // ownerCount: number;
  // contractKind: string;
  // mintedTimestamp: Date | null;
  // floorSale: floorSale;
  // floorSaleChange: floorSaleChange;
}
