import { Body, Controller, Post, Get } from '@nestjs/common';
import { CollectionsDto } from './dto/collections.dto';
import { CollectionsService } from './collections.service';

@Controller('collection')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Post('/')
  collection(@Body() dto: CollectionsDto) {
      console.log(
          dto
          );
      return this.collectionsService.collection();
  }

  @Get('id')
  async id(@Body() dto: CollectionsDto) {
    try {
      // Call the CollectionsService to get the actual response from the database or business logic
      const data = await this.collectionsService.collection();

      // Here, you can use the SDK code to interact with your external API
      const sdk = require('api')('@reservoirprotocol/v3.0#2n2re32lkmyg6l7');
      sdk.auth('demo-api-key');
      const result = await sdk.getCollectionsV6({ id: '0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63', accept: '*/*' });

      // Process the result or data as needed
      const processedData = {
        actualData: data, // Assuming data is the response from the CollectionsService
        externalApiData: result.data, // The actual response from the external API
      };

      // Return the processed data as the API response
      return processedData;
    } catch (error) {
      // Handle any potential errors and return an error response
      return { error: 'An error occurred while processing the request' };
    }
  }
}
