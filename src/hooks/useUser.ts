import { useState } from "react";
import { useApi } from "../service/api";
import { InputAddress, User } from "../types/user";

const useUser = () => {
    const api = useApi();
    const [loading, setLoading] = useState({
        getProfile: false,
        
    });

    const [userData, setUserData] = useState<User>()

    const getProfile = async () => {
        setLoading({ ...loading, getProfile: true });
        try {
            const response:any = await api.getUserProfile();
            setUserData(response);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading({ ...loading, getProfile: false });
        }
    }

    const addAddress = async (address: InputAddress) => {
        try {
            await api.postAddress({
                data: address
            });
            getProfile();
        } catch (error) {
            console.log(error)
            
        }
    }
    
    return {
        userData,
        loading,
        getProfile,
        addAddress
    }


}

export default useUser;