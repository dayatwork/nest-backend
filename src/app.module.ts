import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    PatientsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
