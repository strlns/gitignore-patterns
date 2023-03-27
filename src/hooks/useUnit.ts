import { useTheme } from "@geist-ui/core";

export default function useThemeUnit() {
  const {
    layout: { unit },
  } = useTheme();
  return unit;
}
