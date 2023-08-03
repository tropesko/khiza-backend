import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CollectionsModule } from './collections/collections.module';

@Module({
  imports: [AuthModule, PrismaModule, CollectionsModule],
  providers: [PrismaService],
})
export class AppModule {}

