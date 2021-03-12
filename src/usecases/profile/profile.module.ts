import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserModule } from '../user/user.module';
import { ProfileResolver } from './profile.resolver';


@Module({
  controllers: [],
  imports: [UserModule],
  providers: [ProfileService, ProfileResolver],
  exports: [],
})
export class ProfileModule {}


