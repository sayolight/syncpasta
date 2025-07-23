import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { firebaseProviders } from './firebase.providers';

@Module({
  imports: [UsersModule],
  providers: [...firebaseProviders],
  exports: [UsersModule, ...firebaseProviders],
  controllers: [],
})
export class FirebaseModule {}
