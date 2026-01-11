import Image from "next/image";
import Img from "@/public/81fPKd-2AYL._AC_SL1500_t.png";

export default function ProductCard() {
  return (
    <article className="group w-80 h-90 rounded-2xl bg-white shadow-md hover:shadow-xl transition overflow-hidden">
      
      {/* Image Section */}
      <div className="relative h-70 bg-gray-100">
        <Image
          src={Img}
          alt="Product Image"
          fill
          className="object-contain p-4"
        />

        {/* Wishlist */}
        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow">
          ❤️
        </button>

        {/* Add to Cart - SHOW ON HOVER */}
        <button
          className="
            absolute px-10 bottom-3 left-1/2 -translate-x-1/2
            bg-black text-white text-sm  py-2 rounded-lg
            opacity-0 translate-y-4
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300
            cursor-pointer
          "
        >
          Add to Cart
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-800 truncate">
          Minimalist Desk Lamp
        </h2>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold">$29</span>
          <span className="text-yellow-500 text-sm">⭐⭐⭐⭐☆</span>
        </div>
      </div>
    </article>
  );
}
