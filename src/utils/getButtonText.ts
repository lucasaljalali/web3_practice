export function getButtonText(isConnected: boolean, isConnecting: boolean, isPending: boolean, isError: boolean) {
  if (isConnected) return "Disconnect Wallet";
  if (isPending) return "Waiting confirmation...";
  if (isConnecting) return "Connecting...";
  if (isError) return "Try Again!";
  return "Connect Wallet";
}
