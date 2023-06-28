import * as bcrypt from 'bcrypt';

export async function generateHash(token: string): Promise<string> {
  const salt = await bcrypt.genSalt<number>(5);
  return await bcrypt.hash<string>(token, salt);
}
