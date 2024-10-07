import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">Oops! The page you are looking for does not exist.</p>
        <p className="mt-2 text-lg text-gray-500">It might have been removed or is temporarily unavailable.</p>
        <Link href="/" className="mt-6 inline-block px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-900/50 transition duration-200">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
