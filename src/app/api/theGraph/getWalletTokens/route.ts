import { gql, request } from "graphql-request";
import { GetTokensResponse } from "../interfaces";
import { NextRequest, NextResponse } from "next/server";

const THEGRAPH_API_KEY = process.env.THEGRAPH_API_KEY;

const UNISWAP_SUBGRAPH_URL = process.env.UNISWAP_SUBGRAPH_URL;

const GET_TOKENS_QUERY = gql`
  query getTokens($wallet: String!) {
    tokens(where: { owner: $wallet }) {
      id
      symbol
      name
      decimals
      derivedETH
    }
  }
`;

export async function GET(req: NextRequest) {
  try {
    if (!THEGRAPH_API_KEY) {
      return NextResponse.json({ error: "The Graph API KEY missing" }, { status: 500 });
    }

    if (!UNISWAP_SUBGRAPH_URL) {
      return NextResponse.json({ error: "UNISWAP SUBGRAPH URL missing" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get("wallet");

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });
    }

    const data = await request<GetTokensResponse>(UNISWAP_SUBGRAPH_URL, GET_TOKENS_QUERY, {
      wallet: walletAddress.toLowerCase(),
    });

    return NextResponse.json(data.tokens);
  } catch (error) {
    console.error("Error fetching wallet tokens:", error);
    return NextResponse.json({ error: "Failed to fetch tokens" }, { status: 500 });
  }
}
