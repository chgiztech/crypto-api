// import { Injectable } from '@nestjs/common';
// import { NetEnum } from './enums/net.enum';
// import { ClientBitCoinService } from './services/client-bitcoin.service';
// import { ClientEthereumService } from './services/client-ethereum.service';

// @Injectable()
// export class BridgeFactory {
//   constructor(
//     private readonly clientBitcoinService: ClientBitCoinService,
//     private readonly clientEthereumService: ClientEthereumService,
//   ) {}

//   public async for(network: string) {
//     switch (network) {
//       case NetEnum.BTC:
//         return this.clientBitcoinService;
//       case NetEnum.ETH:
//         return this.clientEthereumService;
//       default:
//         throw new Error('Invalid network');
//     }
//   }
// }
