import { useEffect, useState } from 'react';
import useProduct from '../../hooks/useProduct';

import { useParams } from 'react-router-dom';
import QuantityAdjuster from '../../components/base/InputQuantity';
import useCart from '../../hooks/useCart';

function Detail() {
  const { getProduct, product, loading } = useProduct();
  const { postItemToCart } = useCart();
  const { id } = useParams();


  useEffect(() => {
    getProduct(id as string);
  }, []);


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);
  };

  const [selectedVariant, setSelectedVariant] = useState<string>('');

  const selectVariant = (variant: string) => {
    setSelectedVariant(variant);
  }

  const [quantity, setQuantity] = useState(1); // Add this state
  
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    const data = {
      shoeId: parseInt(id as string),
      variantKey: selectedVariant,
      quantity: quantity
    }
    postItemToCart(data);
  }

  if (loading.getProduct) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
        <img src={product?.first_image} alt={product?.name} className="w-full h-96 object-cover" />
        <div className='space-y-6'>
          <h1 className="text-2xl font-bold">{product?.name}</h1>
          <p>{product?.description}</p>
          <p className='font-semibold text-xl'>{formatPrice(product?.base_price ?? 0)}</p>
          <div>
            <p className='my-5'>Variant</p>
            <div className="flex gap-2">
              {product?.variants && Object.keys(product.variants).map((variant) => (
                <div 
                    key={variant}
                    className={"border border-slate-200 rounded-lg p-4" + (selectedVariant === variant ? ' bg-blue-100' : '')}
                    onClick={() => selectVariant(variant)}>
                  <p>{variant}</p>
                </div>
              ))}
            </div>
          </div>
          <QuantityAdjuster onQuantityChange={handleQuantityChange} />
          <button 
            type="submit"
            className="bg-blue-500 text-white rounded-lg p-2 w-full disabled:opacity-50"
            disabled={!selectedVariant}
            onClick={handleAddToCart}
            >
                Add To Cart
            </button>
        </div>
    </div>
  )
}

export default Detail;