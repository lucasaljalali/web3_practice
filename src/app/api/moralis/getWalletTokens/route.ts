import { NextRequest, NextResponse } from "next/server";
import Moralis from "moralis";

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

export async function GET(req: NextRequest) {
  try {
    if (!MORALIS_API_KEY) {
      return NextResponse.json({ error: "Moralis API KEY missing" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get("wallet");
    const chainId = searchParams.get("chain");

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });
    }

    if (!chainId) {
      return NextResponse.json({ error: "Chain ID is required" }, { status: 400 });
    }

    await Moralis.start({ apiKey: MORALIS_API_KEY });

    const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
      chain: chainId,
      address: walletAddress,
    });

    return NextResponse.json(response.raw);
  } catch (error) {
    console.error("Error fetching wallet tokens:", error);
    return NextResponse.json({ error: "Failed to fetch tokens" }, { status: 500 });
  }
}
