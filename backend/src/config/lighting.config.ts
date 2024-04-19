import { registerAs } from '@nestjs/config';

export default registerAs('lighting', () => ({
  socketPath: process.env.socketPath || '.lightning/testnet/lightning-rpc',
}));
