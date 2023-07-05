import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class BitcoinService {
  constructor(private readonly httpService: HttpService) {}

  
}
