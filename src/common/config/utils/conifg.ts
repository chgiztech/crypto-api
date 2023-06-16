import fs from 'fs';
import dotenv from 'dotenv';

const DEFAULT_ENV_FILE_PATH = '.env';

export type EnvValueType = string | number | boolean | undefined;

interface ConfigInterface {
  [key: string]: EnvValueType;
}

type CacheType = Map<string, ConfigInterface>;

const cache = new Map() as CacheType;

export const config = (): ConfigInterface => {
  if (cache.has(DEFAULT_ENV_FILE_PATH)) {
    return cache.get(DEFAULT_ENV_FILE_PATH);
  } else {
    const config = Object.assign(
      dotenv.parse(fs.readFileSync(DEFAULT_ENV_FILE_PATH, 'utf-8')),
      process.env,
    ) as ConfigInterface;

    cache.set(DEFAULT_ENV_FILE_PATH, config);
  }

  return cache.get(DEFAULT_ENV_FILE_PATH);
};
