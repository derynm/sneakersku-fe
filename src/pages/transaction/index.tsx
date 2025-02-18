import { useEffect } from "react";
import useTransaction from "../../hooks/useTransaction";

const Transaction = () => {

  const {getListTrasaction, transactionList} = useTransaction();

  useEffect(() => {
    getListTrasaction();
  }, []);


  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
      
      <div className="space-y-6">
        {transactionList.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No transactions found
          </div>
        ) : (
            transactionList.map((transaction) => (
            <div 
              key={transaction.id}
              className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
            >
              <div className="border-b border-gray-100 bg-gray-50 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Order ID: #{transaction.id}</p>
                    <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(transaction.total_amount)}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                {transaction.items.map((item, index) => (
                  <div 
                    key={`${item.shoeId}-${item.variantKey}`}
                    className={`flex justify-between items-center ${
                      index !== transaction.items.length - 1 ? 'mb-4' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Items: {transaction.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  {/* <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    View Details
                  </button> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transaction;