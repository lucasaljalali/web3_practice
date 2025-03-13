export async function getWalletTokens(chain: string, walletAddress: string) {
  try {
    const response = await fetch(`/api/moralis/getWalletTokens?chain=${chain}&wallet=${walletAddress}`);
    console.log({ response });

    const data = await response.json();
    console.log({ data });

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch tokens");
    }

    return data;
  } catch (error) {
    console.error("Error fetching wallet tokens:", error);
    return [];
  }
}
