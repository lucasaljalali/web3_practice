export async function getWalletTokens(walletAddress: string) {
  try {
    const response = await fetch(`/api/theGraph/getWalletTokens?wallet=${walletAddress}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch tokens");
    }

    return data;
  } catch (error) {
    console.error("Error fetching wallet tokens:", error);
    return [];
  }
}
