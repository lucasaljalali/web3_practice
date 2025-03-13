export interface Token {
  id: string;
  symbol: string;
  name: string;
  decimals: number;
  derivedETH: string;
}

export interface GetTokensResponse {
  tokens: Token[];
}