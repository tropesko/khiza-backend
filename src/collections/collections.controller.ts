import { Controller, Post, Req, Get, UseGuards, Query } from '@nestjs/common';
import { CollectionsDto } from './dto/collections.dto';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { CollectionsService } from './collections.service';

@Controller('collection')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @UseGuards(JwtGuard)
  @Get('user')
  getUser(@Req() req: Request) {
    console.log({
      req,
    });
    return req.user;
  }

  @UseGuards(JwtGuard)
  @Post()
  async getCollection(@Query('id') id: string) {
    try{
      const sdk = require('api')(process.env.RESERVOIR_PROTOCOL);

      sdk.auth(process.env.API_KEY);
      const response = await sdk.getCollectionsV6({id, accept: '*/*'});
      const data = response.data;

      console.log(id)
      // return data;
      return this.collectionsService.createCollection(data);
    } catch (error) {
      console.error(error);
      throw new Error('Error while fetching collections');
    }
  }
}
