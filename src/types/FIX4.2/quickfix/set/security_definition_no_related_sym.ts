export interface ISecurityDefinitionNoRelatedSym {
  UnderlyingSymbol?: string// [1] 311 (String)
  UnderlyingSymbolSfx?: string// [2] 312 (String)
  UnderlyingSecurityID?: string// [3] 309 (String)
  UnderlyingIDSource?: string// [4] 305 (String)
  UnderlyingSecurityType?: string// [5] 310 (String)
  UnderlyingMaturityMonthYear?: string// [6] 313 (String)
  UnderlyingMaturityDay?: string// [7] 314 (String)
  UnderlyingPutOrCall?: number// [8] 315 (Int)
  UnderlyingStrikePrice?: number// [9] 316 (Float)
  UnderlyingOptAttribute?: string// [10] 317 (String)
  UnderlyingContractMultiplier?: number// [11] 436 (Float)
  UnderlyingCouponRate?: number// [12] 435 (Float)
  UnderlyingSecurityExchange?: string// [13] 308 (String)
  UnderlyingIssuer?: string// [14] 306 (String)
  EncodedUnderlyingIssuerLen?: number// [15] 362 (Length)
  EncodedUnderlyingIssuer?: Buffer// [16] 363 (RawData)
  UnderlyingSecurityDesc?: string// [17] 307 (String)
  EncodedUnderlyingSecurityDescLen?: number// [18] 364 (Length)
  EncodedUnderlyingSecurityDesc?: Buffer// [19] 365 (RawData)
  RatioQty?: number// [20] 319 (Float)
  Side?: string// [21] 54 (String)
  UnderlyingCurrency?: string// [22] 318 (String)
}