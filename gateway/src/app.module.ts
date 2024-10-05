import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

const defaultPort: number = parseInt(process.env.PORT, 10) || 3000;
const defaultHost: string = process.env.HOST || 'localhost';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: defaultHost,
          port: defaultPort,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
