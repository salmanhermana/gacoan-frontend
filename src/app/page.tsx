import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Kitchen Dashboard
        </h1>
        
        <div className="space-y-4">
          <Link
            href="/Menu Dashboard"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md text-center transition-colors"
          >
            Menu Dashboard
          </Link>
          
          <Link
            href="/Order Dashboard"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md text-center transition-colors"
          >
            Order Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}