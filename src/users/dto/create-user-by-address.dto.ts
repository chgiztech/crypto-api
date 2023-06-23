import { IsString } from 'class-validator';

export class CreateUserByAddressDto {
  @IsString()
  public readonly address: string;
}
