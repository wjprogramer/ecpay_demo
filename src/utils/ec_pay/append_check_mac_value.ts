import sha256 from 'sha256';
import crypto from 'crypto';
import { getGlobal } from "@src/global";
import { MerchantPayload } from "@src/models/merchant_payload";

// https://www.npmjs.com/package/ecpay_aio_nodejs?activeTab=explore

// https://developers.ecpay.com.tw/?p=2902
export const appendCheckMacValue = (payloadToEcPay: MerchantPayload): MerchantPayload => {
  const { env } = getGlobal();
  const result: any = { ...payloadToEcPay };
  delete result.CheckMacValue;

  // // Step 1
  // let checkMacValue = Object.entries(result)
  //   .sort((a, b) => ('' + a[0]).localeCompare(b[0]))
  //   .map((e) => `${e[0]}=${e[1]}`)
  //   .join('&');
  // // Step 2
  // checkMacValue = `HashKey=${env.M_HASH_KEY}&${checkMacValue}&HashIV=${env.M_HASH_IV}`;
  // console.log(checkMacValue + '\n\n');
  // // Step 3 ~ 4
  // checkMacValue = urlencode_dot_net(checkMacValue).toLowerCase();
  // console.log(checkMacValue + '\n\n');
  // // Step 5
  // checkMacValue = sha256Encode(checkMacValue);
  // console.log(checkMacValue + '\n\n');
  // // Step 6
  // checkMacValue = checkMacValue.toUpperCase();
  // console.log(checkMacValue + '\n\n');

  result.CheckMacValue = gen_chk_mac_value(result);
  return result as MerchantPayload;
}

const urlencode_dot_net = (raw_data: string) => {
  let encode_data = encodeURIComponent(raw_data);
  encode_data = encode_data.replace(/\'/g, "%27");
  encode_data = encode_data.replace(/\~/g, "%7e");
  encode_data = encode_data.replace(/\%20/g, "+");
  return encode_data
}

const gen_chk_mac_value = (params: any, mode = 1) => {
  const { env } = getGlobal();
  // throw exception if param contains CheckMacValue, HashKey, HashIV
  let sec = ['CheckMacValue', 'HashKey', 'HashIV'];
  sec.forEach(function (pa) {
    if (Object.keys(params).includes(pa)) {
      throw new Error(`Parameters shouldn't contain ${pa}`);
    }
  });

  let od: any = {};
  let temp_arr = (Object.keys(params).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }));
  // console.log(temp_arr);
  let raw: any = temp_arr.forEach(function (key) { od[key] = params[key]; });
  raw = JSON.stringify(od).toLowerCase().replace(/":"/g, '=');
  raw = raw.replace(/","|{"|"}/g, '&');
  raw = urlencode_dot_net(`HashKey=${env.M_HASH_KEY}${raw}HashIV=${env.M_HASH_IV}`);
  console.log(raw);

  let chksum = "";
  switch (mode) {
    case 0:
      chksum = crypto.createHash('md5').update(raw).digest('hex');
      break;
    case 1:
      chksum = crypto.createHash('sha256').update(raw).digest('hex');
      break;
    default:
      throw new Error("Unexpected hash mode.");
  }

  return chksum.toUpperCase();
}


const sha256Encode = (message: string) => {
  // ############## V1
  // const hashBuffer = crypto.SHA256(message);
  // const hashArray = hashBuffer.words;
  // const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  // return hashHex;

  // ############## V2
  // // encode as UTF-8
  // const msgBuffer = new TextEncoder().encode(message);

  // // hash the message
  // const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // // convert ArrayBuffer to Array
  // const hashArray = Array.from(new Uint8Array(hashBuffer));

  // // convert bytes to hex string
  // const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  // return hashHex;

  // ############## V3
  return sha256.x2(message);
}