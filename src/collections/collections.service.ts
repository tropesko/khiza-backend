import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async collection() {
    try {
        const collections = await this.prisma.collections.findMany();
        return collections;
    }catch (error) {
        throw new Error('Error while fetching collections');
    }
  }

  async getCollectionById(id) {
    try {
        const collections = await this.prisma.collections.findUnique(id)
        return collections;
    }catch (error) {
        throw new Error('Error while fetching collection');
    }
  }
}
