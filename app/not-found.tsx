import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <Link href="/">
                <img
                    src="/icons/openships_icon.svg"
                    alt="Logo"
                    className="h-32 w-32 invert"
                />
            </Link>
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
        </div>
    );
}
