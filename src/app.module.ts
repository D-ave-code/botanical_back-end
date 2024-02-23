import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { InvernaderosModule } from './invernaderos/invernaderos.module';
import { TiendaModule } from './tienda/tienda.module';
import { HitosModule } from './hitos/hitos.module';
import { PlantasModule } from './plantas/plantas.module';
import { PagosService } from './pagos/pagos.service';
import { PagosController } from './pagos/pagos.controller';
import { PagosModule } from './pagos/pagos.module';
import { InvernaderosService } from './invernaderos/invernaderos.service';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { ModeloService } from './modelo/modelo.service';
import { ModeloModule } from './modelo/modelo.module';


@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: ['dist/database/entities/*.entity.js'],
      synchronize: process.env.MODE === 'production' ? false : true,
      migrations: ['dist/src/database/migrations/*.js'],
    }),
    dataSourceFactory: async (options) => {
      const dataSource = await new DataSource(options).initialize();
      return dataSource;
    }
  }),
  MailerModule.forRoot({
    transport: process.env.MAIL_SMTP,
  })
  ,AuthModule, UsersModule, InvernaderosModule,TiendaModule, HitosModule, PlantasModule, PagosModule, NotificacionesModule, ModeloModule],
  controllers: [AppController],
  providers: [AppService, ModeloService],
})
export class AppModule {}
