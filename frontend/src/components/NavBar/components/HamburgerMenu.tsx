import { IconButton } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";

const HamburgerMenu = () => {
  return (
    <IconButton
      aria-label="menu"
      colorScheme="white"
      variant={"ghost"}
      icon={<GiHamburgerMenu />}
      rounded={"full"}
      display={{ base: "flex", md: "none" }}
      //   onClick={}
    />
  );
};

export default HamburgerMenu;
