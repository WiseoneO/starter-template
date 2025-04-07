import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomLogger } from './customLogger';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.env`,
    isGlobal: true,
  }),
    AuthModule,
    MailModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [AuthService, MailService, UsersService, CustomLogger],
})
export class AppModule {}
