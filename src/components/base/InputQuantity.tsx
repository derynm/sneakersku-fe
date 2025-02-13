import { useState } from 'react';

const QuantityAdjuster = ({ onQuantityChange, minQuantity = 1, maxQuantity = 99 } :
    { onQuantityChange?: (quantity: number) => void; minQuantity?: number; maxQuantity?: number }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-2 border border-gray-300 rounded-lg w-fit">
      <button
        onClick={handleDecrease}
        disabled={quantity <= minQuantity}
        className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <input type='number' className="w-12 text-center font-medium" value={quantity} />
      <button
        onClick={handleIncrease}
        disabled={quantity >= maxQuantity}
        className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 disabled:opacity-50"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantityAdjuster;