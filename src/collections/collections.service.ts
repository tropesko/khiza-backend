import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CollectionsDto } from './dto/collections.dto';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}
  async createCollection(dto: CollectionsDto) {
    console.log(dto.name)
    this.prisma.collections.create({
      data: {
        name: dto.name,
      },
      select: {
        id: true,
        name: true,
      }
    })
  }

  async getAllCollections(dto: CollectionsDto) {
    // console.log(dto.name)
    this.prisma.collections.findMany()
  }

  async getCollectionById(id) {
    try {
      const collections = await this.prisma.collections.findUnique(id);
      return collections;
    } catch (error) {
      throw new Error('Error while fetching collection');
    }
  }
}
