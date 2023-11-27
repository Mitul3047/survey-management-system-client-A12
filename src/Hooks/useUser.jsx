// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
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

    const {data: users = [], isPending: loading, refetch} = useQuery({
        queryKey: ['users'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })


    return [users, loading, refetch]
}

export default useUser;