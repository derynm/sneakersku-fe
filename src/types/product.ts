interface Brand {
    name: string;
    image_url: string;
}

interface Category {
    name: string;
    image_url: string;
}


export interface Product {
    id: number;
    name: string;
    description: string;
    base_price: number;
    brand_id: number;
    category_id: number;
    first_image: string;
    brand: Brand;
    category: Category; 
}

export type Variant = {
    size: number;
    color: string;
    price: number;
    quantity: number;
    image_url: string;
};

export interface ProductDetail extends Product {
    variants: Record<string, Variant>;
}