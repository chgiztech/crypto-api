import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function useSwagger(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('Crytpo API')
    .addBearerAuth()
    .setDescription(
      'Welcome! Using endpoints below to interact with blockchains in any supported cryptocurrencies',
    )
    .setContact(
      'Chingiz Sirgelbayev',
      'https://github.com/Chsirgelbayev',
      'csirgilbaev.gmail.com',
    )
    .setLicense('MIT', 'https://choosealicense.com/licenses/mit')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document, {
    // customSiteTitle: 'Crytpo API',
    // customCssUrl: '/public/swagger/theme-feeling-blue.css',
  });
}
