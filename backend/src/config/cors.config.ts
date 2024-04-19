import { registerAs } from '@nestjs/config';

export default registerAs('cors', () => ({
  origin: /^http?:\/\/localhost.*$/,

  credentials: true,
}));
