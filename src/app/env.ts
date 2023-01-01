import * as dotenv from 'dotenv';

export type Env = {
  EC_PAY_DOMAIN: string,
  M_MERCHANT_ID: string,
  M_HASH_KEY: string,
  M_HASH_IV: string,
  P_PLATFORM_ID: string,
  P_HASH_KEY: string,
  P_HASH_IV: string,
}

export const initEnv = (): Env => {
  dotenv.config();

  return {
    EC_PAY_DOMAIN: process.env.EC_PAY_DOMAIN!,
    M_MERCHANT_ID: process.env.M_MERCHANT_ID!,
    M_HASH_KEY: process.env.M_HASH_KEY!,
    M_HASH_IV: process.env.M_HASH_IV!,
    P_PLATFORM_ID: process.env.P_PLATFORM_ID!,
    P_HASH_KEY: process.env.P_HASH_KEY!,
    P_HASH_IV: process.env.P_HASH_IV!,
  };
}