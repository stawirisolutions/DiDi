import { useEffect, useState } from "react";
import { api } from "../../services/api-client";
import ProductCard from "./components/ProductCard";
import { SimpleGrid } from "@chakra-ui/react";

export interface productRes {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: number;
}

const HomePage = () => {
  const [products, setProducts] = useState<productRes[]>([]);

  useEffect(() => {
    api
      .get<productRes[]>("products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <SimpleGrid columns={{ sm: 2, md: 4, lg: 6 }} spacing={4} p={4} mt={"65px"}>
      {products.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </SimpleGrid>
  );
};

export default HomePage;
