import { useEffect } from 'react';
import heroImage from '../../assets/images/hero-image.jpg'
import ProductCard from '../../components/product/Product-Card';
import useProduct from '../../hooks/useProduct';


import { Product } from '../../types/product.ts';
import { useNavigate } from 'react-router-dom';

function Index() {
  const { getAllProducts, loading, products } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };


  if (loading.getAllProducts) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="text-4xl font-bold text-center">
      <div id="hero" className="bg-gray-100 h-[30vh] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="hero-image" />
      </div>

      <h3 className='pt-12 pb-6'>Products</h3>
      
      <div className='py-2 px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {products && products.length > 0 ? (
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product.id)} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No products found</div>
        )}
      </div>
    </div>
  )
}

export default Index;