import { Controller, Post, Get, UseGuards, Query } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CollectionsService } from './collections.service';

@Controller('collection')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getCollectionById(@Query('id') id: string) {
    try{
      const collection = await this.collectionsService.fetchCollection(id);

      return collection;
    } catch (error) {
      console.error(error);
      throw new Error('Error while fetching collections');
    }
  }

  @UseGuards(JwtGuard)
  @Post()
  async postCollectionById(@Query('id') id: string) {
    try{
      const sdk = require('api')(process.env.RESERVOIR_PROTOCOL);

      sdk.auth(process.env.API_KEY);
      const response = await sdk.getCollectionsV6({id: id});

      const data = response.data.collections[0]

      return this.collectionsService.createCollection(data);
    } catch (error) {
      console.error(error);
      throw new Error('Error while saving collections');
    }
  }

  @UseGuards(JwtGuard)
  @Get()
  async getFloorSaleChange() {
    try {
      const collections = await this.collectionsService.fetchFloorSaleChange();
      return collections;
    } catch (error) {
      console.error(error);
      throw new Error('Error while getting floorSaleChange values');
    }
  }

  @UseGuards(JwtGuard)
  @Post('sync')
  async syncCollections() {
    try {
      const updatedCollections = await this.collectionsService.syncCollections();
      return { message: 'Collections updated successfully', updatedCollections };
    } catch (error) {
      console.error(error);
      throw new Error('Error while syncing collections');
    }
  }

}
