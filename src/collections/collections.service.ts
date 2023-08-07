import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CollectionsDto } from './dto/collections.dto';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async checkExistingCollection(id: string) {
    return await this.prisma.collections.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createCollection(dto: CollectionsDto) {
    const existingCollection = await this.checkExistingCollection(dto.id)

    if (existingCollection) {
      return { msg: 'Collection already exists on database.' }
    }

    try {
        const newCollection = this.prisma.collections.create({
          data: {
            id: dto.id,
            slug: dto.slug || '',
            createdAt: dto.createdAt || '',
            name: dto.name || '',
            image: dto.image || '',
            banner: dto.banner || '',
            discordUrl: dto.discordUrl || '',
            externalUrl: dto.externalUrl || '',
            twitterUsername: dto.twitterUsername || '',
            openseaVerificationStatus: dto.openseaVerificationStatus || '',
            description: dto.description || '',
            sampleImages: dto.sampleImages,
            tokenCount: dto.tokenCount || '',
            onSaleCount: dto.onSaleCount || '',
            primaryContract: dto.primaryContract || '',
            tokenSetId: dto.tokenSetId || '',
            creator: dto.creator || '',
            royalties: dto.royalties || '',
            allRoyalties: dto.allRoyalties || '',
            floorAsk: dto.floorAsk || '',
            topBid: dto.topBid || '',
            rank: dto.rank || '',
            volume: dto.volume || '',
            collectionBidSupported: dto.collectionBidSupported,
            ownerCount: dto.ownerCount,
            contractKind: dto.contractKind || '',
            mintedTimestamp: dto.mintedTimestamp || '',
            mintStages: dto.mintStages,
            volumeChange: dto.volumeChange,
            floorSale: dto.floorSale,
            floorSaleChange: dto.floorSaleChange,
          },
        });
        return newCollection
    }catch (error) {
        throw new Error('Error while creating collection.');
    }
  }

  async fetchCollection(id: string) {
    const existingCollection = await this.checkExistingCollection(id)

    if (!existingCollection) {
      return { msg: 'Collection does not exists on database.' }
    } else {
      return existingCollection
    }
  }

  async fetchFloorSaleChange() {
    const collections = await this.prisma.collections.findMany({
      select: {
        floorSaleChange: true,
      },
      orderBy: {
        'floorSaleChange': 'asc',
      },
    })

    const lowestFloorSaleChange = collections[0]?.floorSaleChange?.['30day'] * 100 || null;

    const thirtyDayValues = collections.map((collection) => collection.floorSaleChange["30day"]);
    const averageThirtyDayValue = thirtyDayValues.reduce((a, b) => a + b, 0) / thirtyDayValues.length;
    const averagePercentage = averageThirtyDayValue * 100;

    return { averagePercentage, lowestFloorSaleChange }
  }

  async syncCollections() {
    const collectionIds = await this.prisma.collections.findMany({
      select: {
        id: true,
      },
    });

    const sdk = require('api')(process.env.RESERVOIR_PROTOCOL);
    sdk.auth(process.env.API_KEY);
    const response = await sdk.getCollectionsV6();

    const updatedCollections = [];
    for (const collectionData of response.data.collections) {
      const existingCollection = collectionIds.find((c) => c.id === collectionData.id);

      if (existingCollection) {
        const updatedCollection = await this.prisma.collections.update({
          where: {
            id: existingCollection.id,
          },
          data: {
            slug: collectionData.slug || '',
            createdAt: collectionData.createdAt || '',
            name: collectionData.name || '',
            image: collectionData.image || '',
            banner: collectionData.banner || '',
            discordUrl: collectionData.discordUrl || '',
            externalUrl: collectionData.externalUrl || '',
            twitterUsername: collectionData.twitterUsername || '',
            openseaVerificationStatus: collectionData.openseaVerificationStatus || '',
            description: collectionData.description || '',
            sampleImages: collectionData.sampleImages,
            tokenCount: collectionData.tokenCount || '',
            onSaleCount: collectionData.onSaleCount || '',
            primaryContract: collectionData.primaryContract || '',
            tokenSetId: collectionData.tokenSetId || '',
            creator: collectionData.creator || '',
            royalties: collectionData.royalties || '',
            allRoyalties: collectionData.allRoyalties || '',
            floorAsk: collectionData.floorAsk || '',
            topBid: collectionData.topBid || '',
            rank: collectionData.rank || '',
            volume: collectionData.volume || '',
            collectionBidSupported: collectionData.collectionBidSupported,
            ownerCount: collectionData.ownerCount,
            contractKind: collectionData.contractKind || '',
            mintedTimestamp: collectionData.mintedTimestamp || '',
            mintStages: collectionData.mintStages,
            volumeChange: collectionData.volumeChange,
            floorSale: collectionData.floorSale,
            floorSaleChange: collectionData.floorSaleChange,
          },
        });
        updatedCollections.push(updatedCollection);
      }
    }

    return updatedCollections;
  }
}