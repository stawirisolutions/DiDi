import React from "react";

interface DiscountItem {
  name: string;
  price: number;
  image: string;
}

interface DiscountsProps {
  items: DiscountItem[];
}

const Discounts: React.FC<DiscountsProps> = ({ items }) => {
  return (
    <div className="col-span-2 bg-grey-200 p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-lg">Billions of subsidies</h2>
      <div className="grid grid-cols-4 gap-4 mt-2">
        {items.map((item, index) => (
          <div key={index} className="text-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-50 h-60 object-cover mx-auto mb-2 rounded-md"
            />
            <p className="font-bold text-orange-500">${item.price}</p>
            <p className="text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discounts;
