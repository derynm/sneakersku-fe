import { useState, useEffect } from 'react';
import useCart from "../../hooks/useCart";
import useUser from '../../hooks/useUser';

const Cart = () => {
  const { cart, getListCart, postCheckout, setCart } = useCart();
  const { userData, getProfile } = useUser();

  useEffect(() => {
    getProfile();
    getListCart();
  }, []);

  const handleCheckout = () => {
    const primaryAddress = userData?.addresses.find((address) => address.is_primary);
    if (primaryAddress) {
      postCheckout({
        address_id: primaryAddress.id
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const updateQuantity = (index, increment) => {
    if (!cart) return;

    const newItems = [...cart.items];
    const item = newItems[index];
    const newQuantity = Math.max(1, item.quantity + increment);
    
    newItems[index] = {
      ...item,
      quantity: newQuantity
    };

    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    setCart({
      ...cart,
      items: newItems,
      total: newTotal,
      updatedAt: Date.now()
    });
  };

  const removeItem = (index) => {
    if (!cart) return;

    const newItems = cart.items.filter((_, i) => i !== index);
    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    setCart({
      ...cart,
      items: newItems,
      total: newTotal,
      updatedAt: Date.now()
    });
  };

  // Show loading state if cart is not yet loaded
  if (!cart) {
    return (
      <div className="max-w-2xl mx-auto p-4 bg-white mt-5 border border-slate-100 shadow-lg rounded-lg">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white mt-5 border border-slate-100 shadow-lg rounded-lg">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
      </div>
      
      <div className="space-y-4">
        {cart.items?.map((item, index) => (
          <div 
            key={`${item.shoeId}-${item.variantKey}`}
            className="flex items-center justify-between p-4 border border-slate-100 shadow-md rounded-lg"
          >
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">{formatPrice(item.price)}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => removeItem(index)}
                className="px-3 py-1 text-red-500 hover:bg-red-50 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {(!cart.items || cart.items.length === 0) && (
          <div className="text-center">Cart is empty</div>
        )}
      </div>

      <div className="mt-8 pt-4 border-t flex justify-between items-center">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-semibold">{formatPrice(cart.total)}</span>
      </div>

      <button 
        className="mt-4 bg-blue-500 text-white rounded-lg p-2 w-full disabled:opacity-50"
        disabled={!cart.items || cart.items.length === 0}
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;