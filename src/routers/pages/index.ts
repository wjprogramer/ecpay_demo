import { MerchantPayload } from './../../models/merchant_payload';
import { getGlobal } from '@src/global';
import { asyncHandler } from '@src/utils';
import { appendCheckMacValue } from '@src/utils/ec_pay/append_check_mac_value';
import express from 'express';

export const usePages = (app: express.Express) => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/order', asyncHandler(async (req, res) => {
    const { env } = getGlobal();

    const tradeNo = 1;

    let ecPayPayload: MerchantPayload = {
      MerchantID: env.M_MERCHANT_ID,
      // MerchantID: '2000132',
      // MerchantTradeNo: tradeNo.toString().padStart(20, '0'),
      MerchantTradeNo: 'ecpay20130312153023',
      MerchantTradeDate: '2013/03/12 15:30:23',
      PaymentType: 'aio',
      TotalAmount: 1000,
      TradeDesc: '促銷方案',
      ItemName: 'Apple iphone 7 手機殼',
      ReturnURL: 'https://www.ecpay.com.tw/receive.php',
      ChoosePayment: 'ALL',
      EncryptType: 1,
      CheckMacValue: '',
    };
    ecPayPayload = appendCheckMacValue(ecPayPayload);

    console.log({
      'IV': env.M_HASH_IV,
      'KEY': env.M_HASH_KEY,
      'ID': env.M_MERCHANT_ID,
    });

    res.render('order', {
      'actionUrl': `${env.EC_PAY_DOMAIN}/Cashier/AioCheckOut/V5`,
      ...ecPayPayload,
    });
  }));
}