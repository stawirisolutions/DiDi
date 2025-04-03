import { Flex, Image } from "@chakra-ui/react";
import HamburgerMenu from "../../components/HamburgerMenu";
import logo from "../../../../assets/logo.png";

const LeftSection = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"}>
      <HamburgerMenu />
      <Image src={logo} w={"50px"} h={"auto"} />
    </Flex>
  );
};

export default LeftSection;
