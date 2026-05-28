import { Module } from '@nestjs/common';
import { firebaseProviders } from './firebase.providers';

@Module({
  imports: [],
  providers: [...firebaseProviders],
  exports: [...firebaseProviders],
  controllers: [],
})
export class FirebaseModule {}
