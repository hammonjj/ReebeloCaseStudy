import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isDevelopment = config.get<string>('NODE_ENV') === 'development';
        return isDevelopment
          ? {
              type: 'sqlite' as const,
              database: config.get<string>('DB_PATH') ?? join(__dirname, '../../dev.sqlite'),
              entities: [join(__dirname, '../**/*.entity.{ts,js}')],
              synchronize: false, // Change this if you want the schema to be auto-created on launch
            }
          : {
              type: 'postgres' as const,
              host: config.get<string>('DB_HOST'),
              port: config.get<number>('DB_PORT'),
              username: config.get<string>('DB_USER'),
              password: config.get<string>('DB_PASSWORD'),
              database: config.get<string>('DB_NAME'),
              entities: [join(__dirname, '../**/*.entity.{ts,js}')],
              synchronize: false, // Don't leave this on for production!
              uuidExtension: 'uuid-ossp'
            };
      },
    }),
  ],
})

export class DatabaseModule {}
