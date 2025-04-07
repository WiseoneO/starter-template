import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async getOne(criteria: any) {
        return await this.prisma.user.findFirst({
            where: criteria,
        })
    }
}
