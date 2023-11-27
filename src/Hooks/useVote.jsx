// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useVote = () => {
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

    const {data: votes = [], isPending: loading, refetch} = useQuery({
        queryKey: ['votes'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/vote');
            return res.data;
        }
    })


    return [votes, loading, refetch]
}

export default useVote;