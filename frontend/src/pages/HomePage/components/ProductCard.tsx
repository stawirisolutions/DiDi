import {
  Box,
  Image,
  VStack,
  Text,
  HStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { productRes } from "../HomePage";
import { FaShoppingCart, FaStar } from "react-icons/fa";

interface props {
  product: productRes;
}

const ProductCard = ({ product }: props) => {
  return (
    <Box
      borderWidth={"1px"}
      borderRadius={"lg"}
      overflow={"hidden"}
      boxShadow={"md"}
      _hover={{ boxShadow: "xl", transform: "scale(1.02)", transition: "0.2s" }}
    >
      <Box height="150px" width="100%" objectFit={"cover"}>
        <Image
          src={product.image}
          objectFit="cover"
          width="100%"
          height="100%"
          borderRadius="md"
        />
      </Box>
      <VStack align="start" spacing={3} p={2}>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          {product.name}
        </Text>
        <Text fontSize={"md"} color={"gray.600"} noOfLines={2}>
          {product.description}
        </Text>
        <HStack>
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              as={FaStar}
              color={i < product.rating ? "yellow.400" : "gray.300"}
            />
          ))}
        </HStack>
        <Text fontSize={"xl"} fontWeight={"bold"} color={"teal.500"}>
          {product.price}
        </Text>
        <Button
          leftIcon={<FaShoppingCart />}
          colorScheme="orange"
          variant={"outline"}
          width={"full"}
        >
          Add to Cart
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;
