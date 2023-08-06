import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CollectionsDto } from './dto/collections.dto';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}
  async createCollection(dto: CollectionsDto) {
    const existingCollection = await this.prisma.collections.findUnique({
      where: {
        id: dto.id,
      },
    });

    if (existingCollection) {
      return { msg: 'Collection already exists on database.' }
    }

    try {
        const newCollection = this.prisma.collections.create({
          data: {
            id: dto.id,
            slug: dto.slug,
            createdAt: dto.createdAt,
            name: dto.name,
            image: dto.image,
            banner: dto.banner,
            discordUrl: dto.discordUrl,
            externalUrl: dto.externalUrl,
            twitterUsername: dto.twitterUsername,
            openseaVerificationStatus: dto.openseaVerificationStatus,
            description: dto.description,
            sampleImages: dto.sampleImages,
            tokenCount: dto.tokenCount,
            onSaleCount: dto.onSaleCount,
            primaryContract: dto.primaryContract,
            tokenSetId: dto.tokenSetId,
            creator: dto.creator,
            collectionBidSupported: dto.collectionBidSupported,
            ownerCount: dto.ownerCount,
            contractKind: dto.contractKind,
            mintedTimestamp: dto.mintedTimestamp || '',
            mintStages: dto.mintStages,
          },
        })
        return newCollection
    }catch (error) {
        throw new Error('Error while creating collection.');
    }
  }
}
