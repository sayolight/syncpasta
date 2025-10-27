import { ConfigService } from '@nestjs/config';
import * as firebaseAdmin from 'firebase-admin';

export const firebaseProviders = [
  {
    provide: 'FIREBASE_ADMIN',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const admin = firebaseAdmin;
      const serviceAccount = {
        type: configService.get<string>('FIREBASE_TYPE'),
        projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
        privateKeyId: configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
        privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY'),
        clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
        clientId: configService.get<string>('FIREBASE_CLIENT_ID'),
        authUri: configService.get<string>('FIREBASE_AUTH_URI'),
        tokenUri: configService.get<string>('FIREBASE_TOKEN_URI'),
        authProviderX509CertUrl: configService.get<string>(
          'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',
        ),
        clientC509CertUrl: configService.get<string>('FIREBASE_CLIENT_X509_CERT_URL'),
        universeDomain: configService.get<string>('FIREBASE_UNIVERSE_DOMAIN'),
      };

      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    },
  },
];
