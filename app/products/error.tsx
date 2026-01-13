"use client";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="text-gray-500 mt-2">{error.message}</p>
      <Link href={"/"}>
        <button
          // onClick={reset}
          className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
        >
          Try again
        </button>
      </Link>
    </div>
  );
}
