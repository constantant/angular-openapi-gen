import { writeFileSync } from 'node:fs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  // `--export-openapi=<file>` (or OPENAPI_EXPORT) writes the spec and exits without listening.
  const exportArg = process.argv.find((a) => a.startsWith('--export-openapi='));
  const exportPath = exportArg?.slice('--export-openapi='.length) || process.env['OPENAPI_EXPORT'];
  const app = await NestFactory.create(AppModule, { logger: exportPath ? false : undefined });
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Tasks API')
      .setDescription('Demo backend. Its OpenAPI spec is generated from the Nest decorators.')
      .setVersion('1.0.0')
      .build(),
  );

  if (exportPath) {
    writeFileSync(exportPath, JSON.stringify(document, null, 2) + '\n');
    await app.close();
    return;
  }

  SwaggerModule.setup('docs', app, document, { jsonDocumentUrl: 'openapi.json' });
  // The StackBlitz preview opens this port first: land on Swagger UI instead of a 404.
  app.getHttpAdapter().get('/', (_req: unknown, res: { redirect(url: string): void }) => res.redirect('/docs'));
  const port = process.env['PORT'] || 3000;
  await app.listen(port);
  Logger.log(`API: http://localhost:${port}/api  ·  spec: http://localhost:${port}/openapi.json`);
}

bootstrap();
