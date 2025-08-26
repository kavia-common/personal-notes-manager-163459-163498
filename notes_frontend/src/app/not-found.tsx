import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Page not found</h1>
        <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-4 inline-block text-primary underline">Go home</Link>
      </div>
    </main>
  );
}
