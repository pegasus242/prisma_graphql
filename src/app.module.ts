import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './usecases/auth/auth.module';
import { FrameworkModule } from './framework/framework.module';
import { UserModule } from './usecases/user/user.module';
import { ProfileModule } from './usecases/profile/profile.module';
import { AddressModule } from './usecases/address/address.module';

@Module({
  imports: [UserModule, AuthModule, ProfileModule, AddressModule, FrameworkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
