import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CoreModule } from './config/config.module';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [],
  providers: [UserService, UserResolver],
  exports: [UserService,UserModule],
  imports: [CoreModule]
})
export class UserModule {}
