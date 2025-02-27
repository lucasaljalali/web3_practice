import { ButtonPropsColorOverrides } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

export function getButtonColor(isConnected: boolean, isError: boolean) {
  return (isConnected ? "warning" : isError ? "error" : "primary") as OverridableStringUnion<
    "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
    ButtonPropsColorOverrides
  >;
}
