export default function Filter() {
  return (
    <section
      className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
        gap-4
        px-5 md:px-16
        py-3 md:py-3
        border-b-2
        border-gray-100
      "
    >
      {/* Search */}
      <input
        type="text"
        className="border-b-2 shadow-sm  bg-white p-2 border-gray-200 rounded-xl w-full"
        placeholder="Search Your Product"
      />

      {/* Sort */}
      <select
        name="sort"
        id="sort"
        className="border-b-2 shadow-sm bg-white p-2 border-gray-200 rounded-xl w-full"
      >
        <option value="">Sort by</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
        <option value="rating">Rating</option>
        <option value="newest">Newest</option>
      </select>

      {/* Category */}
      <select
        name="category"
        id="category"
        className="border-b-2 shadow-sm bg-white p-2 border-gray-200 rounded-xl w-full"
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelry">Jewelry</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>

      {/* Favorite */}
      <button className="border-b-2 shadow-sm bg-white p-2 border-gray-200 rounded-xl w-full">
      ❤️  Favorite
      </button>
    </section>
  );
}
