import { config, EnvValueType } from './conifg';

interface EnvOptions {
  readonly required?: boolean;
}

export function Env(options?: EnvOptions) {
  return function (target: any, key: string): void {
    const value = config()[key] as EnvValueType;

    if (options?.required && !value) {
      throw new Error(`Environment variable ${key} is required`);
    }

    Object.defineProperty(target, key, {
      value,
      enumerable: true,
      writable: false,
    });
  };
}
