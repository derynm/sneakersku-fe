import { useState } from "react";
import { useApi } from "../service/api";

const useTransaction = () => {

    const api = useApi();

    const [transactionList, setTransactionList] = useState([]);

    const getListTrasaction = async () => {
        try {
            const response:any = await api.getTransactions();
            setTransactionList(response);
            
        } catch (error) {
            console.log(error)
        }
    }



    return {
        transactionList,
        getListTrasaction,
    }
}

export default useTransaction;