import Link from "next/link";

export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/">
        <img src="/icons/openships_icon.svg" alt="Logo" className="w-32 h-32 invert" />
      </Link>
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
    </div>
  );
}