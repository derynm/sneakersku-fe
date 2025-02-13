import { useState } from "react";
import { useApi } from "../service/api";
import { ProductDetail } from "../types/product";

const useProduct = () => {

    const api = useApi();
    

    const [loading, setLoading] = useState({
        getAllProducts: false,
        getProduct: false,
    });

    const [product, setProduct] = useState<ProductDetail>();

    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        setLoading({ ...loading, getAllProducts: true });
        loading.getAllProducts = true;
        try {
            const response:any = await api.getProducts();
            console.log(response);
            setProducts(response);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading({ ...loading, getAllProducts: false });
        }
    }

    const getProduct = async (id: string) => {
        setLoading({ ...loading, getProduct: true });
        try {
            const response:any = await api.getProduct(id);
            setProduct(response);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading({ ...loading, getProduct: false });
        }
    }

    return {
        products,
        product,
        loading,
        getAllProducts,
        getProduct
    }

}

export default useProduct;