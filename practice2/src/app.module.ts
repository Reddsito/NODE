import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./product/product.module";


@Module({
    imports: [ProductModule,MongooseModule.forRoot('mongodb://root:password@mongo2container:27017/')],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
