import { config } from 'dotenv';

config();

export interface EnvParam<TProperty> {
  defaultValue?: TProperty;
}

export function EnvValue<TProperty>(params?: EnvParam<TProperty>) {
  return function (target: any, key: string): void {
    const { defaultValue } = params || {};
    let value = process.env[key];

    if (!value) {
      value = typeof defaultValue !== 'undefined' ? defaultValue : target[key];
    }

    Object.defineProperty(target, key, {
      value,
      enumerable: true,
      writable: false,
    });
  };
}
