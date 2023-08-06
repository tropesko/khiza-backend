// import {
//   Controller,
//   Post,
//   Req,
//   Get,
//   UseGuards,
//   Query,
//   Body,
//   BadRequestException,
// } from '@nestjs/common';
// import { Request } from 'express';
// import { JwtGuard } from 'src/auth/guard';
// import { CollectionsService } from './collections.service';
// import { PrismaClient } from '@prisma/client';
// import { CollectionsDto } from './dto/collections.dto';

// const prisma = new PrismaClient();

// @Controller('collection')
// export class CollectionsController {
//   constructor(private collectionsService: CollectionsService) {}

//   @UseGuards(JwtGuard)
//   @Get('user')
//   getUser(@Req() req: Request) {
//     console.log({
//       req,
//     });
//     return req.user;
//   }

//   @UseGuards(JwtGuard)
//   @Post('abacate')
//   async getCollection(@Query('id') id: string) {
//     try {
//       const sdk = require('api')(process.env.RESERVOIR_PROTOCOL);

//       sdk.auth(process.env.API_KEY);
//       const response = await sdk.getCollectionsV6({ id, accept: '*/*' });
//       const data = response.data;

//       console.log(id);
//       // return data;
//       return this.collectionsService.createCollection(data);
//     } catch (error) {
//       console.error(error);
//       throw new Error('Error while fetching collections');
//     }
//   }

//   getCollectionById(id) {
//     return new Promise((resolve, reject) => {
//       const sdk = require('api')(process.env.RESERVOIR_PROTOCOL);
//       if (!id) throw new BadRequestException('Missing id');

//       sdk.auth(process.env.API_KEY);
//       sdk.getCollectionsV6({ id: id, accept: '*/*' })
//         .then((response) => {
//           resolve(response.data.collections[0]);
//         })
//     });
//   }

//   @UseGuards(JwtGuard)
//   @Post()
//   handlerCollectionData(@Body() dto: CollectionsDto ) {
//     this.getCollectionById(dto.collection_id)
//       .then((response: any) => {
//         // this.collectionsService.createCollection(dto);
//         this.collectionsService.getAllCollections(dto);

//         // const collectionTable = {
//         //   name: collectionDataById.name,
//         //   // collection_id: collectionDataById.id,
//         //   // slug: collectionDataById.slug,
//         //   // created_at: collectionDataById.createdAt,
//         //   // image: collectionDataById.image,
//         //   // banner: collectionDataById.banner,
//         //   // discord_url: collectionDataById.discordUrl,
//         //   // external_url: collectionDataById.externalUrl,
//         //   // twitter_username: collectionDataById.twitterUsername,
//         //   // opensea_verification_status: collectionDataById.openseaVerificationStatus,
//         //   // description: collectionDataById.description,
//         //   // token_count: collectionDataById.tokenCount,
//         //   // on_sale_count: collectionDataById.onSaleCount,
//         //   // primary_contract: collectionDataById.primaryContract,
//         //   // token_set_id: collectionDataById.tokenSetId,
//         //   // creator: collectionDataById.creator,
//         //   // collection_bid_supported: collectionDataById.collectionBidSupported,
//         //   // owner_count: collectionDataById.ownerCount,
//         //   // contract_kind: collectionDataById.contractKind,
//         //   // minted_timestamp: collectionDataById.mintedTimestamp
//         // };

//         // const floorSaleData = collectionDataById.floorSale;
//         // const floorSaleTable = {
//         //   collection_id: collectionDataById.id,
//         //   sale_1day: floorSaleData['1day'],
//         //   sale_7day: floorSaleData['7day'],
//         //   sale_30day: floorSaleData['30day'],
//         // };

//         // const floorSaleChangeData = collectionDataById.floorSaleChange;
//         // const floorSaleChangeTable = {
//         //   collection_id: collectionDataById.id,
//         //   sale_1day: floorSaleChangeData['1day'],
//         //   sale_7day: floorSaleChangeData['7day'],
//         //   sale_30day: floorSaleChangeData['30day'],
//         // };
//         // // console.log(collectionTable.collection_id)
//         // // console.log(collectionTable)
//         // this.collectionsService.createCollection(collectionTable);
//       });
//   }
// }
import {
  Controller,
  Post,
  Req,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common';
import { CollectionsDto } from './dto/collections.dto';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { CollectionsService } from './collections.service';

import api from 'api';

@Controller('collection')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @UseGuards(JwtGuard)
  @Get('user')
  getUser(@Req() req: Request): Express.User {
    console.log({
      req,
    });
    return req.user;
  }

  getCollectionById(id: string): Promise<CollectionsDto> {
    return new Promise((resolve, reject): void => {
      // const { auth, getCollectionsV6 } = api(process.env.RESERVOIR_PROTOCOL);
      const { auth, getCollectionsV6 } = require('api')(process.env.RESERVOIR_PROTOCOL);

      auth(process.env.API_KEY);
      getCollectionsV6({ id, accept: '/' })
        .then((response): void => {
          resolve(response.data);
        })
        .catch((error): void => {
          reject(error);
        });
    });
  }

  @UseGuards(JwtGuard)
  @Post()
  async getCollection(@Body('id') id: string): Promise<void> {
    const data: CollectionsDto = await this.getCollectionById(id);
    console.log(data);
    return this.collectionsService.createCollection(data);
  }
}