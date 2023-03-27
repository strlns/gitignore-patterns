import { Link } from "@geist-ui/core";
import { Github } from "@geist-ui/icons";
import Box from "components/Atoms/Box";
import SquareButton from "components/Atoms/SquareButton";
import DarkModeSwitch from "components/DarkModeSwitch";
import useThemeUnit from "hooks/useUnit";

export default function TopBarButtons() {
  const unit = useThemeUnit();
  return (
    <Box
      justifyContent="space-between"
      style={{ position: "fixed", top: unit, right: unit }}
    >
      <DarkModeSwitch />
      <Link href="https://github.com/strlns/gitignore-patterns" title="View on GitHub">
        <SquareButton icon={<Github />} />
      </Link>
    </Box>
  );
}
