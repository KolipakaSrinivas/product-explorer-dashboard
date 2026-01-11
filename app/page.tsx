import ThemeToggle from "./components/Theme-toggle";

export default function Home() {
  return (
    <main className=" flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Dark and Light Mode</h1>
      <ThemeToggle />
    </main>
  );
}
