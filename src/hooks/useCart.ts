import { useState } from "react";
import { useApi } from "../service/api";
import { useNavigate } from "react-router-dom";

const useCart = () => {

    const api = useApi();

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    const getListCart = async () => {
        try {
            const response:any = await api.getListCart();
            setCart(response);
            
        } catch (error) {
            console.log(error)
        }
    }

    const postItemToCart = async (opt: any) => {
        try {
            await api.postItemToCart({
                data: opt
            });
            navigate('/cart');
        } catch (error) {
            console.log(error)
        }
    }

    const postCheckout = async (opt: any) => {
        try {
            await api.postCheckout({
                data: opt
            });
            navigate('/transaction');
        } catch (error) {
            console.log(error)
        }
    }


    return {
        cart,
        setCart,
        getListCart,
        postItemToCart,
        postCheckout
    }
}

export default useCart;