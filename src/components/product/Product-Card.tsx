import { Product } from '../../types/product.ts';

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(price);
    };

    return (
        <div 
            className="border border-slate-200 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            onClick={onClick}>
            <img src={product.first_image} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <div className="p-4 text-left">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-sm">
                    {formatPrice(product.base_price)}
                </p>
                <div className="flex gap-2 items-center">
                    <img src={product.brand.image_url} alt={product.brand.name} className="w-10 h-10 object-contain" />
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
