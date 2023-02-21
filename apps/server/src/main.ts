import { buildServer } from "./utils/buildServer";
import { logger } from "./utils/logger";

const port = (process.env.API_PORT && parseInt(process.env.API_PORT)) || 4000;
const host = process.env.API_HOST || "0.0.0.0";

const server = buildServer();

function main() {
  try {
    server.listen({ port, host });
    logger.info(`Server started at http://${host}:${port}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

main();
