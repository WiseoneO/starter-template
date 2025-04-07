import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CustomLogger } from 'src/customLogger';

@Module({
  providers: [PrismaService, CustomLogger],
  exports: [PrismaService]

})
export class PrismaModule {}
