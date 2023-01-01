/**
 * 特店傳入參數說明(共同參數)
 * ref: https://developers.ecpay.com.tw/?p=2862
 */
export type MerchantPayload = {
  /**
   * 特店編號 必填
   * String(10)
   */
  MerchantID: string,
  /**
   * 特店訂單編號 必填
   * String(20)
   *
   * - 特店訂單編號均為唯一值，不可重複使用。
   * - 英數字大小寫混合
   */
  MerchantTradeNo: string,
  /**
   * 特店交易時間 必填
   * String(20)
   * 格式為：yyyy/MM/dd HH:mm:ss
   */
  MerchantTradeDate: string,
  /**
   * 交易類型 必填
   * String(20)
   * 請固定填入 aio
   */
  PaymentType: string,
  /**
   * 交易金額 必填
   * Int
   * 請帶整數，不可有小數點。
   * 僅限新台幣
   */
  TotalAmount: number,
  /**
   * 交易描述 必填
   * String(200)
   * 請勿帶入特殊字元。
   */
  TradeDesc: string,
  /**
   * 商品名稱 必填
   * String(400)
   *
   * 如果商品名稱有多筆，需在金流選擇頁一行一行顯示商品名稱的話，商品名稱請以符號#分隔。
   * 商品名稱字數限制為中英數400字內，超過此限制系統將自動截斷。
   */
  ItemName: string,
  /**
   * 付款完成通知回傳網址 必填
   * String(200)
   *
   * ReturnURL為付款結果通知回傳網址，為特店server或主機的URL，用來接收綠界後端回傳的付款結果通知。
   * 當消費者付款完成後，綠界會將付款結果參數以幕後回傳到該網址。詳細說明請參考付款結果通知
   *
   * 注意事項:
   * - 請勿設定與Client端接收付款結果網址OrderResultURL相同位置，避免程式判斷錯誤。
   * - ReturnURL收到綠界後端回傳的付款結果通知後，請回應字串1|OK給綠界。
   * - 1|OK僅是廠商回應綠界是否收到通知，並不會改變付款狀態。
   */
  ReturnURL: string,
  /**
   * 選擇預設付款方式 必填
   * String(20)
   *
   * 綠界提供下列付款方式：
   *
   * - Credit：信用卡及銀聯卡(需申請開通)
   * - WebATM：網路ATM
   * - ATM：自動櫃員機
   * - CVS：超商代碼
   * - BARCODE：超商條碼
   * - ApplePay: Apple Pay(僅支援手機支付)
   * - ALL：不指定付款方式，由綠界顯示付款方式選擇頁面。
   *
   * 注意事項:
   *
   * - 若為手機版時不支援下列付款方式：WebATM
   * - 如需要不透過綠界畫面取得ATM、CVS、BARCODE的繳費代碼，請參考如何不經過綠界畫面取得ATM、CVS、BARCODE的繳費代碼。
   * - 當瀏覽器不為Safari時，不會顯示Apple Pay付款功能。
   */
  ChoosePayment: string,
  /**
   * 檢查碼 必填
   */
  CheckMacValue: string,
  /**
   * CheckMacValue加密類型 必填
   * Int
   *
   * 請固定填入1，使用SHA256加密
   */
  EncryptType: number,
  /**
   * 特店旗下店舖代號
   * String(10)
   * 提供特店填入分店代號使用，僅可用英數字大小寫混合。
   */
  StoreID?: string,
  /**
   * Client端返回特店的按鈕連結
   * String(200)
   * 消費者點選此按鈕後，會將頁面導回到此設定的網址
   *
   * 注意事項:
   *
   * - 導回時不會帶付款結果到此網址，只是將頁面導回而已。
   * - 設定此參數，綠界會在付款完成或取號完成頁面上顯示[返回商店]的按鈕。
   * - 設定此參數，發生簡訊OTP驗證失敗時，頁面上會顯示[返回商店]的按鈕。
   * - 若未設定此參數，則綠界付款完成頁或取號完成頁面，不會顯示[返回商店]的按鈕。
   * - 若導回網址未使用https時，部份瀏覽器可能會出現警告訊息。
   */
  ClientBackURL?: string,
  /**
   * 商品銷售網址
   * String(200)
   */
  ItemURL?: string,
  /**
   * 備註欄位
   * String(100)
   */
  Remark?: string,
  /**
   * 付款子項目
   * String(20)
   * 若設定此參數，建立訂單將轉導至綠界訂單成立頁，依設定的付款方式及付款子項目帶入訂單，無法選擇其他付款子項目。請參考付款方式一覽表
   *
   * 注意事項:
   * 因板信銀行會於每月進行例行維護，當遇銀行維護時，將會建立訂單失敗。
   */
  ChooseSubPayment?: string,
  /**
   * Client端回傳付款結果網址
   * String(200)
   * 有別於ReturnURL (server端的網址)，OrderResultURL為特店的client端(前端)網址。消費者付款完成後，綠界會將付款結果參數以POST方式回傳到到該網址。詳細說明請參考付款結果通知。
   * 注意事項：
      若與[ClientBackURL]同時設定，將會以此參數為主。
      銀聯卡及非即時交易( ATM、CVS、BARCODE )不支援此參數。
   */
  OrderResultURL?: string,
  /**
   * 是否需要額外的付款資訊
   * String(1)
   *
   *   額外的付款資訊
   *
   * 若不回傳額外的付款資訊時，參數值請傳：Ｎ；
   * 若要回傳額外的付款資訊時，參數值請傳：Ｙ，付款完成後綠界後端會以POST方式回傳額外付款資訊到特店的ReturnURL。
   *
   * 注意事項：回傳額外付款資訊參數請參考-額外回傳的參數
   */
  NeedExtraPaidInfo?: string,
  /**
   * 隱藏付款方式
   * String(100)
   *
   * 當付款方式[ChoosePayment]為ALL時，可隱藏不需要的付款方式，多筆請以井號分隔 (#)。
   * 可用的參數值：
   *
   * - Credit：信用卡
   * - WebATM：網路ATM
   * - ATM：自動櫃員機
   * - CVS：超商代碼
   * - BARCODE：超商條碼
   */
  IgnorePayment?: string,
  /**
   * 特約合作平台商代號
   * String(10)
   * 為專案合作的平台商使用。
   */
  PlatformID?: string,
  /**
   * 自訂名稱欄位1
   * String(50)
   * 提供合作廠商使用記錄用客製化使用欄位。
   */
  CustomField1?: string,
  /**
   * 自訂名稱欄位2
   */
  CustomField2?: string,
  /**
   * 自訂名稱欄位3
   */
  CustomField3?: string,
  /**
   * 自訂名稱欄位4
   */
  CustomField4?: string,
  /**
   * 語系設定
   * String(3)
   *
   * 預設語系為中文，若要變更語系參數值請帶：
   *
   * ENG：英語
   * KOR：韓語
   * JPN：日語
   * CHI：簡體中文
   */
  Language?: string,
}
