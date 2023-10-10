import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            axios.get(url)
            .then(res => {
                setLoading(false);
                setData(res.data);
            })
            .catch(err => {
                setLoading(false);
                setError(err);
            });
        }, 2000);
    }, [url]);

    return {data, loading, error};
}