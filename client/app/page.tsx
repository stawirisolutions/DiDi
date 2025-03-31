// 'use client'

// import React from "react";
// import useAxios from "@/app/hooks/useAxios";
// import TopBanner from "@/app/sections/home/top-banner";
// import Setter from "@/app/sections/home/setter";
// import CategorySection from "@/app/sections/home/category-section";
// import PopularServices from "@/app/sections/home/popular-services";
// import BecomeVendor from "@/app/sections/home/become-vendor";
// import { headers } from 'next/headers';
// import TopBar from "./layout/main/top-bar";
// import Footer from "./layout/main/footer";


// export default async function Home() {
//   headers();

//   const request = useAxios();
//   let data = {
//     categories: [],
//     products: [],
//     services: [],
//     stores: []
//   };

//   try {
//     const response = await request({
//       method: 'get',
//       path: '/?prodLimit=8&servLimit=8&storeLimit=3'
//     });
    
//     data = response.data || data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
//   console.log("API URL:", process.env.NEXT_PUBLIC_HOST_API);


//   return (
//     <div>
//       <TopBar/>
//       <TopBanner />
//       <CategorySection />
//       {/* <TrendingProducts /> */}
//       {/* <BecomeVendor /> */}
//       {/* <PopularServices /> */}
//       {/* <TopRatedVendors stores={data.stores} /> */}
//       <Setter
//         categories={data.categories}
//         products={data.products}
//         services={data.services}
//       />
//       <Footer/>

//     </div>
//   );
// }
// import ClientHomePage from './clientHomePage';



import React from 'react';
import { headers } from 'next/headers';
import ClientHomePage from './clientHomePage';

// This is a Server Component (no 'use client' directive)
export default async function HomePage() {
  // Access headers or any other server-only functionality here
  const headersList = await headers();
  const userAgent = headersList.get('user-agent'); // Type is string | null

  // Pass the userAgent as is - we've updated the client component to accept null
  return (
    <ClientHomePage 
      userAgent={userAgent}
    />
  );
}