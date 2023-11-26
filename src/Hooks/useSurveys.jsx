// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSurveys = () => {
    const axiosPublic = useAxiosPublic();
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false);
    //         });
    // }, [])

    const {data: surveys = [], isPending: loading, refetch} = useQuery({
        queryKey: ['survey'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/surveys');
            return res.data;
        }
    })


    return [surveys, loading, refetch]
}

export default useSurveys;