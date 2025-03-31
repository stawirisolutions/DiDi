import useAxios from "../hooks/useAxios";
import TopBanner from "../sections/home/top-banner";
import CategorySection from "../sections/home/category-section";
import PopularServices from "../sections/home/popular-services";
import BecomeVendor from "../sections/home/become-vendor";
import Setter from "../sections/home/setter";
import { headers } from 'next/headers';


export default async function Home() {
  headers();

  const request = useAxios();
  let data = {
    categories: [],
    products: [],
    services: [],
    stores: []
  };

  try {
    const response = await request({
      method: 'get',
      path: '/?prodLimit=8&servLimit=8&storeLimit=3'
    });
    
    data = response.data || data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  console.log("API URL:", process.env.NEXT_PUBLIC_HOST_API);


  return (
    <div>
      <TopBanner />
      <CategorySection />
      {/* <TrendingProducts /> */}
      {/* <BecomeVendor /> */}
      {/* <PopularServices /> */}
      {/* <TopRatedVendors stores={data.stores} /> */}
      <Setter
        categories={data.categories}
        products={data.products}
        services={data.services}
      />

    </div>
  );
}
