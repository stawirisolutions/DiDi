import { HStack, VStack } from "@chakra-ui/react";
import LeftSection from "./sections/LeftSection";
import RightSection from "./sections/RightSection";

const LoggedOut = () => {
  return (
    <VStack w={"full"} spacing={0} overflow={"visible"}>
      <HStack
        w={"full"}
        h={"auto"}
        alignItems={"center"}
        p={2}
        justifyContent={"space-between"}
        position={"fixed"}
        top={0}
        zIndex={1000}
        bg={"orange"}
        boxShadow={"2xl"}
      >
        {/* Left Section */}
        <LeftSection />

        {/* Right Section */}
        <RightSection />
      </HStack>
    </VStack>
  );
};

export default LoggedOut;
