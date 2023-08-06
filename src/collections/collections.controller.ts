import { Controller, Post, Req, Get, UseGuards, Query } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { CollectionsService } from './collections.service';

@Controller('collection')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @UseGuards(JwtGuard)
  @Get('user')
  getUser(@Req() req: Request) { return req.user }

  @UseGuards(JwtGuard)
  @Post()
  async getCollection(@Query('id') id: string) {
    try{
      const sdk = require('api')(process.env.RESERVOIR_PROTOCOL);

      sdk.auth(process.env.API_KEY);
      const response = await sdk.getCollectionsV6(id);

      const data = response.data.collections[0]
      // const royalties = data.royalties;
      // const floorSaleChange = data.floorSaleChange;
      // console.log(floorSaleChange)

      return this.collectionsService.createCollection(data);
    } catch (error) {
      console.error(error);
      throw new Error('Error while fetching collections');
    }
  }
}
