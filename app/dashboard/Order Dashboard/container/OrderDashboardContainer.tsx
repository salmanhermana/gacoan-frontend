'use client';

import { useQueue } from '@/lib/hooks/useKitchen';
import OrderCard from '@/components/cards/OrderCard';
import { OrderStatus } from '@/types/Order';

const OrderDashboardContainer: React.FC = () => {
  const { currentQueue, orderStatus, loading, error, startCooking, finishCooking } = useQueue();

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQueue && !loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex border-b">
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-500">Menu</h2>
              </div>
              <div className="px-6 py-4 border-b-2 border-red-500">
                <h2 className="text-lg font-semibold text-red-500">Antrian Order</h2>
              </div>
            </div>
            
            <div className="p-6 text-center">
              <p className="text-gray-500 text-lg">Tidak ada pesanan dalam antrian</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex border-b">
            <div className="px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-500">Menu</h2>
            </div>
            <div className="px-6 py-4 border-b-2 border-red-500">
              <h2 className="text-lg font-semibold text-red-500">Antrian Order</h2>
            </div>
          </div>
          
          <div className="p-6">
            {loading && !currentQueue ? (
              <div className="text-center">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : currentQueue ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <OrderCard
                  order={currentQueue}
                  orderNumber={11} // replace with API call
                  status={orderStatus}
                  timestamp="12:32:01"
                  onStartCooking={startCooking}
                  onFinishCooking={finishCooking}
                  loading={loading}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDashboardContainer;