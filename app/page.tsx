import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Kitchen Management System
        </h1>
        
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md text-center transition-colors"
          >
            Go to Dashboard
          </Link>
          
          <div className="flex space-x-2">
            <Link
              href="/dashboard/menu"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-3 rounded-md text-center text-sm transition-colors"
            >
              Menu
            </Link>
            
            <Link
              href="/dashboard/order"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-md text-center text-sm transition-colors"
            >
              Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}