import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.connectWithRetry();
  }

  async connectWithRetry(attempts = 5, delay = 3000): Promise<void> {
    for (let i = 1; i <= attempts; i++) {
      try {
        await this.$connect();
        console.log('Connected to the database');
        return;
      } catch (error) {
        console.error(
          `Attempt ${i} failed. Retrying in ${delay / 1000} seconds...`,
        );
        if (i === attempts) throw error;
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
}
