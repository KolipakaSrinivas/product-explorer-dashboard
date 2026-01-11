// import ThemeToggle from "./components/Theme-toggle";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main className=" flex flex-wrap gap-5 justify-between  px-16 mt-[10rem]">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
    </main>
  );
}
