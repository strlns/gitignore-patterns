import { Link, Text } from "@geist-ui/core";
import { Github } from "@geist-ui/icons";
import Box from "components/Atoms/Box";
import IconLink from "components/Atoms/IconLink";
import useThemeUnit from "hooks/useUnit";

export default function BottomBar() {
  const unit = useThemeUnit();

  return (
    <Box
      style={{ padding: unit }}
      gap={4}
      horizontal
      justifyContent="space-between"
      alignItems="center"
    >
      <Text small>
        <Link color href="https://moritzrehbach.de">
          MR 03/2023
        </Link>
      </Text>
      <IconLink iconLeft={<Github />} href="https://github.com/strlns/gitignore-patterns">
        View code
      </IconLink>
    </Box>
  );
}
