import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const products = [
  { image: "images/product-2.jpg", title: "Gaming", description: "Best quality product" },
  { image: "/images/product-7.jpg", title: "Art", description: "Reliable services for you" },
  { image: "/images/product-3.jpg", title: "Electronics", description: "Affordable and durable" },
  { image: "images/product-1.jpg", title: "Beauty", description: "SHOP NOW!!!" },
  { image: "images/product-4.jpg", title: "Outdoors", description: "Affordable and durable" },
  { image: "/images/product-6.jpg", title: "Sporting", description: "Shop With Us" },
  { image: "images/product-5.jpg", title: "Services", description: "Call Us" },




];

const ProductSlideshow = () => {
  return (
    <div className="col-span-1 rounded-lg overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop={true}
        className="w-full h-full"
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-orange-500 text-white p-6 flex flex-col justify-between h-100">
              {/* Top content */}
              <div className="flex flex-col items-center">
                <img src={item.image} alt={item.title} className="w-full h-60 object-cover rounded-lg" />
                <h2 className="text-xl font-bold mt-3">{item.title}</h2>
                <p className="text-sm mt-2">{item.description}</p>
              </div>
              
              {/* Additional content to fill space */}
              <div className="mt-4">
                <div className="flex justify-between items-center mt-2">
                  {/* <span className="font-bold text-lg">${item.price}</span> */}
                  {/* <span className="bg-white text-orange-500 px-2 py-1 rounded text-xs font-bold">
                    {item.discount ? `${item.discount}% OFF` : 'NEW'}
                  </span> */}
                </div>
                
                <div className="flex justify-between mt-0">
                  <button className="bg-white text-orange-500 hover:bg-orange-100 transition-colors px-3 py-1 rounded-lg text-sm font-medium">
                    View Details
                  </button>
                  <button className="bg-orange-600 hover:bg-orange-700 transition-colors px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                    <span className="mr-1">Add to Cart</span> 
                    <span>🛒</span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlideshow;
