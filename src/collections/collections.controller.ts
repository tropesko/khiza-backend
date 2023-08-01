import { Body, Controller, Post } from '@nestjs/common';
import { CollectionsDto } from './dto/collections.dto';
import { CollectionsService } from './collections.service';

@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Post('collection')
  collection(@Body() dto: CollectionsDto) {
      console.log(
          dto
          );
      return this.collectionsService.collection();
  }
}
