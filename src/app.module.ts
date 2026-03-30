import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { ProfileModule } from './profile/profile.module';

@Module({

  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/'),
    UsersModule,
    ProductModule,
    OrdersModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
