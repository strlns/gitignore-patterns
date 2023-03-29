import { Sun, Moon } from "@geist-ui/icons";
import useColorScheme from "hooks/useColorScheme";
import SquareButton from "components/Atoms/SquareButton";

export default function DarkModeSwitch() {
  const { isDarkMode, switchThemes } = useColorScheme();
  return (
    <SquareButton
      icon={isDarkMode ? <Sun /> : <Moon />}
      onClick={switchThemes}
      title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    />
  );
}
