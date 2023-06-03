type EnvValueType = string | number | boolean | undefined;

interface Options {
  readonly required?: boolean;
}

export function Env(options?: Options) {
  return function (target: any, key: string): void {
    const value = process.env[key] as EnvValueType;

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
