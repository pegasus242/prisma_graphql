import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { UserModule } from '../user/user.module';
import { AddressResolver } from './address.resolver';


@Module({
  controllers: [],
  imports: [UserModule],
  providers: [AddressService, AddressResolver],
  exports: [],
})
export class AddressModule {}


