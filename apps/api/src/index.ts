import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { connectDatabase } from './config/db.js';

async function bootstrap() {
  await connectDatabase();

  const server = app.listen(env.PORT, '0.0.0.0', () => {
    logger.info(`FrameCraft API server running on http://0.0.0.0:${env.PORT}`);
    logger.info(`Health check: http://0.0.0.0:${env.PORT}/api/v1/health`);
  });

  const shutdown = () => {
    logger.info('Shutting down server gracefully...');
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap().catch((err) => {
  logger.error({ err }, 'Failed to bootstrap API server');
  process.exit(1);
});
